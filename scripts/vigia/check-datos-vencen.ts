// check-datos-vencen.ts — ¿Qué datos hardcodeados de calcular.ar están por vencer?
// Vive en calcular-ar/scripts/vigia/ desde el 28/9/2026: vigila los datos de ESTE repo y corre en su
// workflow datos-vivos (GitHub Actions), sin depender de la PC de Manuel ni del repo libre_albedrio.
// En libre_albedrio/tools/ queda un atajo con el mismo nombre que la importa, así los comandos de
// siempre (`npx -y tsx tools/<este>.ts`) siguen funcionando.
//
// Ejecutar:  npx -y tsx tools/check-datos-vencen.ts
//
// Lee los archivos de datos de calcular-ar/src/data/ COMO TEXTO (no los importa)
// y extrae con regex los valores con fecha de vencimiento. Reporta una tabla
// ordenada por urgencia:
//   🔴 vencido o vence en ≤7 días   🟡 vence en ≤30 días   🟢 hay margen
//
// Datos vigilados:
//   - monotributo.ts → escalas semestrales (la fecha sale de VIGENCIA.proximaActualizacion;
//                      hoy vigentes desde 1/8/2026, próxima actualización ARCA febrero 2027)
//   - plazofijo.ts   → TNA_FALLBACK (refrescar en cada redeploy) e INFLACION_DEFAULT
//                      (el IPC nuevo sale ~día 10-15 de cada mes)
//   - aguinaldo.ts   → semestres y fechas de pago atados a 2026 (rotar en diciembre)
//
// Excepción a "solo lee archivos": para los datos que YA vencieron por calendario y tienen un
// detector de su fuente, el semáforo pregunta en vivo si el organismo publicó el reemplazo antes
// de gritar. El calendario propone; la publicación dispone. Un dato vencido cuya fuente todavía
// no publicó no es accionable —no hay nada que cargar— y sale 🟡 "esperando a la fuente", no ⛔.
// Cubre IPC, canasta de crianza, aportes de ARCA y las escalas de los gremios; ver la sección
// "Vencidos que NO son accionables". Si la comprobación no contesta, manda el calendario:
// preferimos un 🔴 de más antes que ocultar un dato realmente vencido. Las consultas se cachean
// por día en tools/.cache/ porque esto corre en CADA arranque de CADA sistema autónomo.
//
// Siempre sale con código 0: es informativo, no un gate.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
// Única excepción a la regla de "leer como texto": la ventana de recategorización ya no es un
// string hardcodeado sino una función derivada de la fecha, así que el semáforo la importa
// (importarla es justamente lo que garantiza que no haya dos copias de la regla).
import { ventanaRecategorizacion } from "../../src/data/monotributo";
import {
  BONO_VIGENTE,
  MES_PREVISIONAL_SIN_BONO,
  PRESTACIONES_VIGENTES,
  RESOLUCION_PROXIMA,
} from "../../src/data/prestaciones";
import { ASIGNACIONES_PROXIMAS, ASIGNACIONES_VIGENTES } from "../../src/data/asignaciones";
// Para verificar contra la fuente oficial antes de declarar vencido el IPC (ver más abajo).
import { httpGetJsonTolerante } from "./datos-oficiales";
// Para preguntarle al rastreador si el gremio publicó, sin parsear su salida de consola.
import { rastrearGremios } from "./circulares-gremios";
// Y lo mismo para la CNTCP: el rastreador mira el B.O., no el reloj (mina de s115).
import { nuevasConEscala } from "./rastreador-cntcp";

// ---------------------------------------------------------------------------
// Helpers de fechas en español
// ---------------------------------------------------------------------------

const MESES: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

/** "agosto 2026" → Date(2026-08-01). "abril 2026" → Date(2026-04-01). */
function parseMesAnio(texto: string): Date | null {
  const m = texto.toLowerCase().match(/(\w+)\s+de?\s*(\d{4})|(\w+)\s+(\d{4})/);
  if (!m) return null;
  const mes = MESES[(m[1] ?? m[3]) as string];
  const anio = Number(m[2] ?? m[4]);
  if (!mes || !anio) return null;
  return new Date(Date.UTC(anio, mes - 1, 1));
}

function diasHasta(fecha: Date): number {
  const hoy = new Date();
  const hoyUTC = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return Math.round((fecha.getTime() - hoyUTC) / 86_400_000);
}

