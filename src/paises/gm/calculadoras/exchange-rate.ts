import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NOMBRES = { usd: "US dollars", eur: "euros", gbp: "pounds sterling" } as const;

export default definirCalculadora({
  id: "gm.exchange-rate",
  mercado: "gm",
  concepto: "tipo-de-cambio",
  slug: "exchange-rate",
  estado: "publicado",
  requiere: {
    "gm.usd-gmd": "serie",
    "gm.eur-gmd": "serie",
    "gm.gbp-gmd": "serie",
  },
  campos: [
    { id: "monto", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Currency",
      opciones: [
        { valor: "usd", etiqueta: "US dollar" },
        { valor: "eur", etiqueta: "Euro" },
        { valor: "gbp", etiqueta: "Pound sterling" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "a-dalasi", etiqueta: "To dalasis" },
        { valor: "de-dalasi", etiqueta: "From dalasis" },
      ],
      porDefecto: "a-dalasi",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const serie = entrada.moneda === "usd" ? v["gm.usd-gmd"] : entrada.moneda === "eur" ? v["gm.eur-gmd"] : v["gm.gbp-gmd"];
    const resultado = entrada.sentido === "a-dalasi" ? entrada.monto * serie.valor : entrada.monto / serie.valor;
    return {
      resultado: redondear(resultado),
      unidad: entrada.sentido === "a-dalasi" ? "dalasis" : NOMBRES[entrada.moneda],
      tasa: serie.valor,
      fecha: serie.fecha,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "unidad", etiqueta: "Currency", formato: "texto" },
    { clave: "tasa", etiqueta: "CBG valuation rate (dalasis per unit)", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Rate date", formato: "fecha" },
  ],
});
