import { definirCasos } from "@/motor/calculo";
import penyaPoNalogam from "./penya-po-nalogam";

const NK = "https://cbd.minjust.gov.kg/112340/edition/57656/ru";

export default definirCasos(penyaPoNalogam, [
  {
    nombre: "100 000 сомов, 30 дней",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 82: 0,09 % в день. 100 000 × 0,09 % × 30 = 2700." },
    fecha: "2026-10-27",
    entrada: { nedoimka: 100000, dney: 30 },
    esperado: { penya: 2700, zaDen: 90, vsego: 102700 },
  },
  {
    nombre: "Предел 100 % недоимки",
    origen: { tipo: "recalculado", url: NK, detalle: "100 000 × 0,09 % × 1200 = 108 000, больше недоимки: пени 100 000." },
    fecha: "2026-10-27",
    entrada: { nedoimka: 100000, dney: 1200 },
    esperado: { penya: 100000, vsego: 200000 },
  },
  {
    nombre: "Недоимка ноль",
    origen: { tipo: "recalculado", url: NK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { nedoimka: 0, dney: 10 },
    esperaError: true,
  },
]);
