// «¿Cuántas horas de trabajo cuesta?»: arma el índice como en producción (registro + calcular.ar +
// precios.json) e imprime qué país entra, con su salario por hora y sus horas por producto, y qué queda
// afuera y por qué. Un país o un producto excluido NO es falla (la otra PC agrega países todo el tiempo).
// Falla si:
//   - quedan menos de MINIMO_PAISES países con al menos un producto;
//   - algo publicado está vencido: un precio de más de VIGENCIA_PRECIO_DIAS días, un salario mínimo o una
//     jornada cuya vigencia terminó, o horas que no cierran con precio ÷ salario por hora;
//   - un producto se publica en menos de dos países (un ranking de uno no es ranking).
//   npx tsx scripts/check_horas.ts
import "./sin-server-only";
import { MINIMO_PAISES, precioVigente, VIGENCIA_PRECIO_DIAS } from "../src/motor/horas/calculo";
import { PRODUCTOS } from "../src/motor/horas/productos";
import { construirInformeHoras } from "../src/lib/horas/indice";
import { hoyEn } from "../src/motor/vigencia";
import { registro } from "../src/paises";

const { indice, excluidos } = construirInformeHoras();
const fallas: string[] = [];
const fmt = (n: number) => (n >= 100 ? Math.round(n).toString() : n.toFixed(1)).padStart(7);

console.log(`— Horas de trabajo · ${indice.generadoEl} · precios del ${indice.preciosActualizadosEl} —\n`);
console.log(`INCLUIDOS (${indice.filas.length}) · salario mínimo por hora y horas por producto (${PRODUCTOS.map((p) => p.id).join(" / ")})`);
for (const f of indice.filas) {
  const m = f.minimo;
  const hoy = f.mercado === "ar" ? indice.generadoEl : hoyEn(registro.pais(f.mercado as never)!.mercado);
  const conv = m.conversion;
  const via = conv.tipo === "hora" ? "por hora" : conv.tipo === "divisor" ? `÷ ${conv.divisor}` : `${conv.tipo}${conv.horasSemana ? ` ${conv.horasSemana} h/sem` : ""}${conv.horasDia ? ` ${conv.horasDia} h/día` : ""}${conv.diasPagados ? ` ${conv.diasPagados} días pagados` : ""}${conv.pagas ? ` ${conv.pagas} pagas` : ""}`;
  const horas = PRODUCTOS.map((p) => (f.celdas[p.id] ? fmt(f.celdas[p.id].horas) : "      ·")).join(" ");
  console.log(`  ${f.iso} ${f.mercado.padEnd(3)} ${m.porHora.toFixed(2).padStart(10)} ${m.moneda}/h  ${horas}   ${via}${m.vigenteHasta ? `  vence ${m.vigenteHasta}` : ""}`);
  if (m.vigenteHasta && m.vigenteHasta < hoy) fallas.push(`${f.iso}: publica un salario o jornada que venció el ${m.vigenteHasta}`);
  for (const c of Object.values(f.celdas)) {
    if (!precioVigente(c.precio.consultadoEl, hoy)) fallas.push(`${f.iso} ${c.producto}: precio del ${c.precio.consultadoEl}, más de ${VIGENCIA_PRECIO_DIAS} días`);
    if (Math.abs(c.horas - c.precioLocal / m.porHora) > 1e-9) fallas.push(`${f.iso} ${c.producto}: las horas no cierran`);
    if (!c.precio.url.startsWith("https://")) fallas.push(`${f.iso} ${c.producto}: precio sin URL de la tienda`);
  }
}

const paises = excluidos.filter((e) => !e.producto);
console.log(`\nEXCLUIDOS (${paises.length} países)`);
for (const e of paises) console.log(`  ${e.iso} ${e.mercado.padEnd(3)} ${e.motivo}`);

const celdas = excluidos.filter((e) => e.producto && indice.filas.some((f) => f.iso === e.iso));
console.log(`\nSIN PRECIO en países incluidos (${celdas.length})`);
for (const e of celdas) console.log(`  ${e.iso} ${e.producto!.padEnd(16)} ${e.motivo}`);

console.log("\nPOR PRODUCTO");
for (const p of PRODUCTOS) {
  const filas = indice.filas.filter((f) => f.celdas[p.id]).sort((a, b) => a.celdas[p.id].horas - b.celdas[p.id].horas);
  const extremos = filas.length ? `menos horas ${filas[0].iso} (${fmt(filas[0].celdas[p.id].horas).trim()}), más ${filas.at(-1)!.iso} (${fmt(filas.at(-1)!.celdas[p.id].horas).trim()})` : "";
  console.log(`  ${p.id.padEnd(16)} ${String(filas.length).padStart(2)} países  ${extremos}`);
  if (filas.length < 2) fallas.push(`${p.id}: se publica en ${filas.length} país(es)`);
}

if (indice.filas.length < MINIMO_PAISES) fallas.push(`solo ${indice.filas.length} países incluidos (mínimo ${MINIMO_PAISES})`);
if (fallas.length) {
  console.log(`\nFALLAS (${fallas.length})`);
  for (const f of fallas) console.log(`  ${f}`);
  process.exit(1);
}
console.log(`\nOK: ${indice.filas.length} países, nada vencido publicado.`);
