import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { calendarioPublicado } from "@/motor/calendario/rutas";
import { vistaCalendario } from "@/motor/calendario/ui/presentar";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";

// Tarjeta del calendario (1200 x 630): la próxima fecha en grande y cuántas más vienen en el año. No
// lee parámetros: cualquiera es 404, así nadie llena la caché con variantes.

const NOCHE = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.62)";
const VERDE = "#34d399";
const CABECERAS = { "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
// bg va con Noto Sans de respaldo por si Geist no trae algún glifo del cirílico (ADR 0002, D24).
const FUENTE_CJK: Partial<Record<Idioma, string>> = { ja: "Noto Sans JP", ko: "Noto Sans KR", zh: "Noto Sans TC", bg: "Noto Sans" };

async function fuente(familia: string, peso: number, texto: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(familia)}:wght@${peso}&text=${encodeURIComponent(texto)}`, { signal: AbortSignal.timeout(3000) });
    if (!css.ok) return null;
    const url = (await css.text()).match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const r = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return r.ok ? await r.arrayBuffer() : null;
  } catch {
    return null;
  }
}

// Del disco y nunca de req.url (el host lo pone quien pide). next.config.ts suma public/banderas al
// trace de /intl/*/*/og.
async function bandera(iso: string): Promise<string | null> {
  if (!/^[A-Z]{2}$/.test(iso)) return null;
  try {
    const svg = await readFile(path.join(process.cwd(), "public", "banderas", `${iso.toLowerCase()}.svg`));
    return `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch {
    return null;
  }
}

export function crearOgCalendario(idioma: Idioma) {
  return async function GET(req: Request, { params }: { params: Promise<{ mercado: string }> }) {
    const { mercado } = await params;
    const claves = [...new URL(req.url).searchParams.keys()].filter((k) => !k.startsWith("nxtP"));
    const ctx = intlActivo() && !claves.length ? contextoSitio(registro, mercado as CodigoMercado) : null;
    if (!ctx || ctx.mercado.idioma !== idioma) return new Response("No encontrado", { status: 404 });
    const c = calendarioPublicado(registro, ctx.mercado, ctx.modo);
    const v = c ? vistaCalendario(ctx, c) : null;
    if (!v) return new Response("No encontrado", { status: 404 });
    const m = v.m;
    const e = v.proximos[0];
    const mas = v.proximos.length - 1;
    const titulo = v.t.h1(m.nombre);
    const resumen = e.titulo.length > 70 ? `${e.titulo.slice(0, 68)}…` : e.titulo;
    const flag = await bandera(m.pais);
    const cjk = FUENTE_CJK[m.idioma];
    const familiaCjk = cjk && m.idioma === "zh" && /^zh-(CN|SG)/i.test(m.locale) ? "Noto Sans SC" : cjk;
    const texto = [titulo, v.t.ceja(v.anios), v.t.og.proxima, e.dia, e.mesCorto, resumen, e.cambio ?? "", mas > 0 ? v.t.og.mas(mas) : "", "calcularya.com 0123456789…"].join(" ");
    const unicos = [...new Set(texto)].join("");
    const pedidas = await Promise.all([fuente("Geist", 400, unicos), fuente("Geist", 700, unicos), ...(familiaCjk ? [fuente(familiaCjk, 400, unicos), fuente(familiaCjk, 700, unicos)] : [])]);
    const nombres = ["Geist", "Geist", familiaCjk, familiaCjk];
    const pesos = [400, 700, 400, 700] as const;
    const fonts = pedidas.flatMap((data, i) => (data ? [{ name: nombres[i]!, data, weight: pesos[i], style: "normal" as const }] : []));
    const familia = familiaCjk ? `Geist, "${familiaCjk}"` : "Geist";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "56px 64px",
            color: CREMA,
            fontFamily: familia,
            backgroundColor: NOCHE,
            backgroundImage: "radial-gradient(circle at 88% 0%, rgba(52,211,153,0.30) 0%, rgba(52,211,153,0) 46%), radial-gradient(circle at 0% 100%, rgba(244,240,230,0.08) 0%, rgba(244,240,230,0) 50%)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: SUAVE }}>
              {flag ? <img src={flag} width={42} height={28} style={{ borderRadius: 5 }} alt="" /> : null}
              {v.t.ceja(v.anios)}
            </div>
            <div style={{ display: "flex", fontSize: titulo.length > 40 ? 54 : 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.04 }}>{titulo}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
              <svg width="38" height="38" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="9" fill={VERDE} />
                <path d="M9 12.5h14" stroke={NOCHE} strokeWidth="2.6" strokeLinecap="round" />
                <path d="M9 19.5h8.5" stroke={NOCHE} strokeWidth="2.6" strokeLinecap="round" />
                <circle cx="22.5" cy="19.5" r="1.8" fill={NOCHE} />
              </svg>
              calcularya.com
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 430, padding: 36, borderRadius: 32, backgroundColor: "rgba(244,240,230,0.06)", border: "1px solid rgba(244,240,230,0.14)" }}>
            <div style={{ display: "flex", fontSize: 22, color: SUAVE, letterSpacing: 2, textTransform: "uppercase" }}>{v.t.og.proxima}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 10 }}>
              <div style={{ display: "flex", fontSize: 132, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>{e.dia}</div>
              <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: VERDE }}>{e.mesCorto}</div>
            </div>
            <div style={{ display: "flex", marginTop: 14, fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>{resumen}</div>
            {e.cambio ? <div style={{ display: "flex", marginTop: 12, fontSize: 24, color: "#a7f3d0" }}>{e.cambio}</div> : null}
            {mas > 0 ? <div style={{ display: "flex", marginTop: 22, fontSize: 22, color: SUAVE }}>{v.t.og.mas(mas)}</div> : null}
          </div>
        </div>
      ),
      { width: 1200, height: 630, headers: fonts.length < pedidas.length ? CABECERAS_INCOMPLETA : CABECERAS, ...(fonts.length ? { fonts } : {}) },
    );
  };
}