function fmtFecha(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function semaforo(dias: number): string {
  if (dias <= 7) return "🔴";
  if (dias <= 30) return "🟡";
  return "🟢";
}

// ---------------------------------------------------------------------------
// Lectura de archivos (desde la raíz del repo o desde tools/)
// ---------------------------------------------------------------------------

function leerArchivo(relativo: string): string | null {
  // Las rutas se siguen escribiendo "calcular-ar/src/..." (así se leen igual desde libre_albedrio),
  // pero se resuelven contra la raíz de este repo.
  const archivo = path.resolve(import.meta.dirname, "..", "..", relativo.replace(/^calcular-ar\//, ""));
  return existsSync(archivo) ? readFileSync(archivo, "utf8") : null;
}

// ---------------------------------------------------------------------------
// Extracción por archivo
// ---------------------------------------------------------------------------

type Fila = {
  vence: Date;
  campo: string;
  valorActual: string;
  venceTexto: string;
  accion: string;
  /**
   * Se completa cuando el calendario dice "ya venció" pero la fuente oficial TODAVÍA no publicó
   * el reemplazo (verificado en vivo). La fila baja a 🟡 y no cuenta como vencida: no hay nada
   * que actualizar, así que gritar 🔴 es mentir. Ver `confirmarVencimientoIpc()`.
   */
  esperandoFuente?: string;
};

const filas: Fila[] = [];
const problemas: string[] = [];

/** La fila del IPC y el período que tiene guardado el repo (YYYY-MM), para verificarla en vivo. */
let filaIpc: Fila | null = null;
let periodoIpcGuardado: string | null = null;

/** La fila de la canasta de crianza, para verificarla contra la planilla oficial (ver más abajo). */
let filaCanastaCrianza: Fila | null = null;

/** Las filas de escalas por gremio, para preguntarle al rastreador si el gremio publicó algo. */
const filasConvenio = new Map<"comercio" | "uocra" | "camioneros", Fila>();

/**
 * La fila de la escala de la CNTCP, para preguntarle al rastreador si salió una resolución nueva.
 *
 * POR QUÉ (mina de s115, 15/9/2026): esta fila era el único testigo del archivo que medía **cuándo
 * fue la última vez que alguien miró** (`consultadoEl` + 45 días) en vez de **si la fuente publicó
 * algo**. El 3/9 salió la Res. CNTCP 6/2026 y el sitio liquidó septiembre con la escala de julio
 * durante doce días, con esta fila en 🟡 «todavía vigente». Un reloj no es un sensor.
 */
let filaCasasParticulares: Fila | null = null;

/** La fila de aportes de ARCA y el mes de PDF que habría que encontrar publicado. */
let filaAportesCasas: Fila | null = null;
let mmaaAportesBuscado: string | null = null;

// --- convenios: hasta qué mes llega la escala de cada gremio -------------
// Las escalas paritarias son el dato más caro del moat y el que más rápido se pudre:
// cuando el último mes cargado queda atrás, el sitio muestra sueldos viejos. Cada
// archivo de convenio lista sus meses como `id: "julio-2026"` → el vencimiento es el
// último día de ese mes. (Se agregó el 29/7/2026: Comercio y UOCRA vencían el 31/7 y
// el semáforo no los miraba.)
for (const gremio of ["comercio", "uocra", "camioneros"] as const) {
  const texto = leerArchivo(`calcular-ar/src/data/convenios/${gremio}.ts`);
  if (!texto) {
    problemas.push(`No encontré calcular-ar/src/data/convenios/${gremio}.ts`);
    continue;
  }
  const ids = [...texto.matchAll(/id:\s*"([a-záéíóú]+)-(\d{4})"/gi)];
  const meses = ids
    .map(([, mes, anio]) => ({ mes: MESES[mes.toLowerCase()], anio: Number(anio) }))
    .filter((m) => m.mes)
    .sort((a, b) => a.anio - b.anio || a.mes - b.mes);
  const ultimo = meses[meses.length - 1];
  if (!ultimo) {
    problemas.push(`convenios/${gremio}.ts: no pude parsear los meses de la escala`);
    continue;
  }
  // Último día del último mes cargado.
  const vence = new Date(Date.UTC(ultimo.anio, ultimo.mes, 0));
  const nombreMes = Object.keys(MESES).find((k) => MESES[k] === ultimo.mes) ?? "?";
  const fila: Fila = {
    vence,
    campo: `Escalas ${gremio}`,
    valorActual: `la escala llega hasta ${nombreMes} ${ultimo.anio}`,
    venceTexto: fmtFecha(vence),
    accion:
      "Cargar el mes siguiente SOLO con la circular oficial del gremio en la mano (nunca blogs)",
  };
  filasConvenio.set(gremio, fila);
  filas.push(fila);
}

// --- canasta-crianza.ts: serie mensual del INDEC -------------------------
// Es dato YMYL (referencia de cuota alimentaria) y se actualiza SOLO corriendo el generador,
// así que si nadie lo corre queda viejo en silencio. El INDEC publica el mes M alrededor del
// día 15 del mes M+1 ⇒ el dato del mes M vence cuando sale el siguiente.
{
  const texto = leerArchivo("calcular-ar/src/data/canasta-crianza.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/canasta-crianza.ts");
  } else {
    const m = texto.match(/ultimoPeriodo:\s*"(\d{4})-(\d{2})"/);
    if (m) {
      const anio = Number(m[1]);
      const mes = Number(m[2]);
      const vence = new Date(Date.UTC(anio, mes + 1, 15)); // publicación del mes siguiente
      const nombreMes = Object.keys(MESES).find((k) => MESES[k] === mes) ?? "?";
      const fila: Fila = {
        vence,
        campo: "Canasta de crianza (INDEC)",
        valorActual: `serie hasta ${nombreMes} ${anio}`,
        venceTexto: `${fmtFecha(vence)} (sale el mes siguiente)`,
        accion:
          "Correr npx -y tsx calcular-ar/scripts/gen_canasta_crianza.ts (se actualiza solo desde la planilla oficial) + check_canasta_crianza.ts",
      };
      filas.push(fila);
      filaCanastaCrianza = fila;
    } else {
      problemas.push("canasta-crianza.ts: no pude parsear ultimoPeriodo");
    }
  }
}

// --- canasta-basica.ts: CBA/CBT del INDEC (líneas de pobreza e indigencia) ----
// Mismo ritmo que la canasta de crianza: el INDEC publica el mes M ~día 14-15 del mes M+1.
// Es dato sensible (umbral de pobreza), se actualiza SOLO corriendo el generador contra la API.
{
  const texto = leerArchivo("calcular-ar/src/data/canasta-basica.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/canasta-basica.ts");
  } else {
    const m = texto.match(/ultimoPeriodo:\s*"(\d{4})-(\d{2})"/);
    if (m) {
      const anio = Number(m[1]);
      const mes = Number(m[2]);
      const vence = new Date(Date.UTC(anio, mes + 1, 14)); // publicación del mes siguiente
      const nombreMes = Object.keys(MESES).find((k) => MESES[k] === mes) ?? "?";
      filas.push({
        vence,
        campo: "Canasta básica CBA/CBT (INDEC)",
        valorActual: `serie hasta ${nombreMes} ${anio}`,
        venceTexto: `${fmtFecha(vence)} (sale el mes siguiente)`,
        accion:
          "Correr npx -y tsx calcular-ar/scripts/gen_canasta_basica.ts (trae la serie de la API oficial y cruza contra las líneas del INDEC) + check_canasta_basica.ts",
      });
    } else {
      problemas.push("canasta-basica.ts: no pude parsear ultimoPeriodo");
    }
  }
}

// --- prestaciones.ts + asignaciones.ts: las resoluciones MENSUALES de ANSES ----------------
// Es el dato que más rápido se pudre de todo el moat: ANSES dicta dos resoluciones nuevas cada mes
// (haberes y asignaciones, distintas: que una esté al día no prueba nada de la otra) y el PEN un
// decreto de bono. Desde el 28/9/2026 las carga solo scripts/datos-vivos/cargar_anses.ts —con
// ancla contra la fórmula legal— y el sitio pasa al mes nuevo el día 1 por fecha. Estas filas se
// leen importando los módulos (no con regex: los datos ahora son cadenas de meses, y el "mes
// vigente" depende de la fecha).
{
  const mesDe = (periodo: string) => Object.keys(MESES).find((k) => MESES[k] === Number(periodo.slice(5, 7))) ?? "?";
  const finDe = (periodo: string) => new Date(Date.UTC(Number(periodo.slice(0, 4)), Number(periodo.slice(5, 7)), 0));
  const P = PRESTACIONES_VIGENTES;
  filas.push({
    vence: finDe(P.periodo),
    campo: "Haberes, bono y bases imponibles (ANSES)",
    valorActual: `${P.resolucion} + ${BONO_VIGENTE.norma} — rige ${mesDe(P.periodo)} ${P.periodo.slice(0, 4)}`,
    venceTexto: `${fmtFecha(finDe(P.periodo))} (resolución mensual)`,
    accion: RESOLUCION_PROXIMA
      ? `Nada a mano: ${RESOLUCION_PROXIMA.resolucion} (${RESOLUCION_PROXIMA.periodo}) ya está cargada y el sitio pasa solo el día 1` +
        (MES_PREVISIONAL_SIN_BONO ? ` — FALTA el decreto del bono de ${MES_PREVISIONAL_SIN_BONO}: sin él el mes no entra en vigencia` : "")
      : "La carga scripts/datos-vivos/cargar_anses.ts apenas sale en el B.O. (~día 23-30). Si el workflow avisó que NO pasó el ancla, leer el aviso y cargar a mano en MESES_PREVISIONALES de prestaciones.ts + RESOLUCIONES de gen_jubilaciones.ts",
  });
  const A = ASIGNACIONES_VIGENTES;
  filas.push({
    vence: finDe(A.periodo),
    campo: "Asignaciones familiares y AUH (ANSES)",
    valorActual: `${A.resolucion} — rige ${mesDe(A.periodo)} ${A.periodo.slice(0, 4)}`,
    venceTexto: `${fmtFecha(finDe(A.periodo))} (resolución mensual)`,
    accion: ASIGNACIONES_PROXIMAS
      ? `Nada a mano: ${ASIGNACIONES_PROXIMAS.resolucion} (${ASIGNACIONES_PROXIMAS.periodo}) ya está cargada; la tabla se deriva con ceil (art. 3) y el día 1 entra sola`
      : "La carga scripts/datos-vivos/cargar_anses.ts (% del art. 1 + tope del art. 4, que tiene que reproducirse al peso). Si no pasó el ancla, agregar la fila a RESOLUCIONES_ASIGNACIONES_SIGUIENTES a mano y correr check_asignaciones.ts",
  });
  // Un mes cargado por adelantado ya es cobertura: la fila no vence mientras exista el siguiente.
  for (const f of filas.slice(-2)) {
    if ((f.campo.startsWith("Haberes") && RESOLUCION_PROXIMA && !MES_PREVISIONAL_SIN_BONO) ||
        (f.campo.startsWith("Asignaciones") && ASIGNACIONES_PROXIMAS)) {
      f.vence = new Date(f.vence.getTime() + 31 * 86_400_000);
    }
  }
}

// --- monotributo.ts: escalas semestrales --------------------------------
{
  const texto = leerArchivo("calcular-ar/src/data/monotributo.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/monotributo.ts");
  } else {
    const prox = texto.match(/proximaActualizacion:\s*"([^"]+)"/)?.[1];
    const desde = texto.match(/desde:\s*"([^"]+)"/)?.[1] ?? "?";
    const mesProx = prox ? parseMesAnio(prox) : null;
    // Las escalas vigentes vencen el día anterior al inicio del mes de la
    // próxima actualización (ej.: actualización "agosto 2026" → vencen 31/7/2026).
    const vence = mesProx ? new Date(mesProx.getTime() - 86_400_000) : null;
    if (vence) {
      filas.push({
        vence,
        campo: "Escalas monotributo",
        valorActual: `vigentes desde ${desde}`,
        venceTexto: fmtFecha(vence),
        accion: "Actualizar desde ARCA (afip.gob.ar/monotributo/categorias.asp) — NUNCA blogs",
      });
    } else {
      problemas.push("monotributo.ts: no pude parsear proximaActualizacion");
    }

    // Desde el 5/8/2026 la ventana de recategorización NO se escribe a mano: la deriva
    // `ventanaRecategorizacion()` (regla permanente de ARCA: febrero y agosto, hasta el día 5)
    // y las páginas que la muestran revalidan cada hora. Queda en el semáforo como testigo,
    // con vencimiento en la ventana SIGUIENTE a la próxima: si alguna vez aparece en rojo es
    // porque la derivación se rompió, no porque haya un texto que rotar.
    const v = ventanaRecategorizacion();
    const venceV = new Date(
      Date.UTC(v.mes === 8 ? v.anio + 1 : v.anio, v.mes === 8 ? 1 : 7, 5),
    );
    filas.push({
      vence: venceV,
      campo: "Ventana de recategorización",
      valorActual: `${v.textoCierre}${v.abierta ? " (abierta)" : ""} — derivada, no se escribe a mano`,
      venceTexto: fmtFecha(venceV),
      accion: "Nada a mano: la deriva ventanaRecategorizacion() y check_monotributo.ts la ancla",
    });
  }
}

