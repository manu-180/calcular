/**
 * El Rastreador de Circulares — ¿los gremios publicaron un PDF nuevo?
 *
 * POR QUÉ EXISTE (error real, 2026-07-30): la circular de FAECYS con las escalas de
 * julio-diciembre 2026 se publicó el 28/7. Dos sesiones seguidas (s62 el 29/7 y s63 el
 * 30/7 a la mañana) la buscaron y concluyeron NO-GO: "sigue publicada solo la circular
 * abril-julio". Las dos preguntaron por la página de categoría con WebFetch y se
 * quedaron con el resumen en prosa que devolvió el modelo. El PDF estaba ahí desde el
 * día anterior. Peor todavía: esa circular REEMPLAZABA julio, así que calcular.ar tuvo
 * la escala de julio mal publicada mientras el tablero decía "bloqueado, no hay fuente".
 *
 * La regla que sale de ahí: para saber si hay circular nueva NO se le pregunta a un
 * modelo si la ve — se baja el HTML y se listan los PDF. Un PDF que no está en el
 * registro de abajo es una circular nueva, y punto.
 *
 * Uso:
 *   npx -y tsx tools/circulares-gremios.ts          → lista PDFs nuevos (exit 0)
 *   npx -y tsx tools/circulares-gremios.ts --todos  → lista todos los PDFs encontrados
 *
 * Al cargar una circular, agregá su archivo a YA_CARGADAS para que deje de reportarse.
 *
 * Vive en calcular-ar/scripts/vigia/ desde el 28/9/2026: vigila los datos de ESTE repo y corre en su
 * workflow datos-vivos (GitHub Actions), sin depender de la PC de Manuel ni del repo libre_albedrio.
 * En libre_albedrio/tools/ queda un atajo con el mismo nombre que la importa.
 */


import { httpGetTextTolerante } from "./datos-oficiales";

const MOSTRAR_TODOS = process.argv.includes("--todos");

export type Fuente = {
  /** Clave estable del gremio: la misma que usa `calcular-ar/src/data/convenios/<clave>.ts`. */
  clave: "comercio" | "uocra" | "camioneros";
  gremio: string;
  // Páginas donde el gremio publica sus circulares de escalas.
  urls: string[];
  // Qué tiene que decir el nombre del archivo para que nos interese (filtra estatutos,
  // actas de otras ramas, etc.). Se aplica en minúsculas y sin acentos.
  patron: RegExp;
  // Ramas que el gremio publica pero calcular.ar NO cubre. Se siguen listando al final
  // (nunca se ocultan: si mañana abrimos una rama, ahí está), pero no cuentan como
  // "circular sin cargar" para no ahogar la señal de la rama que sí nos importa.
  otrasRamas?: RegExp;
  // Algunos índices publican el archivo histórico completo en la misma página (FADEEAC tiene
  // las escalas desde 2017). Este filtro se aplica a la URL COMPLETA, no al nombre: sirve para
  // quedarse con la carpeta del año en curso y que el rastreador no reporte como "nueva" una
  // planilla de 2019. Si falta, entran todos los PDF que matcheen `patron`.
  soloUrl?: RegExp;
};

