import { definirCasos } from "@/motor/calculo";
import dekretnye from "./dekretnye";

const POL = "https://cbd.minjust.gov.kg/12601/edition/52189/ru";
const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(dekretnye, [
  {
    nombre: "Зарплата 50 000 сомов, обычные роды",
    origen: { tipo: "recalculado", url: POL, detalle: "Пункт 63: 150 000 / 63 = 2380,95 × 10 = 23 809,50 от работодателя; дальше 20 × 100 = 2000 сомов в месяц. Отпуск 70 + 56 = 126 дней." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 150000, rabDney3: 63, rody: "obychnye" },
    esperado: { otRabotodatelya: 23809.5, ezhemesyachno: 2000, sredniy: 2380.95, otpusk: 126 },
  },
  {
    nombre: "Рождение двоих детей",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 148: 70 дней до родов и 70 после при рождении двух и более детей." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 90000, rabDney3: 60, rody: "dvoe" },
    esperado: { otpusk: 140, otRabotodatelya: 15000 },
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: POL, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 0, rabDney3: 63, rody: "obychnye" },
    esperaError: true,
  },
]);
