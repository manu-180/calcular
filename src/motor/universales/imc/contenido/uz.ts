import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Vazni 160 lb, boʻyi 5 ft 9 in boʻlgan odamning TMI koʻrsatkichi: ${n((160 * KG_POR_LB) / (m * m))}. Bu meʼyoriy vazn toifasiga kiradi.`,
        `Shu boʻyda sogʻlom vazn ${n((18.5 * m * m) / KG_POR_LB)} lb va ${n((24.9 * m * m) / KG_POR_LB)} lb oraligʻida boʻladi.`,
      ]
    : [
        `Vazni 70 kg, boʻyi ${n(1.75, 2)} m boʻlgan odamning TMI koʻrsatkichi: ${n(70 / (1.75 * 1.75))}. Bu meʼyoriy vazn toifasiga kiradi.`,
        `Shu boʻyda sogʻlom vazn ${n(18.5 * 1.75 * 1.75)} kg va ${n(24.9 * 1.75 * 1.75)} kg oraligʻida boʻladi.`,
      ];
  return {
    h1: "Tana massasi indeksi kalkulyatori",
    title: tituloQueEntre(`Tana massasi indeksi kalkulyatori: ${ctx.nombrePais}`, "Tana massasi indeksi (TMI) kalkulyatori", "TMI kalkulyatori"),
    description: "Vazningiz va boʻyingiz boʻyicha tana massasi indeksini hisoblang. JSST toifangizni va boʻyingizga mos sogʻlom vazn oraligʻini koʻring.",
    intro: [
      "Vazningiz va boʻyingizni kiriting. TMI koʻrsatkichingizni, Jahon sogʻliqni saqlash tashkiloti boʻyicha toifasini va boʻyingiz uchun sogʻlom vazn oraligʻini koʻrasiz.",
      "Bu kattalar uchun umumiy koʻrsatkich. U shifokor maslahatining oʻrnini bosmaydi.",
    ],
    comoSeCalcula: [
      imperial ? "TMI = funtdagi vazn × 703 ÷ (duymdagi boʻy × duymdagi boʻy)." : "TMI = kilogrammdagi vazn ÷ (metrdagi boʻy × metrdagi boʻy).",
      `Koʻrsatkich ${n(18.5)} chegarasidan past boʻlsa, vazn yetishmaydi. ${n(18.5)} va ${n(24.9)} oraligʻi meʼyoriy vazn, 25 va ${n(29.9)} oraligʻi ortiqcha vazn hisoblanadi. 30 va undan yuqori koʻrsatkich semizlikni bildiradi.`,
      `Sogʻlom vazn oraligʻi sizning boʻyingizda TMI koʻrsatkichini ${n(18.5)} va ${n(24.9)} oraligʻida ushlab turadigan vazndir.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Meʼyoriy TMI qancha?",
        respuesta: `Jahon sogʻliqni saqlash tashkiloti boʻyicha kattalarda ${n(18.5)} va ${n(24.9)} oraligʻi. Bu oraliq ayollar va erkaklar uchun bir xil.`,
      },
      {
        pregunta: "TMI hamma uchun toʻgʻri keladimi?",
        respuesta: "Yoʻq. U mushak va yogʻni farqlamaydi, shuning uchun mushaklari rivojlangan odamlarda yuqori chiqishi mumkin. Homiladorlikda, bolalar va oʻsmirlarda ham boshqacha baholanadi.",
      },
      {
        pregunta: "TMI yuqori chiqsa nima qilish kerak?",
        respuesta: "Natijani shifokor yoki dietolog bilan muhokama qiling. U bel aylanasi, ovqatlanish va jismoniy faollik kabi boshqa koʻrsatkichlar bilan birga baholanadi.",
      },
    ],
    glosario: [
      { termino: "TMI", definicion: "Tana massasi indeksi: vazningiz boʻyingizga qanday nisbatda ekanini koʻrsatadi." },
      { termino: "JSST", definicion: "Jahon sogʻliqni saqlash tashkiloti. Kattalar uchun TMI toifalarini belgilaydi." },
    ],
  };
};
