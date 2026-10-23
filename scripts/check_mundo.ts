// «Tu sueldo en el mundo»: arma la grilla como en producción (registro + calcular.ar + PPA del Banco
// Mundial) e imprime qué país entra, cuál queda afuera y por qué, con la tasa efectiva a tres
// niveles de sueldo. Un país excluido NO es falla (la otra PC agrega países todo el tiempo y no
// puede trabarse por eso). Falla si la grilla queda con menos de 10 países o si un país incluido
// no pasa la validación vuelto a correr acá.
//   npx tsx scripts/check_mundo.ts
import "./sin-server-only";
import { BRUTOS_GRILLA, netoAnualPpa, tasaEfectiva } from "../src/motor/mundo/calculo";
import { candidatosDelRegistro, construirGrillaMundo, validarPuntos, type TablaPpa } from "../src/motor/mundo/grilla";
import tablaPpa from "../src/motor/mundo/ppa.json";
import { candidatosMundo, construirInformeMundo } from "../src/lib/mundo/grilla";
import { registro } from "../src/paises";

const NIVELES = [15000, 50000, 150000] as const;
const MINIMO_PAISES = 10;

const informe = construirInformeMundo();
const fallas: string[] = [];
const pct = (x: number) => `${(x * 100).toFixed(1).padStart(5)} %`;

console.log(`— Tu sueldo en el mundo · ${informe.grilla.generadoEl} · PPA ${informe.grilla.fuentePpa.indicador} consultada el ${informe.grilla.fuentePpa.consultadoEl} —\n`);
console.log(`INCLUIDOS (${informe.incluidos.length}) · tasa efectiva con un bruto anual de ${NIVELES.map((n) => `${n / 1000}k`).join(" / ")} dólares internacionales`);
for (const { pais, metodo, ms, extendidos, recortados, motivoTramoBajo } of informe.incluidos) {
  const tasas = NIVELES.map((n) => pct(tasaEfectiva(pais, n))).join("  ");
  const extras = [extendidos ? `${extendidos} puntos bajos extendidos` : "", recortados ? `${recortados} con crédito llevado a carga cero` : ""].filter(Boolean).join(", ");
  console.log(`  ${pais.iso}  ${pais.mercado.padEnd(3)} ${metodo.padEnd(9)} ${tasas}   PPA ${pais.ppa.toPrecision(5)} ${pais.moneda} (${pais.anioPpa})  datos ${pais.datosVerificadosEl}  ${pais.calculadora}  ${ms} ms${extras ? `  [${extras}]` : ""}`);
  if (motivoTramoBajo) console.log(`        tramo bajo: ${motivoTramoBajo}`);
  if (pais.puntos.length !== BRUTOS_GRILLA.length || pais.puntos.some((p, i) => p.bruto !== BRUTOS_GRILLA[i])) fallas.push(`${pais.iso}: los puntos no son los de BRUTOS_GRILLA`);
  const v = validarPuntos(pais.puntos);
  if (v) fallas.push(`${pais.iso} está incluido pero no valida: ${v}`);
}
console.log(`\nEXCLUIDOS (${informe.excluidos.length})`);
for (const e of informe.excluidos) console.log(`  ${e.iso}  ${e.mercado.padEnd(3)} ${(e.metodo ?? "").padEnd(9)} ${e.calculadora ?? ""}${e.calculadora ? ": " : ""}${e.motivo}`);

// Error de la interpolación lineal en el punto medio (geométrico) entre cada par de brutos de la
// grilla, contra la calculadora corrida directo. Informativo: un escalón de la ley entre dos puntos
// (un subsidio que se corta) lo sube y no es un error del adaptador.
const { candidatos } = candidatosMundo();
const altos: string[] = [];
for (const { pais, extendidos } of informe.incluidos) {
  const c = candidatos.find((x) => x.mercado === pais.mercado);
  if (!c) continue;
  let peor = { error: 0, bruto: 0 };
  for (let i = extendidos; i < BRUTOS_GRILLA.length - 1; i++) {
    const bruto = Math.sqrt(BRUTOS_GRILLA[i] * BRUTOS_GRILLA[i + 1]);
    const r = c.netoAnual(bruto * pais.ppa);
    if (!r.ok) continue;
    const directo = r.neto / pais.ppa;
    const error = Math.abs(netoAnualPpa(pais, bruto) - Math.min(directo, bruto)) / Math.min(directo, bruto);
    if (error > peor.error) peor = { error, bruto: Math.round(bruto) };
  }
  if (peor.error > 0.005) altos.push(`${pais.iso} ${(peor.error * 100).toFixed(2)} % cerca de ${peor.bruto}`);
}
console.log(`\nInterpolación: error en el punto medio mayor a 0,5 % en ${altos.length} países${altos.length ? `: ${altos.join(" · ")}` : ""}`);

// Cuántos países entrarían solos con la inferencia, sin la tabla del motor ni `mundo`: es lo que
// le pasa a un país nuevo que nadie adaptó.
const soloInf = candidatosDelRegistro(registro, new Date(), { soloInferencia: true });
const conInf = construirGrillaMundo({ candidatos: soloInf.candidatos, excluidos: soloInf.excluidos, ppa: tablaPpa as TablaPpa, generadoEl: informe.grilla.generadoEl });
console.log(`Solo con inferencia entrarían ${conInf.grilla.paises.length} de ${informe.grilla.paises.filter((p) => p.sitio === "intl").length} países del registro: ${conInf.grilla.paises.map((p) => p.iso).join(" ")}`);

if (informe.grilla.paises.length < MINIMO_PAISES) fallas.push(`la grilla tiene ${informe.grilla.paises.length} países (mínimo ${MINIMO_PAISES})`);
console.log(`\nGrilla armada en ${informe.ms} ms (${informe.grilla.paises.length} países × ${BRUTOS_GRILLA.length} brutos).`);
for (const f of fallas) console.error(`❌ ${f}`);
console.log(fallas.length ? `${fallas.length} FALLAS` : "TODO OK");
process.exit(fallas.length ? 1 : 0);
