import { ImageResponse } from "next/og";
import { itemCotidiano, ITEM_INICIAL } from "@/lib/horas-ar/catalogo";
import { duracion, leerCodigoHoras, mayuscula } from "@/lib/horas-ar/formato";

// Tarjeta de «¿Cuántas horas de trabajo te cuesta?»: /cuantas-horas-de-trabajo/og?c=asado.130 (1200 x 630,
// vista previa del link), &formato=historia (1080 x 1920) y &formato=cuadrado (1080 x 1080). Lee solo
// `c` (ítem y minutos, nunca un monto) y `formato`; cualquier otro parámetro es 404 para que nadie llene
// la caché con variantes. `c` con solo el ítem da la tarjeta genérica de ese ítem.

const TINTA = "#0b1110";
const CREMA = "#f4f0e6";
const SUAVE = "rgba(244,240,230,0.62)";
const VERDE = "#34d399";
const APAGADO = "rgba(244,240,230,0.12)";
const CABECERAS = { "cache-control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" };
const CABECERAS_INCOMPLETA = { "cache-control": "public, max-age=300, s-maxage=600" };
const ESPERA_MS = 3000;

const fuentes = new Map<string, Promise<ArrayBuffer | null>>();

// Igual que la tarjeta de /sueldo-en-el-mundo: Geist de Google Fonts solo con los glifos usados.
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

// La tarjeta de fichaje de la página: hasta 40 horas, 5 filas de 8 horas; más, 4 filas de 13 semanas.
function Fichaje({ minutos, celda, hueco }: { minutos: number; celda: number; hueco: number }) {
  const horas = minutos / 60;
  const porHora = horas <= 40;
  const filas = porHora ? 5 : 4;
  const columnas = porHora ? 8 : 13;
  const unidades = porHora ? horas : horas / 40;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: hueco }}>
      {Array.from({ length: filas }, (_, f) => (
        <div key={f} style={{ display: "flex", gap: hueco }}>
          {Array.from({ length: columnas }, (_, c) => {
            const lleno = Math.max(0, Math.min(1, unidades - (f * columnas + c)));
            return (
              <div key={c} style={{ display: "flex", width: celda, height: celda, borderRadius: celda * 0.28, backgroundColor: APAGADO, overflow: "hidden" }}>
                {lleno > 0 ? <div style={{ display: "flex", width: `${Math.round(lleno * 100)}%`, height: "100%", backgroundColor: lleno >= 1 ? VERDE : "rgba(52,211,153,0.7)" }} /> : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const fondo = (x: string) => ({
  backgroundColor: TINTA,
  backgroundImage: `radial-gradient(circle at ${x}, rgba(52,211,153,0.32) 0%, rgba(52,211,153,0) 48%), radial-gradient(circle at 0% 100%, rgba(244,240,230,0.09) 0%, rgba(244,240,230,0) 52%)`,
});

type Formato = "horizontal" | "historia" | "cuadrado";

interface Datos {
  nombre: string;
  minutos: number | null;
}

function Cifra({ minutos, tam }: { minutos: number; tam: number }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: tam * 0.12, color: CREMA }}>
      {duracion(minutos).partes.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: tam * 0.04 }}>
          <div style={{ display: "flex", fontSize: tam, fontWeight: 700, letterSpacing: -tam * 0.05, lineHeight: 0.95 }}>{p.n}</div>
          <div style={{ display: "flex", fontSize: tam * 0.42, fontWeight: 700, color: VERDE }}>{p.u}</div>
        </div>
      ))}
    </div>
  );
}

function Pie({ tam, personal }: { tam: number; personal: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", fontSize: tam, fontWeight: 700, letterSpacing: -tam * 0.03, whiteSpace: "nowrap" }}>{personal ? "¿Y a vos?" : "Calculá tus horas"}</div>
      <div style={{ display: "flex", padding: `${tam * 0.24}px ${tam * 0.48}px`, borderRadius: 999, backgroundColor: CREMA, color: TINTA, fontSize: tam * 0.56, fontWeight: 700 }}>calcular.ar</div>
    </div>
  );
}

function Tarjeta({ formato, nombre, minutos }: Datos & { formato: Formato }) {
  const h = formato === "horizontal";
  const historia = formato === "historia";
  const s = h ? 0.62 : historia ? 1.3 : 0.78;
  const partes = minutos ? duracion(minutos).partes : [];
  // El ancho de la cifra en «em» (dígitos, unidad al 42 % y huecos): la más larga entra en el ancho útil.
  const ems = partes.reduce((n, p) => n + 0.62 * p.n.length + 0.25 * p.u.length + 0.16, 0);
  const util = h ? 640 : 912;
  const tamCifra = Math.round(Math.min(290 * s, (util / Math.max(ems, 1)) * 0.94));
  const pad = h ? "52px 64px" : historia ? "210px 84px 230px" : "80px 84px";
  const semanas = minutos ? minutos / 60 > 40 : false;
  const celda = h ? (semanas ? 22 : 30) : historia ? (semanas ? 58 : 86) : semanas ? 36 : 44;
  const hueco = h ? 6 : historia ? (semanas ? 11 : 15) : 9;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: pad, color: CREMA, fontFamily: "Geist", ...fondo(h ? "92% 0%" : "100% 0%") }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 * s, fontSize: 40 * s, fontWeight: 700 }}>
        <Marca tam={Math.round(58 * s)} />
        CalculAR
      </div>
      {minutos ? (
        <div style={{ display: "flex", flexDirection: h ? "row" : "column", alignItems: h ? "center" : "flex-start", justifyContent: "space-between", gap: 48 * s }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 66 * s, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 * s, maxWidth: h ? 640 : 900 }}>{mayuscula(nombre)}</div>
            <div style={{ display: "flex", fontSize: 52 * s, color: SUAVE, marginTop: 6 * s, marginBottom: 18 * s }}>me cuesta cerca de</div>
            <Cifra minutos={minutos} tam={tamCifra} />
            <div style={{ display: "flex", fontSize: 52 * s, color: SUAVE, marginTop: 14 * s }}>de trabajo.</div>
          </div>
          <Fichaje minutos={minutos} celda={celda} hueco={hueco} />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 * s }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: h ? 62 : historia ? 112 : 88, fontWeight: 700, letterSpacing: h ? -2 : -4, lineHeight: 1.04 }}>
            <div style={{ display: "flex" }}>¿Cuántas horas de trabajo te cuesta</div>
            <div style={{ display: "flex", color: VERDE }}>{`${nombre}?`}</div>
          </div>
          <div style={{ display: "flex", fontSize: h ? 28 : historia ? 46 : 38, color: SUAVE }}>Poné tu sueldo y tus horas. Precios oficiales.</div>
        </div>
      )}
      <Pie tam={h ? 44 : historia ? 76 : 60} personal={Boolean(minutos)} />
    </div>
  );
}

