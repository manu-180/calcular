import { definirCasos } from "@/motor/calculo";
import antiguedadLaboral from "./antiguedad-laboral";

export default definirCasos(antiguedadLaboral, [
  {
    nombre: "Del 1/03/2020 al 12/10/2026",
    origen: { tipo: "recalculado", detalle: "6 años completos y 226 días: 6.62 años; 2417 días contando los dos extremos. LFT art. 76: 22 días al sexto y al séptimo año. Prima: 12 × 6.6192 = 79.43 días." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2020-03-01", salida: "2026-10-12" },
    esperado: { aniosCompletos: 6, diasDesdeAniversario: 226, anios: 6.62, dias: 2417, vacaciones: 22, vacacionesSiguiente: 22, diasPrima: 79.43 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Del 1/01/2026 al 30/06/2026: 181 días, sin vacaciones ganadas todavía; al cumplir el año, 12." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2026-01-01", salida: "2026-06-30" },
    esperado: { aniosCompletos: 0, dias: 181, vacaciones: 0, vacacionesSiguiente: 12 },
  },
  {
    nombre: "Salida antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas al revés." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2026-06-30", salida: "2026-01-01" },
    esperaError: true,
  },
]);
