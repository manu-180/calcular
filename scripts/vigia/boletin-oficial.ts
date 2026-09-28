// tools/boletin-oficial.ts — El lector del Boletín Oficial de la República Argentina por código.
//
// POR QUÉ EXISTE (31/8/2026, s100 · Turno de Madrugada). El guardián de datos del imperio vive
// preguntándole lo mismo al B.O.: ¿salió la Res. ANSES de haberes del mes? ¿y la de asignaciones?
// ¿salió la escala nueva del SMVM? ¿el decreto del bono? Son SEIS filas rojas de
// `check-datos-vencen.ts` que dependen de una sola pregunta —«¿lo publicaron?»— y hasta hoy esa
// pregunta se contestaba a mano, sesión por sesión, buscando en el sitio. Regla del 2-2: la tercera
// vez lo hace un script.
//
// Y el negativo importa tanto como el positivo: PROGRESS venía anotando «sin novedad» sin poder
// probarlo. Con esto, «no salió» pasa a ser una afirmación verificada contra la edición del día —
// la lista completa de avisos de la Primera Sección— y no una búsqueda que no encontró nada.
//
// LA MINA QUE HACE PARECER QUE EL B.O. NO ES SCRAPEABLE (verificada el 31/8/2026):
//   El endpoint de búsqueda avanzada (`/busquedaAvanzada/realizarBusquedaSeccion`) devuelve la
//   HOME entera —200, HTML válido, cero resultados— ante un POST armado a mano. Se ve como «el
//   sitio no tiene API» y ahí murieron los intentos anteriores. Pero el LISTADO de la edición sí es
//   HTML servido del lado del servidor:
//       https://www.boletinoficial.gob.ar/seccion/primera            → la edición de HOY
//       https://www.boletinoficial.gob.ar/seccion/primera/YYYYMMDD   → una edición pasada
//   ⚠️ Sin la fecha en el PATH no hay forma de pedir un día viejo: el parámetro `?fecha=` se ignora
//   EN SILENCIO y devuelve la edición de hoy. Es el peor de los negativos: parece que contestó lo
//   que le pediste. Este script siempre arma la URL con la fecha en el path y, además, descarta los
//   avisos que no lleven la fecha pedida: si NINGUNO la lleva, ese día no tuvo edición (fin de
//   semana o feriado) y lo dice, en vez de contar avisos de otro día como si fueran de ese.
//
// USO:
//   npx -y tsx tools/boletin-oficial.ts                              # los avisos de hoy (1ª sección)
//   npx -y tsx tools/boletin-oficial.ts --fecha 2026-08-28
//   npx -y tsx tools/boletin-oficial.ts --buscar "SEGURIDAD SOCIAL"  # filtra por título del aviso
//   npx -y tsx tools/boletin-oficial.ts --buscar "ANSES|SALARIO M" --dias 5   # barre N días hacia atrás
//   npx -y tsx tools/boletin-oficial.ts --aviso 346555               # el TEXTO COMPLETO de un aviso
//   npx -y tsx tools/boletin-oficial.ts --seccion segunda            # 1ª (normas), 2ª, 3ª o 4ª
//   npx -y tsx tools/boletin-oficial.ts --guardian                   # los radares del guardián de datos
//
// El `--buscar` es una expresión regular, sin acentos y sin distinguir mayúsculas: los títulos van
// en mayúsculas y con tildes, y el encoding de la respuesta varía (ver `decodificar`). La
// normalización la hace el script, así que `--buscar "asignacion"` encuentra «ASIGNACIONES
// FAMILIARES» y `--buscar "secretaria de trabajo"` encuentra «SECRETARÍA DE TRABAJO».
//
// EXIT CODE: 0 si la consulta salió bien (haya o no resultados) · 1 si la fuente no respondió o
// devolvió una edición distinta de la pedida. «No hay avisos que matcheen» NO es un error: es el
// negativo limpio que el guardián necesita poder afirmar.
//
// Solo stdlib. No toca credenciales ni escribe en el repo.
//
// Vive en calcular-ar/scripts/vigia/ desde el 28/9/2026: vigila los datos de ESTE repo y corre en su
// workflow datos-vivos (GitHub Actions), sin depender de la PC de Manuel ni del repo libre_albedrio.
// En libre_albedrio/tools/ queda un atajo con el mismo nombre que la importa, así los comandos de
// siempre (`npx -y tsx tools/<este>.ts`) siguen funcionando.