const FUENTES: Fuente[] = [
  {
    clave: "comercio",
    gremio: "Comercio (FAECYS)",
    urls: [
      "https://www.faecys.org.ar/category/secretarias/asuntos-laborales/escalas-y-acuerdos/",
      "https://www.faecys.org.ar/",
    ],
    patron: /(circular|acuerdo|escala|paritaria)/,
    // FAECYS publica en el mismo índice las circulares de turismo, cereales, hoteles,
    // prensa y FENAMMF. La rama general (CCT 130/75) es la que usa calcular.ar.
    // "call center" = CCT 781/20 (Cámara Argentina de Centros de Contacto), convenio propio
    // con escalas propias: verificado el 7/8/2026 leyendo el PDF del acuerdo 07/2026.
    otrasRamas: /(turismo|cereal|hotel|fenammf|prensa|mmi|maritim|call-?center|781)/,
  },
  {
    clave: "uocra",
    gremio: "Construcción (UOCRA)",
    // El sitio del gremio publica poco y nada en PDF. Los acuerdos salariales del CCT 76/75
    // (y sus homologaciones del Ministerio) los publica la CÁMARA, CAMARCO: es la fuente
    // oficial que de verdad tiene los PDF. Agregada el 1/8/2026 tras verificar que el
    // acuerdo de agosto vivía ahí mientras nosotros esperábamos "a que UOCRA publicara".
    urls: [
      "https://www.camarco.org.ar/laborales/",
      "https://www.camarco.org.ar/categorias_laborales/acuerdos-salariales/",
      "https://www.uocra.org/",
      "https://www.uocra.org/acuerdos-salariales/",
    ],
    patron: /(acuerdo|escala|salarial|paritaria|uocra|76-75)/,
    // CAMARCO publica en el mismo índice los convenios de las otras entidades de la
    // construcción (empleados administrativos, Córdoba, mosaístas…). calcular.ar cubre
    // el CCT 76/75 de obreros.
    otrasRamas: /(uecara|ueca|socamglyp|660-13|735-15|200-75|545-08|577-10|topes)/,
  },
  {
    clave: "camioneros",
    gremio: "Camioneros",
    // FADEEAC es la cámara empresaria del CCT 40/89 — el CAMARCO de los camioneros — y es
    // quien publica de verdad el acuerdo firmado, su homologación y la planilla salarial de
    // CADA mes. El sitio del gremio sólo tiene material histórico.
    //
    // Agregada el 20/9/2026 después de pagarlo: sin esta fuente, la revisión de la cláusula
    // TERCERA (que recompuso julio y agosto un 4,22%, no el 1,5% del tramo original) fue
    // invisible dos meses y calcular.ar publicó los básicos 2,68% abajo. Es EXACTAMENTE la
    // misma lección que ya se había escrito para UOCRA el 1/8 al sumar CAMARCO — y que no se
    // aplicó acá. Cuando una fuente resulta ser "la cámara, no el gremio", revisar los otros.
    urls: [
      "https://www.fadeeac.org.ar/departamento-legislacion-legales-y-seguros/",
      "https://www.camioneros.org.ar/",
    ],
    patron: /(acuerdo|escala|salarial|paritaria|planilla|revision|homolog|disp)/,
    // FADEEAC publica su archivo histórico completo (escalas desde 2017) en la misma página.
    soloUrl: /\/uploads\/202[6-9]\//,
  },
];

