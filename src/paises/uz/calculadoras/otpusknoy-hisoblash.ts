import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { tatilDavri } from "../lib/kalendar";
import { ortachaOylik } from "../lib/ortacha";

export default definirCalculadora({
  id: "uz.otpusknoy-hisoblash",
  mercado: "uz",
  concepto: "vacaciones",
  slug: "otpusknoy-hisoblash",
  estado: "publicado",
  requiere: {
    "uz.ish-kunlari-ortacha": "numero",
    "uz.tatil-kunlari": "numero",
    "uz.jshds": "mapa",
    "uz.mhtekm": "numero",
  },
  campos: [
    {
      id: "manba",
      tipo: "opcion",
      etiqueta: "Oʻrtacha ish haqini qanday kiritasiz?",
      opciones: [
        { valor: "jami", etiqueta: "Oxirgi oylarda hisoblangan jami ish haqi" },
        { valor: "oylik", etiqueta: "Oylik maosh (har oy bir xil boʻlsa)" },
      ],
      porDefecto: "oylik",
    },
    { id: "jami", tipo: "moneda", etiqueta: "Taʼtildan oldingi oylarda hisoblangan jami ish haqi", min: 0, porDefecto: 72000000, visibleSi: { manba: ["jami"] } },
    { id: "oylar", tipo: "entero", etiqueta: "Shu summa necha oyga tegishli", min: 1, max: 12, porDefecto: 12, visibleSi: { manba: ["jami"] } },
    { id: "oylik", tipo: "moneda", etiqueta: "Oylik yalpi maosh", min: 0, porDefecto: 6000000, visibleSi: { manba: ["oylik"] } },
    { id: "boshlanish", tipo: "fecha", etiqueta: "Taʼtil boshlanadigan kun", porDefecto: "hoy" },
    { id: "kunlar", tipo: "entero", etiqueta: "Taʼtil kunlari (kalendar kunlarda)", min: 1, max: 120, porDefecto: 21 },
  ],
  calcular(e, v, { redondear }) {
    if (e.kunlar < 1) throw new ErrorEntrada("Taʼtil kunlarini kiriting.", "kunlar");
    const o = ortachaOylik(e.manba, e.jami, e.oylar, e.oylik, v["uz.mhtekm"]);
    const ishKunlari = v["uz.ish-kunlari-ortacha"];
    const kunlik = o.oylik / ishKunlari;
    const davr = tatilDavri(e.boshlanish, e.kunlar);
    const tatilPuli = redondear(kunlik * davr.haqTolanadigan);
    const soliq = redondear(porcentaje(tatilPuli, enMapa(v["uz.jshds"], "rezident-mehnat")));
    const observaciones: string[] = [];
    if (o.eslatma) observaciones.push(o.eslatma);
    if (davr.bayram > 0) observaciones.push("Taʼtilga toʻgʻri kelgan bayram kunlari taʼtil kunlariga qoʻshilmaydi: taʼtil shuncha kunga uzayadi.");
    observaciones.push("Roʻza hayit va Qurbon hayit sanasi har yili alohida eʼlon qilinadi. Ular taʼtilga toʻgʻri kelsa, taʼtil yana bir kunga uzayadi.");
    if (e.kunlar < v["uz.tatil-kunlari"]) observaciones.push(`Har yilgi asosiy taʼtil kamida ${v["uz.tatil-kunlari"]} kalendar kun. Kelishuvga koʻra taʼtil qismlarga boʻlinishi mumkin, lekin bir qismi kamida 14 kalendar kun boʻlishi kerak.`);
    return {
      tatilPuli,
      soliq,
      qolga: tatilPuli - soliq,
      kunlik: redondear(kunlik),
      ortacha: redondear(o.oylik),
      haqTolanadigan: davr.haqTolanadigan,
      yakshanba: davr.yakshanba,
      tugash: davr.tugash,
      observaciones,
    };
  },
  resultado: [
    { clave: "tatilPuli", etiqueta: "Taʼtil puli (soliq ushlanmasdan oldin)", formato: "moneda", decimales: 0, destacada: true },
    { clave: "qolga", etiqueta: "Qoʻlga tegadigan summa", formato: "moneda", decimales: 0 },
    { clave: "soliq", etiqueta: "Daromad soligʻi", formato: "moneda", decimales: 0 },
    { clave: "haqTolanadigan", etiqueta: "Haq toʻlanadigan kunlar", formato: "dias" },
    { clave: "yakshanba", etiqueta: "Taʼtildagi yakshanbalar (haq toʻlanmaydi)", formato: "dias" },
    { clave: "kunlik", etiqueta: "Oʻrtacha kunlik ish haqi", formato: "moneda", decimales: 0 },
    { clave: "ortacha", etiqueta: "Oʻrtacha oylik ish haqi", formato: "moneda", decimales: 0 },
    { clave: "tugash", etiqueta: "Taʼtilning oxirgi kuni", formato: "fecha" },
  ],
});
