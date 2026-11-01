import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.transfer-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "transfer-tax",
  estado: "publicado",
  requiere: { "kh.transfer-rate": "numero", "kh.transfer-allowance-gift": "numero", "kh.transfer-allowance-inherit": "numero" },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "តម្លៃអចលនទ្រព្យ (រៀល)", min: 0, porDefecto: 235200000 },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "ប្រភេទការផ្ទេរ",
      opciones: [
        { valor: "venta", etiqueta: "ទិញលក់" },
        { valor: "exento", etiqueta: "មរតក ឬប្រគល់ជូនលើកទីមួយ ក្នុងរង្វង់ផ្ទាល់" },
        { valor: "regalo", etiqueta: "ប្រគល់ជូនលើកបន្ទាប់ ក្នុងរង្វង់ផ្ទាល់" },
        { valor: "herencia-otros", etiqueta: "មរតករវាងបងប្អូន ឬសាច់ថ្លៃ" },
        { valor: "regalo-otros", etiqueta: "ប្រគល់ជូនរវាងបងប្អូន ឬសាច់ថ្លៃ" },
      ],
      porDefecto: "venta",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("សូមបញ្ចូលតម្លៃ។", "valor");
    const rebaja =
      e.caso === "herencia-otros" ? v["kh.transfer-allowance-inherit"] : e.caso === "regalo" || e.caso === "regalo-otros" ? v["kh.transfer-allowance-gift"] : 0;
    const base = e.caso === "exento" ? 0 : Math.max(0, e.valor - rebaja);
    return { impuesto: redondear(porcentaje(base, v["kh.transfer-rate"])), base };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធប្រថាប់ត្រា", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "មូលដ្ឋានគិតពន្ធ", formato: "moneda" },
  ],
});
