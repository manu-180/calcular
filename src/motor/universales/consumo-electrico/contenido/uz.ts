import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Elektr energiyasi sarfi kalkulyatori",
    title: tituloQueEntre(`Elektr energiyasi kalkulyatori: ${ctx.nombrePais}`, "Elektr energiyasi sarfi kalkulyatori", "Elektr energiyasi kalkulyatori"),
    description: "Jihoz quvvati, ishlash soatlari va 1 kVt·soat narxi boʻyicha u qancha elektr sarflashini va kunlik, oylik, yillik xarajatini hisoblang.",
    intro: [
      "Jihoz quvvatini, uni necha soat ishlatishingizni va hisobvaraqdagi 1 kVt·soat narxini kiriting. Energiya sarfi va xarajatni koʻrasiz.",
      "Hisobvaraqqa qaysi jihoz koʻproq taʼsir qilishini bilish uchun foydalaning: konditsioner, isitgich, muzlatgich yoki kompyuter.",
    ],
    comoSeCalcula: [
      "Kunlik kVt·soat = vatt × ishlash soati ÷ 1000.",
      "Oylik kVt·soat = kunlik kVt·soat × ishlatilgan kunlar. Yillik sarf oylik sarfning 12 barobari.",
      "Xarajat = kVt·soat × 1 kVt·soat narxi.",
    ],
    ejemplo: [
      `Kuniga 4 soat ishlaydigan 1000 Vt quvvatli jihoz kuniga 4 kVt·soat, oyiga ${formatearNumero(ctx, kwhMes)} kVt·soat sarflaydi.`,
      `1 kVt·soat narxi ${m(precio)} boʻlsa, oylik xarajat: ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "kVt·soat nima?",
        respuesta: "Kilovatt-soat 1000 Vt quvvatli jihoz bir soat ishlaganda sarflaydigan energiya. Elektr energiyasi hisobvaragʻi shu birlikda yoziladi.",
      },
      {
        pregunta: "Muzlatgich kun boʻyi toʻliq quvvatda ishlaydimi?",
        respuesta: "Yoʻq. Kompressor yonib-oʻchib turadi. Bunday jihozlar uchun 24 soat oʻrniga kuniga 8 yoki 10 soat kiriting.",
      },
      {
        pregunta: "Nega hisobvaragʻim bilan aniq mos kelmaydi?",
        respuesta: "Hisobvaraqqa doimiy toʻlovlar, soliqlar va baʼzan sarf hajmiga qarab oʻzgaradigan tariflar qoʻshiladi. Bu kalkulyator faqat jihoz sarfini koʻrsatadi.",
      },
    ],
    glosario: [
      { termino: "Vatt (Vt)", definicion: "Quvvat birligi: jihoz har soniyada qancha energiya sarflashini bildiradi." },
      { termino: "Kilovatt-soat (kVt·soat)", definicion: "Bir soat davomida 1000 Vt. Hisobvaraqda aynan shu uchun toʻlaysiz." },
    ],
  };
};
