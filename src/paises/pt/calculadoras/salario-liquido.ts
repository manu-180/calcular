import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { NOME_TABELA, OPCOES_SITUACAO, REQUISITOS_RETENCAO, retencaoMensal } from "../lib/irs";

export default definirCalculadora({
  id: "pt.salario-liquido",
  mercado: "pt",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "publicado",
  requiere: {
    ...REQUISITOS_RETENCAO,
    "pt.ss-trabalhador": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 1500 },
    { id: "situacao", tipo: "opcion", etiqueta: "Situação familiar", opciones: OPCOES_SITUACAO, porDefecto: "nao-casado" },
    { id: "dependentes", tipo: "entero", etiqueta: "Número de dependentes", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const seguranca = redondear(porcentaje(entrada.bruto, valores["pt.ss-trabalhador"]));
    const r = retencaoMensal(entrada.bruto, entrada.situacao, entrada.dependentes, valores, redondear);
    const liquido = redondear(entrada.bruto - seguranca - r.retencao);
    const observaciones = [
      "Cálculo com as tabelas de retenção do continente. Os Açores e a Madeira têm tabelas próprias.",
      "Os subsídios de férias e de Natal sofrem retenção à parte, com a mesma tabela. Por isso o líquido anual conta 14 meses.",
    ];
    return {
      bruto: entrada.bruto,
      seguranca,
      irs: r.retencao,
      liquido,
      anual: redondear(liquido * 14),
      tabela: NOME_TABELA[r.tabela],
      descontos: entrada.bruto > 0 ? ((seguranca + r.retencao) / entrada.bruto) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "liquido", etiqueta: "Salário líquido mensal", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Salário bruto", formato: "moneda" },
    { clave: "seguranca", etiqueta: "Segurança Social", formato: "moneda" },
    { clave: "irs", etiqueta: "Retenção na fonte de IRS", formato: "moneda" },
    { clave: "anual", etiqueta: "Líquido por ano (14 meses)", formato: "moneda" },
    { clave: "descontos", etiqueta: "Peso dos descontos no bruto", formato: "porcentaje", decimales: 1 },
    { clave: "tabela", etiqueta: "Tabela de retenção aplicada", formato: "texto" },
  ],
});
