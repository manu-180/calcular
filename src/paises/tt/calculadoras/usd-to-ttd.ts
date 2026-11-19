import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NOMBRES = { usd: "US dollars", cad: "Canadian dollars", gbp: "pounds sterling", eur: "euros" } as const;

export default definirCalculadora({
  id: "tt.usd-to-ttd",
  mercado: "tt",
  concepto: "tipo-de-cambio",
  slug: "usd-to-ttd",
  estado: "publicado",
  requiere: {
    "tt.usd-buy": "serie",
    "tt.usd-sell": "serie",
    "tt.cad-buy": "serie",
    "tt.cad-sell": "serie",
    "tt.gbp-buy": "serie",
    "tt.gbp-sell": "serie",
    "tt.eur-buy": "serie",
    "tt.eur-sell": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Currency",
      opciones: [
        { valor: "usd", etiqueta: "US dollar" },
        { valor: "cad", etiqueta: "Canadian dollar" },
        { valor: "gbp", etiqueta: "Pound sterling" },
        { valor: "eur", etiqueta: "Euro" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "a-ttd", etiqueta: "Foreign currency to TT dollars" },
        { valor: "desde-ttd", etiqueta: "TT dollars to foreign currency" },
      ],
      porDefecto: "a-ttd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter an amount.", "monto");
    const compra = v[`tt.${e.moneda}-buy`];
    const venta = v[`tt.${e.moneda}-sell`];
    const aTtd = e.sentido === "a-ttd";
    return {
      ttd: aTtd ? redondear(e.monto * compra.valor) : null,
      extranjera: aTtd ? null : redondear(e.monto / venta.valor),
      compra: compra.valor,
      venta: venta.valor,
      fecha: venta.fecha,
      observaciones: [
        aTtd
          ? `Selling ${NOMBRES[e.moneda]} to a bank uses the Central Bank's buying rate. Your bank or cambio sets its own rate.`
          : `Buying ${NOMBRES[e.moneda]} uses the Central Bank's selling rate. Your bank or cambio sets its own rate.`,
      ],
    };
  },
  resultado: [
    { clave: "ttd", etiqueta: "Amount in TT dollars", formato: "moneda", destacada: true },
    { clave: "extranjera", etiqueta: "Amount in the foreign currency", formato: "numero", decimales: 2, destacada: true },
    { clave: "compra", etiqueta: "Central Bank buying rate (TT$ per unit)", formato: "numero", decimales: 4 },
    { clave: "venta", etiqueta: "Central Bank selling rate (TT$ per unit)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rates of", formato: "fecha" },
  ],
});
