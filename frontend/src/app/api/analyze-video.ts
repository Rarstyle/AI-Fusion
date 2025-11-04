import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parsing by Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing form data' });
    }
    const videoFile = files.video;
    if (!videoFile) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }
    // Here you would send the video to your backend server for analysis
    // Example: using fetch to POST to backend
    try {
      const backendRes = await fetch('http://localhost:8080/api/analyze-video', {
        method: 'POST',
        body: fs.createReadStream(videoFile.filepath),
        headers: {
          'Content-Type': 'video/mp4', // or detect type
          'exercise-id': fields.exerciseId as string,
        },
      });
      const result = await backendRes.json();
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to connect to backend' });
    }
  });
}
