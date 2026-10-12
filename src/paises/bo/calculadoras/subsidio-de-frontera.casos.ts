import { definirCasos } from "@/motor/calculo";
import subsidioDeFrontera from "./subsidio-de-frontera";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(subsidioDeFrontera, [
  {
    nombre: "Salario mínimo en zona de frontera",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. VIII: Haber Básico × 20 %. 3.300 × 20 % = 660; total 3.960." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 3300, enFrontera: true },
    esperado: { subsidio: 660, total: 3960 },
  },
  {
    nombre: "Fuera de la franja de 50 km",
    origen: { tipo: "recalculado", detalle: "Sin trabajo permanente en la franja no corresponde." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 3300, enFrontera: false },
    esperado: { subsidio: 0, total: 3300 },
  },
]);
