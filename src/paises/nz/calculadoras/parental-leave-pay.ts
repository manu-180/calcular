import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.parental-leave-pay",
  mercado: "nz",
  concepto: "propio",
  slug: "parental-leave-pay",
  estado: "publicado",
  requiere: {
    "nz.parental-leave-max-weekly": "numero",
    "nz.parental-leave-self-employed-min": "numero",
    "nz.parental-leave-weeks": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "How do you earn your income?",
      opciones: [
        { valor: "employee", etiqueta: "I'm an employee" },
        { valor: "self-employed", etiqueta: "I'm self-employed" },
      ],
      porDefecto: "employee",
    },
    { id: "semanaOrdinaria", tipo: "moneda", etiqueta: "Employee: your ordinary weekly pay", min: 0, porDefecto: 1100 },
    {
      id: "mejores26",
      tipo: "moneda",
      etiqueta: "Employee: total earnings in your best 26 weeks of the last 52",
      min: 0,
      porDefecto: 26980,
      ayuda: "The 52 weeks before your due date. The 26 weeks don't need to be in a row.",
    },
    { id: "neto12", tipo: "moneda", etiqueta: "Self-employed: net income for the last 12 months", min: 0, porDefecto: 0 },
    { id: "neto6", tipo: "moneda", etiqueta: "Self-employed: net income for the last 6 months", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const tope = v["nz.parental-leave-max-weekly"];
    const minimo = v["nz.parental-leave-self-employed-min"];
    let promedio: number;
    if (entrada.tipo === "employee") {
      if (entrada.semanaOrdinaria <= 0 && entrada.mejores26 <= 0) throw new ErrorEntrada("Enter your weekly pay or your earnings.", "semanaOrdinaria");
      promedio = Math.max(entrada.semanaOrdinaria, redondear(entrada.mejores26 / 26));
    } else {
      promedio = Math.max(redondear(entrada.neto12 / 52), redondear(entrada.neto6 / 26));
    }
    const semanal = redondear(Math.min(tope, entrada.tipo === "employee" ? promedio : Math.max(promedio, minimo)));
    const observaciones: string[] = [];
    if (promedio > tope) observaciones.push(`Your income is over the cap, so you get the maximum of ${dolares(tope)} a week before tax.`);
    if (entrada.tipo === "self-employed" && promedio < minimo) observaciones.push(`Self-employed parents get at least ${dolares(minimo)} a week.`);
    return {
      semanal,
      quincenal: redondear(semanal * 2),
      total: redondear(semanal * v["nz.parental-leave-weeks"]),
      promedio: redondear(promedio),
      semanas: v["nz.parental-leave-weeks"],
      tope,
      observaciones,
    };
  },
  resultado: [
    { clave: "semanal", etiqueta: "Parental leave payment a week (before tax)", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "A fortnight", formato: "moneda" },
    { clave: "total", etiqueta: "Total if you take every week", formato: "moneda" },
    { clave: "semanas", etiqueta: "Weeks of payments", formato: "numero", decimales: 0 },
    { clave: "promedio", etiqueta: "Your weekly income used", formato: "moneda" },
    { clave: "tope", etiqueta: "Maximum a week", formato: "moneda" },
  ],
});
