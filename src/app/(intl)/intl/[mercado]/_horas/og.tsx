import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { rellenarHoras, textosHoras, type TextosHoras } from "@/motor/i18n/horas";
import { textosHorasPropio } from "@/motor/i18n/horas-propio";
import { conArticulo, productoDe } from "@/motor/horas/productos";
import type { FilaHoras } from "@/motor/horas/tipos";
import { lugarEnPagina, nombreEnPagina } from "@/motor/horas/ui/datos-cliente";
import { formatoHoras, formatoNumero, formatoPrecioConCodigo, textoJornadas } from "@/motor/horas/ui/formato";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";
import { TextoOg } from "@/motor/ui/og-rtl";
import { indicePublicado } from "./datos";

// Tarjeta del índice: /<m>/<slug>/og?p=<producto>&pais=<ISO> (1200 x 630), &formato=historia (1080 x
// 1920) y &formato=cuadrado (1080 x 1080). Con &h=<décimas> es la tarjeta con las horas propias: llegan
// las horas que cuesta el producto con el sueldo de la persona, nunca el sueldo, y el resto de los
// países sale del índice con la misma proporción sobre el mínimo. Solo acepta p, pais, h y formato;
// cualquier otro parámetro es 404, así nadie llena la caché con variantes. Un país o producto sin dato
// no da error: da la tarjeta del producto con el ranking.

const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.64)";
const VERDE = "#34d399";
const VERDE_APAGADO = "rgba(52,211,153,0.16)";

