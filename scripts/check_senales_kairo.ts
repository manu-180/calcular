// Las oportunidades del panel que viajan a Kairo (src/lib/panel/senales.ts).
// Correr con: npx tsx scripts/check_senales_kairo.ts

import { claveDeLectura, senalesDeLecturas } from "../src/lib/panel/senales";
import type { Lectura } from "../src/lib/panel/tipos";

let fallas = 0;
function ok(cond: boolean, msg: string): void {
  if (cond) console.log(`  ✓ ${msg}`);
  else {
    fallas++;
    console.error(`  ✗ ${msg}`);
  }
}

const CLAVE_KAIRO = /^[\w.:@\-/]+$/;

const lecturas: Lectura[] = [
  {
    id: "candidata-/desempleo",
    tono: "oportunidad",
    titulo: "«Prestación por desempleo» se usa 104 veces y no vende nada",
    detalle: "Tiene uso de sobra y no ofrece ningún producto.",
    accion: { texto: "Abrir la calculadora", href: "/desempleo" },
  },
  {
    id: "busqueda-Ganancias de sociedades ñandú",
    tono: "oportunidad",
    titulo: "Nadie encuentra «Ganancias de sociedades ñandú» en el buscador",
    detalle: "Lo buscaron 5 veces y no apareció nada.",
    accion: { texto: "Ver qué buscan", href: "#busquedas" },
  },
  { id: "fuente-whatsapp", tono: "logro", titulo: "WhatsApp trae 12 de cada 100 visitas", detalle: "x" },
  { id: "embudo-en-el-pago-planilla-comercio", tono: "alerta", titulo: "x", detalle: "x" },
];

console.log("senalesDeLecturas");
const senales = senalesDeLecturas(lecturas);
ok(senales.length === 2, "sólo las de tono oportunidad viajan");
const [candidata, busqueda] = senales;
ok(candidata.proyecto === "calcular", "proyecto calcular");
ok(candidata.clave_origen === "oportunidad:candidata-/desempleo", `clave estable: ${candidata.clave_origen}`);
ok(candidata.link === "https://calcular.ar/desempleo", "link absoluto a la calculadora");
ok(candidata.detalle.includes("Qué hacer") && candidata.detalle.includes("104 veces"), "el detalle trae el dato y qué hacer");
ok(busqueda.link === undefined, "un ancla del panel no viaja como link");
ok(busqueda.detalle.includes("buscador"), "la búsqueda trae su propio qué hacer");
for (const s of senales) {
  ok(CLAVE_KAIRO.test(s.clave_origen), `clave aceptada por Kairo: ${s.clave_origen}`);
  ok(s.titulo.length <= 200 && s.detalle.length <= 4000, "dentro de los largos de Kairo");
}

console.log("claveDeLectura");
ok(claveDeLectura("busqueda-Ñandú  ÁRBOL") === "oportunidad:busqueda-nandu-arbol", "sin tildes ni espacios");
ok(claveDeLectura("busqueda-x".repeat(50)).length <= 200, "máximo 200");
ok(claveDeLectura("candidata-/a") === claveDeLectura("candidata-/a"), "determinística");

if (fallas) {
  console.error(`\n${fallas} falla(s)`);
  process.exit(1);
}
console.log("\nOK");
