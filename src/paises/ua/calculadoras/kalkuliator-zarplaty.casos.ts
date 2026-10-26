import { definirCasos } from "@/motor/calculo";
import kalkuliatorZarplaty from "./kalkuliator-zarplaty";

const ZIR = "https://zir.tax.gov.ua/docs/stavki/podatok_na_dohody_fizychnyh_osib.pdf";

export default definirCasos(kalkuliatorZarplaty, [
  {
    nombre: "25 000 грн брутто за основним місцем роботи",
    origen: { tipo: "recalculado", url: ZIR, detalle: "ПДФО 18 % = 4500; ВЗ 5 % = 1250; на руки 25 000 − 5750 = 19 250. ЄСВ 22 % = 5500; вартість 30 500." },
    fecha: "2026-10-24",
    entrada: { brutto: 25000, psp: "ni", osnovne: true },
    esperado: { pdfo: 4500, vz: 1250, naRuky: 19250, yesv: 5500, vytraty: 30500, naRukyRik: 231000 },
  },
  {
    nombre: "Мінімальна зарплата 2026: 8647 грн",
    origen: { tipo: "recalculado", url: "https://zir.tax.gov.ua/docs/stavki/size_of_the_minimum_wage.pdf", detalle: "ПДФО 8647 × 18 % = 1556,46; ВЗ 432,35; на руки 6658,19; ЄСВ 8647 × 22 % = 1902,34." },
    fecha: "2026-10-24",
    entrada: { brutto: 8647, psp: "ni", osnovne: true },
    esperado: { pdfo: 1556.46, vz: 432.35, naRuky: 6658.19, yesv: 1902.34, vytraty: 10549.34 },
  },
  {
    nombre: "200 000 грн: ЄСВ з максимальної бази",
    origen: { tipo: "recalculado", url: "https://zir.tax.gov.ua/main/bz/search/?src=ques", detalle: "Максимальна база 20 × 8647 = 172 940; ЄСВ 22 % = 38 046,80; ПДФО 36 000; ВЗ 10 000; на руки 154 000." },
    fecha: "2026-10-24",
    entrada: { brutto: 200000, psp: "ni", osnovne: true },
    esperado: { naRuky: 154000, yesv: 38046.8, vytraty: 238046.8 },
  },
  {
    nombre: "Неповний час 4500 грн із звичайною пільгою",
    origen: { tipo: "recalculado", url: "https://zir.tax.gov.ua/docs/stavki/amount_of_the_tax_social_benefit.pdf", detalle: "4500 ≤ 4660, пільга 1664; ПДФО (4500 − 1664) × 18 % = 510,48; ВЗ 225; на руки 3764,52. ЄСВ з мінімальної: 1902,34." },
    fecha: "2026-10-24",
    entrada: { brutto: 4500, psp: "zvychaina", osnovne: true },
    esperado: { psp: 1664, pdfo: 510.48, vz: 225, naRuky: 3764.52, yesv: 1902.34 },
  },
  {
    nombre: "Пільга не діє при зарплаті понад 4660 грн",
    origen: { tipo: "recalculado", url: "https://zir.tax.gov.ua/docs/stavki/amount_of_the_tax_social_benefit.pdf", detalle: "10 000 > 4660: пільги немає; ПДФО 1800; ВЗ 500; на руки 7700." },
    fecha: "2026-10-24",
    entrada: { brutto: 10000, psp: "zvychaina", osnovne: true },
    esperado: { psp: null, naRuky: 7700 },
  },
  {
    nombre: "Сумісництво 4000 грн: ЄСВ з фактичної суми",
    origen: { tipo: "recalculado", url: "https://zir.tax.gov.ua/docs/stavki/esv.pdf", detalle: "Не основне місце роботи: ЄСВ 4000 × 22 % = 880; ПДФО 720; ВЗ 200; на руки 3080." },
    fecha: "2026-10-24",
    entrada: { brutto: 4000, psp: "ni", osnovne: false },
    esperado: { yesv: 880, naRuky: 3080 },
  },
  {
    nombre: "Нульова зарплата",
    origen: { tipo: "recalculado", url: ZIR, detalle: "Без зарплати нічого рахувати." },
    fecha: "2026-10-24",
    entrada: { brutto: 0, psp: "ni", osnovne: true },
    esperaError: true,
  },
]);
