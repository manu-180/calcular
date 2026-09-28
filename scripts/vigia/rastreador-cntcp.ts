#!/usr/bin/env -S npx -y tsx
/**
 * rastreador-cntcp.ts — ¿la CNTCP dictó una resolución con escala POSTERIOR a la que tenemos?
 *
 * POR QUÉ EXISTE (15/9/2026, s115). El 3/9 la Comisión Nacional de Trabajo en Casas Particulares
 * dictó la Resolución 6/2026 con la escala de agosto a diciembre, y calcular.ar siguió DOCE DÍAS
 * publicando la escala de julio en `/empleada-domestica` — una de las páginas más buscadas del
 * sitio— sin que ningún semáforo se pusiera rojo. El monitor no falló: hacía exactamente lo que
 * decía. Su testigo era `consultadoEl` más una ventana de 45 días, o sea que **medía cuándo fue la
 * última vez que alguien miró, no si había salido algo**. Un reloj, no un sensor.
 *
 * La diferencia importa porque los dos modos de fallo son opuestos: un reloj avisa tarde cuando la
 * fuente se adelanta, y avisa en vano cuando la fuente no publica nada. Este rastreador mira la
 * fuente: busca en el Boletín Oficial los avisos de la CNTCP y los compara contra el número de
 * resolución que está cargado en el data.
 *
 * ⚠️ LA MINA QUE JUSTIFICA LEER EL ARTICULADO: **no toda resolución de la CNTCP trae escala.** En
 * la misma ventana de agosto de 2026 hubo dos: la **5/2026 (19/8) era sólo la convocatoria a la
 * sesión plenaria** y la **6/2026 (3/9)** era la que fijaba los salarios. Un rastreador que
 * alcanzara con «hay una resolución más nueva» gritaría por cada convocatoria y volvería a
 * entrenar a ignorarlo. Por eso, cuando encuentra una resolución posterior, ABRE el aviso y sólo
 * la marca como relevante si su texto fija remuneraciones.
 *
 * USO:
 *   npx -y tsx tools/rastreador-cntcp.ts            # informe legible
 *   npx -y tsx tools/rastreador-cntcp.ts --json     # { cargada, nuevas: [...] } para el monitor
 *   npx -y tsx tools/rastreador-cntcp.ts --dias 90  # ventana de búsqueda (default 60)
 *   npx -y tsx tools/rastreador-cntcp.ts --desde 4/2026   # como si tuviéramos cargada esa
 *
 * `--desde` existe para poder PROBAR el rastreador contra un caso conocido en vez de creerle a un
 * «no hay nada nuevo», que es la respuesta que también da un radar roto. Con `--desde 4/2026` tiene
 * que encontrar la 5/2026 (convocatoria, ⬜) y la 6/2026 (escala, 🔴): ése es el incidente del 3/9
 * reproducido. Un sensor que nunca se probó en la dirección «encontrar algo» no está probado.
 *
 * SALIDA: exit 0 siempre. Quien decide qué hacer es `check-datos-vencen.ts`; este script informa.
 *
 * Vive en calcular-ar/scripts/vigia/ desde el 28/9/2026: vigila los datos de ESTE repo y corre en su
 * workflow datos-vivos (GitHub Actions), sin depender de la PC de Manuel ni del repo libre_albedrio.
 * En libre_albedrio/tools/ queda un atajo con el mismo nombre que la importa.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { listarSeccion, leerAviso } from "./boletin-oficial";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DATA = join(RAIZ, "src/data/casas-particulares.ts");

/** El texto de un aviso fija salarios si menciona remuneraciones mínimas Y un anexo con escalas. */
function fijaEscala(texto: string): boolean {
  const t = texto.toLowerCase();
  const fijaRemuneraciones =
    /remuneraciones\s+(horarias\s+y\s+)?mensuales\s+m[íi]nimas/.test(t) ||
    /fijar\s+un\s+incremento\s+de\s+las\s+remuneraciones/.test(t);
  const tieneEscala = /escalas?\s+salariales?/.test(t) || /anexo/.test(t);
  return fijaRemuneraciones && tieneEscala;
}

/** El número de resolución que el data declara como fuente de la escala cargada. */
export function resolucionCargada(): { numero: number; anio: number } | null {
  let texto: string;
  try {
    texto = readFileSync(DATA, "utf8");
  } catch {
    return null;
  }
  // La más nueva entre la que fijó la escala y la que la rectificó: una rectificación ya leída y
  // cargada no es "resolución nueva" (28/9/2026: la 7/2026 aparecía como escala sin cargar).
  const normas = [...texto.matchAll(/(?:resolucion|rectificadaPor):\s*"Resoluci[óo]n CNTCP (\d+)\/(\d{4})"/g)]
    .map((m) => ({ numero: Number(m[1]), anio: Number(m[2]) }))
    .sort((a, b) => b.anio - a.anio || b.numero - a.numero);
  return normas[0] ?? null;
}

