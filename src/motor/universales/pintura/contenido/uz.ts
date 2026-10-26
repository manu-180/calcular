import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Devorlari umumiy 48 ft uzunlikda, 8 ft balandlikda, eshik va derazalari 40 ft² boʻlgan xonada boʻyaladigan maydon ${n(neta, 0)} ft² boʻladi.`,
          `Ikki qatlam va bir gallonda 350 ft² qoplaydigan boʻyoq bilan ${n(gal, 2)} gallon kerak. Zaxira bilan: ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Devorlari umumiy 14 m uzunlikda, ${n(2.6)} m balandlikda, eshik va derazalari 4 m² boʻlgan xonada boʻyaladigan maydon ${n(neta)} m² boʻladi.`,
          `Ikki qatlam va bir litrda 10 m² qoplaydigan boʻyoq bilan ${n(litros, 2)} litr kerak. Zaxira bilan: ${n(litros * (1 + MARGEN), 2)} litr.`,
        ];
      })();
  return {
    h1: "Boʻyoq kalkulyatori",
    title: tituloQueEntre(`Boʻyoq kalkulyatori: ${ctx.nombrePais}`, "Devor uchun boʻyoq kalkulyatori", "Boʻyoq kalkulyatori"),
    description: "Devorlar oʻlchami, eshik va derazalar, qatlamlar soni va bankadagi sarf meʼyori boʻyicha qancha boʻyoq kerakligini hisoblang.",
    intro: [
      "Devorlarning uzunligi va balandligini (yoki toʻgʻridan-toʻgʻri maydonni), eshik va derazalar egallagan joyni va necha qatlam surtishingizni kiriting.",
      "Ish oʻrtasida boʻyoq tugab qolmasligi uchun 10% zaxira qoʻshiladi.",
    ],
    comoSeCalcula: [
      "Maydon = devorlarning umumiy uzunligi × balandlik, eshik va derazalar ayirilgan holda.",
      "Boʻyoq = maydon × qatlamlar soni ÷ sarf meʼyori.",
      `Natijaga ${MARGEN * 100}% zaxira qoʻshiladi.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "1 litr boʻyoq qancha maydonni qoplaydi?",
        respuesta: "Ichki devorlar uchun boʻyoqlarning koʻpi bir qatlamda litriga 8 yoki 12 m² (gallonga 350 yoki 400 ft²) qoplaydi. Aniq qiymat bankada yozilgan.",
      },
      {
        pregunta: "Necha qatlam surtish kerak?",
        respuesta: "Odatda ikki qatlam yetadi. Yangi suvoq, gʻovak devor yoki rangni keskin oʻzgartirishda uchinchi qatlam kerak boʻlishi mumkin.",
      },
      {
        pregunta: "Eshik va derazalarni ayirish kerakmi?",
        respuesta: "Ha, agar ular katta boʻlsa. Kichiklarini ayirmagan maʼqul: ortib qolgan boʻyoq burchak va chetlarga ketadi.",
      },
    ],
    glosario: [
      { termino: "Sarf meʼyori", definicion: "Bir litr yoki bir gallon boʻyoq bir qatlamda qancha maydonni qoplashi." },
      { termino: "Qatlam", definicion: "Devorga surtiladigan har bir boʻyoq qavati." },
    ],
  };
};
