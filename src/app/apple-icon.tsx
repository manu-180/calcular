import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Apple touch icon (180×180 PNG) — reusa el mismo signo que icon.svg.
// Node runtime (sin runtime="edge") para poder readFile en build.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"), "base64");
  const src = `data:image/svg+xml;base64,${svg}`;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={180} height={180} src={src} alt="" />
      </div>
    ),
    { ...size },
  );
}
