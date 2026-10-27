import { definirCasos } from "@/motor/calculo";
import vykhodnoePosobie from "./vykhodnoe-posobie";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(vykhodnoePosobie, [
  {
    nombre: "Сокращение штата",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 47, часть 1: не ниже двух среднемесячных заработков. 600 000 / 12 = 50 000; × 2 = 100 000." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 600000, osnovanie: "sokrashchenie" },
    esperado: { posobie: 100000, sredniy: 50000, mesyatsev: 2 },
  },
  {
    nombre: "Призыв на военную службу",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 47, часть 2: один среднемесячный заработок. 50 000." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 600000, osnovanie: "prizyv" },
    esperado: { posobie: 50000, mesyatsev: 1 },
  },
  {
    nombre: "Зарплата ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Зарплата должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { zarabotok: 0, osnovanie: "likvidatsiya" },
    esperaError: true,
  },
]);