// Un día en el CDN: la imagen muestra horas que cambian con cada refresco de precios o salario.
const CABECERAS = { "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
const ESPERA_FUENTE_MS = 3000;
// bn con Noto Sans Bengali: Geist no trae la escritura bengalí (ADR 0002, D14).
// uk va con Noto Sans de respaldo por si Geist no trae algún glifo del cirílico (ADR 0002, D15).
// Fuente de respaldo por idioma para los glifos que Geist no tiene: los CJK y la «ʻ» (U+02BB) de oʻ y
// gʻ del uzbeko latino (ADR 0002, D16).
// ru va con Noto Sans de respaldo por si Geist no trae algún glifo del cirílico (ADR 0002, D17).
// ro va con Noto Sans de respaldo por si Geist no trae ș y ț con coma (U+0218 a U+021B; ADR 0002, D18).
// el va con Noto Sans de respaldo: Geist no trae el griego (ADR 0002, D20).
// Geist no trae hebreo: la edición he pide Noto Sans Hebrew, como las CJK piden su Noto.
// bg va con Noto Sans de respaldo por si Geist no trae algún glifo del cirílico (ADR 0002, D24).
const FUENTE_CJK: Partial<Record<Idioma, string>> = { ja: "Noto Sans JP", ko: "Noto Sans KR", zh: "Noto Sans TC", bn: "Noto Sans Bengali", uk: "Noto Sans", uz: "Noto Sans", ru: "Noto Sans", ro: "Noto Sans", el: "Noto Sans", he: "Noto Sans Hebrew", bg: "Noto Sans" };

const fuentes = new Map<string, Promise<ArrayBuffer | null>>();

// Google Fonts con `text=` devuelve solo los glifos usados y, sin User-Agent de navegador, TTF (lo que
// lee Satori). Si falla, la imagen sale igual con la fuente por defecto, pero se guarda poco tiempo.
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

// Las banderas se leen del disco (next.config.ts las suma al trace de /intl/*/*/og), nunca de req.url.
async function banderaDe(iso: string): Promise<string | null> {
  if (!/^[A-Z]{2}$/.test(iso)) return null;
  try {
    const svg = await readFile(path.join(process.cwd(), "public", "banderas", `${iso.toLowerCase()}.svg`));
    return `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch {
    return null;
  }
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

function Bandera({ src, ancho }: { src: string | null; ancho: number }) {
  const alto = Math.round((ancho * 2) / 3);
  return src ? (
    <div style={{ display: "flex", borderRadius: ancho / 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
      <img src={src} width={ancho} height={alto} alt="" />
    </div>
  ) : (
    <div style={{ display: "flex", width: ancho, height: alto, borderRadius: ancho / 8, border: `2px solid ${SUAVE}` }} />
  );
}

interface FilaOg {
  iso: string;
  nombre: string;
  horas: number;
  texto: string;
  pos: number;
  bandera: string | null;
  elegido: boolean;
}

function Ranking({ filas, ancho, tam, t, max, idioma }: { filas: FilaOg[]; ancho: number; tam: number; t: TextosHoras; max: number; idioma: Idioma }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: tam * 0.55, width: ancho }}>
      <div style={{ display: "flex", fontSize: tam * 0.8, color: SUAVE, textTransform: "uppercase", letterSpacing: 2 }}>
        <TextoOg texto={t.og.menos} idioma={idioma} />
      </div>
      {filas.map((f) => (
        <div key={f.iso} style={{ display: "flex", flexDirection: "column", gap: tam * 0.3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: tam * 0.5, fontSize: tam, color: f.elegido ? CREMA : SUAVE, fontWeight: f.elegido ? 700 : 400 }}>
            <div style={{ display: "flex", width: tam * 1.4, color: SUAVE }}>{String(f.pos)}</div>
            <Bandera src={f.bandera} ancho={tam * 1.3} />
            <div style={{ display: "flex", flex: 1 }}>
              <TextoOg texto={f.nombre} idioma={idioma} />
            </div>
            <div style={{ display: "flex", fontWeight: 700, color: f.elegido ? VERDE : CREMA }}>
              <TextoOg texto={f.texto} idioma={idioma} />
            </div>
          </div>
          <div style={{ display: "flex", height: tam * 0.28, borderRadius: 99, backgroundColor: VERDE_APAGADO }}>
            <div style={{ display: "flex", width: `${Math.max(2, (f.horas / max) * 100)}%`, height: "100%", borderRadius: 99, backgroundColor: f.elegido ? VERDE : "rgba(244,240,230,0.55)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const fondo = (ancho: number, alto: number) => ({
  backgroundColor: TINTA,
  backgroundImage: `radial-gradient(circle at ${ancho > alto ? "0% 0%" : "0% 0%"}, rgba(52,211,153,0.28) 0%, rgba(52,211,153,0) 48%), radial-gradient(circle at 100% 100%, rgba(244,240,230,0.08) 0%, rgba(244,240,230,0) 50%)`,
});

interface Datos {
  t: TextosHoras;
  idioma: Idioma;
  antes: string;
  // Segunda línea antes de la cifra, solo en la tarjeta propia («un iPhone 17 me cuesta»).
  antes2: string;
  producto: string;
  horas: number;
  etiquetaRanking: string;
  cta: string;
  numero: string;
  unidad: string;
  despues: string;
  detalle: string;
  generica: string;
  genericaBajada: string;
  familia: string;
  bandera: string | null;
  filas: FilaOg[];
  max: number;
  conPais: boolean;
}

function Horizontal(d: Datos) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", padding: "52px 60px", gap: 48, color: CREMA, fontFamily: d.familia, ...fondo(1200, 630) }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          <Marca tam={40} />
          CalcularYa
        </div>
        {d.conPais ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: SUAVE }}>
              <Bandera src={d.bandera} ancho={40} />
              <div style={{ display: "flex", flex: 1 }}>
              <TextoOg texto={d.antes} idioma={d.idioma} />
            </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 6 }}>
              <div style={{ display: "flex", fontSize: d.numero.length > 5 ? 128 : 160, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>{d.numero}</div>
              <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: VERDE }}>
              <TextoOg texto={d.unidad} idioma={d.idioma} />
            </div>
            </div>
            <div style={{ display: "flex", fontSize: 28 }}>
            <TextoOg texto={d.despues} idioma={d.idioma} />
          </div>
            <div style={{ display: "flex", marginTop: 14, fontSize: 24, color: SUAVE }}>
            <TextoOg texto={d.detalle} idioma={d.idioma} />
          </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 58, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            <TextoOg texto={d.generica} idioma={d.idioma} />
          </div>
            <div style={{ display: "flex", fontSize: 26, color: SUAVE }}>
            <TextoOg texto={d.genericaBajada} idioma={d.idioma} />
          </div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: SUAVE }}>
          <TextoOg texto={`${d.t.og.cta} calcularya.com`} idioma={d.idioma} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Ranking filas={d.filas} ancho={400} tam={22} t={d.t} max={d.max} idioma={d.idioma} />
      </div>
    </div>
  );
}

// Las tarjetas para redes (historia 9:16 y publicación 1:1): un bloque de color lleno con la cifra
// enorme, como un resumen de fin de año, y abajo los países en tinta. Las zonas de arriba y abajo de
// la historia quedan sin texto clave: ahí Instagram pone su barra y la caja de respuesta.
function Fichaje({ horas, celda, hueco, columnas, leyenda }: { horas: number; celda: number; hueco: number; columnas: number; leyenda?: string }) {
  const porHora = horas < 40;
  const total = porHora ? 40 : 52;
  const unidades = porHora ? horas : horas / 40;
  const filas = Math.ceil(total / columnas);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: hueco }}>
      {leyenda ? <div style={{ display: "flex", fontSize: celda * 0.46, color: "rgba(11,17,16,0.62)", marginBottom: hueco }}>{leyenda}</div> : null}
      {Array.from({ length: filas }, (_, f) => (
        <div key={f} style={{ display: "flex", gap: hueco }}>
          {Array.from({ length: Math.min(columnas, total - f * columnas) }, (_, c) => {
            const lleno = Math.max(0, Math.min(1, unidades - (f * columnas + c)));
            return (
              <div key={c} style={{ display: "flex", width: celda, height: celda, borderRadius: celda * 0.22, backgroundColor: "rgba(11,17,16,0.16)", overflow: "hidden" }}>
                <div style={{ display: "flex", width: `${Math.round(lleno * 100)}%`, height: "100%", backgroundColor: TINTA }} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function FilasRedes({ filas, tam, max }: { filas: FilaOg[]; tam: number; max: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: tam * 0.62 }}>
      {filas.map((f) => (
        <div key={f.iso} style={{ display: "flex", flexDirection: "column", gap: tam * 0.28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: tam * 0.55, fontSize: tam, color: f.elegido ? VERDE : CREMA, fontWeight: f.elegido ? 700 : 400 }}>
            <div style={{ display: "flex", width: tam * 1.25, color: SUAVE, fontWeight: 400 }}>{String(f.pos)}</div>
            <Bandera src={f.bandera} ancho={tam * 1.35} />
            <div style={{ display: "flex", flex: 1 }}>{f.nombre}</div>
            <div style={{ display: "flex", fontWeight: 700 }}>{f.texto}</div>
          </div>
          <div style={{ display: "flex", height: tam * 0.22, marginLeft: tam * 1.8, borderRadius: 99, backgroundColor: "rgba(244,240,230,0.1)" }}>
            <div style={{ display: "flex", width: `${Math.max(2, (f.horas / max) * 100)}%`, height: "100%", borderRadius: 99, backgroundColor: f.elegido ? VERDE : "rgba(244,240,230,0.5)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MarcaTinta({ tam, producto }: { tam: number; producto: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: TINTA }}>
      <div style={{ display: "flex", alignItems: "center", gap: tam * 0.4, fontSize: tam, fontWeight: 700 }}>
        <svg width={tam * 1.5} height={tam * 1.5} viewBox="0 0 32 32">
          <rect width="32" height="32" rx="9" fill={TINTA} />
          <path d="M9 12.5h14" stroke={VERDE} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M9 19.5h8.5" stroke={VERDE} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="22.5" cy="19.5" r="1.8" fill={VERDE} />
        </svg>
        CalcularYa
      </div>
      <div style={{ display: "flex", padding: `${tam * 0.28}px ${tam * 0.6}px`, borderRadius: 999, border: `${Math.max(2, tam / 16)}px solid ${TINTA}`, fontSize: tam * 0.72, fontWeight: 700 }}>{producto}</div>
    </div>
  );
}

function Cifra({ d, tam }: { d: Datos; tam: number }) {
  const largo = d.numero.length;
  const grande = largo > 5 ? tam * 0.62 : largo > 3 ? tam * 0.8 : tam;
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: tam * 0.06, color: TINTA }}>
      <div style={{ display: "flex", fontSize: grande, fontWeight: 700, letterSpacing: -grande * 0.055, lineHeight: 0.86 }}>{d.numero}</div>
      <div style={{ display: "flex", fontSize: tam * 0.24, fontWeight: 700 }}><TextoOg texto={d.unidad} idioma={d.idioma} /></div>
    </div>
  );
}

function Historia(d: Datos) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", color: CREMA, fontFamily: d.familia, backgroundColor: TINTA }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 1140,
          padding: "180px 84px 64px",
          borderRadius: "0 0 72px 72px",
          backgroundColor: VERDE,
          backgroundImage: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 0% 100%, rgba(11,17,16,0.14) 0%, rgba(11,17,16,0) 55%)",
          color: TINTA,
        }}
      >
        <MarcaTinta tam={40} producto={d.producto} />
        {d.conPais ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 46, lineHeight: 1.18, fontWeight: 700 }}>
              <Bandera src={d.bandera} ancho={70} />
              <div style={{ display: "flex", flex: 1 }}><TextoOg texto={d.antes} idioma={d.idioma} /></div>
            </div>
            {d.antes2 ? <div style={{ display: "flex", fontSize: 46, lineHeight: 1.18, color: "rgba(11,17,16,0.72)" }}><TextoOg texto={d.antes2} idioma={d.idioma} /></div> : null}
            <Cifra d={d} tam={330} />
            <div style={{ display: "flex", fontSize: 50, fontWeight: 700 }}><TextoOg texto={d.despues} idioma={d.idioma} /></div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}><TextoOg texto={d.generica} idioma={d.idioma} /></div>
            <div style={{ display: "flex", fontSize: 44, color: "rgba(11,17,16,0.72)" }}><TextoOg texto={d.genericaBajada} idioma={d.idioma} /></div>
          </div>
        )}
        {d.conPais ? <Fichaje horas={d.horas} celda={d.horas < 40 ? 50 : 46} hueco={10} columnas={d.horas < 40 ? 10 : 13} leyenda={d.horas < 40 ? d.t.heroe.escalaHoras : d.horas / 40 > 52 ? d.t.heroe.masDeUnAnio : d.t.heroe.escalaSemanas} /> : <div style={{ display: "flex" }} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "60px 84px 230px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", fontSize: 30, color: SUAVE, textTransform: "uppercase", letterSpacing: 3 }}><TextoOg texto={d.etiquetaRanking} idioma={d.idioma} /></div>
          <FilasRedes filas={d.filas.slice(0, 4)} tam={34} max={d.max} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}><TextoOg texto={d.cta} idioma={d.idioma} /></div>
          <div style={{ display: "flex", padding: "16px 30px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 34, fontWeight: 700 }}>calcularya.com</div>
        </div>
      </div>
    </div>
  );
}

function Cuadrado(d: Datos) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", color: CREMA, fontFamily: d.familia, backgroundColor: TINTA }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 690,
          padding: "64px 72px 56px",
          borderRadius: "0 0 56px 56px",
          backgroundColor: VERDE,
          backgroundImage: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)",
          color: TINTA,
        }}
      >
        <MarcaTinta tam={32} producto={d.producto} />
        {d.conPais ? (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 36 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, lineHeight: 1.18, fontWeight: 700 }}>
                <Bandera src={d.bandera} ancho={52} />
                <div style={{ display: "flex", flex: 1 }}><TextoOg texto={d.antes} idioma={d.idioma} /></div>
              </div>
              {d.antes2 ? <div style={{ display: "flex", fontSize: 34, color: "rgba(11,17,16,0.72)" }}><TextoOg texto={d.antes2} idioma={d.idioma} /></div> : null}
              <Cifra d={d} tam={250} />
              <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}><TextoOg texto={d.despues} idioma={d.idioma} /></div>
            </div>
            <Fichaje horas={d.horas} celda={d.horas < 40 ? 30 : 22} hueco={d.horas < 40 ? 8 : 6} columnas={d.horas < 40 ? 5 : 4} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}><TextoOg texto={d.generica} idioma={d.idioma} /></div>
            <div style={{ display: "flex", fontSize: 32, color: "rgba(11,17,16,0.72)" }}><TextoOg texto={d.genericaBajada} idioma={d.idioma} /></div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "40px 72px 48px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 22, color: SUAVE, textTransform: "uppercase", letterSpacing: 2.5 }}><TextoOg texto={d.etiquetaRanking} idioma={d.idioma} /></div>
          <FilasRedes filas={d.filas.slice(0, 3)} tam={28} max={d.max} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", fontWeight: 700 }}><TextoOg texto={d.cta} idioma={d.idioma} /></div>
          <div style={{ display: "flex", color: VERDE, fontWeight: 700 }}>calcularya.com</div>
        </div>
      </div>
    </div>
  );
}

type Props = { params: Promise<{ mercado: string }> };

export function crearOgHoras(idioma: Idioma) {
  return async function GET(req: Request, { params }: Props) {
    const { mercado } = await params;
    const ctx = intlActivo() ? contextoSitio(registro, mercado as CodigoMercado) : null;
    if (!ctx || ctx.mercado.idioma !== idioma) return new Response("No encontrado", { status: 404 });
    const m = ctx.mercado;
    const t = textosHoras(m.idioma, m.trato, m.locale);
    const busqueda = new URL(req.url).searchParams;
    const claves = [...busqueda.keys()].filter((k) => !k.startsWith("nxtP"));
    if (claves.some((k) => k !== "p" && k !== "pais" && k !== "formato" && k !== "h") || claves.length !== new Set(claves).size) return new Response("No encontrado", { status: 404 });
    const formato = busqueda.get("formato");
    if (formato !== null && formato !== "historia" && formato !== "cuadrado") return new Response("No encontrado", { status: 404 });
    const decimas = busqueda.get("h");
    if (decimas !== null && !/^[1-9]\d{0,7}$/.test(decimas)) return new Response("No encontrado", { status: 404 });
    const pedido = busqueda.get("p");
    if (pedido !== null && !productoDe(pedido)) return new Response("No encontrado", { status: 404 });
    const iso = busqueda.get("pais");
    if (iso !== null && !/^[A-Z]{2}$/.test(iso)) return new Response("No encontrado", { status: 404 });

    const { indice, publicacion } = await indicePublicado();
    if (!publicacion.inicial || (pedido !== null && !publicacion.productos.includes(pedido))) return new Response("No encontrado", { status: 404 });
    const producto = productoDe(pedido ?? publicacion.inicial)!;
    const art = conArticulo(producto, m.idioma, m.locale);
    const conProducto = indice.filas.filter((f) => f.celdas[producto.id]).sort((a, b) => a.celdas[producto.id].horas - b.celdas[producto.id].horas);
    const fila: FilaHoras | undefined = iso ? conProducto.find((f) => f.iso === iso) : undefined;
    const celda = fila?.celdas[producto.id];
    const historia = formato === "historia";
    const cuadrado = formato === "cuadrado";
    const nombre = (x: string) => nombreEnPagina(x, m.idioma, m.locale);
    // Cuántas veces el mínimo es el sueldo de la persona, deducido de sus horas: sin país no hay tarjeta propia.
    const ratio = celda && decimas ? celda.horas / (Number(decimas) / 10) : null;
    const tp = textosHorasPropio(m.idioma, m.trato, m.locale);
    const horasDe = (f: FilaHoras) => f.celdas[producto.id].horas / (ratio ?? 1);

    const tope = historia ? 4 : cuadrado ? 3 : 5;
    const elegidos = conProducto.slice(0, tope);
    if (fila && !elegidos.includes(fila)) elegidos.splice(tope - 1, 1, fila);
    const filas: FilaOg[] = await Promise.all(
      elegidos.map(async (f) => ({
        iso: f.iso,
        nombre: nombre(f.iso),
        horas: horasDe(f),
        texto: formatoHoras(m.locale, horasDe(f)).texto,
        pos: conProducto.indexOf(f) + 1,
        bandera: await banderaDe(f.iso),
        elegido: f === fila,
      })),
    );
    const max = Math.max(...filas.map((f) => f.horas), 1);
    const horas = celda && fila ? formatoHoras(m.locale, horasDe(fila)) : null;
    const nombrePais = fila ? nombre(fila.iso) : "";
    const bandera = fila ? await banderaDe(fila.iso) : null;
    const cjk = FUENTE_CJK[m.idioma];
    const familiaCjk = cjk && m.idioma === "zh" && /^zh-(CN|SG)/i.test(m.locale) ? "Noto Sans SC" : cjk;
    // La ceja en mayúsculas sale de toLocaleUpperCase con el locale (en griego, sin tonos) y no del
    // textTransform de Satori, que no sabe el idioma; así también entra en el subconjunto de la fuente.
    const datos: Datos = {
      t,
      idioma: m.idioma,
      antes: !fila ? "" : ratio ? rellenarHoras(tp.og.antes, { en: lugarEnPagina(nombrePais, m.idioma) }) : rellenarHoras(t.heroe.antes, { en: lugarEnPagina(nombrePais, m.idioma), producto: art }),
      antes2: fila && ratio ? rellenarHoras(tp.og.producto, { producto: art }) : "",
      producto: producto.nombre,
      horas: fila && celda ? horasDe(fila) : 0,
      etiquetaRanking: ratio ? tp.og.otros : t.og.menos,
      cta: tp.og.cta,
      numero: horas?.numero ?? "",
      unidad: horas?.unidad ?? "",
      despues: ratio ? (producto.periodo === "mes" ? tp.og.deMes : tp.og.de) : producto.periodo === "mes" ? t.og.deMes : t.og.de,
      detalle: celda && fila ? `${textoJornadas({ uno: t.heroe.jornadaUno, otras: t.heroe.jornadaOtras }, m.locale, celda.horas)} · ${formatoPrecioConCodigo(m.locale, celda.precio.monto, celda.precio.moneda)}` : "",
      generica: rellenarHoras(t.og.generica, { producto: art }),
      genericaBajada: rellenarHoras(t.og.genericaBajada, { n: formatoNumero(m.locale, conProducto.length) }),
      familia: familiaCjk ? `Geist, "${familiaCjk}"` : "Geist",
      bandera,
      filas,
      max,
      conPais: Boolean(celda),
    };

    const texto = [
      "CalcularYa calcularya.com 0123456789%.,·",
      datos.antes,
      datos.antes2,
      datos.producto,
      datos.etiquetaRanking,
      datos.cta,
      datos.numero,
      datos.unidad,
      datos.despues,
      datos.detalle,
      datos.generica,
      datos.genericaBajada,
      t.og.cta,
      t.og.menos,
      t.heroe.escalaHoras,
      t.heroe.escalaSemanas,
      t.heroe.masDeUnAnio,
      ...filas.map((f) => `${f.nombre} ${f.texto}`),
    ].join(" ");
    const unicos = [...new Set(texto)].join("");
    const pedidas = await Promise.all([
      fuente("Geist", 400, unicos),
      fuente("Geist", 700, unicos),
      ...(familiaCjk ? [fuente(familiaCjk, 400, unicos), fuente(familiaCjk, 700, unicos)] : []),
    ]);
    const nombres = ["Geist", "Geist", familiaCjk, familiaCjk];
    const pesos = [400, 700, 400, 700] as const;
    const fonts = pedidas.flatMap((data, i) => (data ? [{ name: nombres[i]!, data, weight: pesos[i], style: "normal" as const }] : []));
    const incompleta = fonts.length < pedidas.length || filas.some((f) => !f.bandera) || (fila && !bandera);
    return new ImageResponse(historia ? <Historia {...datos} /> : cuadrado ? <Cuadrado {...datos} /> : <Horizontal {...datos} />, {
      width: historia || cuadrado ? 1080 : 1200,
      height: historia ? 1920 : cuadrado ? 1080 : 630,
      headers: incompleta ? CABECERAS_INCOMPLETA : CABECERAS,
      ...(fonts.length ? { fonts } : {}),
    });
  };
}
