import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.custo-trabalhador-empresa",
  mercado: "pt",
  concepto: "costo-empleador",
  slug: "custo-trabalhador-empresa",
  estado: "publicado",
  requiere: {
    "pt.ss-empregador": "numero",
    "pt.ss-trabalhador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 1500 },
    { id: "outros", tipo: "moneda", etiqueta: "Outros custos mensais (subsídio de refeição, seguro, formação...)", min: 0, porDefecto: 0, ayuda: "Valores que a empresa paga em 12 meses e que não entram no salário." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tsuMensal = redondear(porcentaje(entrada.salario, valores["pt.ss-empregador"]));
    const anualSalarios = entrada.salario * 14;
    const anualTsu = tsuMensal * 14;
    const anual = redondear(anualSalarios + anualTsu + entrada.outros * 12);
    return {
      tsuMensal,
      mesComTsu: redondear(entrada.salario + tsuMensal),
      anual,
      mediaMensal: redondear(anual / 12),
      observaciones: [
        "Conta 14 salários por ano (12 meses e os subsídios de férias e de Natal), todos com a taxa contributiva da entidade empregadora.",
        "Não inclui o seguro de acidentes de trabalho, que depende da apólice, nem taxas reduzidas de casos especiais.",
      ],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Custo anual para a empresa", formato: "moneda", destacada: true },
    { clave: "mediaMensal", etiqueta: "Custo médio por mês (anual / 12)", formato: "moneda" },
    { clave: "mesComTsu", etiqueta: "Salário + TSU num mês", formato: "moneda" },
    { clave: "tsuMensal", etiqueta: "TSU paga pela empresa por mês", formato: "moneda" },
  ],
});
