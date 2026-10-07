// Gate del registro de novedades (src/data/novedades.ts), que alimenta /novedades, su feed RSS y el
// bloque de la home. Una novedad es una afirmación pública con fecha y fuente: si la fecha es
// inventada o la fuente no abre, el sitio miente justo en la página que existe para dar confianza.
//
// Falla si:
//   · una entrada no tiene fecha real (publicadoEl o cargadoEl), o tiene una fecha futura;
//   · el organismo "publicó" después de que el sitio lo cargó;
//   · la fuente no es https o apunta a calcular.ar (la fuente es el organismo, no nosotros);
//   · una calculadora enlazada no existe;
//   · el texto tiene raya (—) o emojis (regla de redacción del sitio);
//   · FALTA una novedad para un dato que ya está en src/data. Esa es la que hace que el registro se
//     alimente solo: quien carga un dato a mano y no corre scripts/datos-vivos/novedades.ts, no pasa.

import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { NOVEDADES_REGISTRADAS } from "../src/data/novedades";
import { novedadesDeLosDatos } from "../src/lib/novedades-detectores";
import { hoyAR } from "../src/lib/hoy";

const APP = resolve(import.meta.dirname, "..", "src", "app");
let fallas = 0;
function check(nombre: string, ok: boolean, detalle?: string) {
  if (ok) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}${detalle ? ` · ${detalle}` : ""}`);
  }
}

function fechaValida(iso: string | undefined): boolean {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = new Date(`${iso}T12:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
}

function rutaExiste(ruta: string): boolean {
  return ruta.startsWith("/") && existsSync(join(APP, ...ruta.split("/").filter(Boolean), "page.tsx"));
}

const EMOJI = /\p{Extended_Pictographic}/u;
const hoy = hoyAR();
const ids = new Set<string>();

check("el registro tiene entradas", NOVEDADES_REGISTRADAS.length > 0);

for (const n of NOVEDADES_REGISTRADAS) {
  const p = `[${n.id}]`;
  check(`${p} id único y en minúsculas con guiones`, !ids.has(n.id) && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(n.id));
  ids.add(n.id);
  check(`${p} serie y organismo`, Boolean(n.serie && n.organismo));
  check(`${p} tipo conocido`, n.tipo === "dato" || n.tipo === "correccion");

  check(`${p} tiene al menos una fecha`, Boolean(n.publicadoEl || n.cargadoEl));
  for (const [campo, valor] of [["publicadoEl", n.publicadoEl], ["cargadoEl", n.cargadoEl], ["rigeDesde", n.rigeDesde]] as const) {
    if (valor === undefined) continue;
    check(`${p} ${campo} es una fecha real`, fechaValida(valor), valor);
  }
  for (const [campo, valor] of [["publicadoEl", n.publicadoEl], ["cargadoEl", n.cargadoEl]] as const) {
    if (valor) check(`${p} ${campo} no es futura`, valor <= hoy, `${valor} > ${hoy}`);
  }
  if (n.publicadoEl && n.cargadoEl) {
    check(`${p} se cargó después de publicarse`, n.publicadoEl <= n.cargadoEl, `${n.publicadoEl} > ${n.cargadoEl}`);
  }

  let url: URL | null = null;
  try {
    url = new URL(n.fuente.url);
  } catch {
    url = null;
  }
  check(`${p} fuente https`, url?.protocol === "https:", n.fuente.url);
  check(`${p} la fuente es el organismo, no el sitio`, Boolean(url && !url.hostname.endsWith("calcular.ar")));
  check(`${p} la fuente tiene nombre`, n.fuente.nombre.trim().length > 3);

  check(`${p} enlaza al menos una calculadora`, n.rutas.length > 0);
  for (const r of n.rutas) check(`${p} ${r} existe`, rutaExiste(r));

  for (const [campo, texto] of [["titulo", n.titulo], ["detalle", n.detalle], ["fuente", n.fuente.nombre]] as const) {
    check(`${p} ${campo} sin raya`, !texto.includes("—"));
    check(`${p} ${campo} sin emojis`, !EMOJI.test(texto));
  }
  check(`${p} título breve (≤ 90)`, n.titulo.length <= 90, String(n.titulo.length));
  check(`${p} detalle breve (≤ 320)`, n.detalle.length <= 320, String(n.detalle.length));
}

for (const c of novedadesDeLosDatos()) {
  check(
    `el dato ${c.id} está registrado`,
    ids.has(c.id),
    "correr `npx -y tsx scripts/datos-vivos/novedades.ts` y commitear src/data/novedades.ts",
  );
}

if (fallas) {
  console.error(`\nFAIL novedades: ${fallas} fallas`);
  process.exit(1);
}
console.log(`\nOK novedades: 0 fallas (${NOVEDADES_REGISTRADAS.length} entradas)`);
