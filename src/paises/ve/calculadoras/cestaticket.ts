import { definirCalculadora } from "@/motor/calculo";

// Borrador: el monto en dólares del cestaticket no está en una norma publicada (ver datos.json).
export default definirCalculadora({
  id: "ve.cestaticket",
  mercado: "ve",
  concepto: "propio",
  slug: "cestaticket",
  estado: "borrador",
  requiere: {
    "ve.cestaticket": "numero",
    "ve.tasa-bcv-usd": "serie",
  },
  campos: [{ id: "meses", tipo: "entero", etiqueta: "Meses a calcular", min: 1, max: 12, porDefecto: 1 }],
  calcular(entrada, valores, { redondear }) {
    const { fecha, valor: tasa } = valores["ve.tasa-bcv-usd"];
    const dolares = valores["ve.cestaticket"] * entrada.meses;
    return { dolares, tasa, fechaTasa: fecha, bolivares: redondear(dolares * tasa) };
  },
  resultado: [
    { clave: "dolares", etiqueta: "Cestaticket en dólares", formato: "moneda", moneda: "USD" },
    { clave: "tasa", etiqueta: "Tasa oficial BCV usada", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "fechaTasa", etiqueta: "Tasa vigente desde", formato: "fecha" },
    { clave: "bolivares", etiqueta: "Cestaticket en bolívares", formato: "moneda", moneda: "VES", destacada: true },
  ],
});
