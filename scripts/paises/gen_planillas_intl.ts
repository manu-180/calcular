// Genera private/intl/<mercado>/sueldo-y-liquidacion-<año>.xlsx para cada país con planilla, con los
// datos vigentes del paquete del país a la fecha de hoy en su zona horaria. Corre en el prebuild
// (vía scripts/gen_planilla_todas.ts): el archivo que se vende nace del deploy.
// La verificación contra las calculadoras está en scripts/check_planillas_intl.ts.
//
// Uso: npx tsx scripts/paises/gen_planillas_intl.ts

import { PLANILLAS_INTL, construirPlanilla, escribirPlanilla } from "../planillas-intl";

export async function generarPlanillasIntl(): Promise<{ mercado: string; ruta: string | null; hojas: number }[]> {
  const salida: { mercado: string; ruta: string | null; hojas: number }[] = [];
  for (const planilla of PLANILLAS_INTL) {
    const p = construirPlanilla(planilla);
    if (!p) {
      salida.push({ mercado: planilla.mercado, ruta: null, hojas: 0 });
      continue;
    }
    if (p.faltan.length) {
      console.error(`[ALERTA planilla-intl] ${planilla.mercado}: faltan las hojas ${p.faltan.join(", ")}; se conserva el archivo anterior`);
      salida.push({ mercado: planilla.mercado, ruta: null, hojas: p.libro.hojas.length });
      continue;
    }
    salida.push({ mercado: planilla.mercado, ruta: await escribirPlanilla(p), hojas: p.libro.hojas.length });
  }
  return salida;
}

if (process.argv[1] && /gen_planillas_intl\.ts$/.test(process.argv[1])) {
  generarPlanillasIntl()
    .then((r) => {
      for (const x of r) console.log(`${x.ruta ? "OK " : "-- "} ${x.mercado}  ${x.ruta ?? "sin planilla (nada publicable)"}  ${x.hojas} hojas de cálculo`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
