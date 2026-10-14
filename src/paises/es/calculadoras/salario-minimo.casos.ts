import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const RD = "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-3815";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Jornada completa en 2026",
    origen: { tipo: "oficial", url: RD, detalle: "Real Decreto 126/2026: 40,70 euros al día, 1.221 euros al mes en 14 pagas, 17.094 euros al año." },
    fecha: "2026-10-14",
    entrada: { horas: 40 },
    esperado: { mensual14: 1221, mensual12: 1424.5, anual: 17094, diario: 40.7, eventuales: 57.82, horaHogar: 9.55 },
  },
  {
    nombre: "Media jornada",
    origen: { tipo: "recalculado", url: RD, detalle: "20 de 40 horas: 1.221 × 0,5 = 610,50 al mes; 17.094 × 0,5 = 8.547 al año." },
    fecha: "2026-10-14",
    entrada: { horas: 20 },
    esperado: { mensual14: 610.5, anual: 8547, mensual12: 712.25, diario: 20.35 },
  },
  {
    nombre: "Más horas que la jornada máxima",
    origen: { tipo: "recalculado", detalle: "45 horas semanales no es una jornada ordinaria válida." },
    fecha: "2026-10-14",
    entrada: { horas: 45 },
    esperaError: true,
  },
]);