import { execFileSync } from "node:child_process";

const BASE = "https://www.boletinoficial.gob.ar";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36";

const SECCIONES = ["primera", "segunda", "tercera", "cuarta"] as const;
type Seccion = (typeof SECCIONES)[number];

/**
 * Los radares del guardián: qué buscar para saber si un dato vencido ya tiene reemplazo.
 * El `^` no es decorativo: el título abre con el RUBRO del aviso, y sin anclar, «MINISTERIO DE
 * CAPITAL HUMANO - SECRETARÍA DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL» —que son homologaciones
 * sindicales— se cuela en el radar de ANSES y convierte cada día en un falso positivo.
 */
const RADARES: { que: string; patron: string; nota: string }[] = [
  {
    que: "Haberes previsionales y bases imponibles",
    patron: "^SEGURIDAD SOCIAL|^ADMINISTRACION NACIONAL DE LA SEGURIDAD SOCIAL",
    nota: "Res. ANSES mensual de haberes + el decreto del bono. Salen alrededor del día 30 del mes anterior.",
  },
  {
    que: "Asignaciones familiares y AUH",
    patron: "ASIGNACION|^SEGURIDAD SOCIAL",
    nota: "OTRA resolución de ANSES, distinta de la de haberes. La fuente del dato es la cartilla PDF, no el texto.",
  },
  {
    que: "Salario mínimo, vital y móvil",
    patron: "SALARIO MINIMO|CONSEJO NACIONAL DEL EMPLEO",
    nota: "La escala no puede existir hasta que se reúna el Consejo. La convocatoria también sale por el B.O.",
  },
  {
    que: "Convenios colectivos (homologaciones)",
    patron: "SECRETARIA DE TRABAJO|CONVENCIONES COLECTIVAS",
    nota: "⚠️ Una homologación NO es la circular del gremio: la escala se carga sólo con la circular oficial.",
  },
];

// ── Fechas ────────────────────────────────────────────────────────────────────────────────────
const hoyIso = () => new Date().toISOString().slice(0, 10);
const compacta = (iso: string) => iso.replaceAll("-", "");
const restarDias = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
};

/** Sin acentos y en mayúsculas: así se comparan los títulos del B.O. sin pelearse con el encoding. */
const normalizar = (s: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();

function limpiarHtml(fragmento: string): string {
  return fragmento
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

/**
 * El B.O. NO sirve siempre el mismo encoding: la misma URL respondió UTF-8 por `fetch` y
 * ISO-8859-1 por `curl` en la misma sesión (31/8/2026). Fijar uno de los dos rompe los acentos la
 * mitad de las veces —«SECRETARÍA» sale «SECRETARÃA» o «SECRETAR?A»—, y con los acentos rotos el
 * filtro por título deja de encontrar lo que busca. Por eso se decide por respuesta: si el cuerpo
 * es UTF-8 válido se usa UTF-8; si no, es latin1.
 */
function decodificar(buf: Buffer): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buf);
  } catch {
    return buf.toString("latin1");
  }
}
async function bajar(url: string): Promise<{ ok: boolean; status: number; html: string }> {
  // El `fetch` de Node corta la conexión contra este host por rachas ("fetch failed", sin status),
  // mientras `curl` a la misma URL en el mismo segundo responde 200. Reintentar no alcanza: el
  // fallback a curl es el que hace que la herramienta sea confiable para un cron.
  for (let intento = 0; intento < 2; intento++) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "text/html" },
        redirect: "follow",
      });
      const buf = Buffer.from(await r.arrayBuffer());
      return { ok: r.ok, status: r.status, html: decodificar(buf) };
    } catch {
      /* se prueba de nuevo y, si no, con curl */
    }
  }
  try {
    const salida = execFileSync("curl", ["-s", "-L", "-m", "60", "-H", `User-Agent: ${UA}`, url], {
      maxBuffer: 64 * 1024 * 1024,
    });
    if (salida.length > 0) return { ok: true, status: 200, html: decodificar(salida) };
  } catch (e) {
    console.error(`❌ curl tampoco pudo con ${url}: ${(e as Error).message}`);
  }
  console.error(`❌ no se pudo bajar ${url} (ni fetch ni curl).`);
  return { ok: false, status: 0, html: "" };
}

export type Aviso = { id: string; fecha: string; titulo: string; url: string };

