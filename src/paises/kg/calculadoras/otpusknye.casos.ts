import { definirCasos } from "@/motor/calculo";
import otpusknye from "./otpusknye";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(otpusknye, [
  {
    nombre: "28 дней при зарплате 50 000 сомов",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 95, часть 5: 150 000 / 3 / 29,6 = 1689,19 в день; × 28 = 47 297,32." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, dney: 28 },
    esperado: { otpusknye: 47297.32, sredniy: 1689.19, polozheno: 28 },
  },
  {
    nombre: "14 дней",
    origen: { tipo: "recalculado", url: TK, detalle: "90 000 / 3 / 29,6 = 1013,51; × 14 = 14 189,14." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 90000, dney: 14 },
    esperado: { otpusknye: 14189.14 },
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 0, dney: 28 },
    esperaError: true,
  },
]);
