import { definirCasos } from "@/motor/calculo";
import kalkulyatorZarplaty from "./kalkulyator-zarplaty";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";
const GNS = "https://sti.gov.kg/news?id=cb3108d0-4bfe-41bc-ae18-2c878edfade1";

export default definirCasos(kalkulyatorZarplaty, [
  {
    nombre: "50 000 сомов без иждивенцев",
    origen: { tipo: "recalculado", url: NK, detalle: "Взносы 10 % = 5000. База 50 000 − 5000 − 6,5 × 100 = 44 350. Налог 10 % = 4435. На руки 50 000 − 5000 − 4435 = 40 565." },
    fecha: "2026-10-27",
    entrada: { oklad: 50000, izhdiventsy: 0, vychet: true },
    esperado: { netto: 40565, sf: 5000, vychet: 650, baza: 44350, pn: 4435, uderzhano: 9435, nettoZaGod: 486780 },
  },
  {
    nombre: "50 000 сомов и двое иждивенцев",
    origen: { tipo: "recalculado", url: NK, detalle: "Вычеты 650 + 2 × 100 = 850. База 44 150, налог 4415, на руки 40 585." },
    fecha: "2026-10-27",
    entrada: { oklad: 50000, izhdiventsy: 2, vychet: true },
    esperado: { vychet: 850, pn: 4415, netto: 40585 },
  },
  {
    nombre: "1 000 000 сомов: взносы с предельной базы",
    origen: { tipo: "recalculado", url: GNS, detalle: "Предельная база 20 × 36 047 = 720 940, взносы 72 094. База 1 000 000 − 72 094 − 650 = 927 256, налог 92 725,60, на руки 835 180,40." },
    fecha: "2026-10-27",
    entrada: { oklad: 1000000, izhdiventsy: 0, vychet: true },
    esperado: { sf: 72094, pn: 92725.6, netto: 835180.4 },
  },
  {
    nombre: "Минимальная зарплата 3280 сомов",
    origen: { tipo: "recalculado", url: NK, detalle: "Взносы 328. База 3280 − 328 − 650 = 2302, налог 230,20, на руки 2721,80." },
    fecha: "2026-10-27",
    entrada: { oklad: 3280, izhdiventsy: 0, vychet: true },
    esperado: { pn: 230.2, netto: 2721.8 },
  },
  {
    nombre: "По совместительству, без стандартных вычетов",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 200, часть 7: вычитаются только взносы. База 45 000, налог 4500, на руки 40 500." },
    fecha: "2026-10-27",
    entrada: { oklad: 50000, izhdiventsy: 0, vychet: false },
    esperado: { vychet: 0, pn: 4500, netto: 40500 },
  },
  {
    nombre: "Ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { oklad: 0, izhdiventsy: 0, vychet: true },
    esperaError: true,
  },
]);
