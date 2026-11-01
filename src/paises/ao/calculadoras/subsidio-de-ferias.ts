import { definirCalculadora } from "@/motor/calculo";
import { complementoAnual } from "../lib/complementos";

export default definirCalculadora({
  id: "ao.subsidio-de-ferias",
  mercado: "ao",
  concepto: "propio",
  slug: "subsidio-de-ferias",
  estado: "publicado",
  requiere: {
    "ao.gratificacao-ferias": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 350000 },
    { id: "meses", tipo: "entero", etiqueta: "Meses completos de serviço no ano", min: 1, max: 12, porDefecto: 12, ayuda: "12 se já tem um ano de serviço. Menos no ano de admissão ou se o contrato esteve suspenso." },
    { id: "percentagem", tipo: "porcentaje", etiqueta: "Percentagem do salário base no contrato", min: 0, max: 100, porDefecto: 50, ayuda: "Vem com o mínimo da lei. Use a do contrato ou da convenção se for maior." },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = complementoAnual(entrada.salarioBase, entrada.percentagem, valores["ao.gratificacao-ferias"], entrada.meses);
    return {
      subsidio: redondear(r.valor),
      percentagem: r.percentagem,
      observaciones: [...r.observaciones, "Não desconta para o INSS: o subsídio de férias fica fora da base de incidência."],
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsídio de férias", formato: "moneda", destacada: true },
    { clave: "percentagem", etiqueta: "Percentagem aplicada", formato: "porcentaje" },
  ],
});
