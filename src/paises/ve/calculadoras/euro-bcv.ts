import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ve.euro-bcv",
  mercado: "ve",
  concepto: "propio",
  slug: "euro-bcv",
  estado: "publicado",
  requiere: {
    "ve.tasa-bcv-eur": "serie",
    "ve.tasa-bcv-usd": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "eur-a-bs", etiqueta: "Euros a bolívares" },
        { valor: "bs-a-eur", etiqueta: "Bolívares a euros" },
        { valor: "eur-a-usd", etiqueta: "Euros a dólares (cruce BCV)" },
      ],
      porDefecto: "eur-a-bs",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fecha, valor: eur } = valores["ve.tasa-bcv-eur"];
    const usd = valores["ve.tasa-bcv-usd"].valor;
    // El BCV no publica el euro contra el dólar: se cruza dividiendo sus dos tasas en bolívares.
    const cruce = eur / usd;
    const base = { tasaEuro: eur, tasaDolar: usd, cruce, fecha, bolivares: null, euros: null, dolares: null };
    if (entrada.direccion === "eur-a-bs") return { ...base, bolivares: redondear(entrada.monto * eur) };
    if (entrada.direccion === "bs-a-eur") return { ...base, euros: redondear(entrada.monto / eur) };
    return { ...base, dolares: redondear(entrada.monto * cruce) };
  },
  resultado: [
    { clave: "tasaEuro", etiqueta: "Euro oficial BCV", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "tasaDolar", etiqueta: "Dólar oficial BCV", formato: "moneda", moneda: "VES", decimales: 4 },
    { clave: "cruce", etiqueta: "Dólares por euro (cruce de las dos tasas)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Fecha valor de la tasa", formato: "fecha" },
    { clave: "bolivares", etiqueta: "Valor en bolívares", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "euros", etiqueta: "Valor en euros", formato: "numero", decimales: 2, destacada: true },
    { clave: "dolares", etiqueta: "Valor en dólares", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
