import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.overtime-calculator",
  mercado: "bd",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "bd.overtime-multiplier": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "মাসিক মূল মজুরি ও মহার্ঘ ভাতা", ayuda: "এডহক বা অন্তর্বর্তী মজুরি থাকলে তাও যোগ করুন। বাড়ি ভাড়া, চিকিৎসা ও যাতায়াত ভাতা ধরবেন না।", min: 0, porDefecto: 6700 },
    { id: "horas", tipo: "numero", etiqueta: "মাসে অধিকাল কাজের ঘণ্টা", min: 0, max: 400, porDefecto: 40 },
    { id: "horasMes", tipo: "numero", etiqueta: "মাসের সাধারণ কর্মঘণ্টা", ayuda: "প্রতিষ্ঠান যে ঘণ্টা ধরে ঘণ্টাপ্রতি মজুরি বের করে। ২০৮ মানে দিনে ৮ ঘণ্টা করে ২৬ কর্মদিবস।", min: 1, max: 400, porDefecto: 208 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("মূল মজুরি লিখুন।", "basico");
    const porHora = entrada.basico / entrada.horasMes;
    const tasaExtra = porHora * v["bd.overtime-multiplier"];
    return {
      pago: redondear(tasaExtra * entrada.horas),
      tasaExtra: redondear(tasaExtra),
      porHora: redondear(porHora),
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "মাসের অধিকাল ভাতা", formato: "moneda", destacada: true },
    { clave: "tasaExtra", etiqueta: "প্রতি ঘণ্টা অধিকালের হার", formato: "moneda" },
    { clave: "porHora", etiqueta: "সাধারণ ঘণ্টাপ্রতি মজুরি", formato: "moneda" },
  ],
});
