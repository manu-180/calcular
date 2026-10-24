import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.custo-do-trabalhador",
  mercado: "ao",
  concepto: "costo-empleador",
  slug: "custo-do-trabalhador",
  estado: "publicado",
  requiere: {
    "ao.inss-empregador": "numero",
    "ao.gratificacao-ferias": "numero",
    "ao.subsidio-natal": "numero",
  },
  campos: [
    { id: "salarioBase", tipo: "moneda", etiqueta: "Salário base mensal", min: 0, porDefecto: 350000 },
    { id: "subsidios", tipo: "moneda", etiqueta: "Subsídios e prémios pagos todos os meses", min: 0, porDefecto: 0, ayuda: "Alimentação, transporte, turno e outros. Contam para o INSS." },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxa = valores["ao.inss-empregador"];
    const mensal = entrada.salarioBase + entrada.subsidios;
    const inssMes = redondear(porcentaje(mensal, taxa));
    const custoMes = redondear(mensal + inssMes);
    const ferias = redondear(porcentaje(entrada.salarioBase, valores["ao.gratificacao-ferias"]));
    const natal = redondear(porcentaje(entrada.salarioBase, valores["ao.subsidio-natal"]));
    const inssNatal = redondear(porcentaje(natal, taxa));
    const anual = redondear(custoMes * 12 + ferias + natal + inssNatal);
    return {
      custoMes,
      inssMes,
      ferias,
      natal,
      inssNatal,
      anual,
      mediaMensal: redondear(anual / 12),
      observaciones: ["Usa os mínimos da Lei Geral do Trabalho para os subsídios de férias e de Natal. Um contrato ou convenção pode pagar mais."],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Custo anual para a empresa", formato: "moneda", destacada: true },
    { clave: "custoMes", etiqueta: "Custo de um mês normal", formato: "moneda" },
    { clave: "inssMes", etiqueta: "INSS da entidade empregadora por mês", formato: "moneda" },
    { clave: "ferias", etiqueta: "Subsídio de férias (sem INSS)", formato: "moneda" },
    { clave: "natal", etiqueta: "Subsídio de Natal", formato: "moneda" },
    { clave: "inssNatal", etiqueta: "INSS sobre o subsídio de Natal", formato: "moneda" },
    { clave: "mediaMensal", etiqueta: "Custo médio por mês", formato: "moneda" },
  ],
});
