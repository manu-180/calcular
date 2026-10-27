import { definirCasos } from "@/motor/calculo";
import zarplataNaRuki from "./zarplata-na-ruki";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(zarplataNaRuki, [
  {
    nombre: "40 565 сомов на руки = 50 000 начислено",
    origen: { tipo: "recalculado", url: NK, detalle: "50 000 − 5000 − 4435 = 40 565. При 49 999 сомах на руки 40 564,19, меньше нужного." },
    fecha: "2026-10-27",
    entrada: { naRuki: 40565, izhdiventsy: 0, vychet: true },
    esperado: { brutto: 50000, sf: 5000, pn: 4435, netto: 40565 },
  },
  {
    nombre: "40 500 сомов на руки по совместительству",
    origen: { tipo: "recalculado", url: NK, detalle: "Без стандартных вычетов: 50 000 − 5000 − 4500 = 40 500." },
    fecha: "2026-10-27",
    entrada: { naRuki: 40500, izhdiventsy: 0, vychet: false },
    esperado: { brutto: 50000, netto: 40500 },
  },
  {
    nombre: "Ноль на руки",
    origen: { tipo: "recalculado", url: NK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { naRuki: 0, izhdiventsy: 0, vychet: true },
    esperaError: true,
  },
]);
