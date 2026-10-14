import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { libras, sobreUmbral } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.student-loan-repayment",
  mercado: "gb",
  concepto: "propio",
  slug: "student-loan-repayment",
  estado: "publicado",
  requiere: {
    "gb.student-loan-thresholds": "mapa",
    "gb.student-loan-rate": "numero",
    "gb.postgraduate-loan-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Annual income before tax", min: 0, porDefecto: 35000 },
    {
      id: "plan",
      tipo: "opcion",
      etiqueta: "Your undergraduate loan plan",
      opciones: [
        { valor: "plan-1", etiqueta: "Plan 1" },
        { valor: "plan-2", etiqueta: "Plan 2" },
        { valor: "plan-4", etiqueta: "Plan 4 (Scotland)" },
        { valor: "plan-5", etiqueta: "Plan 5" },
        { valor: "none", etiqueta: "No undergraduate loan" },
      ],
      porDefecto: "plan-2",
    },
    { id: "posgrado", tipo: "si-no", etiqueta: "You also have a Postgraduate Loan", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.plan === "none" && !entrada.posgrado) throw new ErrorEntrada("Choose a loan plan or tick the Postgraduate Loan.", "plan");
    const umbrales = v["gb.student-loan-thresholds"];
    const prestamo = entrada.plan === "none" ? 0 : redondear(sobreUmbral(entrada.salario, umbrales[entrada.plan], v["gb.student-loan-rate"]));
    const posgrado = entrada.posgrado ? redondear(sobreUmbral(entrada.salario, umbrales.postgraduate, v["gb.postgraduate-loan-rate"])) : 0;
    const total = redondear(prestamo + posgrado);
    const observaciones: string[] = [];
    if (entrada.plan !== "none" && prestamo === 0) {
      observaciones.push(`You earn below the ${libras(umbrales[entrada.plan])} threshold for your plan, so you repay nothing. Interest still builds up.`);
    }
    return {
      total,
      mensual: redondear(total / 12),
      semanal: redondear(total / 52),
      prestamo,
      posgrado,
      umbral: entrada.plan === "none" ? null : umbrales[entrada.plan],
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Repayments for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "A month", formato: "moneda" },
    { clave: "semanal", etiqueta: "A week", formato: "moneda" },
    { clave: "prestamo", etiqueta: "Undergraduate loan", formato: "moneda", ocultarSiCero: true },
    { clave: "posgrado", etiqueta: "Postgraduate Loan", formato: "moneda", ocultarSiCero: true },
    { clave: "umbral", etiqueta: "Yearly threshold for your plan", formato: "moneda" },
  ],
});
