// Verificación de public/llms.txt — el índice que leen los motores de IA.
// Correr con: npx tsx scripts/check_llms.ts
//
// POR QUÉ EXISTE (obra O-13, cerrada el 2/9/2026): `llms.txt` es la única superficie del sitio que
// se escribe a mano y que nadie ve romperse. No la audita el build (es un archivo estático), no la
// audita el sitemap (que se genera), y no la ve un usuario. Se rompe en silencio de dos maneras, y
// el 2/9/2026 estaban las dos a la vez:
//
//   1. **Falta lo nuevo.** Cuatro páginas publicadas —/salario-minimo y las tres de sueldo neto por
//      convenio— no figuraban. Para una IA que lee este archivo, esas páginas no existen.
//   2. **Sobra lo muerto.** Seguía ofreciendo el "Radar Monotributo — preventa, ARS 15.000/mes,
//      hasta el 5/8/2026" meses después de que el proyecto se matara y su URL pasara a redirigir.
//      Publicitar un producto que no existe es peor que no publicitarlo.
//
// Este check convierte las dos en fallas del árbol: toda página que no esté explícitamente excluida
// tiene que estar listada, y toda URL listada tiene que resolver a una página real que no sea un
// redirect.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const RAIZ = resolve(import.meta.dirname, "..");
const APP = join(RAIZ, "src", "app");
const LLMS = join(RAIZ, "public", "llms.txt");

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

/**
 * Rutas que a propósito NO van en llms.txt. Todo lo demás que tenga `page.tsx` tiene que estar:
 * la lista de excepciones es explícita para que agregar una sea una decisión y no un olvido.
 */
const EXCLUIDAS = new Set<string>([
  "/", // la home ya es el encabezado del archivo
  "/contacto",
  "/privacidad",
  "/terminos",
  "/planillas/gracias", // página de agradecimiento post-compra, sin contenido propio
  "/planillas/comprar", // formulario de compra sin JS (noindex), el contenido vive en cada landing
  "/informes/cuota-alimentaria/ver", // entrega del informe pago: lleva el payment_id, noindex
  "/blog", // el índice del blog; los posts se listan aparte cuando corresponde
  // Cuentas y panel: privadas, noindex y fuera del sitemap.
  "/login",
  "/registro",
  "/recuperar",
  "/cuenta",
  "/dashboard",
]);

/** Prefijos excluidos por rama entera (los posts del blog no se enumeran uno por uno). */
const PREFIJOS_EXCLUIDOS = ["/blog/", "/auth/", "/cuenta/", "/dashboard/"];

/** Rutas de disco: toda carpeta bajo src/app con page.tsx, salteando los segmentos dinámicos. */
function rutasEnDisco(dir: string, base = ""): string[] {
  const salida: string[] = [];
  if (existsSync(join(dir, "page.tsx"))) salida.push(base === "" ? "/" : base);
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;
    const nombre = entrada.name;
    if (nombre.startsWith("_") || nombre === "api") continue;
    // Un segmento dinámico ([mes], [anio]) no es una URL: se lo salta, pero se anota que el padre
    // tiene hijos dinámicos (eso vuelve legítima una URL como /convenios/comercio en llms.txt).
    salida.push(...rutasEnDisco(join(dir, nombre), `${base}/${nombre}`));
  }
  return salida;
}

const todas = rutasEnDisco(APP);
const estaticas = todas.filter((r) => !r.includes("["));
const conHijoDinamico = new Set(
  todas.filter((r) => r.includes("[")).map((r) => r.slice(0, r.lastIndexOf("/"))),
);

const texto = readFileSync(LLMS, "utf8");
const listadas = new Set(
  [...texto.matchAll(/https:\/\/calcular\.ar([^\s)]*)/g)].map((m) => (m[1] === "" ? "/" : m[1])),
);

// Redirects declarados en next.config.ts: una URL que redirige no puede figurar como destino.
const config = readFileSync(join(RAIZ, "next.config.ts"), "utf8");
const redirects = new Set(
  [...config.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]).filter((s) => !s.includes(":")),
);

// ===========================================================================
// 1 · Nada publicado se queda afuera del índice
// ===========================================================================
{
  const debenEstar = estaticas.filter(
    (r) => !EXCLUIDAS.has(r) && !PREFIJOS_EXCLUIDOS.some((p) => r.startsWith(p)),
  );
  const faltantes = debenEstar.filter((r) => !listadas.has(r));
  check(
    `las ${debenEstar.length} páginas que deben figurar están en llms.txt`,
    faltantes.length === 0,
    faltantes,
  );
}

// ===========================================================================
// 2 · Nada listado apunta al vacío ni a un redirect
// ===========================================================================
{
  const rotas = [...listadas].filter((r) => {
    if (estaticas.includes(r)) return false;
    // /convenios/comercio es legítima si existe /convenios/comercio/[mes].
    if (conHijoDinamico.has(r)) return false;
    // Una instancia concreta de ruta dinámica (/inflacion/2025) también.
    const padre = r.slice(0, r.lastIndexOf("/"));
    if (conHijoDinamico.has(padre)) return false;
    return true;
  });
  check("todas las URLs de llms.txt resuelven a una página real", rotas.length === 0, rotas);

  const aRedirects = [...listadas].filter((r) => redirects.has(r));
  check(
    "ninguna URL de llms.txt es un redirect (un producto que se mató no se sigue ofreciendo)",
    aRedirects.length === 0,
    aRedirects,
  );
}

// ===========================================================================
// 3 · Higiene del archivo
// ===========================================================================
// Un script que escribe el archivo desde Windows en modo texto lo deja en CRLF, y entonces los dos
// checks de secciones de abajo fallan diciendo que «falta la sección» cuando está (pasó el 17/9/2026).
check("llms.txt está en LF, no CRLF (si falla, `sed -i 's/\\r$//' public/llms.txt`)", !texto.includes("\r\n"));
check("llms.txt arranca con el título del sitio", texto.startsWith("# CalculAR"));
check("tiene la sección de calculadoras", texto.includes("\n## Calculadoras\n"));
check("tiene la sección de fuentes de datos", texto.includes("\n## Fuentes de datos\n"));
check(
  "todas las URLs son https y del dominio propio",
  !/http:\/\/|https:\/\/(?!calcular\.ar)/.test(texto.replace(/https:\/\/calcular\.ar/g, "")),
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(
    `llms.txt OK (${listadas.size} URLs listadas, ${estaticas.length} páginas estáticas en disco).`,
  );
}
