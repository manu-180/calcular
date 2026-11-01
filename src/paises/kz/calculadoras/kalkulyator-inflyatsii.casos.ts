import { definirCasos } from "@/motor/calculo";
import kalkulyatorInflyatsii from "./kalkulyator-inflyatsii";

const STAT = "https://stat.gov.kz/ru/industries/economy/prices/dynamic-tables/";

export default definirCasos(kalkulyatorInflyatsii, [
  {
    nombre: "Сентябрь 2025 года к сентябрю 2026 года",
    origen: {
      tipo: "oficial",
      url: STAT,
      detalle: "Цепной индекс по месячным ИПЦ Бюро: 478,3591 / 437,3421 = 1,093787 (Бюро публикует 109,3 % к сентябрю 2025 года). 100 000 тенге → 109 378,70.",
    },
    fecha: "2026-10-24",
    entrada: { summa: 100000, s: "2025-09-01", po: "2026-09-15" },
    esperado: { segodnya: 109378.7, raznitsa: 9378.7, mesyatsS: "сентябрь 2025", mesyatsPo: "сентябрь 2026" },
    tolerancia: 0.05,
  },
  {
    nombre: "Январь 2020 года по последние данные",
    origen: { tipo: "oficial", url: STAT, detalle: "478,3591 / 238,4767 = 2,005894; 100 000 → 200 589,45; покупательная способность 49 853,07." },
    fecha: "2026-10-24",
    entrada: { summa: 100000, s: "2020-01-01", po: "2026-10-24" },
    esperado: { segodnya: 200589.45, pokupatelnaya: 49853.07, mesyatsPo: "сентябрь 2026" },
    tolerancia: 0.05,
  },
  {
    nombre: "Месяц раньше начала данных",
    origen: { tipo: "oficial", url: STAT, detalle: "Ряд начинается с декабря 2007 года." },
    fecha: "2026-10-24",
    entrada: { summa: 100000, s: "2007-12-01", po: "2007-11-01" },
    esperaError: true,
  },
]);
