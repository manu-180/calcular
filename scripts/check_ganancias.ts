// Verificación de calcularRetencionMensual — método acumulado RG ARCA 5008.
// Correr con: npx tsx scripts/check_ganancias.ts

import { DEDUCCIONES, ESCALA_GANANCIAS } from "../src/data/ganancias";
import { topeSipa, TOTAL_APORTES } from "../src/data/sueldo";
import { impuestoSegunEscala, calcularRetencionMensual } from "../src/lib/ganancias";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function aprox(a: number, b: number, tol = 1) {
  return Math.abs(a - b) < tol;
}

// ===========================================================================
// CASO 1: soltero sin hijos, bruto $5.000.000, sin sindical
// Deducciones personales anuales = MNI + especial = $29.880.454,52
// GNI mensual base (sin SAC): aprox $21.113.654 → meses sin SAC ~$283.010

const C1 = calcularRetencionMensual({ brutoMensual: 5_000_000 });

check("C1: retorna exactamente 12 filas", C1.length === 12);

// Invariante fundamental: suma de retencionMes = retencionAcumulada de diciembre
const sumaRetencionesMes = C1.reduce((s, f) => s + f.retencionMes, 0);
check("C1: suma(retencionMes) = retencionAcumulada[dic]", aprox(sumaRetencionesMes, C1[11].retencionAcumulada, 2));

// Con sueldo constante, la retención es uniforme DENTRO de cada tramo del año: antes del SAC de
// junio (meses 1-5) y después (meses 7-11). Entre los dos bloques puede diferir legítimamente: la
// extrapolación posterior al SAC arrastra el medio aguinaldo cobrado, y si eso cruza un tramo de
// la escala del art. 94 la alícuota marginal cambia. (Pasó al rotar al 2do semestre 2026: con
// bruto $5M la GNI extrapolada queda en el tramo del 19% antes del SAC y en el del 23% después.)
const mesesPreSAC = C1.filter((f) => f.mes >= 1 && f.mes <= 5);
const mesesPostSAC = C1.filter((f) => f.mes >= 7 && f.mes <= 11);
for (const f of mesesPreSAC) {
  check(
    `C1: mes ${f.mes} (${f.nombreMes}) pre-SAC = retención base de enero`,
    aprox(f.retencionMes, mesesPreSAC[0].retencionMes, 2)
  );
}
for (const f of mesesPostSAC) {
  check(
    `C1: mes ${f.mes} (${f.nombreMes}) post-SAC = retención base de julio`,
    aprox(f.retencionMes, mesesPostSAC[0].retencionMes, 2)
  );
}
const primerMes = mesesPreSAC[0].retencionMes;

// SAC months (junio y diciembre) deben tener retención MAYOR que los meses sin SAC
check("C1: junio tiene pico de retención por SAC", C1[5].retencionMes > primerMes * 1.5);
check("C1: diciembre tiene pico de retención por SAC", C1[11].retencionMes > primerMes * 1.5);

// Verificar enero con un cálculo independiente escrito acá (no se lee nada de lib/ganancias
// salvo la escala): aportes → GNI proporcional → extrapolación ×12 → impuesto → /12.
// Se arma desde las constantes oficiales para que la rotación semestral de ARCA no lo rompa.
const DEDUCCIONES_ANUALES = DEDUCCIONES.mni + DEDUCCIONES.deduccionEspecialDependencia;
const aportesMes5M = Math.min(5_000_000, topeSipa().baseMaxima) * TOTAL_APORTES;
const gniPropEnero = 5_000_000 - aportesMes5M - DEDUCCIONES_ANUALES / 12;
const retEneroEsperada = (impuestoSegunEscala(gniPropEnero * 12) / 12);
check(
  `C1: retención enero ≈ $${Math.round(retEneroEsperada).toLocaleString("es-AR")}`,
  aprox(C1[0].retencionMes, retEneroEsperada, 5),
  { esperada: Math.round(retEneroEsperada), obtenida: Math.round(C1[0].retencionMes) }
);

// GNI extrapolada de diciembre (mes 12: ya no extrapola) = GNI completa del año.
// Bruto anual = $5M×12 + medio aguinaldo ($2,5M) ×2; aportes sobre cada uno con tope SIPA.
const brutoAnual5M = 5_000_000 * 12 + 2_500_000 * 2;
const aportesAnual5M =
  aportesMes5M * 12 + Math.min(2_500_000, topeSipa().baseMaxima) * TOTAL_APORTES * 2;
const gniDicEsperada = brutoAnual5M - aportesAnual5M - DEDUCCIONES_ANUALES;
check(
  "C1: GNI extrapolada de diciembre = GNI anual real",
  aprox(C1[11].gniExtrapolada, gniDicEsperada, 50),
  { esperada: Math.round(gniDicEsperada), obtenida: Math.round(C1[11].gniExtrapolada) }
);

// Impuesto anual total: el acumulado de diciembre = impuesto sobre la GNI anual real.
const impAnualEsperado = impuestoSegunEscala(gniDicEsperada);
check(
  "C1: impuesto anual total (dic retencionAcumulada) correcto",
  aprox(C1[11].retencionAcumulada, impAnualEsperado, 50),
  { esperada: Math.round(impAnualEsperado), obtenida: Math.round(C1[11].retencionAcumulada) }
);

