import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.yer-soligi-kalkulyatori",
  mercado: "uz",
  concepto: "propio",
  slug: "yer-soligi-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.yer-soligi": "mapa",
  },
  campos: [
    { id: "hudud", tipo: "opcion-dato", dato: "uz.yer-soligi", etiqueta: "Yer uchastkasi joylashgan hudud", porDefecto: "toshkent-3" },
    { id: "maydon", tipo: "numero", etiqueta: "Yer uchastkasi maydoni (kv.m)", min: 1, max: 1000000, porDefecto: 600, ayuda: "1 sotix = 100 kv.m." },
    { id: "koef", tipo: "numero", etiqueta: "Mahalliy koeffitsiyent (bilmasangiz 1)", min: 0.35, max: 6, porDefecto: 1, ayuda: "Viloyat va tuman Kengashlari bazaviy stavkaga koeffitsiyent qoʻllaydi. Aniq stavka soliq xabarnomasida boʻladi." },
  ],
  calcular(e, v, { redondear }) {
    if (e.maydon <= 0) throw new ErrorEntrada("Maydonni kiriting.", "maydon");
    const stavka = enMapa(v["uz.yer-soligi"], e.hudud);
    const soliq = redondear(stavka * e.koef * e.maydon);
    return {
      soliq,
      stavka,
      kvmUchun: Math.round(stavka * e.koef * 100) / 100,
      observaciones: [
        "Bu qishloq xoʻjaligiga moʻljallanmagan yerlar (uy-joy, tomorqa, garaj) uchun. Dehqon xoʻjaligi va qishloq xoʻjaligi yerlari normativ qiymatdan boshqa tartibda soliqqa tortiladi.",
      ],
    };
  },
  resultado: [
    { clave: "soliq", etiqueta: "Yillik yer soligʻi", formato: "moneda", decimales: 0, destacada: true },
    { clave: "stavka", etiqueta: "Bazaviy stavka (1 kv.m uchun)", formato: "moneda", decimales: 0 },
    { clave: "kvmUchun", etiqueta: "Koeffitsiyent bilan 1 kv.m uchun", formato: "moneda", decimales: 2 },
  ],
});
