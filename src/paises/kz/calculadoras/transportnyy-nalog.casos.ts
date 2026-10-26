import { definirCasos } from "@/motor/calculo";
import transportnyyNalog from "./transportnyy-nalog";

const NK = "https://adilet.zan.kz/rus/docs/K2500000214";

export default definirCasos(transportnyyNalog, [
  {
    nombre: "1600 куб. см, автомобилю 5 лет",
    origen: { tipo: "recalculado", url: NK, detalle: "Статья 565: 3 МРП × 4325 = 12 975 плюс 7 тенге × 100 = 700. Итого 13 675." },
    fecha: "2026-10-24",
    entrada: { obyem: 1600, vozrast: "do-10", mesyatsy: 12 },
    esperado: { nalog: 13675, stavkaMrp: 3, nadbavka: 700 },
  },
  {
    nombre: "Ровно 2500 куб. см",
    origen: { tipo: "recalculado", url: NK, detalle: "Строка «свыше 2000 до 2500 включительно»: 6 × 4325 = 25 950 плюс 7 × 500 = 3500. Итого 29 450." },
    fecha: "2026-10-24",
    entrada: { obyem: 2500, vozrast: "do-10", mesyatsy: 12 },
    esperado: { nalog: 29450, stavkaMrp: 6 },
  },
  {
    nombre: "3500 куб. см, автомобилю 15 лет",
    origen: { tipo: "recalculado", url: NK, detalle: "15 × 4325 = 64 875 плюс 3500 = 68 375; × 0,7 = 47 862,50." },
    fecha: "2026-10-24",
    entrada: { obyem: 3500, vozrast: "10-20", mesyatsy: 12 },
    esperado: { nalog: 47862.5, koeffitsient: 0.7 },
  },
  {
    nombre: "1000 куб. см, без надбавки",
    origen: { tipo: "recalculado", url: NK, detalle: "1 МРП = 4325." },
    fecha: "2026-10-24",
    entrada: { obyem: 1000, vozrast: "do-10", mesyatsy: 12 },
    esperado: { nalog: 4325, nadbavka: 0 },
  },
  {
    nombre: "4500 куб. см, автомобилю 25 лет, владел 6 месяцев",
    origen: { tipo: "recalculado", url: NK, detalle: "117 × 4325 = 506 025 плюс 3500 = 509 525; × 0,5 = 254 762,50 за год; за 6 месяцев 127 381,25." },
    fecha: "2026-10-24",
    entrada: { obyem: 4500, vozrast: "svyshe-20", mesyatsy: 6 },
    esperado: { zaGod: 254762.5, nalog: 127381.25 },
  },
]);
