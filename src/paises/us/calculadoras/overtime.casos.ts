import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime";

export default definirCasos(calculadora, [
  {
    nombre: "45 hours at $20 an hour",
    origen: { tipo: "recalculado", url: "https://www.dol.gov/agencies/whd/overtime", detalle: "40 x 20 = 800. 5 x 30 = 150. Total 950. Premium 5 x 10 = 50." },
    fecha: "2026-10-14",
    entrada: { tarifa: 20, horas: 45 },
    esperado: { regulares: 40, extra: 5, tarifaExtra: 30, pagoRegular: 800, pagoExtra: 150, total: 950, prima: 50 },
  },
  {
    nombre: "No overtime at 38 hours",
    origen: { tipo: "recalculado", detalle: "38 x 17.50 = 665." },
    fecha: "2026-10-14",
    entrada: { tarifa: 17.5, horas: 38 },
    esperado: { extra: 0, pagoExtra: 0, total: 665, prima: 0 },
  },
  {
    nombre: "Odd rate with half an hour of overtime",
    origen: { tipo: "recalculado", detalle: "15.33 x 1.5 = 22.995, shown as 23.00. 40 x 15.33 = 613.20. 0.5 x 22.995 = 11.4975, rounded 11.50. Total 624.70." },
    fecha: "2026-10-14",
    entrada: { tarifa: 15.33, horas: 40.5 },
    esperado: { tarifaExtra: 23, pagoRegular: 613.2, pagoExtra: 11.5, total: 624.7 },
  },
]);
