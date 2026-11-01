import { definirCasos } from "@/motor/calculo";
import sverkhurochnye from "./sverkhurochnye";

const TK = "https://ncz.tj/content/%D1%82%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81-%D1%80%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8-%D1%82%D0%B0%D0%B4%D0%B6%D0%B8%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD";

export default definirCasos(sverkhurochnye, [
  {
    nombre: "10 часов при окладе 5000 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "40 × 52 / 12 = 173,33 часа. 5000 / 173,33 = 28,85. Ст. 154: 28,85 × 10 × 2 = 577." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "chasy": 10},
    esperado: {"doplata": 577, "stavkaChasa": 28.85, "mnozhitel": 2},
  },
  {
    nombre: "5 часов при окладе 1300 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "1300 / 173,33 = 7,50. 7,50 × 5 × 2 = 75." },
    fecha: "2026-10-31",
    entrada: {"oklad": 1300, "chasy": 5},
    esperado: {"doplata": 75, "stavkaChasa": 7.5},
  },
  {
    nombre: "15 часов в месяц: сверх предела в темпе за год",
    origen: { tipo: "recalculado", url: TK, detalle: "15 × 12 = 180 часов больше 120, расчет с предупреждением." },
    fecha: "2026-10-31",
    entrada: {"oklad": 5000, "chasy": 15},
    esperado: {"doplata": 865.5},
  },
  {
    nombre: "Оклад ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Оклад должен быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"oklad": 0, "chasy": 10},
    esperaError: true,
  },
]);