// Circulares ya leídas y cargadas en calcular.ar. Clave: el nombre del archivo en
// minúsculas (sin la ruta), que es lo único estable entre versiones del sitio.
const YA_CARGADAS = new Set(
  [
    // Comercio (CCT 130/75) — línea de base tomada el 30/7/2026 (s64). De acá en adelante,
    // cualquier PDF que reporte el rastreador es realmente nuevo.
    "circular-acuerdo-julio-2026.pdf", // ACUERDO 07/2026: escalas jul/2026 → may/2027 (cargado s64)
    "acuerdo-comercio-julio-2026.pdf", // el texto del acuerdo del 22/7/2026 (mismo evento)
    "circular-escalas-salariales-abril-2026-julio-2026.pdf",
    "circular-faecys-acuerdo-paritario-cct-130-75.pdf", // 2024, histórica
    "circular-faecys-escalas-.pdf", // 2024, histórica
    "circular-5-2026-fusionado.pdf", // circulares administrativas, sin escalas
    "circular-n-9.pdf",
    "circular-4-2026.pdf",
    // Las circulares "SEyE" son el informe estadístico mensual de la Secretaría de Estudios y
    // Estadísticas (precios, actividad, RECABAR): NO traen escalas. Leída íntegra el 11/8/2026
    // (57 páginas, sin una sola mención a acuerdo salarial ni al CCT 130/75).
    "circular-agosto-26-seye_c.pdf",
    // Leída íntegra el 20/9/2026 (s118): NO trae escalas. Acuerdan trasladar el Día del
    // Empleado de Comercio (Ley 26.541, 26/9) al lunes 28/9/2026, y que ese lunes no se
    // puede dar como franco compensatorio del descanso semanal.
    "circular-traslado-dia-del-gremio-septiembre-2026.pdf",
    // UOCRA
    "acuerdo-uocra-camarco-19-05-2026.pdf",
    // Línea de base de CAMARCO, tomada el 1/8/2026 (s65) al sumar la cámara como fuente.
    // Las tres se leyeron con tools/pdf-extraer.ts antes de darlas por vistas:
    "di-2026-54712766-apn-dnryrtmch-uocra-1.pdf", // homologación del acuerdo UOCRA 76/75 jun-jul-ago 2026 (ya cargado)
    "di-2026-55884613-apn-dnryrtmch-uocra-545.pdf", // homologación CCT 545/08, otra rama
    "acuerdo-escalas-salariales-re-2026-53386144-apn-dgdteyssmch.pdf", // CCT 200/75 (SOCAMGLyP), otra rama
    // Leída íntegra el 21/8/2026 (s90): homologa la CONTRIBUCIÓN EMPRESARIA del 2% de los
    // CCT 76/75 y 577/10 (base: rubros remunerativos normales, habituales y mensuales, Dec.
    // 612/2026). NO trae escalas salariales y NO se descuenta del sueldo del trabajador: la
    // paga el empleador, así que no toca ni las escalas de UOCRA ni /descuentos-del-sueldo.
    "di-2026-80493724-apn-dnryrtmch-uocra-contribucion.pdf",
    // Tercer tramo (acuerdo del 21/9/2026, sep-oct-nov 2026): cargado el 28/9/2026. El PDF es un
    // scan con capa OCR; los 60 valores se verificaron contra la derivación 1,9% / 1,8% / 1,7%.
    "ci-067-adj-ac-sal-uocra-sep-nov26.pdf",
    // Camioneros — histórico que publica fedcam/hugomoyano (2017 a 2022), sin relación
    // con las escalas vigentes. Base tomada el 1/8/2026.
    "acuerdosalarialcamioneros2022-comprimido.pdf",
    "acuerdoaumentosalarial2018-b.pdf",
    "homologacionaumentosalarial_julio2018.pdf",
    "acuerdosalarial_2017.pdf",
    "acuerdo5300.pdf",
    // FADEEAC — línea de base del 20/9/2026 (s118), al sumar la cámara como fuente. Las seis
    // planillas mensuales se leyeron como imagen (son escaneos) y sus 9 categorías están
    // cargadas en ESCALAS_POR_MES; el acuerdo y la revisión se leyeron íntegros.
    "acuerdo-paritario-13-3-26.pdf", // acuerdo del 13/3/2026, marzo a agosto
    "disp.-455-26-homologacion-acuerdo-13-3-26.pdf",
    "revision-acuerdo-julio-agosto-2026.pdf", // la revisión de la cláusula TERCERA (+4,22%)
    "planilla-marzo-26.pdf",
    "planilla-abril-26.pdf",
    "planilla-mayo-26.pdf",
    "planilla-junio-26.pdf",
    "planilla-de-escalas-salariales-julio-2026-ok.pdf", // julio REVISADO (reemplaza al original)
    "planillas-de-escalas-salariales-agosto-2026-ok.pdf", // agosto REVISADO
    "planilla-julio-26.pdf", // versión pre-revisión: quedó sin efecto, no se carga
    "planilla-agosto-26.pdf", // ídem
    // Enero y febrero 2026 salen del acuerdo anterior (sept/25-feb/26). calcular.ar publica
    // desde marzo, que es donde arranca el acuerdo vigente: vistas, no pendientes.
    "enero-2026-c-ajuste-15-12-25.pdf",
    "febero-2026-c-ajuste-15-12-25.pdf",
  ].map((n) => n.toLowerCase()),
);