// ===========================================================================
// CASO 2: bruto $2.000.000 — por debajo del piso, NO debe pagar Ganancias

const C2 = calcularRetencionMensual({ brutoMensual: 2_000_000 });

check("C2: retorna 12 filas", C2.length === 12);
check("C2: enero sin retención (por debajo del MNI)", C2[0].retencionMes === 0);
check("C2: toda retención anual = 0", C2.every((f) => f.retencionMes === 0));
check("C2: gniExtrapolada enero = 0 (debajo del piso)", C2[0].gniExtrapolada === 0);

// ===========================================================================
// CASO 3: bruto $3.500.000 — paga Ganancias, verificar coherencia

const C3 = calcularRetencionMensual({ brutoMensual: 3_500_000 });

check("C3: retorna 12 filas", C3.length === 12);
check("C3: enero tiene retención positiva", C3[0].retencionMes > 0);
check("C3: brutoMes junio = 3.500.000 × 1.5", C3[5].brutoMes === 5_250_000);
check("C3: brutoMes julio = 3.500.000", C3[6].brutoMes === 3_500_000);

// Suma total = retencionAcumulada diciembre
const sumaC3 = C3.reduce((s, f) => s + f.retencionMes, 0);
check("C3: suma(retencionMes) = retencionAcumulada[dic]", aprox(sumaC3, C3[11].retencionAcumulada, 2));

// GNI diciembre para C3 (bruto $3.5M, todo por debajo del tope SIPA):
// bruto anual con SAC − aportes − deducciones personales anuales.
const gniC3DicEsperada =
  (3_500_000 * 12 + 1_750_000 * 2) -
  (3_500_000 * TOTAL_APORTES * 12 + 1_750_000 * TOTAL_APORTES * 2) -
  DEDUCCIONES_ANUALES;
check(
  "C3: GNI anual correcta",
  aprox(C3[11].gniExtrapolada, gniC3DicEsperada, 100),
  { esperada: gniC3DicEsperada, obtenida: Math.round(C3[11].gniExtrapolada) }
);

// ===========================================================================
// CASO 4: con cónyuge e hijos (2), bruto $5.000.000 — menor retención que C1

const C4 = calcularRetencionMensual({ brutoMensual: 5_000_000, conyuge: true, hijos: 2 });

check("C4: retorna 12 filas", C4.length === 12);
check("C4: retención anual MENOR que soltero sin hijos", C4[11].retencionAcumulada < C1[11].retencionAcumulada);
check("C4: enero positivo pero menor que C1", C4[0].retencionMes > 0 && C4[0].retencionMes < C1[0].retencionMes);

// Diferencia: deducciones adicionales = conyuge ($4.851.964,66) + 2×hijo ($4.893.726,96) = $9.745.691,62
// Esto reduce la GNI anual → impuesto menor
check("C4: gniExtrapolada diciembre menor que C1", C4[11].gniExtrapolada < C1[11].gniExtrapolada);

// ===========================================================================
// CASO 5: con otras deducciones anuales (ej. prepaga $500.000/mes = $6.000.000/año)

const C5 = calcularRetencionMensual({ brutoMensual: 5_000_000, otrasDeduccionesAnual: 6_000_000 });

check("C5: retorna 12 filas", C5.length === 12);
check("C5: GNI diciembre menor que C1 por deducciones extra", C5[11].gniExtrapolada < C1[11].gniExtrapolada);
check("C5: retención total menor que C1", C5[11].retencionAcumulada < C1[11].retencionAcumulada);

// ===========================================================================
// CASO 6: sin SAC (empleados que no lo cobran o para verificar diferencia)

const C6 = calcularRetencionMensual({ brutoMensual: 5_000_000, incluirSAC: false });

check("C6: retorna 12 filas", C6.length === 12);
check("C6: sin SAC, junio sin pico", C6[5].brutoMes === 5_000_000);
check("C6: sin SAC, diciembre sin pico", C6[11].brutoMes === 5_000_000);
// Sin SAC, todas las retenciones mensuales deben ser iguales
const retC6Jan = C6[0].retencionMes;
check("C6: sin SAC, retenciones mensuales uniformes", C6.every((f) => aprox(f.retencionMes, retC6Jan, 2)));
// GNI diciembre con 12 meses = GNI anual sin SAC (bruto $60M − aportes con tope − deducciones).
const gniC6DicEsperada = 5_000_000 * 12 - aportesMes5M * 12 - DEDUCCIONES_ANUALES;
check(
  "C6: GNI diciembre sin SAC = anualización del sueldo",
  aprox(C6[11].gniExtrapolada, gniC6DicEsperada, 50),
  { esperada: gniC6DicEsperada, obtenida: Math.round(C6[11].gniExtrapolada) }
);

// ===========================================================================
// RESULTADO FINAL

if (fallas === 0) {
  console.log(`\n✅ Todos los checks de ganancias pasaron.`);
  process.exit(0);
} else {
  console.error(`\n❌ ${fallas} check(s) fallaron.`);
  process.exit(1);
}
