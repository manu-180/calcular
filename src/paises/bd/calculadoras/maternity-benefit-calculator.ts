import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.maternity-benefit-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "maternity-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bd.maternity-days": "numero",
    "bd.maternity-divisor": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "সর্বশেষ মাসিক মোট মজুরি", ayuda: "মূল মজুরি আর সব ভাতা মিলিয়ে মাসে যে মোট মজুরি পান।", min: 0, porDefecto: 12500 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("মাসিক মোট মজুরি লিখুন।", "salario");
    const dias = v["bd.maternity-days"];
    const diaria = entrada.salario / v["bd.maternity-divisor"];
    return {
      total: redondear(diaria * dias),
      diaria: redondear(diaria),
      dias,
      antes: redondear((diaria * dias) / 2),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "মোট প্রসূতি কল্যাণ সুবিধা", formato: "moneda", destacada: true },
    { clave: "diaria", etiqueta: "দৈনিক গড় মজুরি", formato: "moneda" },
    { clave: "dias", etiqueta: "ছুটির মোট দিন", formato: "dias" },
    { clave: "antes", etiqueta: "প্রসবের আগের অংশ", formato: "moneda" },
  ],
});
