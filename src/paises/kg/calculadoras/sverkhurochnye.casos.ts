import { definirCasos } from "@/motor/calculo";
import sverkhurochnye from "./sverkhurochnye";

const TK = "https://cbd.minjust.gov.kg/3-45/edition/57548/ru";

export default definirCasos(sverkhurochnye, [
  {
    nombre: "4 дня по 3 часа и 8 часов в выходной",
    origen: {
      tipo: "recalculado",
      url: TK,
      detalle: "Статьи 108 и 109: ставка 50 400 / 168 = 300. Сверхурочные 4 × (2 × 1,5 + 1 × 2) × 300 = 6000. Выходной 8 × 2 × 300 = 4800. Всего 10 800.",
    },
    fecha: "2026-10-27",
    entrada: { oklad: 50400, norma: 168, dney: 4, chasovVDen: 3, vykhodnye: 8 },
    esperado: { doplata: 10800, zaSverkhurochnye: 6000, zaVykhodnye: 4800, stavkaChasa: 300, chasov: 12 },
  },
  {
    nombre: "2 часа в день: только полуторный размер",
    origen: { tipo: "recalculado", url: TK, detalle: "5 × 2 × 1,5 × 300 = 4500." },
    fecha: "2026-10-27",
    entrada: { oklad: 50400, norma: 168, dney: 5, chasovVDen: 2, vykhodnye: 0 },
    esperado: { doplata: 4500 },
  },
  {
    nombre: "Оклад ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Оклад должен быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { oklad: 0, norma: 168, dney: 1, chasovVDen: 1, vykhodnye: 0 },
    esperaError: true,
  },
]);
