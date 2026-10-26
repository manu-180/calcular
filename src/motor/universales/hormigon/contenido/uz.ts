import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `10 × 10 ft oʻlchamli, qalinligi 4 in boʻlgan maydoncha uchun ${n(ft3)} ft³ beton kerak. Bu ${n(ft3 / 27)} kub yard degani.`,
          `Namunaviy tarkib bilan bu taxminan ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb sement.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `4 × 3 m oʻlchamli, qalinligi 10 cm boʻlgan plita uchun ${n(volumen, 1)} m³ beton kerak.`,
          `Namunaviy tarkib bilan bu taxminan ${n(MEZCLA.cementoKg * volumen, 0)} kg sement, ${n(MEZCLA.arenaM3 * volumen)} m³ qum va ${n(MEZCLA.piedraM3 * volumen)} m³ shagʻal.`,
        ];
      })();
  return {
    h1: "Beton kalkulyatori",
    title: tituloQueEntre(`Beton kalkulyatori: ${ctx.nombrePais}`, "Beton hajmini hisoblash", "Beton kalkulyatori"),
    description: `Plita uchun qancha beton kerakligini ${imperial ? "kub yardda" : "kub metrda"} hisoblang, shuningdek taxminan qancha sement, qum va shagʻal olishni bilib oling.`,
    intro: [
      "Uzunlik, eni va qalinlikni kiriting. Beton hajmini va uni qorish uchun taxminiy materiallarni koʻrasiz.",
      "Materiallar beton tarkibiga bogʻliq. Bu kalkulyator namuna sifatida umumiy maqsadli 1:2:3 tarkibdan foydalanadi.",
    ],
    comoSeCalcula: [
      imperial ? "Hajm = uzunlik × eni × qalinlik, qalinlik futda olinadi. Kub yardni topish uchun kub futdagi qiymat 27 soniga boʻlinadi." : "Hajm = uzunlik × eni × qalinlik, qalinlik metrda olinadi.",
      "Notekis zamin va toʻkilib ketadigan qorishma uchun zaxira qoʻshiladi.",
      `1 m³ uchun: taxminan ${MEZCLA.cementoKg} kg sement, ${n(MEZCLA.arenaM3)} m³ qum, ${n(MEZCLA.piedraM3, 1)} m³ shagʻal va ${MEZCLA.aguaL} litr suv.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Bir kub yardda necha kub fut bor?",
        respuesta: "27 kub fut. Kub yard bu 3 ft × 3 ft × 3 ft. Tayyor beton odatda kub yard hisobida sotiladi.",
      },
      {
        pregunta: "1 kub metr betonga qancha sement ketadi?",
        respuesta: `1:2:3 tarkibda taxminan ${MEZCLA.cementoKg} kg. Mustahkamroq betonga koʻproq sement ketadi.`,
      },
      {
        pregunta: "Tayyor beton buyurtma qilish kerakmi?",
        respuesta: "Katta hajmlar uchun tayyor beton odatda bir xilroq va tezroq boʻladi. Kichik ishlar uchun shu miqdorlar bilan joyida qorish keng tarqalgan.",
      },
    ],
    glosario: [
      { termino: "Beton tarkibi", definicion: "Qorishmadagi sement, qum, shagʻal va suv nisbati." },
      { termino: "Kub yard (yd³)", definicion: "Har bir tomoni 1 yard boʻlgan kub hajmi: 27 kub fut." },
    ],
  };
};