export type AvisoCntcp = {
  id: string;
  fecha: string;
  numero: number | null;
  anio: number | null;
  titulo: string;
  url: string;
  /** null cuando no se pudo leer el texto del aviso: no se afirma que no traiga escala. */
  fijaEscala: boolean | null;
};

export async function rastrearCntcp(dias: number): Promise<AvisoCntcp[]> {
  const encontrados: AvisoCntcp[] = [];
  const vistos = new Set<string>();
  const hoy = new Date();
  for (let d = 0; d < dias; d++) {
    const dia = new Date(hoy.getTime() - d * 86_400_000).toISOString().slice(0, 10);
    const avisos = await listarSeccion("primera", dia);
    if (!avisos) continue;
    for (const a of avisos) {
      if (!/CASAS PARTICULARES/i.test(a.titulo)) continue;
      if (vistos.has(a.id)) continue;
      vistos.add(a.id);
      const num = a.titulo.match(/Resoluci[óo]n\s+(\d+)\/(\d{4})/i);
      encontrados.push({
        id: a.id,
        fecha: a.fecha,
        numero: num ? Number(num[1]) : null,
        anio: num ? Number(num[2]) : null,
        titulo: a.titulo,
        url: a.url,
        fijaEscala: null,
      });
    }
  }
  return encontrados.sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** Los avisos posteriores a la resolución cargada, con su texto leído para saber si traen escala. */
export async function nuevasConEscala(
  dias = 60,
  desde?: { numero: number; anio: number },
): Promise<{
  cargada: { numero: number; anio: number } | null;
  nuevas: AvisoCntcp[];
}> {
  const cargada = desde ?? resolucionCargada();
  const todos = await rastrearCntcp(dias);
  const posteriores = todos.filter(
    (a) =>
      a.numero !== null &&
      a.anio !== null &&
      cargada !== null &&
      (a.anio > cargada.anio || (a.anio === cargada.anio && a.numero > cargada.numero)),
  );
  for (const a of posteriores) {
    const texto = await leerAviso("primera", a.id, a.fecha);
    a.fijaEscala = texto === null ? null : fijaEscala(texto);
  }
  return { cargada, nuevas: posteriores };
}

async function main() {
  const args = process.argv.slice(2);
  const iDias = args.indexOf("--dias");
  const dias = iDias >= 0 ? Number(args[iDias + 1]) || 60 : 60;
  const iDesde = args.indexOf("--desde");
  const mDesde = iDesde >= 0 ? (args[iDesde + 1] ?? "").match(/^(\d+)\/(\d{4})$/) : null;
  const desde = mDesde ? { numero: Number(mDesde[1]), anio: Number(mDesde[2]) } : undefined;
  const { cargada, nuevas } = await nuevasConEscala(dias, desde);

  if (args.includes("--json")) {
    console.log(JSON.stringify({ cargada, nuevas }, null, 2));
    return;
  }

  console.log(`— rastreador CNTCP · ventana de ${dias} días —\n`);
  if (!cargada) {
    console.log("⚠️  no pude leer el número de resolución cargado en casas-particulares.ts.");
    return;
  }
  console.log(
    `   ${desde ? "simulando cargada" : "cargada en el sitio"}: Resolución CNTCP ${cargada.numero}/${cargada.anio}`,
  );

  const conEscala = nuevas.filter((n) => n.fijaEscala !== false);
  if (nuevas.length === 0) {
    console.log("\n✅ ninguna resolución posterior en el Boletín Oficial: la escala cargada es la vigente.");
    return;
  }
  for (const n of nuevas) {
    const marca = n.fijaEscala === true ? "🔴" : n.fijaEscala === false ? "⬜" : "🟡";
    const nota =
      n.fijaEscala === true
        ? "FIJA REMUNERACIONES — hay que rotar la escala"
        : n.fijaEscala === false
          ? "no fija remuneraciones (convocatoria, designación, etc.)"
          : "no pude leer el aviso: verificar a mano antes de descartarlo";
    console.log(`\n${marca} Resolución ${n.numero}/${n.anio} · ${n.fecha} · ${nota}`);
    console.log(`     ${n.url}`);
  }
  if (conEscala.some((n) => n.fijaEscala === true)) {
    console.log(
      "\n👉 Rotar: los anexos NO vienen en el PDF del aviso. Se bajan del BORA con un POST a" +
        "\n   https://www.boletinoficial.gob.ar/pdf/download_anexo con" +
        "\n   seccion=primera&nroAnexo=<N>&idAnexo=<id>&fechaPublicacion=<AAAAMMDD>;" +
        "\n   el idAnexo sale de las llamadas descargarPDFAnexo(...) del HTML del aviso y la" +
        "\n   respuesta es JSON con el PDF en pdfBase64. Parsear con tools/pdf-tabla.ts.",
    );
  }
}

const esEntrada = process.argv[1]?.replace(/\\/g, "/").endsWith("rastreador-cntcp.ts");
if (esEntrada) void main();
