import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.vat-calculator",
  mercado: "kh",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: { "kh.vat-rate": "numero", "kh.vat-export-rate": "numero" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "អ្នកចង់គណនាអ្វី",
      opciones: [
        { valor: "sumar", etiqueta: "បន្ថែម VAT លើតម្លៃ" },
        { valor: "quitar", etiqueta: "ដក VAT ចេញពីតម្លៃរួម" },
      ],
      porDefecto: "sumar",
    },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "ប្រភេទការផ្គត់ផ្គង់",
      opciones: [
        { valor: "general", etiqueta: "ក្នុងស្រុក ឬនាំចូល" },
        { valor: "exporta", etiqueta: "នាំចេញ" },
      ],
      porDefecto: "general",
    },
    { id: "monto", tipo: "moneda", etiqueta: "ចំនួនទឹកប្រាក់ (រៀល)", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("សូមបញ្ចូលចំនួនទឹកប្រាក់។", "monto");
    const tasa = e.tipo === "exporta" ? v["kh.vat-export-rate"] : v["kh.vat-rate"];
    const base = e.modo === "sumar" ? e.monto : e.monto / (1 + tasa / 100);
    const vat = redondear(porcentaje(base, tasa));
    return { vat, base: redondear(base), total: redondear(base + vat), tasa };
  },
  resultado: [
    { clave: "vat", etiqueta: "VAT", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "តម្លៃមិនរួម VAT", formato: "moneda" },
    { clave: "total", etiqueta: "តម្លៃរួម VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "អត្រា", formato: "porcentaje" },
  ],
});
