import { definirCasos } from "@/motor/calculo";
import kompensatsiyaZaOtpusk from "./kompensatsiya-za-otpusk";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(kompensatsiyaZaOtpusk, [
  {
    nombre: "7 месяцев, отпуск не использован",
    origen: { tipo: "recalculado", url: TK, detalle: "Статьи 79 и 95: 28 / 12 × 7 = 16,33 → 16 дней; 150 000 / 3 / 29,6 = 1689,19; × 16 = 27 027,04." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, mesyatsev: 7, ispolzovano: 0, dneyOtpuska: 28 },
    esperado: { kompensatsiya: 27027.04, neispolzovano: 16, zarabotano: 16, sredniy: 1689.19 },
  },
  {
    nombre: "9 месяцев, 10 дней уже использовано",
    origen: { tipo: "recalculado", url: TK, detalle: "28 / 12 × 9 = 21 день; 21 − 10 = 11; 11 × 1689,19 = 18 581,09." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, mesyatsev: 9, ispolzovano: 10, dneyOtpuska: 28 },
    esperado: { neispolzovano: 11, kompensatsiya: 18581.09 },
  },
  {
    nombre: "Округление 0,5 дня вверх",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 79, часть 2: 30 / 12 × 3 = 7,5 → 8 дней." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, mesyatsev: 3, ispolzovano: 0, dneyOtpuska: 30 },
    esperado: { zarabotano: 8 },
  },
  {
    nombre: "Отпуск меньше 28 дней",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 68: основной отпуск 28 календарных дней." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, mesyatsev: 7, ispolzovano: 0, dneyOtpuska: 24 },
    esperaError: true,
  },
]);
