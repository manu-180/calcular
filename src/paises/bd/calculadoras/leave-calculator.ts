import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.leave-calculator",
  mercado: "bd",
  concepto: "vacaciones",
  slug: "leave-calculator",
  estado: "publicado",
  requiere: {
    "bd.annual-leave-divisor": "mapa",
    "bd.leave-days": "mapa",
  },
  campos: [
    { id: "sector", tipo: "opcion-dato", dato: "bd.annual-leave-divisor", etiqueta: "প্রতিষ্ঠানের ধরন", porDefecto: "general" },
    { id: "dias", tipo: "entero", etiqueta: "গত ১২ মাসে কত দিন কাজ করেছেন", ayuda: "আগের ১২ মাসে বাস্তবে যত দিন কাজ করেছেন, সেই সংখ্যা লিখুন।",min: 0, max: 366, porDefecto: 290 },
    { id: "salario", tipo: "moneda", etiqueta: "মাসিক মজুরি", ayuda: "ঐচ্ছিক। এক দিনের ছুটির মজুরি দেখতে লিখুন।", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dias < 0) throw new ErrorEntrada("কাজের দিন শূন্যের কম হতে পারে না।", "dias");
    const divisor = enMapa(v["bd.annual-leave-divisor"], entrada.sector);
    const anual = Math.floor(entrada.dias / divisor);
    const otras = v["bd.leave-days"];
    const casual = enMapa(otras, "casual");
    const enfermedad = enMapa(otras, "sick");
    const festivos = enMapa(otras, "festival");
    return {
      anual,
      casual,
      enfermedad,
      festivos,
      total: anual + casual + enfermedad + festivos,
      valorDia: entrada.salario ? redondear(entrada.salario / 30) : null,
      observaciones: ["মজুরিসহ বাৎসরিক ছুটি পেতে প্রতিষ্ঠানে এক বছর অবিচ্ছিন্ন চাকরি পূর্ণ হতে হয়।"],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "মজুরিসহ বাৎসরিক (অর্জিত) ছুটি", formato: "dias", destacada: true },
    { clave: "casual", etiqueta: "নৈমিত্তিক ছুটি", formato: "dias" },
    { clave: "enfermedad", etiqueta: "পীড়া ছুটি", formato: "dias" },
    { clave: "festivos", etiqueta: "উৎসব ছুটি", formato: "dias" },
    { clave: "total", etiqueta: "বছরে মোট মজুরিসহ ছুটি", formato: "dias" },
    { clave: "valorDia", etiqueta: "এক দিনের মজুরি (মাসকে ৩০ দিন ধরে)", formato: "moneda" },
  ],
});