// --- desempleo.ts: escala del SMVM (de ahí cuelgan piso y techo de la prestación) ---
// El monto de la prestación por desempleo NO se publica solo: es el 50%/100% del SMVM vigente.
// Cuando la escala del Consejo del Salario se queda sin meses, la página entera queda vieja.
{
  const texto = leerArchivo("calcular-ar/src/data/desempleo.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/desempleo.ts");
  } else {
    const periodos = [...texto.matchAll(/\{\s*periodo:\s*"(\d{4})-(\d{2})"/g)].map((m) => ({
      anio: Number(m[1]),
      mes: Number(m[2]),
    }));
    const ultimo = periodos[periodos.length - 1];
    if (!ultimo) {
      problemas.push("desempleo.ts: no pude parsear la escala SMVM_SERIE");
    } else {
      // El último mes con norma rige hasta el último día de ese mes.
      const vence = new Date(Date.UTC(ultimo.anio, ultimo.mes, 0));
      filas.push({
        vence,
        campo: "Escala del SMVM (prestación por desempleo)",
        valorActual: `la escala llega hasta ${String(ultimo.mes).padStart(2, "0")}/${ultimo.anio}`,
        venceTexto: fmtFecha(vence),
        accion:
          "Buscar la resolución nueva del Consejo Nacional del Empleo, la Productividad y el SMVM en boletinoficial.gob.ar → agregar los meses al final de SMVM_SERIE en calcular-ar/src/data/desempleo.ts + correr check_desempleo.ts (verifica la derivación piso 50% / techo 100% contra lo que publica ANSES)",
      });
    }
  }
}

