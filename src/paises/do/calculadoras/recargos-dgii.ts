import { definirCalculadora, porcentaje } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { sumarMeses } from "../lib/fechas";

// Recargo e interés se cobran «por cada mes o fracción de mes»: un día después del vencimiento ya
// cuenta como un mes entero.
function mesesOFraccion(vencimiento: FechaISO, pago: FechaISO): number {
  if (pago <= vencimiento) return 0;
  let n = 1;
  while (sumarMeses(vencimiento, n) < pago) n++;
  return n;
}

export default definirCalculadora({
  id: "do.recargos-dgii",
  mercado: "do",
  concepto: "propio",
  slug: "recargos-dgii",
  estado: "publicado",
  requiere: {
    "do.recargo-mora": "numero",
    "do.recargo-mora-tope": "numero",
    "do.interes-indemnizatorio": "numero",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "Impuesto que no pagaste a tiempo", min: 0 },
    { id: "vencimiento", tipo: "fecha", etiqueta: "Fecha límite de pago" },
    { id: "pago", tipo: "fecha", etiqueta: "Fecha en que vas a pagar", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const meses = mesesOFraccion(entrada.vencimiento, entrada.pago);
    const tasaRecargo = Math.min(valores["do.recargo-mora"] * meses, valores["do.recargo-mora-tope"]);
    const recargo = redondear(porcentaje(entrada.impuesto, tasaRecargo));
    const interes = redondear(porcentaje(entrada.impuesto, valores["do.interes-indemnizatorio"] * meses));
    const observaciones: string[] = [];
    if (meses === 0) observaciones.push("Pagas a tiempo: no hay recargos ni intereses.");
    if (entrada.vencimiento < "2026-07-01" && meses > 0)
      observaciones.push("Para la parte del atraso anterior al 1 de julio de 2026 la DGII aplica el esquema anterior: 10 % el primer mes y 4 % los siguientes. Este cálculo usa la tasa actual en todos los meses.");
    observaciones.push("Si rectificas por tu cuenta, sin que la DGII te lo pida, y pagas de inmediato, el recargo baja 90 %.");
    return { meses, tasaRecargo, recargo, interes, total: redondear(entrada.impuesto + recargo + interes), observaciones };
  },
  resultado: [
    { clave: "meses", etiqueta: "Meses o fracción de atraso", formato: "meses" },
    { clave: "tasaRecargo", etiqueta: "Recargo acumulado", formato: "porcentaje" },
    { clave: "recargo", etiqueta: "Recargo por mora", formato: "moneda" },
    { clave: "interes", etiqueta: "Interés indemnizatorio", formato: "moneda" },
    { clave: "total", etiqueta: "Total a pagar", formato: "moneda", destacada: true },
  ],
});
