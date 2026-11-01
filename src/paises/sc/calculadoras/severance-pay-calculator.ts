import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.severance-pay-calculator",
  mercado: "sc",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "sc.compensation-days-per-month": "numero",
    "sc.compensation-fixed-term-multiplier": "numero",
    "sc.resignation-compensation-years": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "How the contract ends",
      opciones: [
        { valor: "termination", etiqueta: "Termination, redundancy or business transfer, not caused by the worker" },
        { valor: "resignation", etiqueta: "Resignation or retirement" },
      ],
      porDefecto: "termination",
    },
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Type of contract",
      opciones: [
        { valor: "continuous", etiqueta: "Continuous employment" },
        { valor: "fixed", etiqueta: "Fixed term" },
      ],
      porDefecto: "continuous",
    },
    { id: "meses", tipo: "entero", etiqueta: "Completed months of service", min: 0, max: 600, porDefecto: 60 },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly wage when the contract ends", min: 0, porDefecto: 22000, ayuda: "Include any responsibility allowance or duty allowance." },
    { id: "diasMes", tipo: "numero", etiqueta: "Paid days in a month", min: 1, max: 31, porDefecto: 22, ayuda: "The Act does not fix a divisor. Use the way your employer turns a monthly wage into one day's wage." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter the monthly wage.", "salario");
    if (e.diasMes <= 0) throw new ErrorEntrada("Enter the paid days in a month.", "diasMes");
    const observaciones = [
      "The competent officer sets the compensation. If the cause is partly or wholly the worker's, it can be lower or nothing.",
      "Service that already earned a pension or gratuity under the Pensions Act does not count.",
    ];
    const diaria = redondear(e.salario / e.diasMes);
    let compensacion = 0;
    if (e.motivo === "resignation" && e.meses < v["sc.resignation-compensation-years"] * 12) {
      observaciones.push("Resignation or retirement earns compensation only after " + v["sc.resignation-compensation-years"] + " years of continuous service.");
    } else {
      const multiplicador = e.contrato === "fixed" ? v["sc.compensation-fixed-term-multiplier"] : 1;
      compensacion = redondear((e.salario / e.diasMes) * v["sc.compensation-days-per-month"] * e.meses * multiplicador);
    }
    return { compensacion, diaria, diasPagados: redondear(v["sc.compensation-days-per-month"] * e.meses * (e.contrato === "fixed" ? v["sc.compensation-fixed-term-multiplier"] : 1)), observaciones };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "Compensation", formato: "moneda", destacada: true },
    { clave: "diasPagados", etiqueta: "Days of wages paid", formato: "numero", decimales: 2 },
    { clave: "diaria", etiqueta: "Wage for one day", formato: "moneda" },
  ],
});
