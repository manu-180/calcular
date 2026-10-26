import { definirCasos } from "@/motor/calculo";
import posobie from "./posobie-po-ukhodu-za-rebenkom";

const SK = "https://adilet.zan.kz/rus/docs/K2300000224";

export default definirCasos(posobie, [
  {
    nombre: "Доход 12 млн тенге за 24 месяца",
    origen: { tipo: "recalculado", url: SK, detalle: "Статья 85: СМД 500 000 × 0,40 = 200 000; ОПВ 10 % = 20 000; на руки 180 000." },
    fecha: "2026-10-24",
    entrada: { dokhod: 12000000, ocherednost: "1" },
    esperado: { smd: 500000, vyplata: 200000, opv: 20000, naRuki: 180000, maks: 238000 },
  },
  {
    nombre: "Высокий доход: не больше 40 % от 7 МЗП",
    origen: { tipo: "recalculado", url: SK, detalle: "0,40 × 7 × 85 000 = 238 000; ОПВ 23 800; на руки 214 200." },
    fecha: "2026-10-24",
    entrada: { dokhod: 24000000, ocherednost: "2" },
    esperado: { vyplata: 238000, naRuki: 214200 },
  },
  {
    nombre: "Низкий доход: выплата поднимается до пособия из бюджета",
    origen: {
      tipo: "recalculado",
      url: SK,
      detalle: "СМД 50 000 × 0,4 = 20 000 меньше пособия 5,76 × 4325 = 24 912 (статья 82). Начислено 24 912 / 0,9 = 27 680, ОПВ 2768, на руки 24 912.",
    },
    fecha: "2026-10-24",
    entrada: { dokhod: 1200000, ocherednost: "1" },
    esperado: { minimumNaRuki: 24912, vyplata: 27680, naRuki: 24912 },
  },
]);