function sinAcentos(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Baja el HTML con User-Agent de navegador (sin él varios gremios devuelven 403) y
// tolerando certificados mal encadenados: CAMARCO sirve la cadena incompleta y `fetch`
// moría con "fetch failed", o sea el rastreador reportaba "sitio caído" con el sitio sano.
async function bajar(url: string): Promise<string | null> {
  return httpGetTextTolerante(url);
}

// Los PDF aparecen tanto en href= como dentro del query de un visor
// (…/pdf-viewer/…/viewer.html?file=https://…/CIRCULAR.pdf), así que se buscan en crudo.
function extraerPdfs(html: string): string[] {
  const encontrados = new Set<string>();
  const re = /https?:\/\/[^\s"'<>()]+?\.pdf/gi;
  for (const m of html.matchAll(re)) encontrados.add(m[0]);
  return [...encontrados];
}

function nombreArchivo(url: string) {
  return decodeURIComponent(url.split("/").pop() ?? url).toLowerCase();
}

// El índice de un gremio casi nunca linkea el PDF directo: linkea la NOTA, y el PDF vive
// adentro (FAECYS lo mete en un visor: viewer.html?file=…/CIRCULAR.pdf). Sin este salto,
// el rastreador diría "sin novedades" con la circular publicada — el error de s62/s63.
function extraerNotas(html: string, base: string, patron: RegExp): string[] {
  const notas = new Set<string>();
  let host: string;
  try {
    host = new URL(base).origin;
  } catch {
    return [];
  }
  for (const m of html.matchAll(/href="([^"]+)"/gi)) {
    let href = m[1];
    if (href.startsWith("/")) href = host + href;
    if (!href.startsWith(host)) continue; // solo el propio sitio
    if (/\.(pdf|jpe?g|png|css|js|zip)$/i.test(href)) continue;
    const slug = sinAcentos(decodeURIComponent(href)).toLowerCase();
    if (patron.test(slug)) notas.add(href.split("#")[0]);
  }
  return [...notas];
}

const MAX_NOTAS = 12; // por gremio: alcanza para cubrir varias paritarias sin martillar el sitio

/**
 * Lo que el rastreo de UN gremio deja en claro. Se exporta para que otros scripts
 * (hoy `tools/check-datos-vencen.ts`) puedan preguntarle "¿el gremio publicó algo?" sin
 * parsear esta salida de consola, que es prosa y cambia.
 *
 * ⚠️ Los estados son TRES y no dos, a propósito: `sin-lectura` existe para no mentir. Un
 * sitio que no responde —o que responde sin un solo PDF— significa "no pudimos ver",
 * NUNCA "no hay nada" (mina de s62/s63: el rastreador dijo "sin novedades" con la circular
 * ya publicada). Quien consuma esto tiene que tratar `sin-lectura` como DESCONOCIDO.
 */
export type ResultadoGremio = {
  clave: Fuente["clave"];
  gremio: string;
  estado: "sin-lectura" | "sin-novedades" | "hay-nuevas";
  /** Solo en `sin-lectura`: distingue "no contestó" de "contestó pero cambió de forma". */
  causa?: "sin-respuesta" | "sin-pdfs";
  pdfs: [string, string][]; // los que matchearon el patrón (nombre → url)
  nuestras: [string, string][]; // sin cargar y de la rama que cubre calcular.ar
  ajenas: [string, string][]; // sin cargar pero de otra rama
  notasRevisadas: number;
};

/** Rastrea un gremio y devuelve el veredicto, sin imprimir nada. */
export async function rastrearFuente(fuente: Fuente): Promise<ResultadoGremio> {
  const base = { clave: fuente.clave, gremio: fuente.gremio };
  const pdfs = new Map<string, string>(); // nombre → url
  let alguno = false;
  const notas = new Set<string>();

  for (const url of fuente.urls) {
    const html = await bajar(url);
    if (html === null) continue;
    alguno = true;
    for (const pdf of extraerPdfs(html)) {
      const nombre = nombreArchivo(pdf);
      if (fuente.soloUrl && !fuente.soloUrl.test(pdf)) continue;
      if (fuente.patron.test(sinAcentos(nombre))) pdfs.set(nombre, pdf);
    }
    for (const nota of extraerNotas(html, url, fuente.patron)) notas.add(nota);
  }

  const vacio = { pdfs: [], nuestras: [], ajenas: [] } as Pick<ResultadoGremio, "pdfs" | "nuestras" | "ajenas">;

  if (!alguno) {
    return { ...base, estado: "sin-lectura", causa: "sin-respuesta", ...vacio, notasRevisadas: 0 };
  }

  // Segundo salto: entrar a las notas y buscar el PDF adentro.
  for (const nota of [...notas].slice(0, MAX_NOTAS)) {
    const html = await bajar(nota);
    if (html === null) continue;
    for (const pdf of extraerPdfs(html)) {
      const nombre = nombreArchivo(pdf);
      if (fuente.soloUrl && !fuente.soloUrl.test(pdf)) continue;
      if (fuente.patron.test(sinAcentos(nombre))) pdfs.set(nombre, pdf);
    }
  }

  if (pdfs.size === 0) {
    // Cero PDFs NO es "sin novedades": es que no pudimos ver.
    return { ...base, estado: "sin-lectura", causa: "sin-pdfs", ...vacio, notasRevisadas: notas.size };
  }

  const esOtraRama = (n: string) => fuente.otrasRamas?.test(sinAcentos(n)) ?? false;
  const desconocidas = [...pdfs.entries()].filter(([n]) => !YA_CARGADAS.has(n));
  const nuestras = desconocidas.filter(([n]) => !esOtraRama(n));
  const ajenas = desconocidas.filter(([n]) => esOtraRama(n));

  return {
    ...base,
    estado: nuestras.length > 0 ? "hay-nuevas" : "sin-novedades",
    pdfs: [...pdfs.entries()],
    nuestras,
    ajenas,
    notasRevisadas: notas.size,
  };
}

/** Rastrea todos los gremios (o solo los de `claves`) y devuelve los veredictos. */
export async function rastrearGremios(claves?: Fuente["clave"][]): Promise<ResultadoGremio[]> {
  const objetivo = claves ? FUENTES.filter((f) => claves.includes(f.clave)) : FUENTES;
  const out: ResultadoGremio[] = [];
  for (const fuente of objetivo) out.push(await rastrearFuente(fuente));
  return out;
}

async function main() {
  console.log(`— circulares-gremios · ${new Date().toISOString().slice(0, 10)} —\n`);

  let nuevas = 0;
  let sitiosCaidos = 0;

  for (const fuente of FUENTES) {
    const r = await rastrearFuente(fuente);
    const pdfs = new Map<string, string>(r.pdfs);
    const { nuestras, ajenas } = r;

    if (r.estado === "sin-lectura") {
      sitiosCaidos++;
      console.log(
        r.causa === "sin-respuesta"
          ? `⚠️  ${fuente.gremio}: no respondió ninguna de sus URLs (¿sitio caído?)`
          : `⚠️  ${fuente.gremio}: respondió pero NO se encontró ningún PDF (${r.notasRevisadas} nota(s) revisada(s)).\n` +
              `    Cambió la estructura del sitio o el patrón no matchea → revisar A MANO, no asumir que no hay.\n`,
      );
      continue;
    }

    if (MOSTRAR_TODOS) {
      console.log(`📄 ${fuente.gremio}: ${pdfs.size} PDF encontrado(s)`);
      for (const [nombre, url] of pdfs) {
        console.log(`${YA_CARGADAS.has(nombre) ? " ✓ " : " → "}${nombre}
      ${url}`);
      }
    } else if (nuestras.length === 0) {
      console.log(
        `✅ ${fuente.gremio}: sin circulares nuevas de nuestra rama ` +
          `(${pdfs.size} PDF vistos, ${ajenas.length} de otras ramas).`,
      );
    } else {
      nuevas += nuestras.length;
      console.log(`🔔 ${fuente.gremio}: ${nuestras.length} circular(es) SIN CARGAR`);
      for (const [nombre, url] of nuestras) console.log(` → ${nombre}
      ${url}`);
      if (ajenas.length > 0) {
        console.log(`    (+ ${ajenas.length} de otras ramas que no cubrimos)`);
      }
    }
    console.log("");
  }

  if (sitiosCaidos > 0) {
    console.log(
      `⚠️  ${sitiosCaidos} gremio(s) sin lectura útil: de ESOS, "sin novedades" no prueba nada.`,
    );
  }
  if (nuevas > 0) {
    console.log(
      `🔔 ${nuevas} circular(es) sin cargar. Leelas con:\n` +
        `   npx -y tsx tools/pdf-extraer.ts <url> [--imagenes]\n` +
        `   Regla de oro: cruzar la escala nueva contra un mes ya cargado desde otra fuente\n` +
        `   antes de publicar, y agregar el archivo a YA_CARGADAS al terminar.`,
    );
  } else if (!MOSTRAR_TODOS) {
    console.log("✅ Sin circulares nuevas para cargar.");
  }
}

// Desde que este archivo exporta `rastrearFuente`/`rastrearGremios` es ADEMÁS un módulo: si
// `main()` corriera al importarlo, cada `import` dispararía el rastreo entero (17 requests) y
// escribiría en el stdout de quien lo importa. Solo corre cuando lo invocan como script.
// Por nombre y no por URL: desde libre_albedrio se invoca un atajo con el mismo nombre que importa este archivo.
const invocadoDirecto = process.argv[1]?.replace(/\\/g, "/").endsWith("circulares-gremios.ts") ?? false;

if (invocadoDirecto) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
