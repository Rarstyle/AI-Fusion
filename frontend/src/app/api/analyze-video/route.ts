import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization token required" },
      { status: 401 },
    );
  }

  let incomingForm: FormData;
  try {
    incomingForm = await req.formData();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to read upload payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const video = incomingForm.get("video");
  const exerciseIdFromForm = incomingForm.get("exerciseId");
  const exerciseId =
    (typeof exerciseIdFromForm === "string" && exerciseIdFromForm) ||
    req.nextUrl.searchParams.get("exerciseId");

  if (!(video instanceof File)) {
    return NextResponse.json(
      { error: "Video file is required" },
      { status: 400 },
    );
  }

  if (!exerciseId) {
    return NextResponse.json(
      { error: "exerciseId is required" },
      { status: 400 },
    );
  }

  const forwardForm = new FormData();
  forwardForm.append("video", video, video.name || "video.mp4");

  const backendUrl = `${API_BASE_URL}/api/videos/analyze?exerciseId=${encodeURIComponent(
    exerciseId,
  )}`;

  let backendResponse: Response;
  try {
    backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: forwardForm,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to reach backend";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const contentType = backendResponse.headers.get("content-type") || "";
  const responseText = await backendResponse.text();

  let json: any = null;
  if (responseText && contentType.includes("application/json")) {
    try {
      json = JSON.parse(responseText);
    } catch {
      // fall through and return raw text
    }
  }

  if (!backendResponse.ok) {
    const errorMessage =
      (json && (json.error || json.message)) ||
      responseText ||
      `Backend responded with status ${backendResponse.status}`;

    return NextResponse.json(
      { error: errorMessage },
      { status: backendResponse.status },
    );
  }

  if (json !== null) {
    return NextResponse.json(json, { status: backendResponse.status });
  }

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: {
      "content-type": contentType || "application/json",
    },
  });
}