// --- casas-particulares.ts: escala de la CNTCP --------------------------
// La CNTCP no tiene calendario fijo: resuelve cuando se reúne la comisión, y entre resolución y
// resolución la escala anterior SIGUE vigente (no vence sola). Por eso el testigo no es un mes de
// la escala sino la fecha en que se verificó por última vez que no hubiera resolución nueva: si
// hace más de 45 días que nadie mira el Boletín Oficial, el dato está sin vigilar.
{
  const texto = leerArchivo("calcular-ar/src/data/casas-particulares.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/casas-particulares.ts");
  } else {
    const consultado = texto.match(/consultadoEl:\s*"(\d{4}-\d{2}-\d{2})"/);
    const vigenteEn = texto.match(/vigenteEn:\s*"([^"]+)"/);
    if (!consultado) {
      problemas.push("casas-particulares.ts: no pude parsear consultadoEl");
    } else {
      const verificado = new Date(`${consultado[1]}T00:00:00Z`);
      const vence = new Date(verificado.getTime() + 45 * 86_400_000);
      filaCasasParticulares = {
        vence,
        campo: "Escala de casas particulares (CNTCP)",
        valorActual: `escala verificada el ${consultado[1]}, liquidando ${vigenteEn ? vigenteEn[1] : "el mes en curso"}`,
        venceTexto: fmtFecha(vence),
        accion:
          "Buscar con `npx -y tsx tools/boletin-oficial.ts --buscar \"CASAS PARTICULARES\" --dias 45` si la CNTCP dictó una resolución posterior a la 6/2026 (⚠️ no toda resolución de la CNTCP trae escala: la 5/2026 era sólo la convocatoria a la sesión plenaria — hay que abrir el aviso con `--aviso <id> --fecha <ISO>` y leer el articulado). Si salió con escala: los ANEXOS **no** vienen en el PDF del aviso ni siempre están en argentina.gob.ar/normativa — se bajan del BORA con un POST a https://www.boletinoficial.gob.ar/pdf/download_anexo con `seccion=primera&nroAnexo=<N>&idAnexo=<id>&fechaPublicacion=<AAAAMMDD>`, donde el idAnexo sale de las llamadas `descargarPDFAnexo(...)` del HTML del aviso; la respuesta es JSON con el PDF en `pdfBase64`. Parsear con `tools/pdf-tabla.ts` (por coordenadas, NUNCA texto plano), cargar TODOS los meses en ESCALAS_POR_MES de calcular-ar/src/data/casas-particulares.ts y correr check_casas_particulares.ts, que ancla la derivación mes a mes. Si NO salió: alcanza con mover consultadoEl a la fecha de hoy (la escala vieja sigue vigente hasta que haya una nueva, y la serie cargada llega hasta diciembre de 2026).",
      };
      filas.push(filaCasasParticulares);
    }
  }
}

// --- riesgos-trabajo.ts: los pisos SEMESTRALES de la SRT -----------------
// La SRT dicta una resolución cada seis meses actualizando por RIPTE los pisos del art. 14 ap. 2 y
// del art. 15 ap. 2 de la Ley 24.557 y las compensaciones del art. 11 ap. 4 (art. 17 bis de la Ley
// 26.773, incorporado por el art. 21 de la Ley 27.348). El testigo es `proximaRevision`, que el
// propio archivo declara: cuando llega esa fecha, la resolución nueva ya tiene que estar en el B.O.
// Un piso viejo acá no es un dato desactualizado cualquiera: es un número de plata que alguien
// puede reclamar de menos.
{
  const texto = leerArchivo("calcular-ar/src/data/riesgos-trabajo.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/riesgos-trabajo.ts");
  } else {
    const proxima = texto.match(/proximaRevision:\s*"(\d{4}-\d{2}-\d{2})"/);
    const resolucion = texto.match(/resolucion:\s*"([^"]+)"/);
    const hasta = texto.match(/hasta:\s*"([^"]+)"/);
    if (!proxima) {
      problemas.push("riesgos-trabajo.ts: no pude parsear proximaRevision");
    } else {
      filas.push({
        vence: new Date(`${proxima[1]}T00:00:00Z`),
        campo: "Pisos de la indemnización por accidente de trabajo (SRT)",
        valorActual: `${resolucion ? resolucion[1] : "resolución SRT"} — rige hasta ${hasta ? hasta[1] : "el fin del semestre"}`,
        venceTexto: fmtFecha(new Date(`${proxima[1]}T00:00:00Z`)),
        accion:
          "Buscar la resolución nueva con `npx -y tsx tools/boletin-oficial.ts --buscar \"RIESGOS DEL TRABAJO\" --dias 15` y leerla con `--aviso <id>`: trae los cuatro montos en sus arts. 1 a 4. Actualizar PISOS, COMPENSACIONES y VIGENCIA_ART en calcular-ar/src/data/riesgos-trabajo.ts (incluida la URL del aviso en ART_FUENTES) y correr check_riesgos_trabajo.ts. Si todavía no salió, mover proximaRevision unos días: los pisos viejos siguen vigentes hasta que se publique la resolución nueva.",
      });
    }
  }
}

// --- aportes-casas-particulares.ts: la tabla mensual de ARCA -------------
// Acá sí hay calendario: ARCA sube un PDF por mes con el nombre `...-MM-AA.pdf`. El testigo es ese
// nombre: si el archivo cargado es el de julio (que se paga en agosto), a fin de agosto tiene que
// haber aparecido el de agosto. `scripts/gen_aportes_casas.ts` prueba la URL del mes siguiente y,
// si existe, parsea la tabla nueva por coordenadas y la compara contra la cargada: nadie mira un
// PDF a mano.
{
  const texto = leerArchivo("calcular-ar/src/data/aportes-casas-particulares.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/aportes-casas-particulares.ts");
  } else {
    const archivo = texto.match(/archivoPdf:\s*"[^"]*-(\d{2})-(\d{2})\.pdf"/);
    const mesVigente = texto.match(/mesVigente:\s*"([^"]+)"/);
    if (!archivo) {
      problemas.push("aportes-casas-particulares.ts: no pude parsear archivoPdf");
    } else {
      const mes = Number(archivo[1]);
      const anio = 2000 + Number(archivo[2]);
      // El PDF de MM se paga en MM+1; el de MM+1 debería estar publicado para fin de ese mes.
      const vence = new Date(Date.UTC(anio, mes + 1, 0));
      // El PDF que TENDRÍA que estar publicado: el del mes siguiente al cargado (misma
      // cuenta que hace `gen_aportes_casas.ts`), en el formato MM-AA del nombre del archivo.
      mmaaAportesBuscado = `${String(mes === 12 ? 1 : mes + 1).padStart(2, "0")}-${String(
        mes === 12 ? Number(archivo[2]) + 1 : Number(archivo[2]),
      ).padStart(2, "0")}`;
      filaAportesCasas = {
        vence,
        campo: "Aportes de casas particulares (ARCA)",
        valorActual: `tabla de ${mesVigente ? mesVigente[1] : `${archivo[1]}/${archivo[2]}`} (PDF ${archivo[1]}-${archivo[2]})`,
        venceTexto: fmtFecha(vence),
        accion:
          "Correr `npx -y tsx calcular-ar/scripts/gen_aportes_casas.ts` (prueba si ARCA publicó el mes siguiente, baja el PDF y lo parsea por coordenadas). Si salió: reemplazar TABLA_APORTES + VIGENCIA_APORTES + la URL de la fuente en calcular-ar/src/data/aportes-casas-particulares.ts, actualizar el bloque PDF_ARCA de scripts/check_aportes_casas.ts y correrlo. NUNCA cargar esta tabla desde el texto plano del PDF: los encabezados vienen desordenados y se cruzan las columnas (mina de s77).",
      };
      filas.push(filaAportesCasas);
    }
  }
}