/** Una edición ya bajada no se vuelve a pedir: `--guardian` barre los mismos días por cada radar. */
const cache = new Map<string, Aviso[] | null>();
/** Los días sin edición ya avisados, para no repetir el mismo ⬜ una vez por radar. */
const diasSinEdicion = new Set<string>();

/** Los avisos de una edición. `fechaIso` vacío = la de hoy. */
export async function listarSeccion(seccion: Seccion, fechaIso?: string): Promise<Aviso[] | null> {
  const clave = `${seccion}/${fechaIso ?? "hoy"}`;
  if (cache.has(clave)) return cache.get(clave)!;
  const r = await listarSeccionSinCache(seccion, fechaIso);
  cache.set(clave, r);
  return r;
}

async function listarSeccionSinCache(seccion: Seccion, fechaIso?: string): Promise<Aviso[] | null> {
  // La fecha va SIEMPRE en el path: como query se ignora en silencio (ver la mina de la cabecera).
  const url = fechaIso ? `${BASE}/seccion/${seccion}/${compacta(fechaIso)}` : `${BASE}/seccion/${seccion}`;
  const { ok, status, html } = await bajar(url);
  if (!ok) {
    console.error(`❌ ${url} respondió HTTP ${status}.`);
    return null;
  }

  const vistos = new Set<string>();
  const avisos: Aviso[] = [];
  const re = new RegExp(`detalleAviso/${seccion}/(\\d+)/(\\d{8})"`, "g");
  for (const m of html.matchAll(re)) {
    const [, id, fecha] = m;
    if (vistos.has(id)) continue;
    vistos.add(id);
    // El corte cae DENTRO de la etiqueta `<a>` (justo después del href), así que lo primero que
    // sobra es el resto de sus atributos hasta el `>` que la cierra. Recién ahí empieza el aviso:
    // el rubro y la norma vienen en `<p>` separados, o sea que hay que unir renglones, no quedarse
    // con el primero (quedarse con el primero devuelve vacío, porque el primero es el `onclick`).
    const titulo = limpiarHtml(html.slice(m.index! + m[0].length, m.index! + m[0].length + 900))
      .replace(/^[^>]*>/, "")
      .replace(/\s+/g, " ")
      .replace(/\s*<.*$/, "")
      .trim()
      .slice(0, 200);
    avisos.push({
      id,
      fecha: `${fecha.slice(0, 4)}-${fecha.slice(4, 6)}-${fecha.slice(6)}`,
      titulo,
      url: `${BASE}/detalleAviso/${seccion}/${id}/${fecha}`,
    });
  }
  return avisos;
}

/** El texto completo de un aviso. */
export async function leerAviso(seccion: Seccion, id: string, fechaIso: string): Promise<string | null> {
  const url = `${BASE}/detalleAviso/${seccion}/${id}/${compacta(fechaIso)}`;
  const { ok, status, html } = await bajar(url);
  if (!ok) {
    console.error(`❌ ${url} respondió HTTP ${status}.`);
    return null;
  }
  const m = html.match(/id="cuerpoDetalleAviso"([\s\S]*?)(?=<script|id="btnVolver")/i);
  const cuerpo = limpiarHtml((m ? m[1] : html).replace(/^[^>]*>/, ""));
  if (cuerpo.length < 80) {
    console.error(`❌ el aviso ${id} respondió 200 pero sin cuerpo legible (¿id o fecha equivocados?).`);
    return null;
  }
  return cuerpo;
}

