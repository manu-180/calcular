import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.cambio-metical",
  mercado: "mz",
  concepto: "tipo-de-cambio",
  slug: "cambio-metical",
  estado: "publicado",
  requiere: {
    "mz.usd-compra": "serie",
    "mz.usd-venda": "serie",
    "mz.eur-compra": "serie",
    "mz.eur-venda": "serie",
    "mz.zar-compra": "serie",
    "mz.zar-venda": "serie",
  },
  campos: [
    {
      id: "moeda",
      tipo: "opcion",
      etiqueta: "Moeda estrangeira",
      opciones: [
        { valor: "usd", etiqueta: "Dólar americano (USD)" },
        { valor: "zar", etiqueta: "Rand sul-africano (ZAR)" },
        { valor: "eur", etiqueta: "Euro (EUR)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Converter",
      opciones: [
        { valor: "para-meticais", etiqueta: "Da moeda estrangeira para meticais" },
        { valor: "de-meticais", etiqueta: "De meticais para a moeda estrangeira" },
      ],
      porDefecto: "para-meticais",
    },
    { id: "quantia", tipo: "numero", etiqueta: "Quantia", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const series = {
      usd: { compra: valores["mz.usd-compra"], venda: valores["mz.usd-venda"] },
      eur: { compra: valores["mz.eur-compra"], venda: valores["mz.eur-venda"] },
      zar: { compra: valores["mz.zar-compra"], venda: valores["mz.zar-venda"] },
    }[entrada.moeda];
    // Quem entrega moeda estrangeira recebe à taxa de compra; quem a compra paga à taxa de venda.
    const serie = entrada.sentido === "para-meticais" ? series.compra : series.venda;
    return {
      meticais: entrada.sentido === "para-meticais" ? redondear(entrada.quantia * serie.valor) : null,
      estrangeira: entrada.sentido === "de-meticais" ? redondear(entrada.quantia / serie.valor) : null,
      taxa: serie.valor,
      compra: series.compra.valor,
      venda: series.venda.valor,
      data: serie.fecha,
      observaciones: ["São as taxas publicadas pelo Banco de Moçambique. Bancos e casas de câmbio aplicam a sua própria cotação e comissões."],
    };
  },
  resultado: [
    { clave: "meticais", etiqueta: "Valor em meticais", formato: "moneda", destacada: true },
    { clave: "estrangeira", etiqueta: "Valor na moeda estrangeira", formato: "numero", decimales: 2, destacada: true },
    { clave: "taxa", etiqueta: "Taxa usada (MT por unidade)", formato: "numero", decimales: 2 },
    { clave: "compra", etiqueta: "Taxa de compra", formato: "numero", decimales: 2 },
    { clave: "venda", etiqueta: "Taxa de venda", formato: "numero", decimales: 2 },
    { clave: "data", etiqueta: "Data da taxa", formato: "fecha" },
  ],
});
