import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diaria } from "../lib/laboral";

export default definirCalculadora({
  id: "bd.service-benefit-calculator",
  mercado: "bd",
  concepto: "liquidacion-final",
  slug: "service-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bd.resignation-days": "mapa",
    "bd.notice-days": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "সর্বশেষ মাসিক মূল মজুরি ও মহার্ঘ ভাতা", ayuda: "এডহক বা অন্তর্বর্তী মজুরি থাকলে তাও যোগ করুন।", min: 0, porDefecto: 30000 },
    { id: "anios", tipo: "entero", etiqueta: "চাকরির পূর্ণ বছর", min: 0, max: 60, porDefecto: 6 },
    { id: "aviso", tipo: "si-no", etiqueta: "নিয়ম অনুযায়ী লিখিত নোটিশ দিয়েছেন", porDefecto: true },
    { id: "gratuity", tipo: "moneda", etiqueta: "প্রতিষ্ঠানের নিয়মে প্রাপ্য গ্র্যাচুইটি", ayuda: "ঐচ্ছিক। দশ বছর বা তার বেশি চাকরিতে ক্ষতিপূরণ আর গ্র্যাচুইটির মধ্যে যেটি বেশি সেটি পাবেন।", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("সর্বশেষ মাসিক মজুরি লিখুন।", "salario");
    const tramos = v["bd.resignation-days"];
    const clave = entrada.anios >= 10 ? "long" : entrada.anios > 3 ? "medium" : "short";
    const dias = enMapa(tramos, clave);
    const compensacion = redondear(diaria(entrada.salario) * dias * entrada.anios);
    const gratuity = entrada.anios >= 10 ? (entrada.gratuity ?? 0) : 0;
    const beneficio = Math.max(compensacion, gratuity);
    const diasAviso = enMapa(v["bd.notice-days"], "worker-permanent");
    const descuento = entrada.aviso ? 0 : redondear(diaria(entrada.salario) * diasAviso);
    const observaciones: string[] = [];
    if (gratuity > compensacion) observaciones.push("গ্র্যাচুইটি ক্ষতিপূরণের চেয়ে বেশি, তাই গ্র্যাচুইটি ধরা হয়েছে।");
    if (!entrada.aviso) observaciones.push("নোটিশ না দিয়ে ইস্তফা দিলে নোটিশের মেয়াদের মজুরির সমান অর্থ মালিককে দিতে হয়। সেটি এখান থেকে বাদ দেখানো হয়েছে।");
    if (entrada.anios === 0) observaciones.push("এক বছর পূর্ণ না হলে ইস্তফার ক্ষতিপূরণ পাওয়া যায় না।");
    return {
      neto: redondear(beneficio - descuento),
      compensacion,
      dias,
      descuento,
      diasAviso,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "ইস্তফার পর মোট প্রাপ্য", formato: "moneda", destacada: true },
    { clave: "compensacion", etiqueta: "আইন অনুযায়ী ক্ষতিপূরণ", formato: "moneda" },
    { clave: "dias", etiqueta: "প্রতি বছরের জন্য মজুরির দিন", formato: "dias" },
    { clave: "descuento", etiqueta: "নোটিশ না দেওয়ায় কাটা", formato: "moneda", ocultarSiCero: true },
    { clave: "diasAviso", etiqueta: "স্থায়ী শ্রমিকের নোটিশের মেয়াদ", formato: "dias" },
  ],
});
