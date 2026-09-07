// gen_aportes_casas.ts — El rotador de la tabla de aportes de casas particulares.
//
// QUÉ HACE: prueba si ARCA ya publicó el PDF del mes siguiente al cargado, lo baja, lo parsea
// **por coordenadas** (no por texto plano) y compara la tabla nueva contra la que está en el repo.
// Imprime el bloque `TABLA_APORTES` listo para pegar. Ningún número se transcribe a mano.
//
// POR QUÉ POR COORDENADAS: el texto plano del PDF devuelve los encabezados en un orden que no es el
// de las columnas — la primera lectura, el 11/8/2026, ponía $25.694,55 como "cuota ART" cuando es el
// aporte de obra social de la jornada completa. Acá cada número se asigna a su columna por la x del
// encabezado, y al final se corre la prueba aritmética (total = obra social + SIPA + ART).
//
// USO:
//   npx -y tsx calcular-ar/scripts/gen_aportes_casas.ts            # busca el mes siguiente al cargado
//   npx -y tsx calcular-ar/scripts/gen_aportes_casas.ts --mes 09-26  # un mes puntual
//   npx -y tsx calcular-ar/scripts/gen_aportes_casas.ts --verificar  # re-verifica el mes YA cargado
//
// Salida esperada cuando todavía no publicaron: "ARCA no publicó todavía el PDF de MM-AA" y exit 0.
// Es la respuesta correcta, no un error: la tabla vieja sigue siendo la vigente.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import https from "node:https";
import { resolve } from "node:path";
import {
  TABLA_APORTES,
  VIGENCIA_APORTES,
  type CondicionTrabajador,
} from "../src/data/aportes-casas-particulares";

const RAIZ = resolve(import.meta.dirname, "..", "..");
const DIR_DEPS = resolve(RAIZ, "tools", ".pdf-deps");
const BASE_PDF =
  "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos";

