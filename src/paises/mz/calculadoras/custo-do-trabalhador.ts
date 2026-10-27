import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.custo-do-trabalhador",
  mercado: "mz",
  concepto: "costo-empleador",
  slug: "custo-do-trabalhador",
  estado: "publicado",
  requiere: {
    "mz.inss-empregador": "numero",
    "mz.inss-trabalhador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 30000 },
    { id: "outros", tipo: "moneda", etiqueta: "Subsídios e prémios do mês", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const remuneracao = redondear(entrada.salario + entrada.outros);
    const inss = redondear(porcentaje(remuneracao, valores["mz.inss-empregador"]));
    const mensal = redondear(remuneracao + inss);
    return {
      mensal,
      remuneracao,
      inss,
      anual: redondear(mensal * 12),
      observaciones: ["Não inclui seguros, fardamento, formação nem benefícios que dependam do contrato ou do instrumento colectivo."],
    };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Custo mensal para a empresa", formato: "moneda", destacada: true },
    { clave: "remuneracao", etiqueta: "Remuneração bruta", formato: "moneda" },
    { clave: "inss", etiqueta: "Contribuição da empresa para o INSS", formato: "moneda" },
    { clave: "anual", etiqueta: "Custo em 12 meses", formato: "moneda" },
  ],
});
