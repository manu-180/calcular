import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.tds-calculator",
  mercado: "bd",
  concepto: "retencion-honorarios",
  slug: "tds-calculator",
  estado: "publicado",
  requiere: {
    "bd.tds-services": "mapa",
  },
  campos: [
    { id: "servicio", tipo: "opcion-dato", dato: "bd.tds-services", etiqueta: "সেবার ধরন", porDefecto: "professional-individual" },
    { id: "monto", tipo: "moneda", etiqueta: "বিলের পরিমাণ", min: 0, porDefecto: 100000 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "বিলের পরিমাণটি",
      opciones: [
        { valor: "bruto", etiqueta: "কর কাটার আগের মোট বিল" },
        { valor: "neto", etiqueta: "সেবাদাতা হাতে যা পাবেন (কর কাটার পরে)" },
      ],
      porDefecto: "bruto",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("বিলের পরিমাণ লিখুন।", "monto");
    const tasa = enMapa(v["bd.tds-services"], entrada.servicio);
    const bruto = entrada.base === "bruto" ? entrada.monto : entrada.monto / (1 - tasa / 100);
    const impuesto = redondear(porcentaje(bruto, tasa));
    return {
      impuesto,
      neto: redondear(bruto - impuesto),
      bruto: redondear(bruto),
      tasa,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "উৎসে কর", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "সেবাদাতা পাবেন", formato: "moneda" },
    { clave: "bruto", etiqueta: "মোট বিল", formato: "moneda" },
    { clave: "tasa", etiqueta: "উৎসে করের হার", formato: "porcentaje", decimales: 2 },
  ],
});
