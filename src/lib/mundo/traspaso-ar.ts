import { guardarTraspaso } from "@/motor/mundo/traspaso";
import type { MundoCalculadora } from "@/motor/tipos";
import { PAGAS_AR } from "./pagas-ar";

// calcular.ar no está en el registro ni en la tabla de adaptadores del motor: la lectura va como si la
// calculadora la declarara. El bruto es el del recibo y el año son PAGAS_AR sueldos; la página del mundo
// lo divide por las pagas de la grilla, que salen de la misma constante.
const LECTURA_AR = {
  campos: [],
  resultado: [],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: PAGAS_AR } satisfies MundoCalculadora,
};

export function guardarTraspasoAR(brutoMensual: number): void {
  if (!Number.isFinite(brutoMensual) || brutoMensual <= 0) return;
  guardarTraspaso({ mercado: "ar", calculadora: "ar.sueldo-neto", crudos: { bruto: brutoMensual }, definicion: LECTURA_AR });
}