// --- plazofijo.ts: TNA fallback + inflación default ----------------------
{
  const texto = leerArchivo("calcular-ar/src/data/plazofijo.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/plazofijo.ts");
  } else {
    const tna = texto.match(/TNA_FALLBACK\s*=\s*\{\s*valor:\s*([\d.]+)\s*,\s*fechaISO:\s*"([^"]+)"/);
    if (tna) {
      // Desde la obra O-12 (1/8/2026) este valor lo rota `tools/rotar-tna.ts` solo, como paso 0
      // de cada deploy: ya no es una tarea que alguien tenga que recordar. Sigue en el semáforo
      // como testigo (si se desfasa mucho es porque hace mucho que no se publica, o porque el
      // rotador se rompió), pero con vencimiento largo para no gritar en falso todas las semanas.
      const fechaDato = new Date(`${tna[2]}T00:00:00Z`);
      const vence = new Date(fechaDato.getTime() + 60 * 86_400_000);
      filas.push({
        vence,
        campo: "TNA_FALLBACK (plazo fijo)",
        valorActual: `${tna[1]}% (dato del ${tna[2]})`,
        venceTexto: "automático — se rota en cada deploy (O-12)",
        accion: "Nada a mano: lo rota scripts/datos-vivos/rotar_plazofijo.ts en cada corrida del workflow datos-vivos. Si quedó viejo, mirar las corridas del workflow",
      });
    } else {
      problemas.push("plazofijo.ts: no pude parsear TNA_FALLBACK");
    }

    const ipc = texto.match(/INFLACION_DEFAULT\s*=\s*\{\s*mensualPct:\s*([\d.]+)\s*,\s*periodo:\s*"([^"]+)"/);
    if (ipc) {
      const mesDato = parseMesAnio(ipc[2]);
      if (mesDato) {
        // El IPC del mes M se publica ~día 12 del mes M+1. El dato guardado
        // queda viejo cuando sale el IPC del mes siguiente al suyo:
        // dato "abril 2026" → IPC de mayo sale ~12/6/2026 → esa es la fecha límite.
        // OJO: el día 12 es optimista (INDEC suele publicar el 13/14), así que esta fecha sola
        // producía 1-3 días de 🔴 falso todos los meses. Cuando el calendario pasa, la verdad la
        // define la serie oficial, no el almanaque → `confirmarVencimientoIpc()`.
        const vence = new Date(Date.UTC(mesDato.getUTCFullYear(), mesDato.getUTCMonth() + 2, 12));
        filaIpc = {
          vence,
          campo: "INFLACION_DEFAULT (IPC)",
          valorActual: `${ipc[1]}% mensual (${ipc[2]})`,
          venceTexto: `~${fmtFecha(vence)} (sale el IPC nuevo)`,
          accion: "Nada a mano: el workflow datos-vivos baja la serie del INDEC (gen_ipc_serie.ts), deriva el % (rotar_plazofijo.ts) y publica",
        };
        periodoIpcGuardado = fmtFecha(mesDato).slice(0, 7); // YYYY-MM
        filas.push(filaIpc);
      } else {
        problemas.push("plazofijo.ts: no pude parsear el periodo de INFLACION_DEFAULT");
      }
    } else {
      problemas.push("plazofijo.ts: no pude parsear INFLACION_DEFAULT");
    }
  }
}

// --- aguinaldo.ts: fechas atadas al año ----------------------------------
{
  const texto = leerArchivo("calcular-ar/src/data/aguinaldo.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/aguinaldo.ts");
  } else {
    const anioMatch = texto.match(/SEMESTRES_(\d{4})/);
    const anio = anioMatch ? Number(anioMatch[1]) : null;
    const pagos = [...texto.matchAll(/fechaPago:\s*"([^"]+)"/g)].map((m) => m[1]);
    if (anio) {
      // Rotar a los semestres del año siguiente apenas se pague el SAC de diciembre.
      const vence = new Date(Date.UTC(anio, 11, 18)); // 18/12 = pago del 2º SAC
      filas.push({
        vence,
        campo: `Semestres aguinaldo ${anio}`,
        valorActual: pagos.join(" · ") || `SEMESTRES_${anio}`,
        venceTexto: `dic ${anio} (tras el pago del 18/12)`,
        accion: `Rotar SEMESTRES_${anio} → SEMESTRES_${anio + 1} (las fechas legales 30/6 y 18/12 no cambian)`,
      });
    } else {
      problemas.push("aguinaldo.ts: no encontré SEMESTRES_<año>");
    }
  }
}

