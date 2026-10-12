import { definirCasos } from "@/motor/calculo";
import seguroSocialIndependientes from "./seguro-social-independientes";

export default definirCasos(seguroSocialIndependientes, [
  {
    nombre: "B/. 1,000 con enfermedad y maternidad",
    origen: { tipo: "recalculado", detalle: "Ley 462, art. 101, num. 3: 9.36% = 93.60 y 8.5% = 85. Total 178.60; al año 2,143.20." },
    fecha: "2026-10-12",
    entrada: { ingreso: 1000, salud: true },
    esperado: { ivm: 93.6, salud: 85, mensual: 178.6, anual: 2143.2 },
  },
  {
    nombre: "Solo la cuota obligatoria",
    origen: { tipo: "recalculado", detalle: "1,500 × 9.36% = 140.40." },
    fecha: "2026-10-12",
    entrada: { ingreso: 1500, salud: false },
    esperado: { ivm: 140.4, salud: 0, mensual: 140.4 },
  },
]);
