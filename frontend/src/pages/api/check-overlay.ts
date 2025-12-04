import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const overlaySearchDirs = [
  path.resolve(process.cwd()),
  path.resolve(process.cwd(), ".."),
  path.resolve(process.cwd(), "../.."),
  path.resolve(process.cwd(), "public"),
];

const descriptionDirs = [
  path.resolve(process.cwd(), "info"),
  path.resolve(process.cwd(), "..", "frontend", "info"),
  path.resolve(process.cwd(), "..", "info"),
];

function findOverlayFilename(originalName?: string | null): string | null {
  if (!originalName) return null;
  const stem = path.parse(originalName).name;
  const safeStem = stem.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!safeStem) return null;
  const safeStemLower = safeStem.toLowerCase();

  const candidates: string[] = [];
  ["", "_overlay", "_overlayk", "_overlay_with frames", "_overlay_ol"].forEach(
    (suffix) => candidates.push(`${safeStem}${suffix}.mp4`),
  );

  for (const dir of overlaySearchDirs) {
    for (const candidate of candidates) {
      const candidatePath = path.join(dir, candidate);
      if (fs.existsSync(candidatePath)) {
        return candidate;
      }
    }
    try {
      const matches = fs
        .readdirSync(dir)
        .filter((file) => {
          const lower = file.toLowerCase();
          return (
            lower.startsWith(safeStemLower) &&
            lower.includes("_overlay") &&
            lower.endsWith(".mp4")
          );
        });
      if (matches.length > 0) {
        return matches[0];
      }
    } catch {
      // ignore dir read errors
    }
  }
  return null;
}

function readOverlayDescription(originalName?: string | null): string | null {
  if (!originalName) return null;
  const stem = path.parse(originalName).name;
  const safeStem = stem.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!safeStem) return null;
  const safeStemLower = safeStem.toLowerCase();
  const candidates = [`${safeStem}.txt`, `${safeStemLower}.txt`];

  for (const dir of descriptionDirs) {
    for (const file of candidates) {
      const candidate = path.join(dir, file);
      try {
        if (fs.existsSync(candidate)) {
          return fs.readFileSync(candidate, "utf-8");
        }
      } catch {
        // ignore
      }
    }
    try {
      const match = fs
        .readdirSync(dir)
        .find((file) => file.toLowerCase() === `${safeStemLower}.txt`);
      if (match) {
        return fs.readFileSync(path.join(dir, match), "utf-8");
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const filename = req.query.filename;
  if (!filename || Array.isArray(filename)) {
    return res.status(400).json({ error: "Missing filename" });
  }

  const overlayFilename = findOverlayFilename(filename);
  if (!overlayFilename) {
    return res.status(404).json({ error: "Overlay not found" });
  }

  const overlayDescription = readOverlayDescription(filename);
  return res.status(200).json({
    overlayUrl: `/api/overlay?file=${encodeURIComponent(overlayFilename)}`,
    overlayDescription,
    feedback: [
      {
        timestamp: Date.now(),
        message: `Using pre-rendered overlay for ${filename}`,
        severity: "info",
        type: "overlay",
      },
    ],
  });
}