// ── CLI ───────────────────────────────────────────────────────────────────────────────────────
function arg(nombre: string): string | undefined {
  const i = process.argv.indexOf(`--${nombre}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const tiene = (nombre: string) => process.argv.includes(`--${nombre}`);

async function main() {
  const seccion = (arg("seccion") ?? "primera") as Seccion;
  if (!SECCIONES.includes(seccion)) {
    console.error(`❌ sección desconocida: ${seccion}. Son: ${SECCIONES.join(", ")}.`);
    process.exit(1);
  }

  const fecha = arg("fecha") ?? hoyIso();
  const esHoy = fecha === hoyIso();

  // --aviso: el texto completo de uno.
  const idAviso = arg("aviso");
  if (idAviso) {
    const texto = await leerAviso(seccion, idAviso, fecha);
    if (texto === null) process.exit(1);
    console.log(`— B.O. ${seccion} · aviso ${idAviso} · ${fecha} —\n`);
    console.log(texto);
    return;
  }

  // --guardian: los radares del guardián de datos, sobre los últimos días.
  const dias = Number(arg("dias") ?? (tiene("guardian") ? 3 : 1));
  const patron = arg("buscar");

  if (tiene("guardian")) {
    console.log(`— B.O. · guardián de datos · ${dias} día(s) hasta ${fecha} —\n`);
    for (const radar of RADARES) {
      const hits = await barrer(seccion, fecha, dias, radar.patron);
      if (hits === null) process.exit(1);
      if (hits.length === 0) {
        console.log(`⬜ ${radar.que}: sin avisos en la ventana.`);
      } else {
        console.log(`🔔 ${radar.que}: ${hits.length} aviso(s)`);
        for (const a of hits) console.log(`     ${a.fecha} · ${a.id} · ${a.titulo}`);
      }
      console.log(`     ${radar.nota}\n`);
    }
    console.log(
      "⚠️ Un aviso encontrado NO es el dato cargado: hay que abrirlo (--aviso <id> --fecha <ISO>)\n" +
        "   y verificar el número contra la fuente antes de tocar nada.",
    );
    return;
  }

  const encontrados = await barrer(seccion, fecha, dias, patron);
  if (encontrados === null) process.exit(1);

  const ventana = dias > 1 ? `${dias} días hasta ${fecha}` : `${fecha}${esHoy ? " (hoy)" : ""}`;
  console.log(
    `— B.O. ${seccion} sección · ${ventana}${patron ? ` · filtro «${patron}»` : ""} · ` +
      `${encontrados.length} aviso(s) —\n`,
  );
  for (const a of encontrados) console.log(`${a.fecha}  ${a.id}  ${a.titulo}`);
  if (encontrados.length === 0)
    console.log(
      patron
        ? "✅ negativo limpio: la edición se leyó entera y ningún aviso matchea. NO está publicado."
        : "⚠️ la edición no trajo avisos — revisar a mano antes de concluir nada.",
    );
}

/** Barre N días hacia atrás desde `fechaIso`, filtrando por `patron` si viene. */
async function barrer(
  seccion: Seccion,
  fechaIso: string,
  dias: number,
  patron?: string,
): Promise<Aviso[] | null> {
  const re = patron ? new RegExp(normalizar(patron), "i") : null;
  const out: Aviso[] = [];
  for (let i = 0; i < Math.max(1, dias); i++) {
    const dia = restarDias(fechaIso, i);
    const avisos = await listarSeccion(seccion, dia === hoyIso() ? undefined : dia);
    if (avisos === null) return null;
    // El control de la mina del `?fecha=`: si NINGÚN aviso lleva la fecha pedida, el B.O. contestó
    // otra edición. Pasa siempre los sábados, domingos y feriados —días en que no publica— y en ese
    // caso la respuesta correcta es «ese día no hubo edición», no un error: se anota y se sigue.
    // Lo que NO se hace nunca es contar los avisos que vinieron: son de otro día.
    const delDia = avisos.filter((a) => a.fecha === dia);
    if (avisos.length > 0 && delDia.length === 0) {
      // Una vez por día, no una por radar: `--guardian` barre la misma ventana cuatro veces.
      if (!diasSinEdicion.has(dia)) {
        diasSinEdicion.add(dia);
        console.error(`⬜ ${dia}: sin edición propia (el B.O. devolvió la del ${avisos[0].fecha}) — día no hábil.`);
      }
      continue;
    }
    out.push(...delDia.filter((a) => !re || re.test(normalizar(a.titulo))));
  }
  return out;
}

// El CLI corre SÓLO cuando este archivo es el que se invocó.
//
// POR QUÉ (15/9/2026, s115): este módulo exporta `listarSeccion` y `leerAviso` justamente para que
// otros radares los reusen, pero llamaba a `main()` al nivel del módulo. La primera vez que alguien
// lo importó —`tools/rastreador-cntcp.ts`— el solo `import` disparó el CLI del B.O., que leyó los
// `--dias` del OTRO script y vomitó la edición entera antes de que el importador hiciera nada. No
// fallaba: hacía dos cosas, y una no la había pedido nadie.
const esEntrada = process.argv[1]?.replace(/\\/g, "/").endsWith("boletin-oficial.ts");
if (esEntrada) {
  main().catch((e) => {
    console.error(`❌ ${(e as Error).message}`);
    process.exit(1);
  });
}
