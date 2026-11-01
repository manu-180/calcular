import { definirCasos } from "@/motor/calculo";
import nalogNaPribyl from "./nalog-na-pribyl";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(nalogNaPribyl, [
  {
    nombre: "Прибыль 3 млн сомов",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 240: 10 %. (10 000 000 − 7 000 000) × 10 % = 300 000." },
    fecha: "2026-10-27",
    entrada: { dokhod: 10000000, raskhody: 7000000 },
    esperado: { nalog: 300000, pribyl: 3000000, chistaya: 2700000, stavka: 10 },
  },
  {
    nombre: "Убыток",
    origen: { tipo: "recalculado", url: NK, detalle: "Расходы больше дохода: налог 0." },
    fecha: "2026-10-27",
    entrada: { dokhod: 1000000, raskhody: 1200000 },
    esperado: { nalog: 0, pribyl: -200000 },
  },
  {
    nombre: "Доход ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Доход должен быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { dokhod: 0, raskhody: 0 },
    esperaError: true,
  },
]);
