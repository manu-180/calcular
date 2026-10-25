// Muestra el contenido de cada calculadora de jm con los marcadores resueltos a una fecha.
// Uso: npx tsx scripts/paises/jm/ver_paginas.ts [fecha] [slug]
import { crearRegistro } from "@/motor/registro";
import jm from "@/paises/jm";

const fecha = (process.argv[2] ?? "2026-10-24") as `${number}-${number}-${number}`;
const filtro = process.argv[3];
const registro = crearRegistro([jm]);
for (const c of jm.calculadoras.filter((x) => x.definicion.mercado === "jm")) {
  const slug = c.definicion.slug;
  if (filtro && slug !== filtro) continue;
  const p = registro.pagina("jm", slug, fecha, "interno");
  if (!p) {
    console.log(`## ${slug}: no publicable`, registro.publicabilidad("jm", slug, fecha, "interno"));
    continue;
  }
  const k = p.contenido;
  console.log(`## ${slug} [${k.title.length}/${k.description.length}]`);
  console.log(`T: ${k.title}\nD: ${k.description}\nH1: ${k.h1}`);
  if (filtro) for (const t of [...k.intro, ...k.comoSeCalcula, ...(k.ejemplo ?? []), ...k.faq.flatMap((f) => [f.pregunta, f.respuesta])]) console.log(`- ${t}`);
}
