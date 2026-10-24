import { definirCasos } from "@/motor/calculo";
import tryVidsotkyRichnykh from "./try-vidsotky-richnykh";

const VS = "https://supreme.court.gov.ua/supreme/pres-centr/news/2034689/";
const OP = "https://supreme.court.gov.ua/supreme/pro_sud/rishennya_obedn_palati_kgs_vs/2023_02_03_910_9374_21";

export default definirCasos(tryVidsotkyRichnykh, [
  {
    nombre: "100 000 грн, прострочення з 01.01.2025, погашено 31.12.2025",
    origen: { tipo: "recalculado", url: VS, detalle: "364 дні × 100 000 × 3 % / 365 = 2991,78. Місяці січень (31 день прострочення) до грудня (30 днів): індекс 107,96 %; інфляційні 7959,57." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, pochatok: "2025-01-01", pohashennia: "2025-12-31", inshaStavka: false, stavka: null },
    esperado: { dni: 364, richni: 2991.78, infliatsiini: 7959.57, misiatsiv: 12, razom: 10951.35 },
  },
  {
    nombre: "Прострочення 20 днів в одному місяці: березень рахується",
    origen: { tipo: "recalculado", url: OP, detalle: "05.03.2026 до 25.03.2026: 20 днів > 15, тому індекс березня 101,7 %; інфляційні 1700; 3 % за 20 днів = 164,38." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, pochatok: "2026-03-05", pohashennia: "2026-03-25", inshaStavka: false, stavka: null },
    esperado: { dni: 20, richni: 164.38, infliatsiini: 1700, misiatsiv: 1 },
  },
  {
    nombre: "Неповні крайні місяці не рахуються",
    origen: { tipo: "recalculado", url: OP, detalle: "З 20.01.2026 (12 днів у січні) до 10.03.2026 (9 днів у березні): рахується лише лютий, 101,0 %; інфляційні 1000; 3 % за 49 днів = 402,74." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, pochatok: "2026-01-20", pohashennia: "2026-03-10", inshaStavka: false, stavka: null },
    esperado: { misiatsiv: 1, infliatsiini: 1000, richni: 402.74 },
  },
  {
    nombre: "Дефляція: інфляційних втрат немає",
    origen: { tipo: "recalculado", url: VS, detalle: "Липень і серпень 2025 по 99,8 %: індекс 99,6 % < 100 %, інфляційні 0; 3 % за 61 день = 501,37." },
    fecha: "2026-10-24",
    entrada: { borh: 100000, pochatok: "2025-07-01", pohashennia: "2025-08-31", inshaStavka: false, stavka: null },
    esperado: { infliatsiini: 0, richni: 501.37 },
  },
  {
    nombre: "Договірні 10 % річних у високосному році",
    origen: { tipo: "recalculado", url: VS, detalle: "50 000 × 10 % × 131 / 366 = 1789,62; лютий до червня 2024: індекс 103,84 %; інфляційні 1922,26." },
    fecha: "2026-10-24",
    entrada: { borh: 50000, pochatok: "2024-02-10", pohashennia: "2024-06-20", inshaStavka: true, stavka: 10 },
    esperado: { richni: 1789.62, infliatsiini: 1922.26 },
  },
  {
    nombre: "Погашення раніше за прострочення",
    origen: { tipo: "recalculado", url: VS, detalle: "Дата погашення має бути пізніше." },
    fecha: "2026-10-24",
    entrada: { borh: 1000, pochatok: "2026-05-10", pohashennia: "2026-05-01", inshaStavka: false, stavka: null },
    esperaError: true,
  },
]);
