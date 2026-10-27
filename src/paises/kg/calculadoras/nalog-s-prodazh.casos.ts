import { definirCasos } from "@/motor/calculo";
import nalogSProdazh from "./nalog-s-prodazh";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(nalogSProdazh, [
  {
    nombre: "Услуги плательщика НДС",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 368, часть 1, пункт 1 «б»: 2 %. 1 000 000 × 2 % = 20 000." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 1000000, vid: "prochee-nds" },
    esperado: { nalog: 20000, stavka: 2, sNalogom: 1020000 },
  },
  {
    nombre: "Торговля без НДС",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 368, часть 1, пункт 2 «а»: 2 %. 500 000 × 2 % = 10 000." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 500000, vid: "torgovlya-bez-nds" },
    esperado: { nalog: 10000 },
  },
  {
    nombre: "Услуги без НДС",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 368, часть 1, пункт 2 «б»: 3 %. 500 000 × 3 % = 15 000." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 500000, vid: "prochee-bez-nds" },
    esperado: { nalog: 15000, stavka: 3 },
  },
  {
    nombre: "Выручка ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Выручка должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { vyruchka: 0, vid: "torgovlya-nds" },
    esperaError: true,
  },
]);
