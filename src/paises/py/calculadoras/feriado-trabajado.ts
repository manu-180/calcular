import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.feriado-trabajado",
  mercado: "py",
  concepto: "propio",
  slug: "feriado-trabajado",
  estado: "publicado",
  requiere: {
    "py.divisor-salario-diario": "numero",
    "py.horas-jornada-diurna": "numero",
    "py.recargo-feriado": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "horas", tipo: "numero", etiqueta: "Horas que trabajaste en feriados", ayuda: "Sumá las de todos los feriados del mes.", min: 0, max: 200, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = entrada.salario / valores["py.divisor-salario-diario"] / valores["py.horas-jornada-diurna"];
    // Art. 234: la hora trabajada en feriado lleva 100 % de recargo sobre la hora de día hábil.
    const valorHora = hora * (1 + valores["py.recargo-feriado"] / 100);
    return {
      hora: redondear(hora),
      valorHora: redondear(valorHora),
      pago: redondear(valorHora * entrada.horas),
      observaciones: [
        "Es lo que corresponde por las horas trabajadas en el feriado. Si cobrás por mes, tu salario ya incluye el feriado como día de descanso pagado.",
        "Paga aporte al IPS y suma para el aguinaldo.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Tu hora en día hábil", formato: "moneda" },
    { clave: "valorHora", etiqueta: "Hora trabajada en feriado", formato: "moneda" },
    { clave: "pago", etiqueta: "Pago por tus horas en feriado", formato: "moneda", destacada: true },
  ],
});
