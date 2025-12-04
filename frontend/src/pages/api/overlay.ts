import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const overlaySearchDirs = [
  path.resolve(process.cwd()),
  path.resolve(process.cwd(), ".."),
  path.resolve(process.cwd(), "../.."),
  path.resolve(process.cwd(), "public"),
];

function sanitizeFileParam(fileParam: string): string | null {
  if (fileParam.includes("..") || fileParam.includes("/") || fileParam.includes("\\")) {
    return null;
  }
  return fileParam;
}

function resolveOverlayPath(fileParam: string): string | null {
  const safe = sanitizeFileParam(fileParam);
  if (!safe) return null;
  const targetLower = safe.toLowerCase();
  for (const dir of overlaySearchDirs) {
    const candidate = path.join(dir, safe);
    if (
      candidate.toLowerCase().includes("_overlay") &&
      candidate.startsWith(dir) &&
      fs.existsSync(candidate)
    ) {
      return candidate;
    }
    try {
      const match = fs
        .readdirSync(dir)
        .find(
          (file) =>
            file.toLowerCase() === targetLower &&
            file.toLowerCase().includes("_overlay") &&
            file.toLowerCase().endsWith(".mp4"),
        );
      if (match) {
        return path.join(dir, match);
      }
    } catch {
      // ignore dir errors
    }
  }
  return null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const fileParam = req.query.file;
  if (!fileParam || Array.isArray(fileParam)) {
    return res.status(400).json({ error: "Missing file parameter" });
  }

  const resolvedPath = resolveOverlayPath(fileParam);
  if (!resolvedPath) {
    return res.status(404).json({ error: "Overlay not found" });
  }

  try {
    const stat = fs.statSync(resolvedPath);
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", stat.size.toString());
    const stream = fs.createReadStream(resolvedPath);
    stream.pipe(res);
  } catch {
    res.status(500).json({ error: "Failed to read overlay" });
  }
}
