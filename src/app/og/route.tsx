import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// Imágenes OG dinámicas para los previews de WhatsApp/redes.
// Uso: /og?t=Título&s=Subtítulo  (las páginas las referencian en su metadata.openGraph).
// Solo la piden los crawlers de previews: no afecta la estaticidad del resto del sitio.

export const runtime = "edge";

function clamp(s: string | null, max: number, fallback: string): string {
  const v = (s ?? "").trim();
  if (!v) return fallback;
  return v.length > max ? `${v.slice(0, max - 1)}…` : v;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const titulo = clamp(searchParams.get("t"), 70, "Calculadoras argentinas, gratis");
  const subtitulo = clamp(
    searchParams.get("s"),
    110,
    "Datos de fuentes oficiales, con fecha de verificación visible",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#022c22",
          backgroundImage: "linear-gradient(135deg, #022c22 0%, #064e3b 60%, #065f46 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#10b981",
              color: "#022c22",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            =
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700, color: "#ffffff" }}>
            CalculAR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {titulo}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a7f3d0", lineHeight: 1.3 }}>
            {subtitulo}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#6ee7b7",
          }}
        >
          <div style={{ display: "flex" }}>calcular.ar</div>
          <div style={{ display: "flex" }}>Gratis · fuentes oficiales ARCA / BCRA / INDEC</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "cache-control": "public, max-age=86400, s-maxage=604800" },
    },
  );
}
