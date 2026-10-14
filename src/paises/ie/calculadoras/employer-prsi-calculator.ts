import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.employer-prsi-calculator",
  mercado: "ie",
  concepto: "costo-empleador",
  slug: "employer-prsi-calculator",
  estado: "publicado",
  requiere: {
    "ie.prsi-employer-rates": "mapa",
    "ie.prsi-weekly-thresholds": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Employee's gross pay", min: 0, porDefecto: 45000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "That pay is for",
      opciones: [
        { valor: "year", etiqueta: "A year" },
        { valor: "month", etiqueta: "A month" },
        { valor: "week", etiqueta: "A week" },
      ],
      porDefecto: "year",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter the employee's pay before tax.", "importe");
    const semanal = entrada.periodo === "week" ? entrada.importe : entrada.periodo === "month" ? (entrada.importe * 12) / 52 : entrada.importe / 52;
    const limite = v["ie.prsi-weekly-thresholds"]["employer-higher"];
    const alta = semanal > limite;
    const tasa = v["ie.prsi-employer-rates"][alta ? "higher" : "lower"];
    const prsiSemana = redondear((semanal * tasa) / 100);
    const prsiAnio = redondear(prsiSemana * 52);
    const sueldoAnio = redondear(semanal * 52);
    const observaciones = [
      alta
        ? `Weekly pay is over ${euros(limite)}, so the higher employer rate applies to all of it.`
        : `Weekly pay is ${euros(limite)} or less, so the lower employer rate applies.`,
    ];
    return {
      costoAnio: redondear(sueldoAnio + prsiAnio),
      prsiSemana,
      prsiMes: redondear(prsiAnio / 12),
      prsiAnio,
      sueldoAnio,
      semanal: redondear(semanal),
      tasa,
      observaciones,
    };
  },
  resultado: [
    { clave: "costoAnio", etiqueta: "Total yearly cost (pay plus employer PRSI)", formato: "moneda", destacada: true },
    { clave: "prsiAnio", etiqueta: "Employer PRSI a year", formato: "moneda" },
    { clave: "prsiMes", etiqueta: "Employer PRSI a month", formato: "moneda" },
    { clave: "prsiSemana", etiqueta: "Employer PRSI a week", formato: "moneda" },
    { clave: "sueldoAnio", etiqueta: "Gross pay a year", formato: "moneda" },
    { clave: "semanal", etiqueta: "Weekly pay used", formato: "moneda" },
    { clave: "tasa", etiqueta: "Employer PRSI rate", formato: "porcentaje", decimales: 2 },
  ],
});
