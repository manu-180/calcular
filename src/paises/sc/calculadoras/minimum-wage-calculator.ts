import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.minimum-wage-calculator",
  mercado: "sc",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  estado: "publicado",
  requiere: { "sc.min-wage-hourly": "numero", "sc.min-wage-hourly-casual": "numero" },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Type of worker",
      opciones: [
        { valor: "regular", etiqueta: "Continuous, fixed-term or part-time contract" },
        { valor: "casual", etiqueta: "Casual worker" },
      ],
      porDefecto: "regular",
    },
    { id: "horasSemana", tipo: "numero", etiqueta: "Hours you work in a week", min: 1, max: 72, porDefecto: 40 },
    { id: "pagaHora", tipo: "moneda", etiqueta: "What you are paid for each hour", min: 0, requerido: false, ayuda: "Optional. Fill it in to compare your pay with the minimum." },
  ],
  calcular(e, v, { redondear }) {
    if (e.horasSemana <= 0) throw new ErrorEntrada("Enter the hours you work in a week.", "horasSemana");
    const hora = e.contrato === "casual" ? v["sc.min-wage-hourly-casual"] : v["sc.min-wage-hourly"];
    const semana = redondear(hora * e.horasSemana);
    const mes = redondear((semana * 52) / 12);
    const faltaHora = e.pagaHora === null ? 0 : redondear(Math.max(0, hora - e.pagaHora));
    const observaciones: string[] = [];
    if (e.pagaHora !== null) {
      observaciones.push(faltaHora > 0 ? "Your hourly pay is below the national minimum wage." : "Your hourly pay meets the national minimum wage.");
    }
    observaciones.push("The regulations set the minimum for every hour of service. The monthly figure assumes 52 weeks a year.");
    return { hora, semana, mes, faltaHora, faltaMes: redondear((faltaHora * e.horasSemana * 52) / 12), observaciones };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum wage for each hour", formato: "moneda", destacada: true },
    { clave: "semana", etiqueta: "Minimum for your week", formato: "moneda" },
    { clave: "mes", etiqueta: "Minimum for an average month", formato: "moneda" },
    { clave: "faltaHora", etiqueta: "Shortfall for each hour", formato: "moneda", ocultarSiCero: true },
    { clave: "faltaMes", etiqueta: "Shortfall in an average month", formato: "moneda", ocultarSiCero: true },
  ],
});
