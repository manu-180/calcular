// «Tu sueldo en el mundo»: arma la grilla como en producción (registro + calcular.ar + PPA del Banco
// Mundial) e imprime qué país entra, cuál queda afuera y por qué, con la tasa efectiva a tres
// niveles de sueldo. Un país excluido NO es falla (la otra PC agrega países todo el tiempo y no
// puede trabarse por eso). Falla si:
//   - la grilla no tiene más países que los que promete el link de las calculadoras (PAISES_PUENTE);
//   - un país incluido no pasa la validación vuelto a correr acá o no tiene todos los BRUTOS_GRILLA;
//   - la interpolación se aparta más de 1 % de la calculadora en el medio de algún tramo;
//   - alguna carga compartible corresponde a un rango de sueldos de menos de ±10 % (privacidad del
//     link), o no vuelve igual al decodificarla.
//   npx tsx scripts/check_mundo.ts
import "./sin-server-only";
import { BRUTOS_GRILLA, cargaDesde, codificarCarga, decodificarCarga, netoAnualPpa, tasaEfectiva } from "../src/motor/mundo/calculo";
import { candidatosDelRegistro, construirGrillaMundo, ESCALON_LEY, validarPuntos, type TablaPpa } from "../src/motor/mundo/grilla";
import tablaPpa from "../src/motor/mundo/ppa.json";
import { PAISES_PUENTE } from "../src/motor/mundo/rutas";
import { compactar } from "../src/motor/mundo/ui/compacta";
import { candidatosMundo, construirInformeMundo } from "../src/lib/mundo/grilla";
import { registro } from "../src/paises";

const NIVELES = [15000, 50000, 150000] as const;
// Error de la interpolación en el medio de un tramo: arriba del objetivo se informa, arriba del tope falla.
const OBJETIVO_INTERPOLACION = 0.005;
const TOPE_INTERPOLACION = 0.01;
// Una carga compartida no puede encerrar un rango de sueldos más chico que [0,9 x; 1,1 x].
const RANGO_MINIMO = 1.1 / 0.9;

const informe = construirInformeMundo();
const grilla = informe.grilla;
const fallas: string[] = [];
const pct = (x: number) => `${(x * 100).toFixed(1).padStart(5)} %`;

console.log(`— Tu sueldo en el mundo · ${grilla.generadoEl} · PPA ${grilla.fuentePpa.indicador} ${grilla.fuentePpa.anio}, consultada el ${grilla.fuentePpa.consultadoEl} —\n`);
console.log(`INCLUIDOS (${informe.incluidos.length}) · tasa efectiva con un bruto anual de ${NIVELES.map((n) => `${n / 1000}k`).join(" / ")} dólares internacionales`);
for (const { pais, metodo, ms, extendidos, agregados, recortados, motivoTramoBajo } of informe.incluidos) {
  const tasas = NIVELES.map((n) => pct(tasaEfectiva(pais, n))).join("  ");
  const extras = [extendidos ? `${extendidos} puntos bajos extendidos` : "", agregados ? `${agregados} puntos agregados` : "", recortados ? `${recortados} con crédito llevado a carga cero` : ""].filter(Boolean).join(", ");
  console.log(`  ${pais.iso}  ${pais.mercado.padEnd(3)} ${metodo.padEnd(9)} ${tasas}   PPA ${pais.ppa.toPrecision(5)} ${pais.moneda} (${pais.anioPpa})  ${pais.pagas} pagas  datos ${pais.datosVerificadosEl}  ${pais.calculadora}  ${ms} ms${extras ? `  [${extras}]` : ""}`);
  if (motivoTramoBajo) console.log(`        tramo bajo: ${motivoTramoBajo}`);
  const brutos = new Set(pais.puntos.map((p) => p.bruto));
  if (BRUTOS_GRILLA.some((b) => !brutos.has(b))) fallas.push(`${pais.iso}: le faltan brutos de BRUTOS_GRILLA`);
  if (pais.puntos.some((p, i) => i > 0 && p.bruto <= pais.puntos[i - 1].bruto)) fallas.push(`${pais.iso}: los puntos no están en orden creciente de bruto`);
  const v = validarPuntos(pais.puntos);
  if (v) fallas.push(`${pais.iso} está incluido pero no valida: ${v}`);
}
console.log(`\nEXCLUIDOS (${informe.excluidos.length})`);
for (const e of informe.excluidos) console.log(`  ${e.iso}  ${e.mercado.padEnd(3)} ${(e.metodo ?? "").padEnd(9)} ${e.calculadora ?? ""}${e.calculadora ? ": " : ""}${e.motivo}`);

