// Genera private/intl/<mercado>/sueldo-y-liquidacion-<año>.xlsx para cada país con planilla, con los
// datos vigentes del paquete del país a la fecha de hoy en su zona horaria, y al lado su mapa
// (.mapa.json): qué calculadora tiene hoja y en qué celda va cada campo. Corre en el prebuild
// (vía scripts/gen_planilla_todas.ts): el archivo que se vende nace del deploy.
// La verificación contra las calculadoras está en scripts/check_planillas_intl.ts y la del mapa y
// la planilla con los datos de la persona en scripts/check_ofertas_intl.ts.
//
// Uso: npx tsx scripts/paises/gen_planillas_intl.ts

import { writeFileSync } from "node:fs";
import { opcionesDinamicas, resolverValores } from "../../src/motor/registro";
import type { Campo, PaisDefinido } from "../../src/motor/tipos";
import { archivoMapa, claveValor, serialExcel, type BloqueMapa, type CeldaMapa, type MapaPlanilla } from "../../src/lib/pagos/mapa-planilla-intl";
import { PLANILLAS_INTL, construirPlanilla, escribirPlanilla, type PlanillaConstruida } from "../planillas-intl";
import type { Entrada } from "../planillas-intl/marco";

function probar(e: Entrada, v: unknown): unknown {
  try {
    return e.convertir(v);
  } catch {
    return undefined;
  }
}

const cerca = (a: unknown, b: number) => typeof a === "number" && Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));

// La conversión de cada celda se deduce probando la del generador sobre el dominio del campo: así el
// mapa no repite a mano lo que ya decide la hoja (etiquetas de opciones, número de serie de fechas).
function celdaDe(campo: Campo, e: Entrada, dominio: readonly unknown[]): CeldaMapa | null {
  if (campo.tipo === "fecha") {
    const f = "2026-03-15";
    return cerca(probar(e, f), serialExcel(f)) && cerca(probar(e, "2019-12-31"), serialExcel("2019-12-31")) ? { ref: e.ref, tipo: "fecha-serial" } : null;
  }
  if (campo.tipo === "moneda" || campo.tipo === "numero" || campo.tipo === "entero" || campo.tipo === "porcentaje") {
    const factor = probar(e, 1);
    if (typeof factor !== "number" || factor === 0) return null;
    const lineal = [0, 37, 1234.5, 98765].every((x) => cerca(probar(e, x), x * factor));
    return lineal ? { ref: e.ref, tipo: "numero", factor } : null;
  }
  const valores: Record<string, string | number | boolean | null> = {};
  for (const v of dominio) {
    const r = probar(e, v);
    if (r === undefined || (r !== null && typeof r === "object")) return null;
    valores[claveValor(v)] = r as string | number | boolean | null;
  }
  return Object.keys(valores).length ? { ref: e.ref, tipo: "valor", valores } : null;
}

export function mapaDePlanilla(p: PlanillaConstruida): MapaPlanilla {
  const pais: PaisDefinido = p.libro.pais;
  const bloques: BloqueMapa[] = [];
  for (const b of p.libro.bloques) {
    const def = pais.calculadoras.find((c) => c.definicion.slug === b.calculadora)?.definicion;
    if (!def) continue;
    const r = resolverValores(pais, def, p.hoy);
    const dinamicas = r.ok ? opcionesDinamicas(pais, def, r.valores) : {};
    const celdas: Record<string, CeldaMapa> = {};
    for (const campo of def.campos) {
      const e = b.entradas[campo.id];
      if (!e) continue;
      const dominio =
        campo.tipo === "si-no"
          ? [true, false]
          : campo.tipo === "opcion"
            ? campo.opciones.map((o) => o.valor)
            : campo.tipo === "region"
              ? (pais.mercado.regiones ?? []).map((x) => x.id)
              : campo.tipo === "opcion-dato"
                ? (dinamicas[campo.id] ?? []).map((o) => o.valor)
                : [];
      const c = celdaDe(campo, e, campo.requerido === false && dominio.length ? [...dominio, null] : dominio);
      if (c) celdas[campo.id] = c;
    }
    bloques.push({ calculadora: b.calculadora, hoja: b.hoja, celdas });
  }
  return { version: 1, archivo: p.archivo, bloques };
}

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
    // El mapa se arma antes de escribir: si falla, no queda un .xlsx nuevo con el mapa del anterior.
    const mapa = mapaDePlanilla(p);
    const ruta = await escribirPlanilla(p);
    writeFileSync(archivoMapa(ruta), `${JSON.stringify(mapa)}\n`);
    salida.push({ mercado: planilla.mercado, ruta, hojas: p.libro.hojas.length });
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
