import { definirCalculadora } from "@/motor/calculo";
import { NOME_TABELA, OPCOES_SITUACAO, REQUISITOS_RETENCAO, retencaoMensal } from "../lib/irs";

export default definirCalculadora({
  id: "pt.retencao-na-fonte",
  mercado: "pt",
  concepto: "propio",
  slug: "retencao-na-fonte",
  estado: "publicado",
  requiere: REQUISITOS_RETENCAO,
  campos: [
    { id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração mensal bruta", min: 0, porDefecto: 1500 },
    { id: "situacao", tipo: "opcion", etiqueta: "Situação familiar", opciones: OPCOES_SITUACAO, porDefecto: "nao-casado" },
    { id: "dependentes", tipo: "entero", etiqueta: "Número de dependentes", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = retencaoMensal(entrada.remuneracao, entrada.situacao, entrada.dependentes, valores, redondear);
    return {
      retencao: r.retencao,
      taxa: r.taxa,
      parcela: r.parcela,
      parcelaDependentes: r.parcelaDependentes,
      efetiva: entrada.remuneracao > 0 ? (r.retencao / entrada.remuneracao) * 100 : 0,
      tabela: NOME_TABELA[r.tabela],
      observaciones: ["Tabelas de 2026 para residentes no continente, trabalho dependente, titular sem deficiência."],
    };
  },
  resultado: [
    { clave: "retencao", etiqueta: "Retenção mensal de IRS", formato: "moneda", destacada: true },
    { clave: "efetiva", etiqueta: "Taxa efetiva de retenção", formato: "porcentaje", decimales: 2 },
    { clave: "taxa", etiqueta: "Taxa marginal máxima", formato: "porcentaje", decimales: 2 },
    { clave: "parcela", etiqueta: "Parcela a abater", formato: "moneda" },
    { clave: "parcelaDependentes", etiqueta: "Parcela adicional pelos dependentes", formato: "moneda", ocultarSiCero: true },
    { clave: "tabela", etiqueta: "Tabela aplicada", formato: "texto" },
  ],
});