// --- feriados.ts: los días turísticos del año que viene -------------------
// El art. 7 de la Ley 27.399 obliga al Poder Ejecutivo a fijarlos con 50 días de anticipación al
// fin del año calendario, o sea ~11 de noviembre. Todo el resto del calendario se deriva de la ley
// y no vence nunca; esto es lo único que hay que ir a buscar cada año.
{
  const texto = leerArchivo("calcular-ar/src/data/feriados.ts");
  if (!texto) {
    problemas.push("No encontré calcular-ar/src/data/feriados.ts");
  } else {
    const anios = [...texto.matchAll(/^\s{2}(\d{4}):\s*\{/gm)].map((m) => Number(m[1]));
    const ultimo = anios.length ? Math.max(...anios) : null;
    if (ultimo) {
      // Vence cuando arranca el año siguiente al último cargado: ahí el calendario queda incompleto.
      const vence = new Date(Date.UTC(ultimo, 10, 11)); // 11/11 del último año cargado
      filas.push({
        vence,
        campo: "Días no laborables turísticos (Ley 27.399 art. 7)",
        valorActual: `cargados hasta ${ultimo}`,
        venceTexto: `~${fmtFecha(vence)} (50 días antes de fin de año, art. 7)`,
        accion: `Buscar en boletinoficial.gob.ar la resolución de Jefatura de Gabinete que fija los 3 días turísticos de ${ultimo + 1} (deben caer lunes o viernes) → agregar la entrada ${ultimo + 1} a TURISTICOS_POR_ANIO en calcular-ar/src/data/feriados.ts y correr check_licencias_especiales.ts. Mientras no esté, el motor declara ese año "incompleto" y lo avisa en la página; NO inventa fechas.`,
      });
    } else {
      problemas.push("feriados.ts: no encontré ningún año en TURISTICOS_POR_ANIO");
    }
  }
}

// ---------------------------------------------------------------------------
// Verificación en vivo del IPC: el calendario propone, INDEC dispone
// ---------------------------------------------------------------------------
// Mina real (14/8/2026): el semáforo daba el IPC por vencido el día 12 y el Vigía disparaba
// severidad 'acción' aunque la serie oficial siguiera en el mismo período que el repo — o sea
// no había NADA que rotar. El calendario es una estimación; el hecho es la serie publicada.
// Si la API contesta y no hay período posterior al guardado → la fila baja a 🟡 "INDEC todavía
// no publicó". Si la API no contesta (es lenta y se cae), manda el calendario: preferimos un
// 🔴 de más que ocultar un dato realmente vencido.

const SERIE_IPC = "148.3_INIVELNAL_DICI_M_26"; // la misma que usa tools/check-apis.ts
const TIMEOUT_VERIFICACION_MS = 15_000; // corto a propósito: esto corre en cada arranque
// El rastreo de gremios visita varias páginas por gremio, así que va con techo propio y
// más holgado. Si expira, el semáforo se queda con el calendario: nunca cuelga el arranque.
const TIMEOUT_RASTREO_MS = 45_000;

async function confirmarVencimientoIpc(): Promise<void> {
  if (!filaIpc || !periodoIpcGuardado) return;
  if (diasHasta(filaIpc.vence) >= 0) return; // el calendario todavía no venció: no hace falta red

  const url = `https://apis.datos.gob.ar/series/api/series/?ids=${SERIE_IPC}&format=json&sort=desc&limit=2`;
  try {
    const { json } = await httpGetJsonTolerante(url, TIMEOUT_VERIFICACION_MS);
    // datos.gob.ar devuelve tuplas [fecha, valor] en `data` (no objetos: por eso no sirve
    // extraerDatosFechados, que busca {fecha, valor}). Ordenamos nosotros, venga como venga.
    const data = (json as { data?: [string, number][] }).data;
    if (!Array.isArray(data) || data.length === 0) return;
    const fechas = data
      .filter((fila) => Array.isArray(fila) && typeof fila[0] === "string")
      .map((fila) => fila[0])
      .sort();
    const ultima = fechas[fechas.length - 1];
    if (!ultima) return; // respuesta rara → que mande el calendario

    const periodoPublicado = ultima.slice(0, 7); // YYYY-MM
    if (periodoPublicado > periodoIpcGuardado) return; // vencido de verdad: hay dato nuevo

    filaIpc.esperandoFuente = `INDEC todavía no publicó (último período oficial: ${periodoPublicado})`;
    filaIpc.venceTexto = `esperando a INDEC (último: ${periodoPublicado})`;
    filaIpc.accion =
      "Nada que hacer todavía: la serie oficial sigue en el mismo período que el repo. Cuando INDEC publique, check-apis.ts lo detecta → recalcular % mensual y redeploy";
  } catch {
    // API caída o lenta → sin verificación, manda el calendario (comportamiento anterior).
  }
}

// ---------------------------------------------------------------------------
// Mina real (16/8/2026, pulso del Vigía): el calendario daba por vencida la canasta de crianza el
// 15/8, el Vigía la reportó 🔴 "YA VENCIDO"... y la planilla oficial del INDEC seguía con
// Last-Modified del 16/7/2026, o sea todavía en junio: NO había nada que actualizar. Mismo error
// que ya se había arreglado para el IPC el 14/8 — el calendario es una estimación, el hecho es la
// publicación. Acá el equivalente barato: un HEAD a la planilla (una request, sin descargarla).
// Si la planilla no se tocó desde antes del vencimiento estimado ⇒ INDEC no publicó ⇒ 🟡, no 🔴.
// Si el HEAD falla o no trae Last-Modified, manda el calendario (preferimos un 🔴 de más).

const URL_PLANILLA_CRIANZA = "https://www.indec.gob.ar/ftp/cuadros/sociedad/serie_canasta_crianza.xlsx";

async function confirmarVencimientoCanastaCrianza(): Promise<void> {
  const fila = filaCanastaCrianza;
  if (!fila) return;
  if (diasHasta(fila.vence) >= 0) return; // el calendario todavía no venció: no hace falta red

  try {
    const res = await fetch(URL_PLANILLA_CRIANZA, {
      method: "HEAD",
      signal: AbortSignal.timeout(TIMEOUT_VERIFICACION_MS),
    });
    if (!res.ok) return;
    const lastModified = res.headers.get("last-modified");
    if (!lastModified) return; // sin dato → que mande el calendario
    const publicada = new Date(lastModified);
    if (Number.isNaN(publicada.getTime())) return;
    if (publicada.getTime() >= fila.vence.getTime()) return; // hay planilla nueva: vencido de verdad

    const fecha = fmtFecha(publicada);
    fila.esperandoFuente = `INDEC todavía no publicó (planilla oficial sin cambios desde ${fecha})`;
    fila.venceTexto = `esperando a INDEC (planilla del ${fecha})`;
    fila.accion =
      "Nada que hacer todavía: la planilla oficial sigue en el mismo período que el repo. Cuando INDEC la actualice, correr gen_canasta_crianza.ts + check_canasta_crianza.ts y redeploy";
  } catch {
    // Red caída o lenta → sin verificación, manda el calendario (comportamiento anterior).
  }
}

// ---------------------------------------------------------------------------
// Vencidos que NO son accionables: el organismo todavía no publicó
// ---------------------------------------------------------------------------
// Mina real (pulsos del Vigía del 1, 2 y 3/9/2026): los tres datos que el semáforo daba por
// vencidos —escalas de UOCRA, escalas de camioneros y aportes de ARCA— NO tenían nada que
// cargar: corridos a mano, `circulares-gremios.ts` decía "sin circulares nuevas" y
// `gen_aportes_casas.ts` decía "ARCA no publicó todavía el PDF de 08-26". Aun así el vencido
// subía el pulso entero a rojo tres días seguidos. Si todo es rojo, nada es rojo: ese ruido
// entierra el rojo verdadero. Misma corrección que ya se hizo para el IPC (14/8) y la canasta
// de crianza (16/8), extendida a las fuentes que tienen detector propio.
//
// DOS INVARIANTES QUE NO SE TOCAN:
//  1. "No pudimos ver" != "no hay nada". Si el rastreador no pudo leer el sitio (o el HEAD
//     falla), manda el calendario y la fila sigue vencida — preferimos un rojo de más antes
//     que ocultar un dato realmente vencido.
//  2. Solo se degrada lo que YA venció por calendario. Nada de esto adelanta un vencimiento.

const DIR_CACHE = path.resolve(import.meta.dirname, ".cache");
const ARCHIVO_CACHE = path.join(DIR_CACHE, "fuentes-publicaron.json");

/**
 * Caché del día. Estas comprobaciones pegan contra sitios oficiales y el semáforo corre en CADA
 * arranque de CADA sistema autónomo: sin caché, el rastreo de gremios son ~17 requests por
 * arranque contra los sitios de los gremios. Un resultado por día alcanza — la fuente no publica
 * dos veces en la misma jornada, y si publicara, el arranque del día siguiente lo levanta.
 */
type EntradaCache = { fecha: string; publico: boolean; detalle: string };

function leerCache(): Record<string, EntradaCache> {
  try {
    return JSON.parse(readFileSync(ARCHIVO_CACHE, "utf8")) as Record<string, EntradaCache>;
  } catch {
    return {}; // sin caché (o corrupto) => se recomprueba, que es el lado seguro
  }
}

function cacheDeHoy(clave: string): EntradaCache | null {
  const hoy = new Date().toISOString().slice(0, 10);
  const e = leerCache()[clave];
  return e && e.fecha === hoy ? e : null;
}

function guardarCache(clave: string, publico: boolean, detalle: string): void {
  try {
    const todo = leerCache();
    todo[clave] = { fecha: new Date().toISOString().slice(0, 10), publico, detalle };
    mkdirSync(DIR_CACHE, { recursive: true });
    writeFileSync(ARCHIVO_CACHE, JSON.stringify(todo, null, 2));
  } catch {
    // El caché es una optimización, no un requisito: si no se puede escribir, seguimos igual.
  }
}

/** Corre `tarea` con un techo de tiempo; si expira devuelve null (=> manda el calendario). */
async function conTecho<T>(ms: number, tarea: () => Promise<T>): Promise<T | null> {
  return Promise.race([
    tarea().catch(() => null),
    new Promise<null>((r) => setTimeout(() => r(null), ms)),
  ]);
}

// --- ARCA: ¿existe ya el PDF del mes siguiente? --------------------------
// El testigo es barato y exacto: la URL del PDF es predecible (la arma `gen_aportes_casas.ts`
// con el mismo criterio), así que un HEAD contesta la única pregunta que importa. No se baja ni
// se parsea nada acá: si el PDF apareció, la fila queda vencida y el generador hace el trabajo real.
const BASE_PDF_ARCA =
  "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos";

async function confirmarVencimientoAportesCasas(): Promise<void> {
  const fila = filaAportesCasas;
  const mmaa = mmaaAportesBuscado;
  if (!fila || !mmaa) return;
  if (diasHasta(fila.vence) >= 0) return; // el calendario todavía no venció: no hace falta red

  const cacheado = cacheDeHoy(`arca-aportes-${mmaa}`);
  let publico: boolean | null = cacheado ? cacheado.publico : null;

  if (publico === null) {
    const anio = 2000 + Number(mmaa.split("-")[1]);
    const url = `${BASE_PDF_ARCA}/${anio}/Casas-particulares-aportes-y-contribuciones-${mmaa}.pdf`;
    const res = await conTecho(TIMEOUT_VERIFICACION_MS, async () =>
      fetch(url, { method: "HEAD", signal: AbortSignal.timeout(TIMEOUT_VERIFICACION_MS) }),
    );
    if (!res) return; // sin respuesta => manda el calendario
    // 404 = todavía no lo subieron. Otro error (403, 5xx) NO prueba nada: no degradamos.
    if (res.status === 404) publico = false;
    else if (res.ok) publico = true;
    else return;
    guardarCache(`arca-aportes-${mmaa}`, publico, `HTTP ${res.status}`);
  }

  if (publico) return; // el PDF está: vencido de verdad, hay algo concreto que cargar

  const comprobado = cacheado?.fecha ?? new Date().toISOString().slice(0, 10);
  fila.esperandoFuente = `ARCA todavía no publicó el PDF de ${mmaa} (comprobado ${comprobado})`;
  fila.venceTexto = `esperando a ARCA (PDF ${mmaa} inexistente al ${comprobado})`;
  fila.accion =
    `Nada que hacer todavía: ARCA no subió el PDF de ${mmaa}, así que la tabla cargada sigue siendo la vigente. ` +
    "Cuando aparezca, `npx -y tsx calcular-ar/scripts/gen_aportes_casas.ts` lo baja y lo parsea por coordenadas.";
}

// --- CNTCP: ¿salió una resolución con escala posterior a la cargada? -----
// La fila nace midiendo el reloj (`consultadoEl` + 45 días). Acá se le pregunta a la FUENTE, y el
// veredicto pisa al calendario en las dos direcciones: si hay resolución con escala, la fila se
// pone 🔴 aunque el reloj no haya llegado; si no hay, deja de llamar "vencimiento" a "hace rato que
// nadie mira". Mismo contrato que el de los gremios: veredicto estructurado, techo de tiempo, caché
// diaria, y "no pude ver" NUNCA se cachea como "no publicó".
async function confirmarEscalaCasasParticulares(): Promise<void> {
  if (!filaCasasParticulares) return;
  const fila = filaCasasParticulares;
  const hoy = new Date().toISOString().slice(0, 10);

  let publico: boolean;
  let detalle: string;
  const cacheado = cacheDeHoy("cntcp");
  if (cacheado) {
    publico = cacheado.publico;
    detalle = cacheado.detalle;
  } else {
    const r = await conTecho(TIMEOUT_RASTREO_MS, () => nuevasConEscala(40));
    if (!r || !r.cargada) return; // rastreo lento, caído o data ilegible => manda el calendario
    const conEscala = r.nuevas.filter((n) => n.fijaEscala === true);
    const dudosas = r.nuevas.filter((n) => n.fijaEscala === null);
    if (dudosas.length > 0 && conEscala.length === 0) return; // no pudimos leer: no se afirma nada
    publico = conEscala.length > 0;
    detalle = publico
      ? conEscala.map((n) => `Res. ${n.numero}/${n.anio} del ${n.fecha} — ${n.url}`).join(" · ")
      : `${r.nuevas.length} resolución(es) posterior(es), ninguna fija remuneraciones (cargada: ${r.cargada.numero}/${r.cargada.anio})`;
    guardarCache("cntcp", publico, detalle);
  }

  const comprobado = cacheDeHoy("cntcp")?.fecha ?? hoy;
  if (publico) {
    fila.vence = new Date(Date.now() - 86_400_000); // vencida: hay escala nueva publicada
    fila.venceTexto = `VENCIDA — hay resolución nueva (comprobado ${comprobado})`;
    fila.valorActual = `${fila.valorActual} · ${detalle}`;
    fila.accion = `ROTAR YA. ${fila.accion}`;
  } else {
    fila.esperandoFuente = `la CNTCP no dictó una resolución con escala posterior (comprobado ${comprobado}: ${detalle})`;
    fila.venceTexto = `verificado contra el B.O. el ${comprobado}`;
  }
}

// --- Gremios: ¿publicaron una circular que no tengamos cargada? ----------
// La respuesta la da el rastreador, que es la fuente de verdad de esto (YA_CARGADAS vive ahí).
// Se le pide el veredicto estructurado, NO se parsea su salida de consola.
async function confirmarVencimientoConvenios(): Promise<void> {
  const pendientes = [...filasConvenio.entries()].filter(([, f]) => diasHasta(f.vence) < 0);
  if (pendientes.length === 0) return; // ninguna escala vencida: no hace falta red

  const claves = pendientes.map(([g]) => g);
  const cacheados = claves.map((g) => cacheDeHoy(`gremio-${g}`));
  const veredictos = new Map<string, { publico: boolean; detalle: string }>();

  if (cacheados.some((c) => c === null)) {
    const rastreo = await conTecho(TIMEOUT_RASTREO_MS, () => rastrearGremios(claves));
    if (!rastreo) return; // rastreo lento o caído => manda el calendario
    for (const r of rastreo) {
      // `sin-lectura` = no pudimos ver => NO degradamos y NO cacheamos un "no publicó" falso.
      if (r.estado === "sin-lectura") continue;
      const publico = r.estado === "hay-nuevas";
      const detalle = publico
        ? `${r.nuestras.length} circular(es) sin cargar`
        : `${r.pdfs.length} PDF vistos, ninguno nuevo de nuestra rama`;
      veredictos.set(r.clave, { publico, detalle });
      guardarCache(`gremio-${r.clave}`, publico, detalle);
    }
  } else {
    claves.forEach((g, i) => {
      const c = cacheados[i]!;
      veredictos.set(g, { publico: c.publico, detalle: c.detalle });
    });
  }

  const hoy = new Date().toISOString().slice(0, 10);
  for (const [gremio, fila] of pendientes) {
    const v = veredictos.get(gremio);
    if (!v || v.publico) continue; // sin veredicto (no se pudo ver) o hay circular nueva => vencida
    const comprobado = cacheDeHoy(`gremio-${gremio}`)?.fecha ?? hoy;
    fila.esperandoFuente = `el gremio todavía no publicó la circular siguiente (comprobado ${comprobado}: ${v.detalle})`;
    fila.venceTexto = `esperando al gremio (comprobado ${comprobado})`;
    fila.accion =
      "Nada que hacer todavía: el rastreador no ve ninguna circular de nuestra rama sin cargar. " +
      "Cuando el gremio publique, `npx -y tsx tools/circulares-gremios.ts` la lista con su URL.";
  }
}

// ---------------------------------------------------------------------------
// Salida: tabla ordenada por urgencia
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  await Promise.all([
    confirmarVencimientoIpc(),
    confirmarVencimientoCanastaCrianza(),
    confirmarVencimientoAportesCasas(),
    confirmarVencimientoConvenios(),
    confirmarEscalaCasasParticulares(),
  ]);

  filas.sort((a, b) => a.vence.getTime() - b.vence.getTime());

  const hoy = new Date().toISOString().slice(0, 10);
  console.log(`— check-datos-vencen · ${hoy} —\n`);

  const anchoCampo = Math.max(...filas.map((f) => f.campo.length), 5);
  const anchoValor = Math.max(...filas.map((f) => f.valorActual.length), 12);
  const anchoVence = Math.max(...filas.map((f) => f.venceTexto.length), 5);

  console.log(
    `   ${"CAMPO".padEnd(anchoCampo)}  ${"VALOR ACTUAL".padEnd(anchoValor)}  ${"VENCE".padEnd(anchoVence)}  ACCIÓN`,
  );
  for (const f of filas) {
    // Una fila esperando a la fuente oficial nunca es 🔴: no hay reemplazo que cargar.
    const icono = f.esperandoFuente ? "🟡" : semaforo(diasHasta(f.vence));
    console.log(
      `${icono} ${f.campo.padEnd(anchoCampo)}  ${f.valorActual.padEnd(anchoValor)}  ${f.venceTexto.padEnd(anchoVence)}  ${f.accion}`,
    );
  }

  const urgentes = filas.filter((f) => !f.esperandoFuente && diasHasta(f.vence) <= 7);
  if (urgentes.length > 0) {
    console.log(
      `\n🔴 ${urgentes.length} dato(s) vencido(s) o por vencer esta semana: ${urgentes.map((f) => f.campo).join(", ")}.`,
    );
  } else {
    console.log("\n✅ Nada vence esta semana.");
  }

  const esperando = filas.filter((f) => f.esperandoFuente);
  if (esperando.length > 0) {
    console.log(
      `\n🟡 ${esperando.length} dato(s) con el calendario vencido pero SIN reemplazo oficial publicado — no hay acción posible:`,
    );
    for (const f of esperando) console.log(`   - ${f.campo}: ${f.esperandoFuente}`);
  }

  // Marcador para consumidores automáticos (el Vigía): "ya vencido" ≠ "vence pronto".
  // Un dato que vence en 4 días no es accionable si la fuente oficial todavía no publicó
  // el reemplazo; uno vencido sí. Sin esta distinción el Vigía dispara 🔴 todos los días.
  // Y "vencido ayer" ≠ "vencido hace dos semanas" (2/9/2026, pulso del Vigía): los 4 datos que
  // rotaron el 31/8 se reportaban con el mismo texto el día 1 y el día 20, así que la REINCIDENCIA
  // —el síntoma de que la rotación dejó de funcionar, no de que el mes cambió— era invisible en el
  // pulso. Ahora cada vencido lleva su antigüedad, que es el número con el que se decide escalar.
  const vencidos = filas.filter((f) => !f.esperandoFuente && diasHasta(f.vence) < 0);
  if (vencidos.length > 0) {
    const conEdad = vencidos.map((f) => {
      const dias = -diasHasta(f.vence);
      return `${f.campo} (hace ${dias} día${dias === 1 ? "" : "s"})`;
    });
    console.log(
      `\n⛔ ${vencidos.length} dato(s) YA VENCIDO(s) — hay que actualizarlos: ${conEdad.join(", ")}.`,
    );
  }

  if (problemas.length > 0) {
    console.log("\n⚠️ Problemas de parsing (¿cambió el formato de algún archivo?):");
    for (const p of problemas) console.log(`   - ${p}`);
  }
}

main().catch((err) => {
  // Informativo, nunca un gate: si algo falla, se dice y se sale con 0.
  console.log(`\n⚠️ check-datos-vencen falló: ${(err as Error).message}`);
});
