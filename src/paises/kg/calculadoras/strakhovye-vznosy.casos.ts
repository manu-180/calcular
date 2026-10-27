import { definirCasos } from "@/motor/calculo";
import strakhovyeVznosy from "./strakhovye-vznosy";

const ZAKON = "https://cbd.minjust.gov.kg/4-1330/edition/56528/ru";
const GNS = "https://sti.gov.kg/news?id=cb3108d0-4bfe-41bc-ae18-2c878edfade1";

export default definirCasos(strakhovyeVznosy, [
  {
    nombre: "Предельная сумма при тарифе 27,25 %",
    origen: { tipo: "oficial", url: GNS, detalle: "ГНС: в 2026 году предельная величина взносов 196 456,15 сома при совокупном тарифе 27,25 %. 720 940 × 10 % = 72 094; 720 940 × 17,25 % = 124 362,15." },
    fecha: "2026-10-27",
    entrada: { zarplata: 1000000, kategoriya: "obshchiy", srednyaya: null },
    esperado: { vsego: 196456.15, sfRabotnik: 72094, sfRabotodatel: 124362.15, baza: 720940 },
  },
  {
    nombre: "Предельная сумма при тарифе 12,25 %",
    origen: { tipo: "oficial", url: GNS, detalle: "ГНС: 88 315,15 сома при тарифе 12,25 %. 72 094 + 720 940 × 2,25 % (16 221,15)." },
    fecha: "2026-10-27",
    entrada: { zarplata: 1000000, kategoriya: "predprinimatel", srednyaya: null },
    esperado: { vsego: 88315.15, sfRabotodatel: 16221.15 },
  },
  {
    nombre: "50 000 сомов у предпринимателя",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Статья 2-2: работник 10 % = 5000, работодатель 2,25 % = 1125, всего 6125." },
    fecha: "2026-10-27",
    entrada: { zarplata: 50000, kategoriya: "predprinimatel", srednyaya: null },
    esperado: { vsego: 6125, sfRabotnik: 5000, sfRabotodatel: 1125, stavkaRabotodatelya: 2.25 },
  },
  {
    nombre: "20 000 сомов при средней по району 30 000",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Статья 13, часть 3: не меньше 2,25 % от 100 % средней зарплаты = 675 вместо 450. Работник 2000 с фактической зарплаты." },
    fecha: "2026-10-27",
    entrada: { zarplata: 20000, kategoriya: "predprinimatel", srednyaya: 30000 },
    esperado: { sfRabotodatel: 675, sfRabotnik: 2000, vsego: 2675 },
  },
  {
    nombre: "Ноль",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { zarplata: 0, kategoriya: "predprinimatel", srednyaya: null },
    esperaError: true,
  },
]);
