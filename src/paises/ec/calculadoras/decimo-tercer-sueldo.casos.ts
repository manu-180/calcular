import { definirCasos } from "@/motor/calculo";
import decimoTercero from "./decimo-tercer-sueldo";

export default definirCasos(decimoTercero, [
  {
    nombre: "Sueldo fijo de $800 todo el período",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 111 del Código del Trabajo: la doceava parte de lo percibido en el período (1/12 al 30/11, Acuerdo MDT-2015-0087). 800 × 12 / 12 = 800.",
    },
    fecha: "2026-12-01",
    entrada: { sueldo: 800, meses: 12, extras: 0 },
    esperado: { total: 9600, decimo: 800, mensual: 66.67 },
  },
  {
    nombre: "Salario básico, 7,5 meses y $150 de horas extra",
    origen: {
      tipo: "recalculado",
      detalle: "482 × 7,5 + 150 = 3.765. 3.765 / 12 = 313,75.",
    },
    fecha: "2026-12-01",
    entrada: { sueldo: 482, meses: 7.5, extras: 150 },
    esperado: { total: 3765, decimo: 313.75 },
  },
  {
    nombre: "Más de 12 meses",
    origen: { tipo: "recalculado", detalle: "El período tiene 12 meses: tiene que dar error." },
    fecha: "2026-12-01",
    entrada: { sueldo: 482, meses: 13, extras: 0 },
    esperaError: true,
  },
]);
