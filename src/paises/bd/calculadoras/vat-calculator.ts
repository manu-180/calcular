import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.vat-calculator",
  mercado: "bd",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "bd.vat-standard": "numero",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "আপনি কী করতে চান",
      opciones: [
        { valor: "agregar", etiqueta: "দামের সঙ্গে ভ্যাট যোগ করুন" },
        { valor: "quitar", etiqueta: "ভ্যাটসহ দাম থেকে ভ্যাট আলাদা করুন" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "দাম", min: 0, porDefecto: 10000 },
    {
      id: "tasaPropia",
      tipo: "porcentaje",
      etiqueta: "ভিন্ন ভ্যাট হার (%)",
      ayuda: "ঐচ্ছিক। পণ্য বা সেবায় হ্রাসকৃত হার প্রযোজ্য হলে লিখুন। খালি রাখলে সাধারণ হার ধরা হবে।",
      min: 0,
      max: 100,
      requerido: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("দাম শূন্যের কম হতে পারে না।", "monto");
    const tasa = entrada.tasaPropia ?? v["bd.vat-standard"];
    let neto: number;
    let vat: number;
    if (entrada.operacion === "agregar") {
      neto = entrada.monto;
      vat = redondear(porcentaje(neto, tasa));
    } else {
      neto = redondear(entrada.monto / (1 + tasa / 100));
      vat = redondear(entrada.monto - neto);
    }
    return { neto: redondear(neto), vat, total: redondear(neto + vat), tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "ভ্যাটসহ দাম", formato: "moneda", destacada: true },
    { clave: "vat", etiqueta: "ভ্যাটের পরিমাণ", formato: "moneda" },
    { clave: "neto", etiqueta: "ভ্যাট ছাড়া দাম", formato: "moneda" },
    { clave: "tasa", etiqueta: "ব্যবহৃত হার", formato: "porcentaje", decimales: 2 },
  ],
});
