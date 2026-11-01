import { definirCasos } from "@/motor/calculo";
import minimalnayaZarplata from "./minimalnaya-zarplata";

const UKAZ = "https://www.president.tj/event/news/54680";

export default definirCasos(minimalnayaZarplata, [
  {
    nombre: "Полный месяц после 1 сентября 2026 года",
    origen: { tipo: "recalculado", url: UKAZ, detalle: "Указ № 1132: 1300 сомони." },
    fecha: "2026-10-31",
    entrada: {"dolya": 100, "zarplata": 2000},
    esperado: {"minimum": 1300, "mzp": 1300, "raznitsa": 700},
  },
  {
    nombre: "Половина нормы",
    origen: { tipo: "recalculado", url: UKAZ, detalle: "1300 × 50 % = 650. 600 - 650 = -50." },
    fecha: "2026-10-31",
    entrada: {"dolya": 50, "zarplata": 600},
    esperado: {"minimum": 650, "raznitsa": -50},
  },
  {
    nombre: "Август 2026 года, прежний минимум",
    origen: { tipo: "recalculado", url: UKAZ, detalle: "1000 сомони до 31.08.2026." },
    fecha: "2026-08-15",
    entrada: {"dolya": 100, "zarplata": 1000},
    esperado: {"minimum": 1000, "raznitsa": 0},
  },
  {
    nombre: "Доля ноль",
    origen: { tipo: "recalculado", url: UKAZ, detalle: "Доля должна быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"dolya": 0, "zarplata": 1000},
    esperaError: true,
  },
]);
