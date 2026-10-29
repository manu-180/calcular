import { definirCasos } from "@/motor/calculo";
import kalkulyatorInflyatsii from "./kalkulyator-inflyatsii";

const STAT = "https://www.stat.gov.kg/ru/statistics/download/operational/337/";

export default definirCasos(kalkulyatorInflyatsii, [
  {
    nombre: "Сентябрь 2025 года к сентябрю 2026 года",
    origen: { tipo: "oficial", url: STAT, detalle: "ИПЦ Нацстаткома (2005 = 100): 502,5416 / 448,0415 = 1,121641. 100 000 сомов → 112 164,07." },
    fecha: "2026-10-27",
    entrada: { summa: 100000, s: "2025-09-01", po: "2026-09-15" },
    esperado: { segodnya: 112164.07, raznitsa: 12164.07, mesyatsS: "сентябрь 2025", mesyatsPo: "сентябрь 2026" },
    tolerancia: 0.05,
  },
  {
    nombre: "Январь 2020 года по последние данные",
    origen: { tipo: "oficial", url: STAT, detalle: "502,5416 / 267,9758 = 1,875325; 100 000 → 187 532,46; покупательная способность 53 324,10." },
    fecha: "2026-10-27",
    entrada: { summa: 100000, s: "2020-01-01", po: "2026-10-27" },
    esperado: { segodnya: 187532.46, pokupatelnaya: 53324.1, mesyatsPo: "сентябрь 2026" },
    tolerancia: 0.05,
  },
  {
    nombre: "Конечный месяц раньше начального",
    origen: { tipo: "oficial", url: STAT, detalle: "Начальный месяц должен быть раньше конечного." },
    fecha: "2026-10-27",
    entrada: { summa: 100000, s: "2024-05-01", po: "2023-05-01" },
    esperaError: true,
  },
]);
