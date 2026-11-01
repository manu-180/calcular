import { definirCasos } from "@/motor/calculo";
import minimalnayaZarplata from "./minimalnaya-zarplata";

const BYUDZHET = "https://cbd.minjust.gov.kg/4-5709/edition/48719/ru";

export default definirCasos(minimalnayaZarplata, [
  {
    nombre: "Полный месяц в 2026 году",
    origen: { tipo: "oficial", url: BYUDZHET, detalle: "Статья 14: минимальная заработная плата на 2026 год 3280,0 сомов." },
    fecha: "2026-10-27",
    entrada: { dolya: 100, zarplata: null },
    esperado: { minimum: 3280, mzp: 3280, raznitsa: null },
  },
  {
    nombre: "Полставки и зарплата 1500 сомов",
    origen: { tipo: "recalculado", url: BYUDZHET, detalle: "3280 × 50 % = 1640; 1500 − 1640 = −140." },
    fecha: "2026-10-27",
    entrada: { dolya: 50, zarplata: 1500 },
    esperado: { minimum: 1640, raznitsa: -140 },
  },
  {
    nombre: "Январь 2027 года",
    origen: { tipo: "oficial", url: BYUDZHET, detalle: "Статья 14: на 2027 год 3608,0 сомов." },
    fecha: "2027-01-15",
    entrada: { dolya: 100, zarplata: null },
    esperado: { mzp: 3608 },
  },
  {
    nombre: "Доля ноль",
    origen: { tipo: "recalculado", url: BYUDZHET, detalle: "Доля должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { dolya: 0, zarplata: null },
    esperaError: true,
  },
]);
