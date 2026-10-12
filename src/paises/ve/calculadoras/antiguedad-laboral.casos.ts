import { definirCasos } from "@/motor/calculo";
import antiguedad from "./antiguedad-laboral";

export default definirCasos(antiguedad, [
  {
    nombre: "Siete años justos",
    origen: {
      tipo: "recalculado",
      detalle:
        "LOTTT arts. 142, 190 y 192. Del 01/01/2020 al 31/12/2026: 7 años. Próximo aniversario, el 8.º: 15 + 7 = 22 días de vacaciones y 22 de bono. Garantía: 28 trimestres × 15 = 420 + adicionales 2+4+6+8+10+12 = 42; total 462. Retroactivo 7 × 30 = 210.",
    },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2020-01-01", fechaSalida: "2026-12-31" },
    esperado: { tiempo: "7 años", anios: 7, mesesTotales: 84, diasVacaciones: 22, diasBono: 22, diasGarantia: 462, diasRetroactivo: 210 },
  },
  {
    nombre: "Dos meses: sin garantía, 5 días por mes",
    origen: { tipo: "recalculado", detalle: "Art. 142 e: menos de tres meses, 5 días por mes. Próximo aniversario, el 1.º: 15 y 15." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-07-01", fechaSalida: "2026-08-31" },
    esperado: { anios: 0, mesesTotales: 2, diasVacaciones: 15, diasBono: 15, diasGarantia: null, diasRetroactivo: 10 },
  },
  {
    nombre: "Treinta años: topes de vacaciones y bono",
    origen: { tipo: "recalculado", detalle: "Año 31: vacaciones 15 + 15 (tope) = 30; bono 30 (tope)." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "1996-01-01", fechaSalida: "2025-12-31" },
    esperado: { anios: 30, diasVacaciones: 30, diasBono: 30, diasRetroactivo: 900 },
  },
]);
