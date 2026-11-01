import { ImageResponse } from "next/og";
import { grillaMundo } from "@/lib/mundo/grilla";
import { hoyAR } from "@/lib/hoy";
import { textosMundo } from "@/motor/i18n/mundo";
import { decodificarCarga, diaDeCarga } from "@/motor/mundo/calculo";
import type { CargaCompartida, GrillaMundo } from "@/motor/mundo/tipos";

// Tarjeta de «Tu sueldo en el mundo» en calcular.ar: /sueldo-en-el-mundo/og (1200 x 630, la vista previa
// del link) y ?formato=historia (1080 x 1920, Stories). Mismo contrato que la de calcularya
// (src/app/(intl)/intl/[mercado]/_mundo/og.tsx): lee solo `c` (porcentajes y países, nunca un monto) y
// `formato`, y cualquier otro parámetro es 404 para que nadie llene la caché con variantes. Un `c`
// inválido da la tarjeta genérica.

const LOCALE = "es-AR";
const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.62)";
const VERDE = "#34d399";
const VERDE_SUAVE = "rgba(52,211,153,0.22)";
const CABECERAS = { "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
const ESPERA_MS = 3000;

const t = textosMundo("es", "vos", LOCALE);
const fuentes = new Map<string, Promise<ArrayBuffer | null>>();

// Google Fonts con `text=` devuelve solo los glifos usados y, sin User-Agent de navegador, TTF (lo que lee
// Satori). Si falla, la imagen sale con la fuente por defecto y con caché corta.
function fuente(peso: number, texto: string): Promise<ArrayBuffer | null> {
  const clave = `${peso}:${texto}`;
  let p = fuentes.get(clave);
  if (!p) {
    p = (async () => {
      try {
        const css = await fetch(`https://fonts.googleapis.com/css2?family=Geist:wght@${peso}&text=${encodeURIComponent(texto)}`, { signal: AbortSignal.timeout(ESPERA_MS) });
        if (!css.ok) return null;
        const url = (await css.text()).match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!url) return null;
        const r = await fetch(url, { signal: AbortSignal.timeout(ESPERA_MS) });
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

function Marca({ tam }: { tam: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 512 512">
      <defs>
        <linearGradient id="t" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="116" fill="url(#t)" />
      <rect x="136" y="186" width="240" height="58" rx="29" fill="#ffffff" />
      <rect x="136" y="268" width="240" height="58" rx="29" fill="#ffffff" />
    </svg>
  );
}

function Anio({ dia, anio, celda, hueco }: { dia: number; anio: number; celda: number; hueco: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: hueco }}>
      {Array.from({ length: 12 }, (_, m) => {
        const dias = new Date(Date.UTC(anio, m + 1, 0)).getUTCDate();
        const inicio = Math.round((Date.UTC(anio, m, 1) - Date.UTC(anio, 0, 1)) / 86400000);
        return (
          <div key={m} style={{ display: "flex", gap: hueco }}>
            {Array.from({ length: dias }, (_, d) => {
              const n = inicio + d + 1;
              const estilo =
                n < dia ? { backgroundColor: CREMA } : n === dia ? { backgroundColor: VERDE, boxShadow: `0 0 0 ${Math.round(celda / 3)}px rgba(52,211,153,0.35)` } : { backgroundColor: VERDE_SUAVE };
              return <div key={d} style={{ display: "flex", width: celda, height: celda, borderRadius: celda, ...estilo }} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

const fondo = (horizontal: boolean) => ({
  backgroundColor: TINTA,
  backgroundImage: `radial-gradient(circle at ${horizontal ? "88% 0%" : "100% 0%"}, rgba(52,211,153,0.30) 0%, rgba(52,211,153,0) 46%), radial-gradient(circle at 0% 100%, rgba(244,240,230,0.08) 0%, rgba(244,240,230,0) 50%)`,
});

interface Datos {
  carga: CargaCompartida | null;
  anio: number;
  dia: number;
  fecha: string;
  tasaLinea: string;
  hasta: [string, string];
  paises: number;
}

function Horizontal({ carga, anio, dia, fecha, tasaLinea, hasta, paises }: Datos) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", padding: "56px 64px", color: CREMA, fontFamily: "Geist", ...fondo(true) }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          <Marca tam={40} />
          CalculAR
        </div>
        {carga ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, color: SUAVE }}>{hasta[0]}</div>
            <div style={{ display: "flex", fontSize: fecha.length > 12 ? 92 : 116, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>{fecha}</div>
            {hasta[1] ? <div style={{ display: "flex", fontSize: 30, color: SUAVE }}>{hasta[1]}</div> : null}
            <div style={{ display: "flex", marginTop: 18, fontSize: 30, color: VERDE, fontWeight: 700 }}>{tasaLinea}</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{t.tarjeta.generica}</div>
            <div style={{ display: "flex", fontSize: 28, color: SUAVE }}>{t.tarjeta.genericaBajada(paises)}</div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          {carga ? null : <div style={{ display: "flex", maxWidth: 560 }}>{`${t.tarjeta.cta} calcular.ar`}</div>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: 22 }}>
        <Anio dia={carga ? dia : 138} anio={anio} celda={11} hueco={4} />
        {carga ? (
          <div style={{ display: "flex", padding: "10px 20px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 24, fontWeight: 700 }}>{`${t.tarjeta.yVos} calcular.ar`}</div>
        ) : null}
      </div>
    </div>
  );
}

function Historia({ carga, anio, dia, fecha, tasaLinea, hasta, paises }: Datos) {
  const tamFecha = fecha.length <= 8 ? 210 : fecha.length <= 12 ? 172 : 136;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "220px 84px 230px", color: CREMA, fontFamily: "Geist", ...fondo(false) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
        <Marca tam={60} />
        CalculAR
      </div>
      {carga ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 50, color: SUAVE, lineHeight: 1.2 }}>{hasta[0]}</div>
          <div style={{ display: "flex", fontSize: tamFecha, fontWeight: 700, letterSpacing: -7, lineHeight: 0.98, marginTop: 10 }}>{fecha}</div>
          {hasta[1] ? <div style={{ display: "flex", fontSize: 50, color: SUAVE }}>{hasta[1]}</div> : null}
          <div style={{ display: "flex", marginTop: 34, fontSize: 52, color: VERDE, fontWeight: 700 }}>{tasaLinea}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>{t.tarjeta.generica}</div>
          <div style={{ display: "flex", fontSize: 44, color: SUAVE }}>{t.tarjeta.genericaBajada(paises)}</div>
        </div>
      )}
      <div style={{ display: "flex" }}>
        <Anio dia={carga ? dia : 138} anio={anio} celda={22} hueco={8} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>{carga ? t.tarjeta.yVos : t.tarjeta.cta}</div>
        <div style={{ display: "flex", padding: "18px 34px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 40, fontWeight: 700 }}>calcular.ar</div>
      </div>
    </div>
  );
}

function partir(f: (fecha: string) => string): [string, string] {
  const [a = "", d = ""] = f("\u0006").split("\u0006");
  return [a.trim(), d.trim()];
}

function grilla(): GrillaMundo {
  try {
    return grillaMundo();
  } catch (err) {
    console.error("[og mundo ar] grilla", err);
    return { version: 1, generadoEl: "", fuentePpa: { organismo: "", indicador: "", url: "", consultadoEl: "", anio: 0 }, paises: [] };
  }
}

export async function GET(req: Request) {
  const busqueda = new URL(req.url).searchParams;
  const claves = [...busqueda.keys()].filter((k) => !k.startsWith("nxtP"));
  if (claves.some((k) => k !== "c" && k !== "formato") || busqueda.getAll("c").length > 1 || busqueda.getAll("formato").length > 1) return new Response("No encontrado", { status: 404 });
  const formato = busqueda.get("formato");
  if (formato !== null && formato !== "historia") return new Response("No encontrado", { status: 404 });
  const historia = formato === "historia";

  const g = grilla();
  const anio = Number(hoyAR().slice(0, 4));
  const carga = decodificarCarga(busqueda.get("c"), g);
  const dia = carga ? diaDeCarga(carga, anio) : 0;
  const cero = carga?.tasa === 0;
  const pct = (n: number) => new Intl.NumberFormat(LOCALE, { style: "percent", maximumFractionDigits: 0 }).format(n / 100);
  const fecha = !carga ? "" : cero ? t.cero.dia : new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(anio, 0, dia)));
  const datos: Datos = {
    carga,
    anio,
    dia,
    fecha,
    tasaLinea: !carga ? "" : cero ? t.cero.motivo : t.tarjeta.tasa(pct(carga.tasa)),
    hasta: cero ? [t.cero.tarjetaAntes, ""] : partir(t.tarjeta.hasta),
    paises: g.paises.length,
  };

  const texto = ["CalculAR calcular.ar 0123456789%.,", datos.hasta.join(" "), fecha, datos.tasaLinea, t.tarjeta.yVos, t.tarjeta.cta, t.tarjeta.generica, t.tarjeta.genericaBajada(datos.paises)].join(" ");
  const unicos = [...new Set(texto)].join("");
  const pedidas = await Promise.all([fuente(400, unicos), fuente(700, unicos)]);
  const pesos = [400, 700] as const;
  const fonts = pedidas.flatMap((data, i) => (data ? [{ name: "Geist", data, weight: pesos[i], style: "normal" as const }] : []));

  return new ImageResponse(historia ? <Historia {...datos} /> : <Horizontal {...datos} />, {
    width: historia ? 1080 : 1200,
    height: historia ? 1920 : 630,
    headers: fonts.length < pedidas.length ? CABECERAS_INCOMPLETA : CABECERAS,
    ...(fonts.length ? { fonts } : {}),
  });
}
