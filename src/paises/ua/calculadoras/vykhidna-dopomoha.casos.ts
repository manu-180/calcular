import { definirCasos } from "@/motor/calculo";
import vykhidnaDopomoha from "./vykhidna-dopomoha";

const DSP = "https://dp.dsp.gov.ua/novyny/v-iakykh-vypadkakh-pratsivnyku-vyplachuietsia-vykhidna-dopomoha/";

export default definirCasos(vykhidnaDopomoha, [
  {
    nombre: "Скорочення, середній заробіток 25 000 грн",
    origen: { tipo: "recalculado", url: DSP, detalle: "Не менше одного середнього місячного заробітку: 25 000; ПДФО 4500; ВЗ 1250; на руки 19 250." },
    fecha: "2026-10-24",
    entrada: { pidstava: "zahalna", serednii: 25000 },
    esperado: { suma: 25000, misiatsiv: 1, pdfo: 4500, vz: 1250, naRuky: 19250 },
  },
  {
    nombre: "Порушення законодавства: три заробітки",
    origen: { tipo: "recalculado", url: DSP, detalle: "Не менше тримісячного середнього заробітку: 3 × 25 000 = 75 000." },
    fecha: "2026-10-24",
    entrada: { pidstava: "porushennia", serednii: 25000 },
    esperado: { suma: 75000, misiatsiv: 3 },
  },
  {
    nombre: "Посадова особа: шість заробітків",
    origen: { tipo: "recalculado", url: DSP, detalle: "Не менше шестимісячного: 6 × 40 000 = 240 000." },
    fecha: "2026-10-24",
    entrada: { pidstava: "posadovi", serednii: 40000 },
    esperado: { suma: 240000, misiatsiv: 6 },
  },
  {
    nombre: "Призов на військову службу",
    origen: { tipo: "recalculado", url: DSP, detalle: "Дві мінімальні зарплати: 2 × 8647 = 17 294." },
    fecha: "2026-10-24",
    entrada: { pidstava: "viiskova", serednii: null },
    esperado: { suma: 17294, misiatsiv: null },
  },
  {
    nombre: "Без заробітку",
    origen: { tipo: "recalculado", url: DSP, detalle: "Без середнього заробітку суму не обчислити." },
    fecha: "2026-10-24",
    entrada: { pidstava: "zahalna", serednii: 0 },
    esperaError: true,
  },
]);
