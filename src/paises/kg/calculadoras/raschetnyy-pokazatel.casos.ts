import { definirCasos } from "@/motor/calculo";
import raschetnyyPokazatel from "./raschetnyy-pokazatel";

const RP = "https://cbd.minjust.gov.kg/6-2385/edition/319737/ru";

export default definirCasos(raschetnyyPokazatel, [
  {
    nombre: "Персональный вычет 6,5 расчетного показателя",
    origen: { tipo: "oficial", url: RP, detalle: "Постановление № 1115-III: расчетный показатель 100 сомов. 6,5 × 100 = 650." },
    fecha: "2026-10-27",
    entrada: { napravlenie: "v-somy", kolichestvo: 6.5 },
    esperado: { somy: 650, rp: 100 },
  },
  {
    nombre: "Штраф 7500 сомов в расчетных показателях",
    origen: { tipo: "recalculado", url: RP, detalle: "7500 / 100 = 75." },
    fecha: "2026-10-27",
    entrada: { napravlenie: "v-rp", kolichestvo: 7500 },
    esperado: { pokazateli: 75, somy: 7500 },
  },
  {
    nombre: "Ноль",
    origen: { tipo: "recalculado", url: RP, detalle: "Количество должно быть больше нуля." },
    fecha: "2026-10-27",
    entrada: { napravlenie: "v-somy", kolichestvo: 0 },
    esperaError: true,
  },
]);
