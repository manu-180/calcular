import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

export default definirCalculadora({
  id: "cv.trabalho-em-feriado",
  mercado: "cv",
  concepto: "propio",
  slug: "trabalho-em-feriado",
  estado: "publicado",
  requiere: {
    "cv.descanso-feriado-adicional": "numero",
    "cv.semanas-ano": "numero",
    "cv.horas-semanais": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 100000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horas do período normal de trabalho por semana", min: 1, max: 60, porDefecto: 44 },
    { id: "horas", tipo: "numero", etiqueta: "Horas trabalhadas no feriado ou no dia de descanso", min: 0, max: 24, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = salarioHora(entrada.salarioBase, entrada.horasSemanais, valores["cv.semanas-ano"]);
    const acrescimoExato = porcentaje(hora, valores["cv.descanso-feriado-adicional"]) * entrada.horas;
    return {
      acrescimo: redondear(acrescimoExato),
      hora: redondear(hora),
      valorHoras: redondear(hora * entrada.horas + acrescimoExato),
      observaciones: [
        "O acréscimo é o valor a mais sobre a retribuição normal. Para quem recebe salário mensal fixo, é este o dinheiro que se soma ao salário do mês.",
        "Quem trabalha no dia de descanso semanal obrigatório tem direito a descansar num dos três dias seguintes.",
      ],
    };
  },
  resultado: [
    { clave: "acrescimo", etiqueta: "Acréscimo a receber", formato: "moneda", destacada: true },
    { clave: "valorHoras", etiqueta: "Valor total das horas, com a retribuição normal", formato: "moneda" },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
  ],
});
