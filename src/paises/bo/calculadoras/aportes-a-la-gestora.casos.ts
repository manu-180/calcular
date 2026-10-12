import { definirCasos } from "@/motor/calculo";
import aportesALaGestora from "./aportes-a-la-gestora";

const SIP = "https://media.economiayfinanzas.gob.bo/sites/default/files/2025-10/Bolet%C3%ADn%20SIP_diciembre%202024.pdf" as const;

export default definirCasos(aportesALaGestora, [
  {
    nombre: "Dependiente con el salario mínimo",
    origen: { tipo: "recalculado", url: SIP, detalle: "Cuadro 3: asegurado 12,71 % = 419,43; patronal 3,5 % + 1,71 % = 115,50 + 56,43 = 171,93. Total 591,36." },
    fecha: "2026-10-12",
    entrada: { tipo: "dependiente", monto: 3300 },
    esperado: { base: 3300, asegurado: 419.43, nacionalSolidario: 0, patronal: 171.93, total: 591.36 },
  },
  {
    nombre: "Independiente bajo el mínimo",
    origen: { tipo: "recalculado", url: SIP, detalle: "Base mínima 1 salario mínimo (3.300). 14,42 %: 330 + 56,43 + 56,43 + 16,50 + 16,50 = 475,86." },
    fecha: "2026-10-12",
    entrada: { tipo: "independiente", monto: 3000 },
    esperado: { base: 3300, asegurado: 475.86, nacionalSolidario: 0, patronal: 0, total: 475.86 },
  },
  {
    nombre: "Independiente sobre el tope de 60 salarios mínimos",
    origen: {
      tipo: "recalculado",
      url: SIP,
      detalle: "Tope 60 × 3.300 = 198.000. 14,42 %: 19.800 + 3.385,80 + 3.385,80 + 990 + 990 = 28.551,60. ANS: 1,15 % × 185.000 + 5,74 % × 173.000 + 11,48 % × 163.000 = 2.127,50 + 9.930,20 + 18.712,40 = 30.770,10.",
    },
    fecha: "2026-10-12",
    entrada: { tipo: "independiente", monto: 250000 },
    esperado: { base: 198000, asegurado: 28551.6, nacionalSolidario: 30770.1, total: 59321.7 },
  },
  {
    nombre: "Dependiente con Aporte Nacional Solidario",
    origen: { tipo: "recalculado", detalle: "15.000: asegurado 1.906,50; ANS 1,15 % × 2.000 = 23; patronal 525 + 256,50 = 781,50. Total 2.711." },
    fecha: "2026-10-12",
    entrada: { tipo: "dependiente", monto: 15000 },
    esperado: { asegurado: 1906.5, nacionalSolidario: 23, patronal: 781.5, total: 2711 },
  },
]);
