import { definirCasos } from "@/motor/calculo";
import likarniani from "./likarniani";

const PFU = "https://www.pfu.gov.ua/2163380-poryadok-vyznachennya-serednoyi-zarobitnoyi-platy-dohodu-ta-sumy-dopomogy-po-tymchasovij-nepratsezdatnosti-vagitnosti-ta-pologah/";

export default definirCasos(likarniani, [
  {
    nombre: "Приклад ПФУ: 80 400 грн за 365 днів, стаж до трьох років",
    origen: { tipo: "oficial", url: PFU, detalle: "80 400 / 365 = 220,27 грн; 50 % = 110,14 грн за день; × 10 днів = 1101,40." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 80400, dni: 365, stazh: "do-3", dniHvoroby: 10 },
    esperado: { serednodenna: 220.27, denna: 110.14, suma: 1101.4, robotodavets: 550.7, pfu: 550.7 },
  },
  {
    nombre: "Приклад ПФУ: 33 500 грн за 153 дні, стаж до трьох років",
    origen: { tipo: "oficial", url: PFU, detalle: "33 500 / 153 = 218,95 грн; 50 % = 109,48 грн за день." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 33500, dni: 153, stazh: "do-3", dniHvoroby: 3 },
    esperado: { serednodenna: 218.95, denna: 109.48, suma: 328.44, robotodavets: 328.44, pfu: 0 },
  },
  {
    nombre: "Стаж понад 8 років, 300 000 грн, 14 днів",
    origen: { tipo: "recalculado", url: PFU, detalle: "300 000 / 365 = 821,92; 100 %; × 14 = 11 506,88; роботодавець 5 × 821,92 = 4109,60; ПДФО 2071,24; ВЗ 575,34; на руки 8860,30." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 300000, dni: 365, stazh: "ponad-8", dniHvoroby: 14 },
    esperado: { suma: 11506.88, robotodavets: 4109.6, pfu: 7397.28, pdfo: 2071.24, vz: 575.34, naRuky: 8860.3 },
  },
  {
    nombre: "Обмеження максимальною базою ЄСВ",
    origen: { tipo: "recalculado", url: PFU, detalle: "3 000 000 / 365 = 8219,18 > 172 940 / 30,44 = 5681,34; 70 % = 3976,94; × 10 = 39 769,40." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 3000000, dni: 365, stazh: "vid-5-do-8", dniHvoroby: 10 },
    esperado: { serednodenna: 5681.34, denna: 3976.94, suma: 39769.4 },
  },
  {
    nombre: "Нуль днів лікарняного",
    origen: { tipo: "recalculado", url: PFU, detalle: "Без днів хвороби виплати немає." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 80400, dni: 365, stazh: "do-3", dniHvoroby: 0 },
    esperaError: true,
  },
]);
