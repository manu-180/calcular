import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "np.maternity-leave-calculator",
  mercado: "np",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "np.maternity-leave-weeks": "numero",
    "np.maternity-paid-days": "numero",
    "np.maternity-extra-month": "numero",
    "np.paternity-days": "numero",
  },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Leave for",
      opciones: [
        { valor: "mother", etiqueta: "The mother (maternity leave)" },
        { valor: "father", etiqueta: "The father (paternity care leave)" },
      ],
      porDefecto: "mother",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", porDefecto: "hoy" },
    { id: "extra", tipo: "si-no", etiqueta: "A doctor recommends one more month", porDefecto: false, visibleSi: { quien: ["mother"] } },
  ],
  calcular(e, v) {
    if (e.quien === "father") {
      const dias = v["np.paternity-days"];
      return { dias, diasPagados: dias, fin: sumarDias(e.inicio, dias - 1), finPago: sumarDias(e.inicio, dias - 1), regreso: sumarDias(e.inicio, dias), extraDias: 0, observaciones: [] as string[] };
    }
    const dias = v["np.maternity-leave-weeks"] * 7;
    const pagados = v["np.maternity-paid-days"];
    const extraDias = e.extra ? 30 * v["np.maternity-extra-month"] : 0;
    const fin = sumarDias(e.inicio, dias + extraDias - 1);
    const observaciones = ["Leave starts at least two weeks before the due date and at least six weeks must be taken after the birth.", "Workers in the Social Security Fund receive maternity pay from the Fund instead of the employer."];
    return { dias: dias + extraDias, diasPagados: pagados + extraDias, fin, finPago: sumarDias(e.inicio, pagados + extraDias - 1), regreso: sumarDias(e.inicio, dias + extraDias), extraDias, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Days of leave", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "Last day of leave", formato: "fecha" },
    { clave: "regreso", etiqueta: "Day you go back to work", formato: "fecha" },
    { clave: "diasPagados", etiqueta: "Days of leave on full pay from the employer", formato: "dias" },
    { clave: "finPago", etiqueta: "Last day of full pay", formato: "fecha" },
  ],
});
