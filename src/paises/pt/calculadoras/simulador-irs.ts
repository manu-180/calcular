import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { irsAnual, REQUISITOS_IRS } from "../lib/irs";

export default definirCalculadora({
  id: "pt.simulador-irs",
  mercado: "pt",
  concepto: "impuesto-renta",
  slug: "simulador-irs",
  estado: "publicado",
  requiere: REQUISITOS_IRS,
  campos: [
    {
      id: "tributacao",
      tipo: "opcion",
      etiqueta: "Tipo de declaração",
      opciones: [
        { valor: "individual", etiqueta: "Individual (não casado ou tributação separada)" },
        { valor: "conjunta", etiqueta: "Conjunta (casados ou unidos de facto)" },
      ],
      porDefecto: "individual",
    },
    { id: "rendimento1", tipo: "moneda", etiqueta: "Rendimento bruto anual do trabalho (titular 1)", min: 0, porDefecto: 20000, ayuda: "Salários do ano, com os subsídios de férias e de Natal." },
    { id: "rendimento2", tipo: "moneda", etiqueta: "Rendimento bruto anual do trabalho (titular 2)", min: 0, porDefecto: 0, ayuda: "Só na declaração conjunta." },
    { id: "dependentes", tipo: "entero", etiqueta: "Número de dependentes", min: 0, max: 15, porDefecto: 0 },
    { id: "ate3", tipo: "entero", etiqueta: "Dependentes com até 3 anos", min: 0, max: 15, porDefecto: 0 },
    { id: "de4a6", tipo: "entero", etiqueta: "Dependentes com 4 a 6 anos", min: 0, max: 15, porDefecto: 0 },
    { id: "despesasGerais", tipo: "moneda", etiqueta: "Despesas gerais familiares (faturas com NIF)", min: 0, porDefecto: 1000 },
    { id: "outrasDeducoes", tipo: "moneda", etiqueta: "Outras deduções à coleta já calculadas", min: 0, porDefecto: 0, ayuda: "Saúde, educação, habitação, lares e IVA nas faturas, como aparecem no Portal das Finanças." },
    { id: "retencoes", tipo: "moneda", etiqueta: "IRS retido durante o ano", min: 0, requerido: false, ayuda: "Para ver se vai receber reembolso ou pagar." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.ate3 + entrada.de4a6 > entrada.dependentes) {
      throw new ErrorEntrada("Os dependentes até 6 anos não podem ser mais do que o total de dependentes.", "ate3");
    }
    const conjunta = entrada.tributacao === "conjunta";
    const titulares = conjunta ? [{ bruto: entrada.rendimento1 }, { bruto: entrada.rendimento2 }] : [{ bruto: entrada.rendimento1 }];
    const r = irsAnual(
      titulares,
      conjunta,
      { total: entrada.dependentes, ate3: entrada.ate3, de4a6: entrada.de4a6 },
      entrada.despesasGerais,
      entrada.outrasDeducoes,
      valores,
      redondear,
    );
    const observaciones = [
      "Simulação para rendimentos de trabalho dependente (categoria A) de residentes no continente. Não inclui o IRS Jovem nem outros rendimentos.",
    ];
    if (!conjunta && entrada.rendimento2 > 0) observaciones.push("Na declaração individual o rendimento do titular 2 não entra.");
    if (r.abatimento > 0) observaciones.push("O mínimo de existência reduziu o seu rendimento coletável.");
    const saldo = entrada.retencoes === null ? null : redondear(entrada.retencoes - r.imposto);
    return {
      deducaoEspecifica: r.deducaoEspecifica,
      abatimento: r.abatimento,
      coletavel: r.coletavel,
      coleta: r.coleta,
      deducoes: r.deducoes,
      imposto: r.imposto,
      taxaEfetiva: r.taxaEfetiva,
      reembolso: saldo !== null && saldo > 0 ? saldo : null,
      aPagar: saldo !== null && saldo < 0 ? -saldo : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "imposto", etiqueta: "IRS a pagar no ano", formato: "moneda", destacada: true },
    { clave: "reembolso", etiqueta: "Reembolso estimado", formato: "moneda" },
    { clave: "aPagar", etiqueta: "Valor a pagar na declaração", formato: "moneda" },
    { clave: "deducaoEspecifica", etiqueta: "Dedução específica", formato: "moneda" },
    { clave: "abatimento", etiqueta: "Abatimento pelo mínimo de existência", formato: "moneda", ocultarSiCero: true },
    { clave: "coletavel", etiqueta: "Rendimento coletável", formato: "moneda" },
    { clave: "coleta", etiqueta: "Coleta (imposto pelos escalões)", formato: "moneda" },
    { clave: "deducoes", etiqueta: "Deduções à coleta", formato: "moneda" },
    { clave: "taxaEfetiva", etiqueta: "Taxa efetiva sobre o rendimento bruto", formato: "porcentaje", decimales: 2 },
  ],
});
