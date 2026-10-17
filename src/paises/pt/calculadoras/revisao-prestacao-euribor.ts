import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

function prestacaoConstante(capital: number, taxaAnual: number, meses: number): number {
  const i = taxaAnual / 100 / 12;
  if (i === 0) return capital / meses;
  return (capital * i) / (1 - Math.pow(1 + i, -meses));
}

const NOMES = { "3m": "3 meses", "6m": "6 meses", "12m": "12 meses" } as const;

export default definirCalculadora({
  id: "pt.revisao-prestacao-euribor",
  mercado: "pt",
  concepto: "propio",
  slug: "revisao-prestacao-euribor",
  estado: "publicado",
  requiere: {
    "pt.euribor-3m": "serie",
    "pt.euribor-6m": "serie",
    "pt.euribor-12m": "serie",
  },
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Capital em dívida", min: 1, porDefecto: 150000 },
    { id: "anos", tipo: "numero", etiqueta: "Anos que faltam pagar", min: 0.1, max: 50, porDefecto: 25 },
    {
      id: "indexante",
      tipo: "opcion",
      etiqueta: "Indexante do contrato",
      opciones: [
        { valor: "3m", etiqueta: "Euribor a 3 meses" },
        { valor: "6m", etiqueta: "Euribor a 6 meses" },
        { valor: "12m", etiqueta: "Euribor a 12 meses" },
      ],
      porDefecto: "6m",
    },
    { id: "spread", tipo: "porcentaje", etiqueta: "Spread do seu crédito", min: 0, porDefecto: 1, ayuda: "A margem que o banco soma à Euribor, indicada no contrato." },
    { id: "euribor", tipo: "porcentaje", etiqueta: "Euribor da revisão", requerido: false, ayuda: "Se ficar vazio, usa a última média mensal publicada pelo Banco de Portugal." },
    { id: "prestacaoAtual", tipo: "moneda", etiqueta: "Prestação atual", min: 0, requerido: false, ayuda: "Para ver quanto sobe ou desce." },
  ],
  calcular(entrada, valores, { redondear }) {
    const meses = Math.round(entrada.anos * 12);
    if (meses < 1) throw new ErrorEntrada("O prazo tem de ser de pelo menos um mês.", "anos");
    const serie = valores[`pt.euribor-${entrada.indexante}`];
    const euribor = entrada.euribor ?? serie.valor;
    const taxa = Math.max(0, euribor + entrada.spread);
    const prestacao = redondear(prestacaoConstante(entrada.capital, taxa, meses));
    const observaciones: string[] = [];
    if (entrada.euribor === null) {
      observaciones.push(`Euribor a ${NOMES[entrada.indexante]} usada: média de ${serie.fecha.slice(5, 7)}/${serie.fecha.slice(0, 4)}. O banco usa a do período que o contrato indicar.`);
    }
    if (euribor + entrada.spread < 0) observaciones.push("A taxa daria negativa: o cálculo usa 0 %.");
    return {
      prestacao,
      diferenca: entrada.prestacaoAtual === null ? null : redondear(prestacao - entrada.prestacaoAtual),
      euribor,
      taxa,
      juros: redondear(prestacao * meses - entrada.capital),
      meses,
      observaciones,
    };
  },
  resultado: [
    { clave: "prestacao", etiqueta: "Nova prestação mensal", formato: "moneda", destacada: true },
    { clave: "diferenca", etiqueta: "Diferença face à prestação atual", formato: "moneda" },
    { clave: "euribor", etiqueta: "Euribor aplicada", formato: "porcentaje", decimales: 3 },
    { clave: "taxa", etiqueta: "Taxa de juro (Euribor + spread)", formato: "porcentaje", decimales: 3 },
    { clave: "juros", etiqueta: "Juros até ao fim do crédito", formato: "moneda" },
    { clave: "meses", etiqueta: "Prestações em falta", formato: "numero" },
  ],
});
