import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ve.dolar-bcv",
  mercado: "ve",
  concepto: "tipo-de-cambio",
  slug: "dolar-bcv",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: {
    "ve.tasa-bcv-usd": "serie",
    "ve.tasa-bcv-eur": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "usd-a-bs", etiqueta: "Dólares a bolívares" },
        { valor: "bs-a-usd", etiqueta: "Bolívares a dólares" },
        { valor: "eur-a-bs", etiqueta: "Euros a bolívares" },
        { valor: "bs-a-eur", etiqueta: "Bolívares a euros" },
      ],
      porDefecto: "usd-a-bs",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const usd = valores["ve.tasa-bcv-usd"];
    const eur = valores["ve.tasa-bcv-eur"];
    const enEuros = entrada.direccion === "eur-a-bs" || entrada.direccion === "bs-a-eur";
    const { fecha, valor: tasa } = enEuros ? eur : usd;
    const vacio = { bolivares: null, dolares: null, euros: null };
    switch (entrada.direccion) {
      case "usd-a-bs":
      case "eur-a-bs":
        return { ...vacio, tasaDolar: enEuros ? null : tasa, tasaEuro: enEuros ? tasa : null, fecha, bolivares: redondear(entrada.monto * tasa) };
      case "bs-a-usd":
        return { ...vacio, tasaDolar: tasa, tasaEuro: null, fecha, dolares: redondear(entrada.monto / tasa) };
      default:
        return { ...vacio, tasaDolar: null, tasaEuro: tasa, fecha, euros: redondear(entrada.monto / tasa) };
    }
  },
  resultado: [
    { clave: "tasaDolar", etiqueta: "Dólar oficial BCV", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "tasaEuro", etiqueta: "Euro oficial BCV", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "fecha", etiqueta: "Fecha valor de la tasa", formato: "fecha" },
    { clave: "bolivares", etiqueta: "Valor en bolívares", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "dolares", etiqueta: "Valor en dólares", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "euros", etiqueta: "Valor en euros", formato: "numero", decimales: 2, destacada: true },
  ],
});