/** Instalación perezosa de unpdf, compartida con tools/pdf-extraer.ts y tools/pdf-tabla.ts. */
async function cargarUnpdf(): Promise<any> {
  const marca = resolve(DIR_DEPS, "node_modules", "unpdf", "package.json");
  if (!existsSync(marca)) {
    mkdirSync(DIR_DEPS, { recursive: true });
    if (!existsSync(resolve(DIR_DEPS, "package.json")))
      writeFileSync(
        resolve(DIR_DEPS, "package.json"),
        JSON.stringify({ name: "pdf-deps", private: true, type: "module" }, null, 2),
      );
    execFileSync("npm", ["i", "--prefix", DIR_DEPS, "--silent", "unpdf"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  }
  const url =
    "file:///" + resolve(DIR_DEPS, "node_modules", "unpdf/dist/index.mjs").replace(/\\/g, "/");
  return import(url);
}

function arg(nombre: string): string | undefined {
  const i = process.argv.indexOf(`--${nombre}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

/**
 * Descarga tolerante, reimplementada acá adentro a propósito: los scripts de `calcular-ar` no
 * pueden importar de `tools/` (el typecheck del build de Next no admite importar un `.ts` fuera del
 * proyecto), y es el mismo criterio que ya usa gen_canasta_crianza.ts. Sigue el mismo
 * comportamiento que tools/lib/datos-oficiales.ts: User-Agent de navegador (sin él, varios .gob.ar
 * devuelven 403), redirecciones, y reintento sin verificar TLS cuando la cadena está mal armada.
 */
function bajar(url: string, timeoutMs = 60_000, insecure = false, redirects = 4): Promise<Buffer | null> {
  return new Promise((res) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
          Accept: "*/*",
        },
        rejectUnauthorized: !insecure,
        timeout: timeoutMs,
      },
      (r) => {
        const status = r.statusCode ?? 0;
        if (status >= 301 && status <= 308 && r.headers.location && redirects > 0) {
          r.resume();
          bajar(new URL(r.headers.location, url).toString(), timeoutMs, insecure, redirects - 1).then(res);
          return;
        }
        if (status !== 200) {
          r.resume();
          res(null);
          return;
        }
        const chunks: Buffer[] = [];
        r.on("data", (c: Buffer) => chunks.push(c));
        r.on("end", () => res(Buffer.concat(chunks)));
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", (err) => {
      const code = (err as NodeJS.ErrnoException).code ?? "";
      if (!insecure && /CERT|TLS|SSL|EPROTO|UNABLE/i.test(code)) bajar(url, timeoutMs, true, redirects).then(res);
      else res(null);
    });
  });
}

/** "07-26" → "08-26" */
function mesSiguiente(mmaa: string): string {
  const [mm, aa] = mmaa.split("-").map(Number);
  const mes = mm === 12 ? 1 : mm + 1;
  const anio = mm === 12 ? aa + 1 : aa;
  return `${String(mes).padStart(2, "0")}-${String(anio).padStart(2, "0")}`;
}

function urlDe(mmaa: string): string {
  const anio = 2000 + Number(mmaa.split("-")[1]);
  return `${BASE_PDF}/${anio}/Casas-particulares-aportes-y-contribuciones-${mmaa}.pdf`;
}

type Celda = { x: number; y: number; texto: string };
type Fila = { total: number; obraSocial: number | null; sipa: number | null; art: number };

/** Pasa "$ 25.694,55" a 25694.55 y "$ -" a null. */
function aNumero(txt: string): number | null {
  const limpio = txt.replace(/[$\s]/g, "");
  if (limpio === "" || limpio === "-") return null;
  const n = Number(limpio.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/**
 * Parsea el PDF de ARCA. La estructura es siempre la misma: tres bloques (activo mayor de 18,
 * de 16 a 17 años, jubilado), cada uno con un encabezado y tres filas de importes. Las columnas se
 * identifican por la x de cada encabezado, que es el único dato confiable del PDF.
 */
async function parsear(bytes: Uint8Array): Promise<{
  tabla: Record<CondicionTrabajador, Fila[]>;
  vigencia: string[];
}> {
  const unpdf = await cargarUnpdf();
  const doc = await unpdf.getDocumentProxy(bytes);
  const pagina = await doc.getPage(1);
  const contenido = await pagina.getTextContent();

  const celdas: Celda[] = contenido.items
    .filter((it: any) => typeof it.str === "string" && it.str.trim() !== "")
    .map((it: any) => ({ x: it.transform[4], y: it.transform[5], texto: it.str.trim() }));

  // Las x de los encabezados: se leen del propio PDF para no hardcodear el layout.
  const xDe = (busca: string): number | null => {
    const c = celdas.find((c) => c.texto.startsWith(busca));
    return c ? c.x : null;
  };
  const xArt = xDe("Cuota ART");
  const xSipa = xDe("Contribuciones");
  const xObra = xDe("Aportes");
  const xTotal = xDe("Importe a pagar");
  if (xArt === null || xSipa === null || xObra === null || xTotal === null) {
    throw new Error(
      "No encontré los cuatro encabezados del PDF (Importe a pagar / Aportes / Contribuciones / Cuota ART). Cambió el layout: revisar con `npx -y tsx tools/pdf-tabla.ts <url> --xy` antes de tocar la tabla.",
    );
  }

  // Cada importe se asigna al encabezado más cercano por x. Los encabezados están ordenados:
  // total < obra social < SIPA < ART.
  const columnas = [
    { clave: "total" as const, x: xTotal },
    { clave: "obraSocial" as const, x: xObra },
    { clave: "sipa" as const, x: xSipa },
    { clave: "art" as const, x: xArt },
  ].sort((a, b) => a.x - b.x);

  const columnaDe = (x: number) =>
    columnas.reduce((mejor, c) => (Math.abs(c.x - x) < Math.abs(mejor.x - x) ? c : mejor)).clave;

  // Agrupar por fila (misma y, con tolerancia) y quedarse con las que tienen importes.
  const porFila = new Map<number, Celda[]>();
  for (const c of celdas) {
    const clave = [...porFila.keys()].find((y) => Math.abs(y - c.y) <= 3);
    if (clave === undefined) porFila.set(c.y, [c]);
    else porFila.get(clave)!.push(c);
  }

  const filasImportes = [...porFila.entries()]
    .map(([y, cs]) => ({ y, celdas: cs.filter((c) => /^\$/.test(c.texto)) }))
    .filter((f) => f.celdas.length >= 3)
    .sort((a, b) => b.y - a.y); // de arriba hacia abajo

  if (filasImportes.length !== 9) {
    throw new Error(
      `Esperaba 9 filas de importes (3 rangos × 3 condiciones) y encontré ${filasImportes.length}. Revisar el PDF a mano con tools/pdf-tabla.ts.`,
    );
  }

  const filas: Fila[] = filasImportes.map((f) => {
    const valores: Partial<Record<"total" | "obraSocial" | "sipa" | "art", number | null>> = {};
    for (const celda of f.celdas) valores[columnaDe(celda.x)] = aNumero(celda.texto);
    const art = valores.art;
    if (typeof art !== "number") throw new Error(`Fila sin cuota ART (y=${f.y})`);
    return {
      total: valores.total as number,
      obraSocial: valores.obraSocial ?? null,
      sipa: valores.sipa ?? null,
      art,
    };
  });

  const vigencia = celdas
    .filter((c) => /vigentes para|vencimiento en/i.test(c.texto))
    .map((c) => c.texto);

  return {
    tabla: {
      "activo-mayor-18": filas.slice(0, 3),
      "activo-menor-18": filas.slice(3, 6),
      jubilado: filas.slice(6, 9),
    },
    vigencia,
  };
}

function verificarAritmetica(tabla: Record<CondicionTrabajador, Fila[]>): string[] {
  const errores: string[] = [];
  for (const [cond, filas] of Object.entries(tabla)) {
    for (const [i, f] of filas.entries()) {
      const suma = Math.round(((f.obraSocial ?? 0) + (f.sipa ?? 0) + f.art) * 100) / 100;
      if (Math.abs(suma - f.total) >= 0.005) {
        errores.push(
          `${cond} fila ${i + 1}: el total (${f.total}) no es la suma de los conceptos (${suma}) → las columnas quedaron cruzadas`,
        );
      }
    }
  }
  return errores;
}

const RANGOS = ["menos-12", "12-a-16", "16-o-mas"] as const;

function imprimirBloque(tabla: Record<CondicionTrabajador, Fila[]>): void {
  const num = (n: number | null) => (n === null ? "null" : String(n));
  console.log("\nPegar en calcular-ar/src/data/aportes-casas-particulares.ts:\n");
  console.log("export const TABLA_APORTES: Record<CondicionTrabajador, FilaAportes[]> = {");
  for (const cond of ["activo-mayor-18", "activo-menor-18", "jubilado"] as CondicionTrabajador[]) {
    const clave = cond === "jubilado" ? "jubilado" : `"${cond}"`;
    console.log(`  ${clave}: [`);
    tabla[cond].forEach((f, i) => {
      console.log(
        `    { rango: "${RANGOS[i]}", total: ${f.total}, obraSocial: ${num(f.obraSocial)}, sipa: ${num(f.sipa)}, art: ${f.art} },`,
      );
    });
    console.log("  ],");
  }
  console.log("};");
}

function comparar(nueva: Record<CondicionTrabajador, Fila[]>): number {
  let cambios = 0;
  for (const cond of ["activo-mayor-18", "activo-menor-18", "jubilado"] as CondicionTrabajador[]) {
    nueva[cond].forEach((f, i) => {
      const vieja = TABLA_APORTES[cond][i];
      const campos: (keyof Fila)[] = ["total", "obraSocial", "sipa", "art"];
      for (const campo of campos) {
        if (f[campo] !== vieja[campo]) {
          cambios++;
          console.log(
            `   · ${cond}/${RANGOS[i]} ${campo}: ${vieja[campo]} → ${f[campo]}`,
          );
        }
      }
    });
  }
  return cambios;
}

async function main(): Promise<void> {
  const mmaaCargado = VIGENCIA_APORTES.archivoPdf.match(/-(\d{2}-\d{2})\.pdf$/)![1];
  const objetivo = arg("mes") ?? (process.argv.includes("--verificar") ? mmaaCargado : mesSiguiente(mmaaCargado));

  console.log(`— gen_aportes_casas · cargado: ${mmaaCargado} · buscando: ${objetivo} —\n`);
  const url = urlDe(objetivo);
  console.log(`   ${url}`);

  const buf = await bajar(url);
  if (!buf || buf.length < 5_000) {
    console.log(
      `\n✅ ARCA no publicó todavía el PDF de ${objetivo}. La tabla de ${VIGENCIA_APORTES.mesVigente} sigue siendo la vigente: no hay nada que rotar.`,
    );
    return;
  }

  const { tabla, vigencia } = await parsear(new Uint8Array(buf));
  console.log(`\n   Vigencia declarada por el PDF: ${vigencia.join(" · ") || "(no la declara)"}`);

  const errores = verificarAritmetica(tabla);
  if (errores.length > 0) {
    console.error("\n❌ La prueba aritmética falló — NO cargar estos números:");
    for (const e of errores) console.error(`   · ${e}`);
    process.exit(1);
  }
  console.log("   ✅ Prueba aritmética OK en las 9 filas (total = obra social + SIPA + ART).");

  console.log(`\n   Diferencias contra la tabla cargada (${mmaaCargado}):`);
  const cambios = comparar(tabla);
  if (cambios === 0) {
    console.log("   · ninguna: el PDF trae los mismos importes.");
    return;
  }

  imprimirBloque(tabla);
  console.log(
    `\n🔔 ${cambios} valor(es) cambiaron. Además de la tabla, actualizar en el data: VIGENCIA_APORTES (mesVigente, mesDeVencimiento, archivoPdf), la URL del PDF en APORTES_FUENTES y consultadoEl; y el bloque PDF_ARCA de scripts/check_aportes_casas.ts. Después: npx tsx scripts/check_aportes_casas.ts`,
  );
}

main().catch((e) => {
  console.error(`❌ ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
