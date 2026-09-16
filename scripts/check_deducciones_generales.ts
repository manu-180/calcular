// Verificación de las deducciones generales de Ganancias (art. 85 LIG).
// Correr con: npx tsx scripts/check_deducciones_generales.ts
//
// LOS ANCLAS:
//   1. Los topes de seguros de vida y retiro se DERIVAN del IPC de octubre (art. 78 Ley 27.743) y
//      tienen que coincidir al centavo con la tabla que publica ARCA para 2022-2026. Si alguien
//      redondea el coeficiente o cambia el mes del índice, este check lo caza.
//   2. Cada 5% es independiente: prepaga, honorarios y donaciones no comparten el límite.
//   3. Honorarios: primero 40% de lo facturado sin reintegro, después el 5%.
//   4. Intereses hipotecarios: $20.000 fijos, sin ajuste.
//   5. Deducir no es cobrar: el ahorro nunca supera el 35% de lo deducido y es cero si no se paga.

import { IPC_SERIE } from "../src/data/ipc-serie";
import {
  ANIO_FISCAL_VIGENTE,
  TOPE_SEGUROS_VIGENTE,
  TOPES_SEGUROS_ARCA,
  topeSegurosDe,
  topesSegurosDerivados,
} from "../src/data/deducciones-generales";
import { calcularDeduccionesGenerales, type EntradaDeduccionesGenerales } from "../src/lib/deducciones-generales";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.005) => Math.abs(a - b) <= tol;

// 1 · Topes derivados = tabla de ARCA, al centavo
const derivados = topesSegurosDerivados();
for (const [anio, monto] of Object.entries(TOPES_SEGUROS_ARCA)) {
  const d = derivados.find((t) => t.anio === Number(anio));
  check(`tope de seguros ${anio} derivado = ARCA ($${monto})`, d !== undefined && casi(d.monto, monto), d);
}
check(
  "la serie IPC tiene octubre de 2025 (sin él no existe el tope 2026)",
  IPC_SERIE.some(([p]) => p === "2025-10"),
);
check(
  `el tope vigente (${ANIO_FISCAL_VIGENTE}) es el de ARCA`,
  casi(TOPE_SEGUROS_VIGENTE, TOPES_SEGUROS_ARCA[ANIO_FISCAL_VIGENTE]),
  TOPE_SEGUROS_VIGENTE,
);
check("2021 sale de la tabla histórica ($24.000)", topeSegurosDe(2021) === 24_000);
const coefs = derivados.filter((t) => t.coeficiente !== null);
check(
  "cada coeficiente es octubre/octubre del IPC",
  coefs.every((t) => {
    const a = IPC_SERIE.find(([p]) => p === `${t.anio - 1}-10`)?.[1];
    const b = IPC_SERIE.find(([p]) => p === `${t.anio - 2}-10`)?.[1];
    return a !== undefined && b !== undefined && casi(t.coeficiente ?? 0, a / b, 1e-12);
  }),
);

const CERO: EntradaDeduccionesGenerales = {
  brutoMensual: 3_500_000,
  conyuge: false,
  hijos: 0,
  prepagaAnual: 0,
  honorariosFacturadosAnual: 0,
  honorariosReintegradosAnual: 0,
  seguroVidaAnual: 0,
  seguroRetiroAnual: 0,
  donacionesAnual: 0,
  interesesHipotecariosAnual: 0,
};
const de = (r: ReturnType<typeof calcularDeduccionesGenerales>, id: string) => r.lineas.find((l) => l.id === id)!;

// 2 · Base y 5% independientes
const r0 = calcularDeduccionesGenerales(CERO);
check(
  "la base del 5% es bruto anual con SAC menos aportes, antes de deducciones personales",
  casi(r0.baseCincoPorCiento, r0.impuestoSin.gananciaBrutaAnual - r0.impuestoSin.aportesAnual),
);
check("el tope del 5% es el 5% de esa base", casi(r0.topeCincoPorCiento, Math.round(r0.baseCincoPorCiento * 5) / 100));
check("sin gastos, nada deducible ni ahorro", r0.totalDeducible === 0 && r0.ahorroAnual === 0);

const mucho = r0.topeCincoPorCiento * 3;
const r1 = calcularDeduccionesGenerales({
  ...CERO,
  prepagaAnual: mucho,
  honorariosFacturadosAnual: mucho * 10,
  donacionesAnual: mucho,
});
check(
  "prepaga, honorarios y donaciones topean CADA UNO en el 5% (no un 5% compartido)",
  ["prepaga", "honorarios", "donaciones"].every((id) => casi(de(r1, id).deducible, r0.topeCincoPorCiento)),
  r1.lineas,
);
check("el total deducible suma los tres topes", casi(r1.totalDeducible, r0.topeCincoPorCiento * 3, 0.02));

// 3 · Honorarios: 40% de lo facturado neto de reintegros
const r2 = calcularDeduccionesGenerales({
  ...CERO,
  honorariosFacturadosAnual: 500_000,
  honorariosReintegradosAnual: 200_000,
});
check("honorarios = 40% de (facturado − reintegrado) bajo el 5%", casi(de(r2, "honorarios").deducible, 120_000), de(r2, "honorarios"));
const r2b = calcularDeduccionesGenerales({ ...CERO, honorariosFacturadosAnual: 100_000, honorariosReintegradosAnual: 900_000 });
check("un reintegro mayor a lo facturado no da deducción negativa", de(r2b, "honorarios").deducible === 0);

// Seguros: tope por concepto, diferimiento sólo en vida
const r3 = calcularDeduccionesGenerales({ ...CERO, seguroVidaAnual: 2_000_000, seguroRetiroAnual: 2_000_000 });
check("seguro de vida topea en el tope vigente", casi(de(r3, "seguroVida").deducible, TOPE_SEGUROS_VIGENTE));
check("seguro de retiro topea en el mismo tope, aparte", casi(de(r3, "seguroRetiro").deducible, TOPE_SEGUROS_VIGENTE));
check("el excedente de vida es diferible y el de retiro no", de(r3, "seguroVida").excedenteDiferible && !de(r3, "seguroRetiro").excedenteDiferible);

// 4 · Hipotecario fijo
const r4 = calcularDeduccionesGenerales({ ...CERO, interesesHipotecariosAnual: 3_000_000 });
check("intereses hipotecarios topean en $20.000", de(r4, "hipotecario").deducible === 20_000);

// 5 · Deducir no es cobrar
check("el ahorro no supera el 35% de lo deducido", r1.ahorroAnual <= r1.totalDeducible * 0.35 + 0.01, r1);
check("con deducciones y un sueldo que paga, hay ahorro", r1.ahorroAnual > 0);
const bajo = calcularDeduccionesGenerales({ ...CERO, brutoMensual: 1_000_000, prepagaAnual: 500_000 });
check("quien no paga Ganancias no ahorra nada", !bajo.impuestoSin.pagaGanancias && bajo.ahorroAnual === 0, bajo.impuestoSin);
check("entradas inválidas no rompen", calcularDeduccionesGenerales({ ...CERO, brutoMensual: NaN, prepagaAnual: -5 }).totalDeducible === 0);

console.log(fallas === 0 ? "\n✅ deducciones generales: todo verde" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
