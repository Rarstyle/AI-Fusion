import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "200mb",
  },
};

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
  ["_overlay", "_overlayk", "_overlay_with frames", "_overlay_ol"].forEach((suffix) =>
    candidates.push(`${safeStem}${suffix}.mp4`),
  );

  for (const dir of overlaySearchDirs) {
    for (const candidate of candidates) {
      const candidatePath = path.join(dir, candidate);
      if (fs.existsSync(candidatePath)) {
        return candidate;
      }
    }
    // Case-insensitive fallback search.
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
      // ignore dir errors
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({
    maxFileSize: 200 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Error parsing form data" });
    }
    const videoFile = files.video;
    if (!videoFile) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    const fileRecord = Array.isArray(videoFile) ? videoFile[0] : videoFile;
    const originalName = fileRecord.originalFilename || fileRecord.newFilename;

    // Offline path: serve existing description (and overlay if present) without backend.
    const overlayFilename = findOverlayFilename(originalName);
    const overlayDescription = readOverlayDescription(originalName);
    if (overlayFilename || overlayDescription) {
      return res.status(200).json({
        overlayUrl: overlayFilename
          ? `/api/overlay?file=${encodeURIComponent(overlayFilename)}`
          : undefined,
        overlayDescription,
        feedback: [],
      });
    }

    // Online path: proxy to backend if overlay not found.
    try {
      const backendRes = await fetch("http://localhost:8080/api/analyze-video", {
        method: "POST",
        body: fs.createReadStream(fileRecord.filepath),
        headers: {
          "Content-Type": "video/mp4",
          "exercise-id": (fields.exerciseId as string) || "",
        },
      });
      const result = await backendRes.json();
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: "Failed to connect to backend" });
    }
  });
}
