import { ImageResponse } from "next/og";
import { textosMundo, type TextosMundo } from "@/motor/i18n/mundo";
import { decodificarCarga } from "@/motor/mundo/calculo";
import type { CargaCompartida } from "@/motor/mundo/tipos";
import { intlActivo } from "@/motor/sitio";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { BanderaPlana } from "@/motor/ui/BanderaPlana";
import { contextoSitio } from "@/motor/ui/contexto";
import { nombreDePais } from "@/motor/ui/paises";
import { registro } from "@/paises";
import { grillaPublicada } from "./datos";

// Tarjeta de «Tu sueldo en el mundo»: /<m>/<slug>/og (1200 x 630, la vista previa del link) y
// ?formato=historia (1080 x 1920, la que se sube a Stories). Lee solo `c`: porcentaje, día y país,
// nunca un monto. Un `c` inválido no da error: da la tarjeta genérica, así un link roto igual se ve bien.

const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.62)";
const VERDE = "#34d399";
const VERDE_SUAVE = "rgba(52,211,153,0.22)";

const CABECERAS = { "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" };

const FUENTE_CJK: Partial<Record<Idioma, string>> = { ja: "Noto Sans JP", ko: "Noto Sans KR", zh: "Noto Sans TC" };

const fuentes = new Map<string, Promise<ArrayBuffer | null>>();

