import { definirCasos } from "@/motor/calculo";
import otpusknye from "./otpusknye";

const PRAVILA = "https://adilet.zan.kz/rus/docs/V1500012533";

export default definirCasos(otpusknye, [
  {
    nombre: "6 млн тенге за год, 247 рабочих дней, отпуск на 20 рабочих дней",
    origen: {
      tipo: "recalculado",
      url: PRAVILA,
      detalle: "Единые правила, пункты 7 и 8: средний дневной заработок 6 000 000 / 247 = 24 291,50; отпускные 24 291,50 × 20 = 485 830.",
    },
    fecha: "2026-10-24",
    entrada: { zarabotok: 6000000, dneyRaboty: 247, dneyOtpuska: 20 },
    esperado: { sredniy: 24291.5, otpusknye: 485830, polozheno: 24 },
  },
  {
    nombre: "Неполный период: 1,2 млн тенге за 60 рабочих дней, отпуск 10 дней",
    origen: { tipo: "recalculado", url: PRAVILA, detalle: "Пункт 9: 1 200 000 / 60 = 20 000; × 10 = 200 000." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 1200000, dneyRaboty: 60, dneyOtpuska: 10 },
    esperado: { sredniy: 20000, otpusknye: 200000 },
  },
  {
    nombre: "Без заработка",
    origen: { tipo: "recalculado", url: PRAVILA, detalle: "Нужна сумма зарплаты за расчетный период." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 0, dneyRaboty: 247, dneyOtpuska: 20 },
    esperaError: true,
  },
]);
