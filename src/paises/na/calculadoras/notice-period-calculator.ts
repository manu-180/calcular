import { definirCalculadora } from "@/motor/calculo";
import { ANTIGUEDADES, preaviso, textoPreaviso } from "../lib/terminacion";

export default definirCalculadora({
  id: "na.notice-period-calculator",
  mercado: "na",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "na.notice-period": "mapa",
    "na.weeks-per-month": "numero",
  },
  campos: [
    { id: "antiguedad", tipo: "opcion", etiqueta: "Time with your employer", opciones: ANTIGUEDADES, porDefecto: "over-1-year" },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly pay (optional, for pay instead of notice)", min: 0, requerido: false },
    { id: "dias", tipo: "entero", etiqueta: "Days you work in a normal week", min: 1, max: 6, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    const p = preaviso(e.antiguedad, v["na.notice-period"], e.salario ?? 0, v["na.weeks-per-month"], e.dias);
    return {
      preaviso: textoPreaviso(p),
      pago: e.salario === null ? null : redondear(p.pago),
      observaciones: [
        "This is the legal minimum. You and your employer can agree on a longer notice period, but it has to be the same length for both of you.",
        p.unidad === "month"
          ? "Notice of one month can only be given on the 1st or the 15th of the month."
          : p.unidad === "week"
            ? "Notice of one week can be given on or before the last working day of the week."
            : "Notice of one day can be given on any working day.",
      ],
    };
  },
  resultado: [
    { clave: "preaviso", etiqueta: "Minimum notice", formato: "texto", destacada: true },
    { clave: "pago", etiqueta: "Pay instead of notice", formato: "moneda" },
  ],
});
