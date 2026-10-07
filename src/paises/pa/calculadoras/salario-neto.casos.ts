import { definirCasos } from "@/motor/calculo";
import salarioNeto from "./salario-neto";

export default definirCasos(salarioNeto, [
  {
    nombre: "Salario de B/. 1,500",
    origen: {
      tipo: "recalculado",
      detalle: "CSS 9.75% = 146.25. Seguro educativo 1.25% = 18.75. Renta anual 1,500 × 13 = 19,500; (19,500 − 11,000) × 15% = 1,275 ÷ 13 = 98.08. Neto 1,236.92.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 1500 },
    esperado: { css: 146.25, seguroEducativo: 18.75, isr: 98.08, neto: 1236.92, quincena: 618.46 },
  },
  {
    nombre: "Salario exento de renta",
    origen: { tipo: "recalculado", detalle: "800 × 13 = 10,400, por debajo de 11,000: sin renta. CSS 78, seguro educativo 10. Neto 712." },
    fecha: "2026-10-07",
    entrada: { salario: 800 },
    esperado: { css: 78, seguroEducativo: 10, isr: 0, neto: 712, quincena: 356 },
  },
  {
    nombre: "Salario en el último tramo",
    origen: {
      tipo: "recalculado",
      detalle: "5,000 × 13 = 65,000. 5,850 + 15,000 × 25% = 9,600 ÷ 13 = 738.46. CSS 487.50, seguro educativo 62.50. Neto 3,711.54.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 5000 },
    esperado: { css: 487.5, seguroEducativo: 62.5, isr: 738.46, neto: 3711.54 },
  },
]);
