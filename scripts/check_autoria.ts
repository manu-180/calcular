// La firma del sitio no puede desaparecer sin que algo se ponga rojo.
//
// POR QUÉ (19/9/2026): AdSense rechazó el sitio dos veces por "contenido de bajo valor" y uno de
// los flancos era E-E-A-T — /sobre decía "un equipo chico", que en YMYL (plata, impuestos,
// derechos) es lo mismo que no decir nada. Ahora hay una persona con nombre, mail y @id de
// schema. Sin este check, el primer post nuevo que se escriba copiando un header viejo nace sin
// firma y la señal se diluye de a una página por vez, que es como se pierden estas cosas.
// Correr con: npx tsx scripts/check_autoria.ts

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { AUTOR, ORGANIZACION, articleSchema } from "../src/lib/schema";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const NOMBRE = "Manuel Navarro";

check("schema: AUTOR es una Person con nombre real", AUTOR["@type"] === "Person" && AUTOR.name === NOMBRE);
check("schema: AUTOR tiene url de perfil y mail de contacto", Boolean(AUTOR.url && AUTOR.email));
check("schema: la Organization declara a la persona como founder", ORGANIZACION.founder?.["@id"] === AUTOR["@id"]);

const art = articleSchema({ titulo: "t", descripcion: "d", url: "/x", modificado: "2026-09-19" });
check("schema: articleSchema firma con la persona, no con la organización", art.author["@id"] === AUTOR["@id"]);
check("schema: el publisher sigue siendo la organización", art.publisher["@id"] === ORGANIZACION["@id"]);

const sobre = readFileSync("src/app/sobre/page.tsx", "utf8");
check("/sobre nombra a la persona", sobre.includes(NOMBRE));
check("/sobre ya no se esconde detrás de 'un equipo chico'", !sobre.includes("equipo chico"));
check("/sobre publica el Person en el JSON-LD", sobre.includes("author: AUTOR"));

const BLOG = "src/app/blog";
const posts = readdirSync(BLOG, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => join(BLOG, d.name, "page.tsx"));
const sinFirma = posts.filter((p) => !readFileSync(p, "utf8").includes("FirmaAutor"));
check(`blog: los ${posts.length} posts llevan firma visible`, sinFirma.length === 0, sinFirma);

const sello = readFileSync("src/components/SelloVerificado.tsx", "utf8");
check("páginas de datos: el pie de fuentes lleva la firma", sello.includes("FirmaAutor"));

// El footer es el único lugar que cubre las 151 URLs: las páginas de datos arman su propia
// sección de fuentes inline y no pasan por FuentesOficiales (verificado en producción el
// 19/9/2026 — /convenios/uocra no mostraba la firma y por eso existe esta línea).
const layout = readFileSync("src/app/layout.tsx", "utf8");
const footer = readFileSync("src/components/SiteFooter.tsx", "utf8");
check(
  "el footer firma TODAS las páginas",
  layout.includes("FirmaAutor") || (layout.includes("<SiteFooter") && footer.includes("<FirmaAutor")),
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de autoría OK");
}