const TAMANOS: Record<Formato, { width: number; height: number }> = { horizontal: { width: 1200, height: 630 }, historia: { width: 1080, height: 1920 }, cuadrado: { width: 1080, height: 1080 } };

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const claves = [...q.keys()].filter((k) => !k.startsWith("nxtP"));
  if (claves.some((k) => k !== "c" && k !== "formato") || q.getAll("c").length > 1 || q.getAll("formato").length > 1) return new Response("No encontrado", { status: 404 });
  const f = q.get("formato");
  if (f !== null && f !== "historia" && f !== "cuadrado") return new Response("No encontrado", { status: 404 });
  const formato: Formato = f ?? "horizontal";

  const c = q.get("c") ?? ITEM_INICIAL;
  const leido = leerCodigoHoras(c);
  // Solo valores de la escala compartida: unos minutos exactos dirían el valor hora de quien comparte.
  if (leido && !leido.canonico) return new Response("No encontrado", { status: 404 });
  const item = itemCotidiano(leido?.id ?? c);
  if (!item) return new Response("No encontrado", { status: 404 });
  const datos: Datos = { nombre: item.nombre, minutos: leido?.minutos ?? null };

  const texto = ["CalculAR calcular.ar 0123456789 hmin ¿?.", mayuscula(item.nombre), item.nombre, "me cuesta cerca de trabajo ¿Y a vos? Calculá tus horas ¿Cuántas horas de trabajo te cuesta Poné tu sueldo y tus horas. Precios oficiales."].join(" ");
  const unicos = [...new Set(texto)].join("");
  const pedidas = await Promise.all([fuente(400, unicos), fuente(700, unicos)]);
  const pesos = [400, 700] as const;
  const fonts = pedidas.flatMap((data, i) => (data ? [{ name: "Geist", data, weight: pesos[i], style: "normal" as const }] : []));

  return new ImageResponse(<Tarjeta formato={formato} {...datos} />, {
    ...TAMANOS[formato],
    headers: fonts.length < pedidas.length ? CABECERAS_INCOMPLETA : CABECERAS,
    ...(fonts.length ? { fonts } : {}),
  });
}
