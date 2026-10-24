import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { rellenarHoras, textosHoras, type TextosHoras } from "@/motor/i18n/horas";
import { conArticulo, productoDe } from "@/motor/horas/productos";
import type { FilaHoras } from "@/motor/horas/tipos";
import { lugarEnPagina, nombreEnPagina } from "@/motor/horas/ui/datos-cliente";
import { formatoHoras, formatoNumero, formatoPrecioConCodigo, textoJornadas } from "@/motor/horas/ui/formato";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";
import { indicePublicado } from "./datos";

// Tarjeta del índice: /<m>/<slug>/og?p=<producto>&pais=<ISO> (1200 x 630) y &formato=historia (1080 x
// 1920). Son datos públicos (precio oficial y horas), nunca algo de la persona. Solo acepta p, pais y
// formato; cualquier otro parámetro es 404, así nadie llena la caché con variantes. Un país o producto
// sin dato no da error: da la tarjeta del producto con el ranking.

const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.64)";
const VERDE = "#34d399";
const VERDE_APAGADO = "rgba(52,211,153,0.16)";

// Un día en el CDN: la imagen muestra horas que cambian con cada refresco de precios o salario.
const CABECERAS = { "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
const ESPERA_FUENTE_MS = 3000;
// ru va con Noto Sans de respaldo por si Geist no trae algún glifo del cirílico (ADR 0002, D17).
const FUENTE_CJK: Partial<Record<Idioma, string>> = { ja: "Noto Sans JP", ko: "Noto Sans KR", zh: "Noto Sans TC", ru: "Noto Sans" };

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

function Ranking({ filas, ancho, tam, t, max }: { filas: FilaOg[]; ancho: number; tam: number; t: TextosHoras; max: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: tam * 0.55, width: ancho }}>
      <div style={{ display: "flex", fontSize: tam * 0.8, color: SUAVE, textTransform: "uppercase", letterSpacing: 2 }}>{t.og.menos}</div>
      {filas.map((f) => (
        <div key={f.iso} style={{ display: "flex", flexDirection: "column", gap: tam * 0.3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: tam * 0.5, fontSize: tam, color: f.elegido ? CREMA : SUAVE, fontWeight: f.elegido ? 700 : 400 }}>
            <div style={{ display: "flex", width: tam * 1.4, color: SUAVE }}>{String(f.pos)}</div>
            <Bandera src={f.bandera} ancho={tam * 1.3} />
            <div style={{ display: "flex", flex: 1 }}>{f.nombre}</div>
            <div style={{ display: "flex", fontWeight: 700, color: f.elegido ? VERDE : CREMA }}>{f.texto}</div>
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
  antes: string;
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
              <div style={{ display: "flex", flex: 1 }}>{d.antes}</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 6 }}>
              <div style={{ display: "flex", fontSize: d.numero.length > 5 ? 128 : 160, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>{d.numero}</div>
              <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: VERDE }}>{d.unidad}</div>
            </div>
            <div style={{ display: "flex", fontSize: 28 }}>{d.despues}</div>
            <div style={{ display: "flex", marginTop: 14, fontSize: 24, color: SUAVE }}>{d.detalle}</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 58, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{d.generica}</div>
            <div style={{ display: "flex", fontSize: 26, color: SUAVE }}>{d.genericaBajada}</div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: SUAVE }}>{`${d.t.og.cta} calcularya.com`}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Ranking filas={d.filas} ancho={400} tam={22} t={d.t} max={d.max} />
      </div>
    </div>
  );
}

function Historia(d: Datos) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "200px 84px 220px", color: CREMA, fontFamily: d.familia, ...fondo(1080, 1920) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
        <Marca tam={60} />
        CalcularYa
      </div>
      {d.conPais ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 46, color: SUAVE, lineHeight: 1.2 }}>
            <Bandera src={d.bandera} ancho={64} />
            <div style={{ display: "flex", flex: 1 }}>{d.antes}</div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginTop: 10 }}>
            <div style={{ display: "flex", fontSize: d.numero.length > 5 ? 220 : 280, fontWeight: 700, letterSpacing: -10, lineHeight: 0.95 }}>{d.numero}</div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: VERDE }}>{d.unidad}</div>
          </div>
          <div style={{ display: "flex", fontSize: 46 }}>{d.despues}</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 38, color: SUAVE }}>{d.detalle}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 100, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>{d.generica}</div>
          <div style={{ display: "flex", fontSize: 44, color: SUAVE }}>{d.genericaBajada}</div>
        </div>
      )}
      <Ranking filas={d.filas} ancho={912} tam={38} t={d.t} max={d.max} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", padding: "18px 34px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 40, fontWeight: 700 }}>calcularya.com</div>
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
    if (claves.some((k) => k !== "p" && k !== "pais" && k !== "formato") || claves.length !== new Set(claves).size) return new Response("No encontrado", { status: 404 });
    const formato = busqueda.get("formato");
    if (formato !== null && formato !== "historia") return new Response("No encontrado", { status: 404 });
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
    const nombre = (x: string) => nombreEnPagina(x, m.idioma, m.locale);

    const tope = historia ? 6 : 5;
    const elegidos = conProducto.slice(0, tope);
    if (fila && !elegidos.includes(fila)) elegidos.splice(tope - 1, 1, fila);
    const filas: FilaOg[] = await Promise.all(
      elegidos.map(async (f) => ({
        iso: f.iso,
        nombre: nombre(f.iso),
        horas: f.celdas[producto.id].horas,
        texto: formatoHoras(m.locale, f.celdas[producto.id].horas).texto,
        pos: conProducto.indexOf(f) + 1,
        bandera: await banderaDe(f.iso),
        elegido: f === fila,
      })),
    );
    const max = Math.max(...filas.map((f) => f.horas), 1);
    const horas = celda ? formatoHoras(m.locale, celda.horas) : null;
    const nombrePais = fila ? nombre(fila.iso) : "";
    const bandera = fila ? await banderaDe(fila.iso) : null;
    const cjk = FUENTE_CJK[m.idioma];
    const familiaCjk = cjk && m.idioma === "zh" && /^zh-(CN|SG)/i.test(m.locale) ? "Noto Sans SC" : cjk;
    const datos: Datos = {
      t,
      antes: fila ? rellenarHoras(t.heroe.antes, { en: lugarEnPagina(nombrePais, m.idioma), producto: art }) : "",
      numero: horas?.numero ?? "",
      unidad: horas?.unidad ?? "",
      despues: producto.periodo === "mes" ? t.og.deMes : t.og.de,
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
      datos.numero,
      datos.unidad,
      datos.despues,
      datos.detalle,
      datos.generica,
      datos.genericaBajada,
      t.og.cta,
      t.og.menos,
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
    return new ImageResponse(historia ? <Historia {...datos} /> : <Horizontal {...datos} />, {
      width: historia ? 1080 : 1200,
      height: historia ? 1920 : 630,
      headers: incompleta ? CABECERAS_INCOMPLETA : CABECERAS,
      ...(fonts.length ? { fonts } : {}),
    });
  };
}
