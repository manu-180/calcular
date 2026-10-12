import { definirCasos } from "@/motor/calculo";
import subsidio from "./subsidio-al-empleo";

export default definirCasos(subsidio, [
  {
    nombre: "Mes de 10,000",
    origen: { tipo: "oficial", url: "https://dof.gob.mx/nota_detalle.php?codigo=5777649&fecha=31/12/2025", detalle: "Decreto 2026: 15.02 % × UMA mensual 3566.22 = 535.65, si el ingreso no pasa de 11,492.66." },
    fecha: "2026-10-15",
    entrada: { sueldo: 10000, periodo: "mensual" },
    esperado: { mensual: 535.65, subsidio: 535.65 },
  },
  {
    nombre: "Quincena de 5,000",
    origen: { tipo: "recalculado", detalle: "Ingreso mensual 5000 / 15 × 30.4 = 10133.33, debajo del límite. 535.646244 / 30.4 × 15 = 264.30." },
    fecha: "2026-10-15",
    entrada: { sueldo: 5000, periodo: "quincenal" },
    esperado: { ingresoMensual: 10133.33, subsidio: 264.3 },
  },
  {
    nombre: "Arriba del límite",
    origen: { tipo: "recalculado", detalle: "12,000 al mes pasa de 11,492.66: sin subsidio." },
    fecha: "2026-10-15",
    entrada: { sueldo: 12000, periodo: "mensual" },
    esperado: { subsidio: 0 },
  },
  {
    nombre: "Enero de 2026 con la UMA de 2025",
    origen: { tipo: "recalculado", detalle: "En enero rige 15.59 % sobre la UMA mensual 2025: 3439.46 × 15.59 % = 536.2118, redondeado 536.21 (el considerando del decreto lo menciona como 536.22)." },
    fecha: "2026-01-15",
    entrada: { sueldo: 10000, periodo: "mensual" },
    esperado: { subsidio: 536.21 },
  },
]);
