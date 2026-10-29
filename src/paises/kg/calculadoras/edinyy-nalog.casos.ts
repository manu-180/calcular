import { definirCasos } from "@/motor/calculo";
import edinyyNalog from "./edinyy-nalog";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(edinyyNalog, [
  {
    nombre: "Услуги, безналичная выручка",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 423, часть 1, пункт 3 «б»: 4 %. 1 500 000 × 4 % = 60 000." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 1500000, vid: "prochee-beznal" },
    esperado: { nalog: 60000, stavka: 4, ostaetsya: 1440000 },
  },
  {
    nombre: "Услуги, наличная выручка",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 423, часть 1, пункт 3 «а»: 6 %. 1 500 000 × 6 % = 90 000." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 1500000, vid: "prochee-nal" },
    esperado: { nalog: 90000 },
  },
  {
    nombre: "Торговля с выручкой до 50 млн сомов",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 423, часть 1, пункт 1 «а»: 0,5 %. 2 000 000 × 0,5 % = 10 000." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 2000000, vid: "torgovlya-do-50-mln" },
    esperado: { nalog: 10000, stavka: 0.5 },
  },
  {
    nombre: "Выручка ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Выручка должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 0, vid: "prochee-nal" },
    esperaError: true,
  },
]);
