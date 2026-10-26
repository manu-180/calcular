import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosConFraccion, diaria } from "../lib/laboral";

export default definirCalculadora({
  id: "bd.gratuity-calculator",
  mercado: "bd",
  concepto: "propio",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "bd.gratuity-days": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "সর্বশেষ মাসিক মূল মজুরি", min: 0, porDefecto: 30000 },
    { id: "anios", tipo: "entero", etiqueta: "চাকরির পূর্ণ বছর", min: 0, max: 60, porDefecto: 8 },
    { id: "meses", tipo: "entero", etiqueta: "বাড়তি মাস", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("সর্বশেষ মাসিক মূল মজুরি লিখুন।", "basico");
    const anios = aniosConFraccion(entrada.anios, entrada.meses);
    const masDeDiez = entrada.anios > 10 || (entrada.anios === 10 && entrada.meses > 0);
    const dias = enMapa(v["bd.gratuity-days"], masDeDiez ? "long" : "base");
    const observaciones: string[] = [];
    if (entrada.meses > 6) observaciones.push("ছয় মাসের বেশি বাড়তি চাকরি পূর্ণ এক বছর হিসেবে ধরা হয়েছে।");
    observaciones.push("প্রতিষ্ঠানে গ্র্যাচুইটি চালু থাকলে এটি আইনের ন্যূনতম পরিমাণ। প্রতিষ্ঠানের নিয়মে বেশি থাকলে সেটিই পাবেন।");
    return {
      gratuity: redondear(diaria(entrada.basico) * dias * anios),
      anios,
      dias,
      porAnio: redondear(diaria(entrada.basico) * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "gratuity", etiqueta: "ন্যূনতম গ্র্যাচুইটি", formato: "moneda", destacada: true },
    { clave: "porAnio", etiqueta: "প্রতি বছরের জন্য", formato: "moneda" },
    { clave: "dias", etiqueta: "প্রতি বছরের জন্য মজুরির দিন", formato: "dias" },
    { clave: "anios", etiqueta: "হিসাবে ধরা বছর", formato: "anios" },
  ],
});
