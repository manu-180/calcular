import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPOS_PROMEDIO, salarioDiarioPromedio, salarioMensualPromedio } from "../lib/salarios";

export default definirCalculadora({
  id: "hk.payment-in-lieu-of-notice",
  mercado: "hk",
  concepto: "preaviso",
  slug: "payment-in-lieu-of-notice",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "unidad",
      tipo: "opcion",
      etiqueta: "Your notice period is set in",
      opciones: [
        { valor: "months", etiqueta: "Months" },
        { valor: "days", etiqueta: "Days or weeks" },
      ],
      porDefecto: "months",
    },
    { id: "meses", tipo: "numero", etiqueta: "Months of notice", min: 0, max: 12, porDefecto: 1, visibleSi: { unidad: ["months"] } },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Days in the notice period for which wages would normally be paid",
      ayuda: "For 2 weeks with paid rest days, 14. Leave out unpaid rest days.",
      min: 0,
      max: 366,
      porDefecto: 7,
      visibleSi: { unidad: ["days"] },
    },
    ...CAMPOS_PROMEDIO,
  ],
  calcular(entrada, _v, { redondear }) {
    let pago: number;
    let base: number;
    if (entrada.unidad === "months") {
      if (!entrada.meses || entrada.meses <= 0) throw new ErrorEntrada("Enter the months of notice.", "meses");
      if (entrada.salarios12 <= 0) throw new ErrorEntrada("Enter the wages you earned in the 12 months.", "salarios12");
      base = salarioMensualPromedio(entrada);
      pago = base * entrada.meses;
    } else {
      if (!entrada.dias || entrada.dias <= 0) throw new ErrorEntrada("Enter the days of notice.", "dias");
      base = salarioDiarioPromedio(entrada);
      pago = base * entrada.dias;
    }
    return {
      pago: redondear(pago),
      base: redondear(base),
      observaciones: [
        "On a continuous contract, notice is what your contract says but at least 7 days. If the contract says nothing, it's at least one month.",
        "The 12 months are counted back from the day notice is given (or the day the contract ends if no notice was given).",
      ],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Payment in lieu of notice", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Average wages used (monthly or daily)", formato: "moneda" },
  ],
});
