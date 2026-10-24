import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.ishdan-boshatish-nafaqasi",
  mercado: "uz",
  concepto: "indemnizacion-despido",
  slug: "ishdan-boshatish-nafaqasi",
  estado: "publicado",
  requiere: {
    "uz.ishdan-boshatish-nafaqasi": "mapa",
  },
  campos: [
    { id: "oylik", tipo: "moneda", etiqueta: "Oʻrtacha oylik ish haqi (oxirgi 12 oy)", min: 0, porDefecto: 6000000 },
    { id: "staj", tipo: "numero", etiqueta: "Shu ish beruvchidagi ish stajingiz (yil)", min: 0, max: 70, porDefecto: 4 },
    {
      id: "sabab",
      tipo: "opcion",
      etiqueta: "Mehnat shartnomasi nima sababdan bekor qilinyapti?",
      opciones: [
        { valor: "ish-beruvchi", etiqueta: "Ish beruvchi tashabbusi: shtat qisqarishi, tashkilot tugatilishi va boshqa aybsiz asoslar" },
        { valor: "rad-etish", etiqueta: "Yangi mehnat shartlarida, boshqa joyda yoki boshqa ishda ishlashni rad etdim" },
        { valor: "aybli", etiqueta: "Mening aybli harakatlarim sababli" },
        { valor: "oz-xohishim", etiqueta: "Oʻz xohishim bilan" },
      ],
      porDefecto: "ish-beruvchi",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.oylik <= 0) throw new ErrorEntrada("Oʻrtacha oylik ish haqini kiriting.", "oylik");
    if (e.sabab === "aybli" || e.sabab === "oz-xohishim") {
      return {
        nafaqa: 0,
        foiz: 0,
        observaciones: [
          e.sabab === "aybli"
            ? "Xodimning aybli harakatlari sababli shartnoma bekor qilinganda ishdan boʻshatish nafaqasi toʻlanmaydi va uni ichki hujjatlarda ham belgilab boʻlmaydi."
            : "Oʻz xohishingiz bilan ketganda qonun ishdan boʻshatish nafaqasini nazarda tutmaydi. Foydalanilmagan taʼtil uchun kompensatsiya esa toʻlanadi.",
        ],
      };
    }
    const m = v["uz.ishdan-boshatish-nafaqasi"];
    const kalit = e.staj < 3 ? "3-yilgacha" : e.staj < 5 ? "3-5-yil" : e.staj < 10 ? "5-10-yil" : e.staj <= 15 ? "10-15-yil" : "15-yildan-ortiq";
    const foiz = enMapa(m, kalit);
    return {
      nafaqa: redondear(porcentaje(e.oylik, foiz)),
      foiz,
      observaciones: ["Bu qonundagi eng kam miqdor. Jamoa shartnomasi yoki mehnat shartnomasida koʻproq summa belgilangan boʻlishi mumkin."],
    };
  },
  resultado: [
    { clave: "nafaqa", etiqueta: "Ishdan boʻshatish nafaqasi (kamida)", formato: "moneda", decimales: 0, destacada: true },
    { clave: "foiz", etiqueta: "Oʻrtacha oylik ish haqiga nisbatan", formato: "porcentaje" },
  ],
});
