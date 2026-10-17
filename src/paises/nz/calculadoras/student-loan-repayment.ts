import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares, PERIODOS, sobreUmbral } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.student-loan-repayment",
  mercado: "nz",
  concepto: "propio",
  slug: "student-loan-repayment",
  estado: "publicado",
  requiere: {
    "nz.student-loan-threshold": "numero",
    "nz.student-loan-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your pay before tax", min: 0, porDefecto: 60000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "That amount is per",
      opciones: [
        { valor: "year", etiqueta: "Year" },
        { valor: "month", etiqueta: "Month" },
        { valor: "fortnight", etiqueta: "Fortnight" },
        { valor: "week", etiqueta: "Week" },
      ],
      porDefecto: "year",
    },
    {
      id: "trabajo",
      tipo: "opcion",
      etiqueta: "Which job is this?",
      opciones: [
        { valor: "main", etiqueta: "My main job (tax code M SL or ME SL)" },
        { valor: "secondary", etiqueta: "A second job (secondary SL tax code)" },
      ],
      porDefecto: "main",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your pay before tax.", "salario");
    const anual = entrada.salario * PERIODOS[entrada.periodo];
    const umbral = entrada.trabajo === "main" ? v["nz.student-loan-threshold"] : 0;
    const repago = redondear(sobreUmbral(anual, umbral, v["nz.student-loan-rate"]));
    const observaciones: string[] = [];
    if (entrada.trabajo === "main" && repago === 0) {
      observaciones.push(`You earn under the repayment threshold of ${dolares(v["nz.student-loan-threshold"])} a year, so nothing comes off your pay.`);
    }
    if (entrada.trabajo === "secondary") {
      observaciones.push("The threshold doesn't apply to a second job, so the rate is charged on all of that pay. If your main job pays under the threshold, you can apply to Inland Revenue for a special deduction rate.");
    }
    return {
      anual: repago,
      mensual: redondear(repago / 12),
      quincenal: redondear(repago / 26),
      semanal: redondear(repago / 52),
      umbral,
      observaciones,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Student loan repayment a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "A month", formato: "moneda" },
    { clave: "quincenal", etiqueta: "A fortnight", formato: "moneda" },
    { clave: "semanal", etiqueta: "A week", formato: "moneda" },
    { clave: "umbral", etiqueta: "Repayment threshold used", formato: "moneda" },
  ],
});
