import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.ortiqcha-ish-vaqti",
  mercado: "uz",
  concepto: "horas-extra",
  slug: "ortiqcha-ish-vaqti",
  estado: "publicado",
  requiere: {
    "uz.ortiqcha-ish": "mapa",
  },
  campos: [
    {
      id: "tolov",
      tipo: "opcion",
      etiqueta: "Ish haqingiz qanday belgilangan?",
      opciones: [
        { valor: "maosh", etiqueta: "Oylik maosh" },
        { valor: "soatbay", etiqueta: "Soatbay tarif stavkasi" },
      ],
      porDefecto: "maosh",
    },
    { id: "oylik", tipo: "moneda", etiqueta: "Oylik maosh", min: 0, porDefecto: 6000000, visibleSi: { tolov: ["maosh"] } },
    { id: "norma", tipo: "numero", etiqueta: "Shu oydagi ish soatlari normasi", min: 1, max: 300, porDefecto: 168, visibleSi: { tolov: ["maosh"] } },
    { id: "stavka", tipo: "moneda", etiqueta: "Bir soatlik tarif stavkasi", min: 0, porDefecto: 35000, visibleSi: { tolov: ["soatbay"] } },
    { id: "kunlar", tipo: "entero", etiqueta: "Ish vaqtidan tashqari ishlagan kunlar soni", min: 0, max: 31, porDefecto: 4 },
    { id: "soatKuniga", tipo: "numero", etiqueta: "Shu kunlarning har birida ortiqcha soatlar", min: 0, max: 12, porDefecto: 2 },
    { id: "noqulay", tipo: "si-no", etiqueta: "Mehnat sharoitlari noqulay", porDefecto: false },
    { id: "damOlish", tipo: "numero", etiqueta: "Dam olish yoki bayram kunlari ishlangan soatlar", min: 0, max: 300, porDefecto: 0 },
    { id: "tungi", tipo: "numero", etiqueta: "Tungi vaqtda (22:00 dan 06:00 gacha) ishlangan soatlar", min: 0, max: 300, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const k = v["uz.ortiqcha-ish"];
    let soatlik: number;
    if (e.tolov === "maosh") {
      if (e.oylik === null || e.oylik <= 0) throw new ErrorEntrada("Oylik maoshni kiriting.", "oylik");
      if (e.norma === null || e.norma <= 0) throw new ErrorEntrada("Oylik ish soatlari normasini kiriting.", "norma");
      soatlik = e.oylik / e.norma;
    } else {
      if (e.stavka === null || e.stavka <= 0) throw new ErrorEntrada("Soatlik stavkani kiriting.", "stavka");
      soatlik = e.stavka;
    }
    const birinchi = e.noqulay ? 0 : Math.min(2, e.soatKuniga);
    const qolgan = e.soatKuniga - birinchi;
    const hissaKuniga = e.noqulay ? e.soatKuniga * enMapa(k, "noqulay") : birinchi * enMapa(k, "dastlabki-2-soat") + qolgan * enMapa(k, "keyingi-soatlar");
    const ortiqcha = redondear(soatlik * hissaKuniga * e.kunlar);
    // Con sueldo mensual el día de descanso se paga aparte del sueldo al menos una vez la tarifa (263-modda);
    // con tarifa horaria, al menos el doble.
    const damHissa = e.tolov === "maosh" ? enMapa(k, "dam-olish") - 1 : enMapa(k, "dam-olish");
    const damOlishPuli = redondear(soatlik * damHissa * e.damOlish);
    const tungiQoshimcha = redondear(soatlik * (enMapa(k, "tungi") - 1) * e.tungi);
    const observaciones: string[] = [];
    if (!e.noqulay && e.soatKuniga > 4) observaciones.push("Ish vaqtidan tashqari ish ketma-ket ikki kun davomida toʻrt soatdan oshmasligi kerak.");
    if (e.noqulay && e.soatKuniga > 2) observaciones.push("Noqulay sharoitda ish vaqtidan tashqari ish bir kunda ikki soatdan oshmasligi kerak.");
    if (e.tungi > 0) observaciones.push("Tungi ish uchun faqat qoʻshimcha qism koʻrsatilgan: soatning oʻzi maoshingizga kiradi.");
    return {
      jami: ortiqcha + damOlishPuli + tungiQoshimcha,
      ortiqcha,
      damOlishPuli,
      tungiQoshimcha,
      soatlik: redondear(soatlik),
      observaciones,
    };
  },
  resultado: [
    { clave: "jami", etiqueta: "Qoʻshimcha toʻlov, jami (soliqdan oldin)", formato: "moneda", decimales: 0, destacada: true },
    { clave: "ortiqcha", etiqueta: "Ish vaqtidan tashqari ish uchun", formato: "moneda", decimales: 0 },
    { clave: "damOlishPuli", etiqueta: "Dam olish va bayram kunlaridagi ish uchun", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "tungiQoshimcha", etiqueta: "Tungi ish uchun qoʻshimcha", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "soatlik", etiqueta: "Bir soatlik stavka", formato: "moneda", decimales: 0 },
  ],
});
