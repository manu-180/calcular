import { definirCasos } from "@/motor/calculo";
import podokhodnyyNalog from "./podokhodnyy-nalog";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(podokhodnyyNalog, [
  {
    nombre: "50 000 сомов на основном месте работы",
    origen: { tipo: "recalculado", url: NK, detalle: "Статьи 194 и 197: (50 000 − 5000 − 650) × 10 % = 4435; 4435 / 50 000 = 8,87 %; за год 53 220." },
    fecha: "2026-10-27",
    entrada: { dokhod: 50000, izhdiventsy: 0, vychet: true },
    esperado: { pn: 4435, baza: 44350, effektivnaya: 8.87, pnZaGod: 53220, stavka: 10 },
  },
  {
    nombre: "30 000 сомов и трое иждивенцев",
    origen: { tipo: "recalculado", url: NK, detalle: "Вычеты 650 + 300 = 950. (30 000 − 3000 − 950) × 10 % = 2605." },
    fecha: "2026-10-27",
    entrada: { dokhod: 30000, izhdiventsy: 3, vychet: true },
    esperado: { vychet: 950, pn: 2605 },
  },
  {
    nombre: "Доход ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Доход должен быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { dokhod: 0, izhdiventsy: 0, vychet: true },
    esperaError: true,
  },
]);
