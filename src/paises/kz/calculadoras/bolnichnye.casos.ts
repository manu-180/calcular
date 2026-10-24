import { definirCasos } from "@/motor/calculo";
import bolnichnye from "./bolnichnye";

const TK = "https://adilet.zan.kz/rus/docs/K1500000414";

export default definirCasos(bolnichnye, [
  {
    nombre: "3 млн тенге за год, 5 рабочих дней болезни",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 133, пункт 4-1: 3 000 000 / 247 = 12 145,75; × 5 = 60 728,75. Предел 25 × 4325 = 108 125 не достигнут." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 3000000, dneyRaboty: 247, dneyBolezni: 5 },
    esperado: { sredniy: 12145.75, posobie: 60728.75, limit: 108125 },
  },
  {
    nombre: "Высокая зарплата: пособие ограничено 25 МРП",
    origen: { tipo: "recalculado", url: TK, detalle: "6 000 000 / 247 = 24 291,50; × 5 = 121 457,50, но не больше 108 125." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 6000000, dneyRaboty: 247, dneyBolezni: 5 },
    esperado: { raschetnoe: 121457.5, posobie: 108125 },
  },
  {
    nombre: "Без заработка",
    origen: { tipo: "recalculado", url: TK, detalle: "Нужна зарплата за расчетный период." },
    fecha: "2026-10-24",
    entrada: { zarabotok: 0, dneyRaboty: 247, dneyBolezni: 5 },
    esperaError: true,
  },
]);
