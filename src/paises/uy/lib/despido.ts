import type { FechaISO } from "@/motor/tipos";
import { aniosCumplidos, aniosOFraccion } from "./fechas";
import { diasDeLicenciaAnual } from "./licencia";

export interface DespidoMensual {
  meses: number;
  aniosComputados: number;
  incidenciaAguinaldo: number;
  incidenciaLicencia: number;
  baseMensual: number;
  indemnizacion: number;
}

// Método del MTSS: la "remuneración total" del mes suma al sueldo la doceava de aguinaldo y la parte
// de licencia (sueldo / 30 por los días anuales / 12). El salario vacacional queda afuera a propósito:
// un decreto de 2000 dice que no es salario y la jurisprudencia dice que sí; se avisa en la página.
export function despidoMensual(
  p: { sueldo: number; ingreso: FechaISO; egreso: FechaISO; incidencias: boolean },
  d: { topeMeses: number; diasLicencia: number },
  redondear: (n: number) => number,
): DespidoMensual {
  const aniosComputados = aniosOFraccion(p.ingreso, p.egreso);
  const meses = Math.min(d.topeMeses, aniosComputados);
  const diasAnuales = diasDeLicenciaAnual(d.diasLicencia, aniosCumplidos(p.ingreso, p.egreso));
  const incidenciaAguinaldo = p.incidencias ? redondear(p.sueldo / 12) : 0;
  const incidenciaLicencia = p.incidencias ? redondear(((p.sueldo / 30) * diasAnuales) / 12) : 0;
  const baseMensual = redondear(p.sueldo + incidenciaAguinaldo + incidenciaLicencia);
  return { meses, aniosComputados, incidenciaAguinaldo, incidenciaLicencia, baseMensual, indemnizacion: redondear(baseMensual * meses) };
}
