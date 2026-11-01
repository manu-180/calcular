import { mayusculasDe, transformeOg } from "@/motor/i18n/escritura";
import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { Idioma } from "@/motor/tipos";
import { TextoOg } from "@/motor/ui/og-rtl";

// Tarjeta de «Sueldos reales» (1200 x 630) para calcularya y calcular.ar. Sin montos: título del país y
// cuántas ocupaciones tienen datos. Misma receta que la del mundo: Satori con Geist (y Noto en CJK)
// pedida a Google Fonts con `text=`, bandera leída del disco y nunca de req.url.

const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.64)";
const VERDE = "#34d399";

const CABECERAS = { "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
// bn con Noto Sans Bengali: Geist no trae la escritura bengalí (ADR 0002, D14).
// Fuente de respaldo por idioma para los glifos que Geist no tiene: los CJK y la «ʻ» (U+02BB) de oʻ y
// gʻ del uzbeko latino (ADR 0002, D16).
// ro va con Noto Sans de respaldo por si Geist no trae ș y ț con coma (U+0218 a U+021B; ADR 0002, D18).
// el va con Noto Sans de respaldo: Geist no trae el griego (ADR 0002, D20).
// Geist no trae hebreo: la edición he pide Noto Sans Hebrew, como las CJK piden su Noto.
// Tampoco georgiano: la edición ka pide Noto Sans Georgian (ADR 0002, D26).
const FUENTE_CJK: Partial<Record<Idioma, string>> = { ja: "Noto Sans JP", ko: "Noto Sans KR", zh: "Noto Sans TC", bn: "Noto Sans Bengali", uz: "Noto Sans", ro: "Noto Sans", el: "Noto Sans", he: "Noto Sans Hebrew", ka: "Noto Sans Georgian" };
const ESPERA_MS = 3000;

async function fuente(familia: string, peso: number, texto: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(familia)}:wght@${peso}&text=${encodeURIComponent(texto)}`, { signal: AbortSignal.timeout(ESPERA_MS) });
    if (!css.ok) return null;
    const url = (await css.text()).match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const r = await fetch(url, { signal: AbortSignal.timeout(ESPERA_MS) });
    return r.ok ? await r.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function bandera(iso: string): Promise<string | null> {
  if (!/^[A-Z]{2}$/.test(iso)) return null;
  try {
    const svg = await readFile(path.join(process.cwd(), "public", "banderas", `${iso.toLowerCase()}.svg`));
    return `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch {
    return null;
  }
}

export interface DatosOgSueldos {
  titulo: string;
  bajada: string;
  ceja: string;
  marca: string;
  dominio: string;
  iso: string;
  idioma: Idioma;
  locale: string;
}

export async function ogSueldos(d: DatosOgSueldos): Promise<Response> {
  const cjk = FUENTE_CJK[d.idioma];
  const familiaCjk = cjk && d.idioma === "zh" && /^zh-(CN|SG)/i.test(d.locale) ? "Noto Sans SC" : cjk;
  // La ceja en mayúsculas con el locale (en griego, sin tonos), no con el textTransform de Satori.
  const ceja = mayusculasDe(d.ceja, d.locale);
  const texto = [...new Set([d.titulo, d.bajada, ceja, d.marca, d.dominio, "0123456789"].join(" "))].join("");
  const pedidas = await Promise.all([fuente("Geist", 400, texto), fuente("Geist", 700, texto), ...(familiaCjk ? [fuente(familiaCjk, 400, texto), fuente(familiaCjk, 700, texto)] : [])]);
  const nombres = ["Geist", "Geist", familiaCjk, familiaCjk];
  const pesos = [400, 700, 400, 700] as const;
  const fonts = pedidas.flatMap((data, i) => (data ? [{ name: nombres[i]!, data, weight: pesos[i], style: "normal" as const }] : []));
  const flag = await bandera(d.iso);
  const familia = familiaCjk ? `Geist, "${familiaCjk}"` : "Geist";
  const largo = d.titulo.length > 28;

  const elemento = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        color: CREMA,
        fontFamily: familia,
        backgroundColor: TINTA,
        backgroundImage: "radial-gradient(circle at 88% 0%, rgba(52,211,153,0.30) 0%, rgba(52,211,153,0) 46%), radial-gradient(circle at 0% 100%, rgba(244,240,230,0.08) 0%, rgba(244,240,230,0) 50%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          <svg width={40} height={40} viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill={VERDE} />
            <path d="M9 12.5h14" stroke={TINTA} strokeWidth="2.6" strokeLinecap="round" />
            <path d="M9 19.5h8.5" stroke={TINTA} strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="22.5" cy="19.5" r="1.8" fill={TINTA} />
          </svg>
          {d.marca}
        </div>
        {flag ? (
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            <img src={flag} width={66} height={44} alt="" />
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", fontSize: 26, color: VERDE, fontWeight: 700, letterSpacing: 3, textTransform: transformeOg(d.locale) }}>
          <TextoOg texto={ceja} idioma={d.idioma} />
        </div>
        <div style={{ display: "flex", fontSize: largo ? 76 : 96, fontWeight: 700, letterSpacing: d.idioma === "ja" || d.idioma === "ko" || d.idioma === "zh" ? 0 : -3, lineHeight: 1.02, maxWidth: 1000 }}>
          <TextoOg texto={d.titulo} idioma={d.idioma} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{ display: "flex", width: 18, height: 18, borderRadius: 18, backgroundColor: i < 7 ? VERDE : "transparent", border: i < 7 ? "none" : `2px solid ${SUAVE}` }} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
        <div style={{ display: "flex", color: SUAVE }}>
          <TextoOg texto={d.bajada} idioma={d.idioma} />
        </div>
        <div style={{ display: "flex", padding: "10px 20px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 24, fontWeight: 700 }}>{d.dominio}</div>
      </div>
    </div>
  );

  return new ImageResponse(elemento, {
    width: 1200,
    height: 630,
    headers: fonts.length < pedidas.length ? CABECERAS_INCOMPLETA : CABECERAS,
    ...(fonts.length ? { fonts } : {}),
  });
}
