import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { NOTA_VALOR_HORA, valorHora } from "../lib/hora";

export default definirCalculadora({
  id: "mz.trabalho-em-feriado",
  mercado: "mz",
  concepto: "propio",
  slug: "trabalho-em-feriado",
  estado: "publicado",
  requiere: {
    "mz.trabalho-excepcional": "numero",
    "mz.excepcional-meio-dia": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário mensal", min: 0, porDefecto: 30000 },
    { id: "horasSemanais", tipo: "numero", etiqueta: "Horas do período normal de trabalho por semana", min: 1, max: 56, porDefecto: 48 },
    { id: "horas", tipo: "numero", etiqueta: "Horas trabalhadas no dia de descanso ou feriado", min: 0, max: 24, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = valorHora(entrada.salario, entrada.horasSemanais);
    const pagamento = redondear(entrada.horas * (hora + porcentaje(hora, valores["mz.trabalho-excepcional"])));
    const descanso = entrada.horas === 0 ? "Nenhum" : entrada.horas <= valores["mz.excepcional-meio-dia"] ? "Meio dia" : "Um dia completo";
    return {
      pagamento,
      hora: redondear(hora),
      descanso,
      observaciones: ["O descanso compensatório é gozado num dos três dias seguintes.", NOTA_VALOR_HORA],
    };
  },
  resultado: [
    { clave: "pagamento", etiqueta: "Pagamento pelas horas trabalhadas", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "descanso", etiqueta: "Descanso compensatório", formato: "texto" },
  ],
});
