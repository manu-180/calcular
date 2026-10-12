import { definirCasos } from "@/motor/calculo";
import maternidad from "./maternidad";

export default definirCasos(maternidad, [
  {
    nombre: "Parto probable el 15 de diciembre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "CT art. 135: 4 semanas antes (28 días) y 6 después (42 días). Inicio 17/11/2026, fin 26/01/2027. Art. 141: 15000 / 30 = 500; 500 × 70 = 35000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 15000, fechaParto: "2026-12-15" },
    esperado: { inicio: "2026-11-17", fin: "2027-01-26", dias: 70, diario: 500, total: 35000 },
  },
  {
    nombre: "Salario mínimo de comercio de 1 a 10 trabajadores",
    origen: { tipo: "recalculado", detalle: "13292.06 / 30 = 443.0687; × 70 = 31014.81." },
    fecha: "2026-10-12",
    entrada: { salario: 13292.06, fechaParto: "2027-03-01" },
    esperado: { inicio: "2027-02-01", dias: 70, total: 31014.81 },
  },
]);
