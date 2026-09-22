// Verificación de Ganancias para jubilados (deducción específica del art. 30 LIG).
// Correr con: npx tsx scripts/check_ganancias_jubilados.ts
//
// LOS ANCLAS:
//   1. La específica es 8 × la suma de los haberes mínimos del año, mes por mes, tomados de la serie
//      oficial de ANSES — y los meses todavía no publicados se completan con el último, nunca con más.
//   2. Reemplaza SOLO a los incisos a) y c): con cónyuge el umbral tiene que subir.
//   3. Otros ingresos o Bienes Personales la hacen caer: vuelve a) + c) apdo. 2 + la doceava parte.
//   4. El umbral que publica la página es exacto: un peso abajo no paga, mil arriba sí.
//   5. La frase de la página sobre el haber máximo se deriva del motor, no se escribe a mano.

import { DEDUCCIONES } from "../src/data/ganancias";
import { HABER_MINIMO_SERIE } from "../src/data/jubilaciones";
import { PRESTACIONES_VIGENTES } from "../src/data/prestaciones";
import { JUBILADOS_TEXTOS } from "../src/data/ganancias-jubilados";
import { aporteSobre } from "../src/lib/descuento-pami";
import {
  DEDUCCIONES_A_Y_C,
  calcularGananciasJubilados,
  deduccionEspecificaAnual,
  haberesMinimosProyectados,
} from "../src/lib/ganancias-jubilados";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol;

// 1 · La suma de haberes mínimos sale de la serie oficial
const meses = haberesMinimosProyectados();
check("el año tiene 12 meses", meses.length === 12);
const publicados = meses.filter((m) => m.publicado);
check(
  "cada mes publicado es el de la serie de ANSES",
  publicados.every((m) => HABER_MINIMO_SERIE.find((s) => s.periodo === m.periodo)?.haberMinimo === m.haberMinimo),
);
check("hay al menos 9 meses publicados de 2026", publicados.length >= 9, publicados.length);
const ultimoPublicado = publicados.at(-1)!.haberMinimo;
check(
  "los meses sin publicar repiten el último haber mínimo (subestima, nunca sobreestima)",
  meses.filter((m) => !m.publicado).every((m) => m.haberMinimo === ultimoPublicado),
);
check(
  "el último haber mínimo publicado es el vigente de prestaciones.ts",
  ultimoPublicado === PRESTACIONES_VIGENTES.haberMinimo,
  { ultimoPublicado, vigente: PRESTACIONES_VIGENTES.haberMinimo },
);
const suma = meses.reduce((s, m) => s + m.haberMinimo, 0);
check("específica = 8 × suma de los haberes mínimos", casi(deduccionEspecificaAnual(), 8 * suma), deduccionEspecificaAnual());
check("a) + c) = no imponible + especial apdo. 2", casi(DEDUCCIONES_A_Y_C, DEDUCCIONES.mni + DEDUCCIONES.deduccionEspecialDependencia));

// 2 · Caso base y cargas de familia
const base = calcularGananciasJubilados({ haberBruto: 4_000_000 });
check("con la específica mayor que a)+c), se aplica", base.aplicaEspecifica === (deduccionEspecificaAnual() > DEDUCCIONES_A_Y_C));
check("la específica no lleva doceava parte", base.doceava === 0);
check("13 haberes: el aguinaldo tributa", casi(base.brutoAnual, 4_000_000 * 13));
check(
  "la obra social se descuenta sobre los 13 haberes",
  casi(base.obraSocialAnual, aporteSobre(4_000_000, "dependencia").total * 13, 0.1),
);
const conConyuge = calcularGananciasJubilados({ haberBruto: 4_000_000, conyuge: true, hijos: 1 });
check(
  "cónyuge e hijo se suman a la específica (reemplaza sólo a) y c))",
  casi(conConyuge.deduccionesTotales, base.deduccionesTotales + DEDUCCIONES.conyuge + DEDUCCIONES.hijo),
);
check("con cargas el umbral sube", conConyuge.umbralHaber > base.umbralHaber);

// 3 · Cuándo se pierde
for (const [nombre, entrada] of [
  ["otros ingresos", { otrosIngresos: true }],
  ["Bienes Personales", { bienesPersonales: true }],
] as const) {
  const r = calcularGananciasJubilados({ haberBruto: 4_000_000, conyuge: true, ...entrada });
  check(`${nombre}: se pierde la específica`, !r.aplicaEspecifica);
  check(
    `${nombre}: vuelve a) + c) apdo. 2 + cargas + la doceava parte`,
    casi(r.deduccionesTotales, ((DEDUCCIONES_A_Y_C + DEDUCCIONES.conyuge) * 13) / 12, 0.05),
    r.deduccionesTotales,
  );
}
check(
  "perder la específica baja el umbral",
  calcularGananciasJubilados({ haberBruto: 1, bienesPersonales: true }).umbralHaber < base.umbralHaber,
);

// 4 · El umbral es exacto
for (const r of [base, conConyuge]) {
  const debajo = calcularGananciasJubilados({ haberBruto: r.umbralHaber - 1, conyuge: r.cargasFamilia > 0, hijos: r.cargasFamilia > DEDUCCIONES.conyuge ? 1 : 0 });
  const arriba = calcularGananciasJubilados({ haberBruto: r.umbralHaber + 1000, conyuge: r.cargasFamilia > 0, hijos: r.cargasFamilia > DEDUCCIONES.conyuge ? 1 : 0 });
  check(`umbral ${Math.round(r.umbralHaber)}: un peso abajo no paga`, !debajo.pagaGanancias, debajo.impuestoAnual);
  check(`umbral ${Math.round(r.umbralHaber)}: mil arriba paga`, arriba.pagaGanancias);
}
check("el umbral en haberes mínimos queda entre 6 y 8", base.umbralEnHaberesMinimos > 6 && base.umbralEnHaberesMinimos < 8, base.umbralEnHaberesMinimos);

// 5 · El haber máximo: la frase se deriva
const maximo = calcularGananciasJubilados({ haberBruto: PRESTACIONES_VIGENTES.haberMaximo });
check(
  "el haber máximo paga si y sólo si supera el umbral",
  maximo.pagaGanancias === PRESTACIONES_VIGENTES.haberMaximo >= base.umbralHaber,
);
check("haber cero no paga", !calcularGananciasJubilados({ haberBruto: 0 }).pagaGanancias);

// 6 · Los verbatim dicen lo que el motor usa
check("el texto de la ley dice ocho veces", JUBILADOS_TEXTOS.especifica.includes("ocho (8) veces la suma de los haberes mínimos"));
check("el texto de la ley reemplaza a) y c)", JUBILADOS_TEXTOS.especifica.includes("incisos a) y c) de este artículo, serán reemplazadas"));
check("Bienes Personales exceptúa la vivienda única", JUBILADOS_TEXTOS.bienesPersonales.includes("vivienda única"));
check("la doceava suma a), b) y c) apdo. 2", JUBILADOS_TEXTOS.doceava.includes("incisos a), b) y c), apartado 2"));

if (fallas > 0) {
  console.error(`\n${fallas} falla(s).`);
  process.exit(1);
}
console.log("\nGanancias para jubilados: todo verde.");
