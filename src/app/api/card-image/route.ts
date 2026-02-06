import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/card-image?url=<encoded-image-url>
 *
 * Proxies card images from Ghost so Open Graph / Twitter card image URLs
 * are served from the same origin (tableovertwo.com). X's crawler often
 * fails to fetch images on a different domain ("Failed to get a proxied URL").
 * Only URLs from the configured Ghost host are allowed.
 */
export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url");
  if (!urlParam) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }

  let imageUrl: URL;
  try {
    imageUrl = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const ghostApiUrl = process.env.GHOST_API_URL;
  if (!ghostApiUrl) {
    return NextResponse.json(
      { error: "Card image proxy not configured" },
      { status: 503 }
    );
  }

  const allowedHost = new URL(ghostApiUrl).hostname;
  if (imageUrl.hostname !== allowedHost) {
    return NextResponse.json(
      { error: "Image host not allowed" },
      { status: 403 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(imageUrl.toString(), {
      signal: controller.signal,
      headers: { "User-Agent": "TableOverTwo-CardImageProxy/1.0" },
      next: { revalidate: 3600 },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      clearTimeout(timeoutId);
      return NextResponse.json(
        { error: "Upstream image fetch failed" },
        { status: 502 }
      );
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Card image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 502 }
    );
  }
}
