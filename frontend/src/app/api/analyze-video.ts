import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { fetch, FormData } from 'undici';

// Disable body parsing by Next.js
export const config = {
  api: {
    sizeLimit: '100mb',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing form data' });
    }
    const videoField = files.video;
    const videoFile = Array.isArray(videoField) ? videoField[0] : videoField;
    if (!videoFile || !videoFile.filepath) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }
    // Here you would send the video to your backend server for analysis
    // Example: using fetch to POST to backend
    try {
      const formData = new FormData();
      formData.append('video', fs.createReadStream(videoFile.filepath), videoFile.originalFilename || 'video.mp4');
      // Fix for Fields possibly string|string[]
      let exerciseId: unknown = fields.exerciseId;
      if (Array.isArray(exerciseId)) exerciseId = exerciseId[0];
      if (typeof exerciseId === 'string') formData.append('exerciseId', exerciseId);
      const backendRes = await fetch('http://localhost:8080/api/analyze-video', {
        method: 'POST',
        body: formData,
      });
      const result = await backendRes.json();
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to connect to backend' });
    }
  });
}
