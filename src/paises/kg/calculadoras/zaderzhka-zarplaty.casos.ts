import { definirCasos } from "@/motor/calculo";
import zaderzhkaZarplaty from "./zaderzhka-zarplaty";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(zaderzhkaZarplaty, [
  {
    nombre: "50 000 сомов, 10 дней",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 95, часть 4: 0,25 % за каждый просроченный календарный день. 50 000 × 0,25 % × 10 = 1250." },
    fecha: "2026-10-27",
    entrada: { summa: 50000, dney: 10 },
    esperado: { kompensatsiya: 1250, zaDen: 125, vsego: 51250 },
  },
  {
    nombre: "Сумма ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Сумма должна быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { summa: 0, dney: 10 },
    esperaError: true,
  },
]);
