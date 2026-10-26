import { definirCasos } from "@/motor/calculo";
import sverkhurochnye from "./sverkhurochnye";

const TK = "https://adilet.zan.kz/rus/docs/K1500000414";

export default definirCasos(sverkhurochnye, [
  {
    nombre: "10 часов сверхурочно при окладе 500 000 и норме 168 часов",
    origen: { tipo: "recalculado", url: TK, detalle: "Статья 108: 500 000 / 168 × 10 × 1,5 = 44 642,86. Часовая ставка 2976,19." },
    fecha: "2026-10-24",
    entrada: { oklad: 500000, normaChasov: 168, chasy: 10, koeffitsient: 1.5 },
    esperado: { doplata: 44642.86, stavkaChasa: 2976.19, itogo: 544642.86 },
  },
  {
    nombre: "Двойная оплата по коллективному договору",
    origen: { tipo: "recalculado", url: TK, detalle: "400 000 / 160 × 8 × 2 = 40 000." },
    fecha: "2026-10-24",
    entrada: { oklad: 400000, normaChasov: 160, chasy: 8, koeffitsient: 2 },
    esperado: { doplata: 40000 },
  },
  {
    nombre: "Коэффициент меньше полуторного",
    origen: { tipo: "recalculado", url: TK, detalle: "Ниже 1,5 договор установить не может." },
    fecha: "2026-10-24",
    entrada: { oklad: 400000, normaChasov: 160, chasy: 8, koeffitsient: 1.2 },
    esperaError: true,
  },
]);
