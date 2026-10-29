import { definirCasos } from "@/motor/calculo";
import bolnichnye from "./bolnichnye";

const POL = "https://cbd.minjust.gov.kg/12601/edition/52189/ru";

export default definirCasos(bolnichnye, [
  {
    nombre: "15 рабочих дней, стаж больше 8 лет",
    origen: {
      tipo: "recalculado",
      url: POL,
      detalle: "Пункты 11 и 37: 150 000 / 63 = 2380,95 в день; 10 дней × 100 % = 23 809,50; с 11-го дня 100 × 100 / 21 = 476,19 в день × 5 = 2380,95. Всего 26 190,45.",
    },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, rabDney3: 63, dneyBolezni: 15, stazh: "bolee-8", polnostyu: false, rabDneyMesyatsa: 21 },
    esperado: { posobie: 26190.45, zaPervye: 23809.5, zaOstalnye: 2380.95, sredniy: 2380.95, protsent: 100 },
  },
  {
    nombre: "8 рабочих дней, стаж до 5 лет",
    origen: { tipo: "recalculado", url: POL, detalle: "Пункт 37: 60 %. 2380,95 × 8 × 60 % = 11 428,56." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, rabDney3: 63, dneyBolezni: 8, stazh: "do-5", polnostyu: false, rabDneyMesyatsa: 21 },
    esperado: { posobie: 11428.56, protsent: 60 },
  },
  {
    nombre: "Зарплата не больше 100 расчетных показателей",
    origen: { tipo: "recalculado", url: POL, detalle: "9000 сомов в месяц ≤ 10 000: 100 % за все дни. 27 000 / 63 = 428,57 × 15 = 6428,55." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 27000, rabDney3: 63, dneyBolezni: 15, stazh: "do-5", polnostyu: false, rabDneyMesyatsa: 21 },
    esperado: { posobie: 6428.55, protsent: 100, zaOstalnye: 0 },
  },
  {
    nombre: "Трудовое увечье: 100 % за все дни",
    origen: { tipo: "recalculado", url: POL, detalle: "Пункт 37, подпункт 1: 2380,95 × 15 = 35 714,25." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, rabDney3: 63, dneyBolezni: 15, stazh: "do-5", polnostyu: true, rabDneyMesyatsa: 21 },
    esperado: { posobie: 35714.25 },
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: POL, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 0, rabDney3: 63, dneyBolezni: 5, stazh: "do-5", polnostyu: false, rabDneyMesyatsa: 21 },
    esperaError: true,
  },
]);
