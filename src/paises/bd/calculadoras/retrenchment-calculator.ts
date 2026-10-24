import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diaria } from "../lib/laboral";

export default definirCalculadora({
  id: "bd.retrenchment-calculator",
  mercado: "bd",
  concepto: "indemnizacion-despido",
  slug: "retrenchment-calculator",
  estado: "publicado",
  requiere: {
    "bd.compensation-days": "mapa",
    "bd.notice-days": "mapa",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "চাকরি কীভাবে শেষ হচ্ছে",
      opciones: [
        { valor: "retrenchment", etiqueta: "ছাঁটাই (প্রয়োজন অতিরিক্ততার কারণে)" },
        { valor: "layoff", etiqueta: "লে-অফের পর ছাঁটাই" },
        { valor: "discharge", etiqueta: "অসুস্থতা বা অক্ষমতার কারণে ডিসচার্জ" },
        { valor: "termination", etiqueta: "মালিক কর্তৃক চাকরির অবসান (স্থায়ী শ্রমিক)" },
      ],
      porDefecto: "retrenchment",
    },
    { id: "salario", tipo: "moneda", etiqueta: "সর্বশেষ মাসিক মূল মজুরি ও মহার্ঘ ভাতা", ayuda: "এডহক বা অন্তর্বর্তী মজুরি থাকলে তাও যোগ করুন।", min: 0, porDefecto: 25000 },
    { id: "anios", tipo: "entero", etiqueta: "চাকরির পূর্ণ বছর", min: 0, max: 60, porDefecto: 5 },
    { id: "aviso", tipo: "si-no", etiqueta: "আইন অনুযায়ী লিখিত নোটিশ পেয়েছেন", porDefecto: false },
    { id: "mensual", tipo: "si-no", etiqueta: "মাসিক মজুরির ভিত্তিতে নিযুক্ত", porDefecto: true, visibleSi: { motivo: ["termination"] } },
    { id: "gratuity", tipo: "moneda", etiqueta: "প্রতিষ্ঠানের নিয়মে প্রাপ্য গ্র্যাচুইটি", ayuda: "ঐচ্ছিক। ক্ষতিপূরণ আর গ্র্যাচুইটির মধ্যে যেটি বেশি সেটি পাবেন।", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("সর্বশেষ মাসিক মজুরি লিখুন।", "salario");
    const dias = v["bd.compensation-days"];
    const dia = diaria(entrada.salario);
    const observaciones: string[] = [];
    const base = entrada.motivo === "layoff" ? "retrenchment" : entrada.motivo;
    const diasPorAnio = enMapa(dias, base);
    const minimoUnAnio = entrada.motivo !== "termination" && entrada.anios < 1;
    const compensacion = minimoUnAnio ? 0 : redondear(dia * diasPorAnio * entrada.anios);
    if (minimoUnAnio) observaciones.push("অন্তত এক বছর অবিচ্ছিন্ন চাকরি না হলে এই ক্ষতিপূরণ প্রযোজ্য নয়।");
    const gratuity = entrada.gratuity ?? 0;
    const beneficio = Math.max(compensacion, gratuity);
    if (gratuity > compensacion) observaciones.push("গ্র্যাচুইটি ক্ষতিপূরণের চেয়ে বেশি, তাই গ্র্যাচুইটি ধরা হয়েছে।");
    const extra = entrada.motivo === "layoff" && !minimoUnAnio ? redondear(dia * enMapa(dias, "layoff-extra")) : 0;
    let diasAviso = 0;
    if (!entrada.aviso && entrada.motivo === "retrenchment") diasAviso = 30;
    if (!entrada.aviso && entrada.motivo === "termination") diasAviso = enMapa(v["bd.notice-days"], entrada.mensual === false ? "employer-permanent-other" : "employer-permanent-monthly");
    const pagoAviso = redondear(dia * diasAviso);
    if (entrada.motivo === "retrenchment" && !entrada.aviso) observaciones.push("ছাঁটাইয়ে এক মাসের নোটিশ না দিলে নোটিশের বদলে এক মাসের মজুরি প্রাপ্য।");
    return {
      total: redondear(beneficio + extra + pagoAviso),
      compensacion,
      extra,
      pagoAviso,
      diasPorAnio,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "মোট প্রাপ্য", formato: "moneda", destacada: true },
    { clave: "compensacion", etiqueta: "আইন অনুযায়ী ক্ষতিপূরণ", formato: "moneda" },
    { clave: "extra", etiqueta: "লে-অফের পর ছাঁটাইয়ে বাড়তি মজুরি", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoAviso", etiqueta: "নোটিশের বদলে মজুরি", formato: "moneda", ocultarSiCero: true },
    { clave: "diasPorAnio", etiqueta: "প্রতি বছরের জন্য মজুরির দিন", formato: "dias" },
  ],
});
