import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.cambio-kwanza",
  mercado: "ao",
  concepto: "tipo-de-cambio",
  slug: "cambio-kwanza",
  estado: "publicado",
  requiere: {
    "ao.usd": "serie",
    "ao.eur": "serie",
  },
  campos: [
    {
      id: "moeda",
      tipo: "opcion",
      etiqueta: "Moeda estrangeira",
      opciones: [
        { valor: "usd", etiqueta: "Dólar americano (USD)" },
        { valor: "eur", etiqueta: "Euro (EUR)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Converter",
      opciones: [
        { valor: "para-kwanzas", etiqueta: "Da moeda estrangeira para kwanzas" },
        { valor: "de-kwanzas", etiqueta: "De kwanzas para a moeda estrangeira" },
      ],
      porDefecto: "para-kwanzas",
    },
    { id: "quantia", tipo: "numero", etiqueta: "Quantia", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const serie = entrada.moeda === "eur" ? valores["ao.eur"] : valores["ao.usd"];
    const taxa = serie.valor;
    return {
      taxa,
      data: serie.fecha,
      kwanzas: entrada.sentido === "para-kwanzas" ? redondear(entrada.quantia * taxa) : null,
      estrangeira: entrada.sentido === "de-kwanzas" ? redondear(entrada.quantia / taxa) : null,
      observaciones: ["É a taxa de câmbio de referência do BNA (venda). Bancos e casas de câmbio aplicam a sua própria cotação e comissões."],
    };
  },
  resultado: [
    { clave: "kwanzas", etiqueta: "Valor em kwanzas", formato: "moneda", destacada: true },
    { clave: "estrangeira", etiqueta: "Valor na moeda estrangeira", formato: "numero", decimales: 2, destacada: true },
    { clave: "taxa", etiqueta: "Taxa de referência do BNA (Kz por unidade)", formato: "numero", decimales: 4 },
    { clave: "data", etiqueta: "Data da taxa", formato: "fecha" },
  ],
});
