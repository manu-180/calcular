import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Seis años de antigüedad",
    origen: {
      tipo: "recalculado",
      url: "https://www.dnit.gov.py/web/portal-institucional/w/m-ley-n-496-94",
      detalle: "Art. 218 (Ley 496): más de 5 y hasta 10 años, 18 días. 4.500.000 / 30 × 18 = 2.700.000.",
    },
    fecha: "2026-08-03",
    entrada: { salario: 4500000, ingreso: "2020-03-02", fecha: "2026-08-03" },
    esperado: { anios: 6, dias: 18, monto: 2700000 },
  },
  {
    nombre: "Cinco años justos: todavía 12 días, con piso del mínimo",
    origen: { tipo: "recalculado", detalle: "5 años cumplidos: hasta 5, 12 días. Art. 220: salario 2.000.000 menor al mínimo, se usa 3.044.000. 3.044.000 / 30 × 12 = 1.217.600." },
    fecha: "2026-07-06",
    entrada: { salario: 2000000, ingreso: "2021-07-05", fecha: "2026-07-06" },
    esperado: { anios: 5, dias: 12, monto: 1217600 },
  },
  {
    nombre: "Primer día del mínimo nuevo",
    origen: { tipo: "recalculado", detalle: "1/7/2026 rige el mínimo de 3.044.000 (Decreto 6.225/2026). Salario de 2.000.000: se usa el mínimo. 3.044.000 / 30 × 12 = 1.217.600." },
    fecha: "2026-07-01",
    entrada: { salario: 2000000, ingreso: "2024-06-01", fecha: "2026-07-01" },
    esperado: { anios: 2, dias: 12, monto: 1217600 },
  },
  {
    nombre: "Más de diez años",
    origen: { tipo: "recalculado", detalle: "11 años: más de 10, 30 días. 6.000.000 / 30 × 30 = 6.000.000." },
    fecha: "2026-10-05",
    entrada: { salario: 6000000, ingreso: "2015-09-01", fecha: "2026-10-05" },
    esperado: { anios: 11, dias: 30, monto: 6000000 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Las vacaciones se ganan al cumplir el año (art. 218)." },
    fecha: "2026-10-05",
    entrada: { salario: 3500000, ingreso: "2026-02-01", fecha: "2026-10-05" },
    esperado: { anios: 0, dias: 0, monto: 0 },
  },
]);