// Error de la interpolación lineal en el punto medio (geométrico) de cada tramo de la grilla del país,
// contra la calculadora corrida directo. El tramo bajo extendido en proporción no se mide (ahí la
// calculadora no da resultado), ni un escalón de la ley: dos puntos a menos de ESCALON_LEY, el salto de
// un umbral, que la interpolación dibuja vertical.
const { candidatos } = candidatosMundo();
const altos: string[] = [];
const escalones: string[] = [];
for (const { pais, extendidos } of informe.incluidos) {
  const c = candidatos.find((x) => x.mercado === pais.mercado);
  if (!c) continue;
  const desde = pais.puntos.findIndex((p) => p.bruto === BRUTOS_GRILLA[extendidos]);
  let peor = { error: 0, bruto: 0 };
  for (let i = Math.max(0, desde); i < pais.puntos.length - 1; i++) {
    const [a, b] = [pais.puntos[i], pais.puntos[i + 1]];
    if (b.bruto / a.bruto < 1 + ESCALON_LEY) {
      const salto = (b.neto - a.neto) / a.neto;
      if (Math.abs(salto) > OBJETIVO_INTERPOLACION) escalones.push(`${pais.iso} en ${a.bruto} (${(salto * 100).toFixed(1)} %)`);
      continue;
    }
    const bruto = Math.sqrt(a.bruto * b.bruto);
    const r = c.netoAnual(bruto * pais.ppa);
    if (!r.ok) continue;
    const directo = Math.min(r.neto / pais.ppa, bruto);
    const error = Math.abs(netoAnualPpa(pais, bruto) - directo) / directo;
    if (error > peor.error) peor = { error, bruto: Math.round(bruto) };
  }
  if (peor.error > OBJETIVO_INTERPOLACION) altos.push(`${pais.iso} ${(peor.error * 100).toFixed(2)} % cerca de ${peor.bruto}`);
  if (peor.error > TOPE_INTERPOLACION) fallas.push(`${pais.iso}: la interpolación se aparta ${(peor.error * 100).toFixed(2)} % de la calculadora cerca de ${peor.bruto} (tope ${TOPE_INTERPOLACION * 100} %)`);
}
const agregados = informe.incluidos.reduce((s, i) => s + i.agregados, 0);
console.log(`\nInterpolación: ${agregados} puntos agregados en ${informe.incluidos.filter((i) => i.agregados).length} países; error en el punto medio mayor a ${OBJETIVO_INTERPOLACION * 100} % en ${altos.length} países${altos.length ? `: ${altos.join(" · ")}` : ""}`);
console.log(`Escalones de la ley (el neto salta en un umbral): ${escalones.length ? escalones.join(" · ") : "ninguno"}`);

// Privacidad del link: se barre el bruto de cada país de origen en pasos de 0,2 % y se agrupan los
// tramos seguidos con la misma carga. Cada tramo que no toca los bordes del barrido tiene que cubrir
// por lo menos [0,9 x; 1,1 x]; una carga que aparece en dos tramos separados se mide en cada uno.
const PASO = 1.002;
let tramos = 0;
let masAngosto = { razon: Infinity, donde: "" };
const vistas = new Map<string, string>();
for (const base of grilla.paises) {
  let actual: string | null = null;
  let desde = 0;
  let ultimo = 0;
  let enElBorde = true;
  const cerrar = () => {
    if (actual === null || enElBorde) return;
    tramos++;
    const razon = ultimo / desde;
    if (razon < masAngosto.razon) masAngosto = { razon, donde: `${base.iso} «${actual}» entre ${Math.round(desde)} y ${Math.round(ultimo)}` };
    if (razon < RANGO_MINIMO) fallas.push(`${base.iso}: la carga «${actual}» sale solo con brutos entre ${Math.round(desde)} y ${Math.round(ultimo)} dólares internacionales (±${(((razon - 1) / (razon + 1)) * 100).toFixed(1)} %)`);
  };
  for (let b = 500; b <= 2_000_000; b *= PASO) {
    const c = cargaDesde(grilla, base.mercado, b * base.ppa);
    const k = c ? codificarCarga(c) : "∅";
    if (c && !vistas.has(k)) {
      vistas.set(k, base.iso);
      if (JSON.stringify(decodificarCarga(k, grilla)) !== JSON.stringify(c)) fallas.push(`la carga «${k}» no vuelve igual al decodificarla`);
    }
    if (k !== actual) {
      cerrar();
      if (actual !== null) enElBorde = false;
      actual = k;
      desde = b;
    }
    ultimo = b;
  }
}
console.log(`Privacidad del link: ${vistas.size} cargas distintas en ${tramos} tramos; el más angosto, ${masAngosto.donde} (±${(((masAngosto.razon - 1) / (masAngosto.razon + 1)) * 100).toFixed(1)} %, mínimo ±10 %).`);

const payload = JSON.stringify(compactar(grilla, "es-AR", "https://calcular.ar"));
console.log(`Payload de la grilla al navegador: ${(payload.length / 1024).toFixed(1)} KB sin comprimir.`);

// Cuántos países entrarían solos con la inferencia, sin la tabla del motor ni `mundo`: es lo que
// le pasa a un país nuevo que nadie adaptó.
const soloInf = candidatosDelRegistro(registro, new Date(), { soloInferencia: true });
const conInf = construirGrillaMundo({ candidatos: soloInf.candidatos, excluidos: soloInf.excluidos, ppa: tablaPpa as TablaPpa, generadoEl: grilla.generadoEl });
console.log(`Solo con inferencia entrarían ${conInf.grilla.paises.length} de ${grilla.paises.filter((p) => p.sitio === "intl").length} países del registro: ${conInf.grilla.paises.map((p) => p.iso).join(" ")}`);

// El link de cada calculadora de sueldo dice «más de PAISES_PUENTE países»: no puede mentir.
if (grilla.paises.length <= PAISES_PUENTE) fallas.push(`la grilla tiene ${grilla.paises.length} países y el link de las calculadoras promete más de ${PAISES_PUENTE} (PAISES_PUENTE en src/motor/mundo/rutas.ts)`);
console.log(`\nGrilla armada en ${informe.ms} ms (${grilla.paises.length} países; el link promete más de ${PAISES_PUENTE}).`);
for (const f of fallas) console.error(`❌ ${f}`);
console.log(fallas.length ? `${fallas.length} FALLAS` : "TODO OK");
process.exit(fallas.length ? 1 : 0);
