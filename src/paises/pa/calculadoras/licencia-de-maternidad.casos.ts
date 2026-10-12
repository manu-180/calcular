import { definirCasos } from "@/motor/calculo";
import licenciaDeMaternidad from "./licencia-de-maternidad";

export default definirCasos(licenciaDeMaternidad, [
  {
    nombre: "Parto probable el 15 de marzo de 2027",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 107: seis semanas antes (42 días: 1/2/2027) y ocho después (56 días: regreso el 10/5/2027). Semanal 1,300 × 12 ÷ 52 = 300 × 14 = 4,200.",
    },
    fecha: "2026-10-12",
    entrada: { fechaParto: "2027-03-15", salario: 1300, promedio: null },
    esperado: { inicio: "2027-02-01", ultimoDia: "2027-05-09", regreso: "2027-05-10", semanas: 14, salarioSemanal: 300, total: 4200 },
  },
  {
    nombre: "Promedio de 180 días más alto que el último salario",
    origen: { tipo: "recalculado", detalle: "Art. 111: se usa el mayor. 1,560 × 12 ÷ 52 = 360 × 14 = 5,040." },
    fecha: "2026-10-12",
    entrada: { fechaParto: "2026-12-01", salario: 1300, promedio: 1560 },
    esperado: { inicio: "2026-10-20", regreso: "2027-01-26", salarioSemanal: 360, total: 5040 },
  },
]);
