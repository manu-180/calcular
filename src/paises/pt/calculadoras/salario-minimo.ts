import { definirCalculadora } from "@/motor/calculo";

const HORAS_SEMANA_COMPLETA = 40;

export default definirCalculadora({
  id: "pt.salario-minimo",
  mercado: "pt",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "pt.rmmg": "numero",
  },
  campos: [
    {
      id: "horasSemanais",
      tipo: "numero",
      etiqueta: "Horas de trabalho por semana",
      min: 1,
      max: HORAS_SEMANA_COMPLETA,
      porDefecto: HORAS_SEMANA_COMPLETA,
      ayuda: "40 horas é o tempo completo. Em tempo parcial, o mínimo é proporcional.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const rmmg = valores["pt.rmmg"];
    const mensal = redondear((rmmg * entrada.horasSemanais) / HORAS_SEMANA_COMPLETA);
    return {
      mensal,
      anual: redondear(mensal * 14),
      diario: redondear(mensal / 30),
      horario: redondear((rmmg * 12) / (52 * HORAS_SEMANA_COMPLETA)),
    };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Salário mínimo mensal", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Por ano (14 meses, com os subsídios de férias e de Natal)", formato: "moneda" },
    { clave: "diario", etiqueta: "Valor de um dia (mensal a dividir por 30)", formato: "moneda" },
    { clave: "horario", etiqueta: "Valor por hora", formato: "moneda" },
  ],
});
