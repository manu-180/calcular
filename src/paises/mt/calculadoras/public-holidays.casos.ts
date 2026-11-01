import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holidays";

export default definirCasos(calculadora, [
  {
    nombre: "2026",
    origen: {
      tipo: "recalculado",
      detalle: "Cap. 252: 5 national and 9 public holidays. In 2026, 7 June and 13 December are Sundays and 15 August a Saturday. Leave 192 + 3 × 8 = 216 hours (S.L. 452.87, reg. 8).",
    },
    fecha: "2026-10-26",
    entrada: { anio: 2026 },
    esperado: { total: 14, finde: 3, semana: 11, licencia: 216 },
  },
  {
    nombre: "2028",
    origen: {
      tipo: "recalculado",
      detalle: "In 2028 (a leap year) New Year's Day is a Saturday and St Joseph, 19 March, a Sunday. The other twelve fall on weekdays: Good Friday is 14 April, 15 August a Tuesday, 13 December a Wednesday and Christmas a Monday.",
    },
    fecha: "2026-10-26",
    entrada: { anio: 2028 },
    esperado: { total: 14, finde: 2 },
  },
]);