// Google Fonts con `text=` devuelve solo los glifos usados; sin User-Agent de navegador manda TTF, que es
// lo que lee Satori (no woff2). Si falla, Satori usa su fuente por defecto y la imagen sale igual.
function fuente(familia: string, peso: number, texto: string): Promise<ArrayBuffer | null> {
  const clave = `${familia}:${peso}:${texto}`;
  let p = fuentes.get(clave);
  if (!p) {
    p = (async () => {
      try {
        const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(familia)}:wght@${peso}&text=${encodeURIComponent(texto)}`)).text();
        const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
        if (!url) return null;
        const r = await fetch(url);
        return r.ok ? await r.arrayBuffer() : null;
      } catch {
        return null;
      }
    })();
    if (fuentes.size > 200) fuentes.clear();
    fuentes.set(clave, p);
  }
  return p;
}

function fechaLarga(dia: number, anio: number, locale: string): string {
  const d = new Date(Date.UTC(anio, 0, dia));
  const texto = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(d);
  return locale.toLowerCase().startsWith("fr") && d.getUTCDate() === 1 ? texto.replace(/^1(?=\s)/, "1er") : texto;
}

function partir(f: (fecha: string) => string): [string, string] {
  const [a = "", d = ""] = f("\u0006").split("\u0006");
  return [a.trim(), d.trim()];
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

function BanderaOChip({ iso, ancho }: { iso: string; ancho: number }) {
  const dibujo = BanderaPlana({ pais: iso, ancho });
  if (dibujo) {
    return <div style={{ display: "flex", borderRadius: ancho / 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{dibujo}</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: ancho,
        height: (ancho * 2) / 3,
        borderRadius: ancho / 8,
        border: `2px solid ${VERDE}`,
        color: VERDE,
        fontSize: ancho * 0.32,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      {iso}
    </div>
  );
}

// El año en puntos: 12 filas (meses) de hasta 31. Hasta el día de libertad, crema; ese día, verde con
// halo; después, verde apagado.
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
                n < dia
                  ? { backgroundColor: CREMA }
                  : n === dia
                    ? { backgroundColor: VERDE, boxShadow: `0 0 0 ${Math.round(celda / 3)}px rgba(52,211,153,0.35)` }
                    : { backgroundColor: VERDE_SUAVE };
              return <div key={d} style={{ display: "flex", width: celda, height: celda, borderRadius: celda, ...estilo }} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

const fondo = (ancho: number, alto: number) => ({
  backgroundColor: TINTA,
  backgroundImage: `radial-gradient(circle at ${ancho > alto ? "88% 0%" : "100% 0%"}, rgba(52,211,153,0.30) 0%, rgba(52,211,153,0) 46%), radial-gradient(circle at 0% 100%, rgba(244,240,230,0.08) 0%, rgba(244,240,230,0) 50%)`,
});

interface Datos {
  t: TextosMundo;
  carga: CargaCompartida | null;
  anio: number;
  fecha: string;
  tasa: string;
  frase: string;
  hasta: [string, string];
  paises: number;
  familia: string;
}

function Horizontal({ t, carga, anio, fecha, tasa, frase, hasta, paises, familia }: Datos) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", padding: "56px 64px", color: CREMA, fontFamily: familia, ...fondo(1200, 630) }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          <Marca tam={40} />
          CalcularYa
        </div>
        {carga ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, color: SUAVE }}>{hasta[0]}</div>
            <div style={{ display: "flex", fontSize: fecha.length > 12 ? 92 : 116, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>{fecha}</div>
            {hasta[1] ? <div style={{ display: "flex", fontSize: 30, color: SUAVE }}>{hasta[1]}</div> : null}
            <div style={{ display: "flex", marginTop: 18, fontSize: 30, color: VERDE, fontWeight: 700 }}>{t.tarjeta.tasa(tasa)}</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{t.tarjeta.generica}</div>
            <div style={{ display: "flex", fontSize: 28, color: SUAVE }}>{t.tarjeta.genericaBajada(paises)}</div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          {carga ? <BanderaOChip iso={carga.mejor} ancho={42} /> : null}
          <div style={{ display: "flex", maxWidth: 560 }}>{carga ? frase : `${t.tarjeta.cta} calcularya.com`}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: 22 }}>
        <Anio dia={carga?.dia ?? 138} anio={anio} celda={11} hueco={4} />
        {carga ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 24, fontWeight: 700 }}>
            {`${t.tarjeta.yVos} calcularya.com`}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Historia({ t, carga, anio, fecha, tasa, frase, hasta, paises, familia }: Datos) {
  const tamFecha = fecha.length <= 8 ? 210 : fecha.length <= 12 ? 172 : 136;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "220px 84px 230px", color: CREMA, fontFamily: familia, ...fondo(1080, 1920) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
        <Marca tam={60} />
        CalcularYa
      </div>
      {carga ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 50, color: SUAVE, lineHeight: 1.2 }}>{hasta[0]}</div>
          <div style={{ display: "flex", fontSize: tamFecha, fontWeight: 700, letterSpacing: -7, lineHeight: 0.98, marginTop: 10 }}>{fecha}</div>
          {hasta[1] ? <div style={{ display: "flex", fontSize: 50, color: SUAVE }}>{hasta[1]}</div> : null}
          <div style={{ display: "flex", marginTop: 34, fontSize: 52, color: VERDE, fontWeight: 700 }}>{t.tarjeta.tasa(tasa)}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>{t.tarjeta.generica}</div>
          <div style={{ display: "flex", fontSize: 44, color: SUAVE }}>{t.tarjeta.genericaBajada(paises)}</div>
        </div>
      )}
      <div style={{ display: "flex" }}>
        <Anio dia={carga?.dia ?? 138} anio={anio} celda={22} hueco={8} />
      </div>
      {carga ? (
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 46, lineHeight: 1.2 }}>
          <BanderaOChip iso={carga.mejor} ancho={72} />
          <div style={{ display: "flex", flex: 1 }}>{frase}</div>
        </div>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>{carga ? t.tarjeta.yVos : t.tarjeta.cta}</div>
        <div style={{ display: "flex", padding: "18px 34px", borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: 40, fontWeight: 700 }}>calcularya.com</div>
      </div>
    </div>
  );
}

type Props = { params: Promise<{ mercado: string }> };

export function crearOgMundo(idioma: Idioma) {
  return async function GET(req: Request, { params }: Props) {
    const { mercado } = await params;
    const ctx = intlActivo() ? contextoSitio(registro, mercado as CodigoMercado) : null;
    if (!ctx || ctx.mercado.idioma !== idioma) return new Response("No encontrado", { status: 404 });
    const m = ctx.mercado;
    const t = textosMundo(m.idioma, m.trato, m.locale);
    const busqueda = new URL(req.url).searchParams;
    const historia = busqueda.get("formato") === "historia";
    const anio = Number(ctx.fecha.slice(0, 4));
    const grilla = await grillaPublicada();
    const carga = decodificarCarga(busqueda.get("c"));

    const tasa = carga ? new Intl.NumberFormat(m.locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(carga.tasa / 1000) : "";
    const fecha = carga ? fechaLarga(carga.dia, anio, m.locale) : "";
    const nombreMejor = carga ? nombreDePais({ codigo: carga.mejor.toLowerCase(), pais: carga.mejor, nombre: carga.mejor, idioma: m.idioma }, m.locale) : "";
    const origen = carga ? grilla.paises.find((p) => p.mercado === carga.mercado) : undefined;
    const nombreOrigen = origen ? nombreDePais({ codigo: origen.mercado, pais: origen.iso, nombre: origen.iso, idioma: m.idioma }, m.locale) : "";
    const pct = carga ? new Intl.NumberFormat(m.locale, { style: "percent", maximumFractionDigits: 0 }).format(carga.ventaja / 100) : "";
    const frase = !carga ? "" : carga.ventaja === 0 || (origen && origen.iso === carga.mejor) ? t.tarjeta.mejorPropio(nombreOrigen || nombreMejor) : t.tarjeta.mejor(nombreMejor, pct);
    const cjk = FUENTE_CJK[m.idioma];
    const familiaCjk = cjk && m.idioma === "zh" && /^zh-(CN|SG)/i.test(m.locale) ? "Noto Sans SC" : cjk;
    const datos: Datos = { t, carga, anio, fecha, tasa, frase, hasta: partir(t.tarjeta.hasta), paises: grilla.paises.length, familia: familiaCjk ? `Geist, "${familiaCjk}"` : "Geist" };

    const texto = [
      "CalcularYa calcularya.com 0123456789%.,",
      datos.hasta.join(" "),
      fecha,
      carga ? t.tarjeta.tasa(tasa) : "",
      frase,
      t.tarjeta.yVos,
      t.tarjeta.cta,
      t.tarjeta.generica,
      t.tarjeta.genericaBajada(datos.paises),
      carga?.mejor ?? "",
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

    const elemento = historia ? <Historia {...datos} /> : <Horizontal {...datos} />;
    return new ImageResponse(elemento, {
      width: historia ? 1080 : 1200,
      height: historia ? 1920 : 630,
      headers: CABECERAS,
      ...(fonts.length ? { fonts } : {}),
    });
  };
}
