import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Default split, due 15 March 2027",
    origen: {
      tipo: "recalculado",
      detalle: "S.L. 452.91, reg. 6: 18 weeks; 4 before the expected date and the other 14 after. Starts 15 February 2027, ends 20 June 2027. Reg. 7: 14 weeks on full wages, 14 × 400 = 5,600.",
    },
    fecha: "2026-10-26",
    entrada: { parto: "2027-03-15", extraAntes: 0, semanal: 400 },
    esperado: { total: 18, empieza: "2027-02-15", termina: "2027-06-20", antes: 4, despues: 14, pagadas: 14, sinSueldo: 4, pago: 5600 },
  },
  {
    nombre: "All eight free weeks before the birth",
    origen: { tipo: "recalculado", detalle: "12 weeks before and the compulsory 6 after. Starts 21 December 2026, ends 25 April 2027." },
    fecha: "2026-10-26",
    entrada: { parto: "2027-03-15", extraAntes: 8, semanal: null },
    esperado: { antes: 12, despues: 6, empieza: "2026-12-21", termina: "2027-04-25" },
  },
  {
    nombre: "Too many weeks before",
    origen: { tipo: "recalculado", detalle: "Only 8 weeks can be moved: 18 − 4 − 6." },
    fecha: "2026-10-26",
    entrada: { parto: "2027-03-15", extraAntes: 9, semanal: null },
    esperaError: true,
  },
]);
