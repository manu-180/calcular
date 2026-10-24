import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { textosRankings } from "@/motor/i18n/rankings";
import { esIdRanking, esVariante } from "@/motor/rankings/calculo";
import { altosFranja } from "@/motor/rankings/franja";
import { intlActivo } from "@/motor/sitio";
import type { Idioma } from "@/motor/tipos";
import { BanderaPlana } from "@/motor/ui/BanderaPlana";
import { resolverRankings } from "./datos";

// Gráfico de un ranking: /<m>/<índice>/og?r=<ranking>&v=<variante> (1200 x 630, la vista previa del
// link) y &formato=alta (2400 x 1260, el «Descargar el gráfico» del kit de prensa). Solo lee r, v y
// formato; cualquier otro parámetro es 404, así nadie llena la caché con variantes. Vive debajo del
// índice y no de cada ranking: next.config.ts suma las banderas al trace de "/intl/*/*/og".

const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.62)";
const TENUE = "rgba(244,240,230,0.2)";
const VERDE = "#34d399";

const CABECERAS = { "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
const ESPERA_FUENTE_MS = 3000;
// bn con Noto Sans Bengali: Geist no trae la escritura bengalí (ADR 0002, D14).
const FUENTE_CJK: Partial<Record<Idioma, string>> = { ja: "Noto Sans JP", ko: "Noto Sans KR", zh: "Noto Sans TC", bn: "Noto Sans Bengali" };

const fuentes = new Map<string, Promise<ArrayBuffer | null>>();

// Google Fonts con `text=` devuelve solo los glifos usados; sin User-Agent de navegador manda TTF, que
// es lo que lee Satori. Si falla, la imagen sale con la fuente por defecto y se cachea poco.
function fuente(familia: string, peso: number, texto: string): Promise<ArrayBuffer | null> {
  const clave = `${familia}:${peso}:${texto}`;
  let p = fuentes.get(clave);
  if (!p) {
    p = (async () => {
      try {
        const pedido = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(familia)}:wght@${peso}&text=${encodeURIComponent(texto)}`, { signal: AbortSignal.timeout(ESPERA_FUENTE_MS) });
        if (!pedido.ok) return null;
        const url = (await pedido.text()).match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!url) return null;
        const r = await fetch(url, { signal: AbortSignal.timeout(ESPERA_FUENTE_MS) });
        return r.ok ? await r.arrayBuffer() : null;
      } catch {
        return null;
      }
    })();
    p.then((x) => {
      if (!x) fuentes.delete(clave);
    });
    if (fuentes.size > 200) fuentes.clear();
    fuentes.set(clave, p);
  }
  return p;
}

// Del disco, nunca de req.url (el host lo pone quien pide).
async function banderaDe(iso: string): Promise<string | null> {
  if (!/^[A-Z]{2}$/.test(iso)) return null;
  try {
    const svg = await readFile(path.join(process.cwd(), "public", "banderas", `${iso.toLowerCase()}.svg`));
    return `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch {
    return null;
  }
}

function Bandera({ iso, ancho, src }: { iso: string; ancho: number; src: string | null }) {
  const alto = Math.round((ancho * 2) / 3);
  const marco = { display: "flex", borderRadius: ancho / 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" } as const;
  if (src) {
    return (
      <div style={marco}>
        <img src={src} width={ancho} height={alto} alt="" />
      </div>
    );
  }
  const dibujo = BanderaPlana({ pais: iso, ancho });
  if (dibujo) return <div style={marco}>{dibujo}</div>;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: ancho, height: alto, borderRadius: ancho / 8, border: `2px solid ${VERDE}`, color: VERDE, fontSize: ancho * 0.32, fontWeight: 700 }}>
      {iso}
    </div>
  );
}

function Marca({ tam }: { tam: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill={VERDE} />
      <path d="M9 12.5h14" stroke={TINTA} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 19.5h8.5" stroke={TINTA} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="22.5" cy="19.5" r="1.8" fill={TINTA} />
    </svg>
  );
}

const no = () => new Response("No encontrado", { status: 404 });

type Props = { params: Promise<{ mercado: string }> };

export function crearOgRankings(idioma: Idioma) {
  return async function GET(req: Request, { params }: Props) {
    if (!intlActivo()) return no();
    const { mercado } = await params;
    const q = new URL(req.url).searchParams;
    const claves = [...q.keys()].filter((k) => !k.startsWith("nxtP"));
    if (claves.some((k) => k !== "r" && k !== "v" && k !== "formato") || ["r", "v", "formato"].some((k) => q.getAll(k).length > 1)) return no();
    const id = q.get("r");
    const formato = q.get("formato");
    if (!esIdRanking(id) || (formato !== null && formato !== "alta")) return no();
    const variante = q.get("v");
    if (!esVariante(id, variante)) return no();

    const r = await resolverRankings(idioma, mercado);
    const vista = r?.vistas.find((x) => x.id === id);
    const v = vista?.variantes.find((x) => x.id === variante);
    if (!r || !vista || !v) return no();
    const m = r.ctx.mercado;
    const t = textosRankings(m.idioma, m.trato, m.locale);
    const d = v.destacado;
    const k = formato === "alta" ? 2 : 1;
    const bandera = await banderaDe(d.iso);
    const cjk = FUENTE_CJK[m.idioma];
    const familiaCjk = cjk && m.idioma === "zh" && /^zh-(CN|SG)/i.test(m.locale) ? "Noto Sans SC" : cjk;

    const texto = ["CalcularYa calcularya.com 0123456789%.,:/()", vista.corto, v.etiqueta, v.sub, d.nombre, t.de(d.total), d.valor, d.detalle, v.referencia, t.actualizado(vista.fecha)].join(" ");
    const unicos = [...new Set(texto)].join("");
    const pedidas = await Promise.all([fuente("Geist", 500, unicos), fuente("Geist", 700, unicos), ...(familiaCjk ? [fuente(familiaCjk, 500, unicos), fuente(familiaCjk, 700, unicos)] : [])]);
    const nombres = ["Geist", "Geist", familiaCjk, familiaCjk];
    const pesos = [500, 700, 500, 700] as const;
    const fonts = pedidas.flatMap((data, i) => (data ? [{ name: nombres[i]!, data, weight: pesos[i], style: "normal" as const }] : []));
    const familia = familiaCjk ? `Geist, "${familiaCjk}"` : "Geist";
    const tamPuesto = d.puesto >= 100 ? 190 : 236;

    const elemento = (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: `${52 * k}px ${60 * k}px ${48 * k}px`,
          color: CREMA,
          fontFamily: familia,
          backgroundColor: TINTA,
          backgroundImage: "radial-gradient(circle at 92% 0%, rgba(52,211,153,0.26) 0%, rgba(52,211,153,0) 48%), radial-gradient(circle at 0% 100%, rgba(244,240,230,0.07) 0%, rgba(244,240,230,0) 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 * k, fontSize: 26 * k, fontWeight: 700 }}>
            <Marca tam={38 * k} />
            CalcularYa
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 * k, padding: `${8 * k}px ${18 * k}px`, borderRadius: 999, border: `${1 * k}px solid rgba(244,240,230,0.18)`, fontSize: 20 * k, color: SUAVE }}>
            <div style={{ display: "flex", color: CREMA, fontWeight: 700 }}>{vista.corto}</div>
            <div style={{ display: "flex" }}>{`${v.etiqueta} · ${v.sub}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 * k }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 * k }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 * k, fontSize: 34 * k, fontWeight: 700 }}>
              <Bandera iso={d.iso} ancho={48 * k} src={bandera} />
              <div style={{ display: "flex" }}>{d.nombre}</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 * k, marginTop: 6 * k }}>
              <div style={{ display: "flex", fontSize: tamPuesto * k, fontWeight: 700, letterSpacing: -12 * k, lineHeight: 1 }}>{String(d.puesto)}</div>
              <div style={{ display: "flex", fontSize: 40 * k, color: SUAVE, fontWeight: 500 }}>{t.de(d.total)}</div>
            </div>
            <div style={{ display: "flex", fontSize: 30 * k, color: VERDE, fontWeight: 700 }}>{d.valor}</div>
            <div style={{ display: "flex", marginTop: 6 * k, fontSize: 22 * k, color: SUAVE }}>{d.detalle}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", width: 470 * k, gap: 12 * k }}>
            <div style={{ display: "flex", alignItems: "flex-end", height: 300 * k, gap: Math.max(2, 3 * k) }}>
              {altosFranja(v.filas).map((h, i) => (
                <div
                  key={v.filas[i].iso}
                  style={{
                    display: "flex",
                    flex: 1,
                    height: `${Math.round(h * 100)}%`,
                    borderRadius: 2 * k,
                    backgroundColor: v.filas[i].iso === d.iso ? VERDE : TENUE,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18 * k, color: SUAVE }}>
              <div style={{ display: "flex" }}>1</div>
              <div style={{ display: "flex" }}>{String(d.total)}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20 * k, color: SUAVE }}>
          <div style={{ display: "flex", maxWidth: 640 * k }}>{v.referencia}</div>
          <div style={{ display: "flex", gap: 16 * k }}>
            <div style={{ display: "flex" }}>{t.actualizado(vista.fecha)}</div>
            <div style={{ display: "flex", color: CREMA, fontWeight: 700 }}>calcularya.com</div>
          </div>
        </div>
      </div>
    );

    return new ImageResponse(elemento, {
      width: 1200 * k,
      height: 630 * k,
      headers: (!bandera && !BanderaPlana({ pais: d.iso, ancho: 10 })) || fonts.length < pedidas.length ? CABECERAS_INCOMPLETA : CABECERAS,
      ...(fonts.length ? { fonts } : {}),
    });
  };
}
