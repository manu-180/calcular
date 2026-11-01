import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Whole-time 40 hours, 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "S.L. 452.87, reg. 8(1): 4 weeks and 32 hours on a 40-hour week = 192 hours. In 2026 Sette Giugno (Sunday 7 June), the Assumption (Saturday 15 August) and Republic Day (Sunday 13 December) fall on a weekend: 3 × 8 = 24 hours more. Total 216 hours, 27 days.",
    },
    fecha: "2026-10-26",
    entrada: { horas: 40, dias: 5, meses: 12, completo: true },
    esperado: { total: 216, diasLibres: 27, base: 192, extra: 24, feriados: 3 },
  },
  {
    nombre: "Part-time 20 hours over four days",
    origen: { tipo: "recalculado", detalle: "Reg. 8(1) third proviso and S.L. 452.79, reg. 7: 192 × 20 / 40 = 96 hours; 5-hour days, so 19.2 days. No weekend holiday days, which are for whole-time employees." },
    fecha: "2026-10-26",
    entrada: { horas: 20, dias: 4, meses: 12, completo: false },
    esperado: { total: 96, diasLibres: 19.2, extra: 0 },
  },
  {
    nombre: "Whole-time, six months in 2026",
    origen: { tipo: "recalculado", detalle: "Reg. 8(4): (192 + 24) × 6 / 12 = 108 hours." },
    fecha: "2026-10-26",
    entrada: { horas: 40, dias: 5, meses: 6, completo: true },
    esperado: { total: 108 },
  },
  {
    nombre: "Whole-time 40 hours, 2027",
    origen: {
      tipo: "recalculado",
      detalle: "In 2027 New Year's Day is a Friday; St Joseph Friday, Freedom Day Wednesday, Good Friday 26 March, Workers' Day Saturday, Sette Giugno Monday, St Peter and St Paul Tuesday, Assumption Sunday, Victory Day Wednesday, Independence Day Tuesday, Immaculate Conception Wednesday, Republic Day Monday, Christmas Saturday, St Paul's Shipwreck Wednesday. Three on a weekend: 192 + 24 = 216.",
    },
    fecha: "2027-03-01",
    entrada: { horas: 40, dias: 5, meses: 12, completo: true },
    esperado: { total: 216, feriados: 3 },
  },
]);
