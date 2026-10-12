import { definirCasos } from "@/motor/calculo";
import subsidioPrenatalYLactancia from "./subsidio-prenatal-y-lactancia";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(subsidioPrenatalYLactancia, [
  {
    nombre: "Embarazo completo, un hijo",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. XIX: Bs 2.000 cada subsidio. Prenatal 5 × 2.000 = 10.000; natalidad 2.000; lactancia 12 × 2.000 = 24.000. Total 36.000." },
    fecha: "2026-10-12",
    entrada: { mesesPrenatal: 5, hijos: 1 },
    esperado: { prenatal: 10000, natalidad: 2000, lactancia: 24000, total: 36000 },
  },
  {
    nombre: "Mellizos con tres meses de prenatal",
    origen: { tipo: "recalculado", detalle: "Prenatal 3 × 2.000 = 6.000 (es uno por embarazo); natalidad y lactancia por cada hijo: 4.000 y 48.000. Total 58.000." },
    fecha: "2026-10-12",
    entrada: { mesesPrenatal: 3, hijos: 2 },
    esperado: { prenatal: 6000, natalidad: 4000, lactancia: 48000, total: 58000 },
  },
]);
