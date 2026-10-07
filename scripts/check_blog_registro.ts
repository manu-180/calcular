// Guardián de registro del blog: cada post en src/app/(ar)/blog/<slug>/page.tsx tiene que
// estar registrado en DOS lugares o queda huérfano (construido pero nunca indexado):
//   1. src/app/(ar)/blog/page.tsx   → array POSTS (aparece en el índice del blog)
//   2. src/app/sitemap.ts      → array BLOG_POSTS (entra al sitemap → Google lo descubre)
// Olvidarse de uno es un error silencioso: la página existe y rankea peor o nunca se
// indexa. Este check lo hace imposible (regla KAIZEN 2-2, nacido en s60).
// Correr con: npx tsx scripts/check_blog_registro.ts
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const aquí = dirname(fileURLToPath(import.meta.url));
const blogDir = join(aquí, "..", "src", "app", "(ar)", "blog");
const indicePath = join(aquí, "..", "src", "app", "(ar)", "blog", "page.tsx");
const sitemapPath = join(aquí, "..", "src", "app", "sitemap.ts");

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// Slugs = subcarpetas de src/app/(ar)/blog (cada una con su page.tsx). Excluye archivos sueltos.
const slugs = readdirSync(blogDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const indice = readFileSync(indicePath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");

check("hay al menos un post en el blog", slugs.length > 0, slugs.length);

for (const slug of slugs) {
  // Buscamos el slug como string literal ('slug' o "slug") para no matchear substrings de otro slug.
  const enIndice = indice.includes(`"${slug}"`) || indice.includes(`'${slug}'`);
  const enSitemap = sitemap.includes(`"${slug}"`) || sitemap.includes(`'${slug}'`);
  check(`${slug} → registrado en blog/page.tsx (POSTS)`, enIndice);
  check(`${slug} → registrado en sitemap.ts (BLOG_POSTS)`, enSitemap);
}

console.log(fallas === 0 ? "\nTODO OK — todos los posts del blog registrados" : `\n${fallas} FALLAS ✘`);
process.exit(fallas === 0 ? 0 : 1);
