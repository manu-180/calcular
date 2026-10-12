import { definirCasos } from "@/motor/calculo";
import licenciaDeMaternidad from "./licencia-de-maternidad";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(licenciaDeMaternidad, [
  {
    nombre: "Descanso completo de 45 y 45 días",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Ley 1516: 45 días antes y 45 después, con 100 % de goce. Parto 15/12/2026: desde 31/10/2026 hasta 29/01/2027. 3.300 / 30 × 90 = 9.900." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", sueldo: 3300, diferidos: 0, cotizaciones: 12 },
    esperado: { inicio: "2026-10-31", fin: "2027-01-29", prenatal: 45, postnatal: 45, subsidio: 9900 },
  },
  {
    nombre: "Quince días diferidos al postnatal",
    origen: { tipo: "recalculado", url: GUIA, detalle: "La Ley 1516 permite pasar parte del prenatal al postnatal: 30 antes (desde 15/11) y 60 después (hasta 13/02/2027). El total sigue en 90 días." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", sueldo: 3300, diferidos: 15, cotizaciones: 12 },
    esperado: { inicio: "2026-11-15", fin: "2027-02-13", prenatal: 30, postnatal: 60, subsidio: 9900 },
  },
  {
    nombre: "Solo tres aportes en el año",
    origen: { tipo: "recalculado", detalle: "Hacen falta 4 cotizaciones en los 12 meses anteriores: sin subsidio." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", sueldo: 5000, diferidos: 0, cotizaciones: 3 },
    esperado: { subsidio: 0 },
  },
]);
