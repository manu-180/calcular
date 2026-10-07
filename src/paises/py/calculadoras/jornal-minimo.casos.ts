import { definirCasos } from "@/motor/calculo";
import jornalMinimo from "./jornal-minimo";

export default definirCasos(jornalMinimo, [
  {
    nombre: "Veinte jornales diurnos",
    origen: {
      tipo: "oficial",
      url: "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf",
      detalle: "Resolución MTESS 670/2026: jornal diurno 117.077. × 20 = 2.341.540.",
    },
    fecha: "2026-10-07",
    entrada: { jornada: "diurna", dias: 20 },
    esperado: { jornal: 117077, total: 2341540 },
  },
  {
    nombre: "Jornal nocturno antes del reajuste",
    origen: { tipo: "oficial", url: "https://www.mtess.gov.py/?p=30682", detalle: "MTESS 2025: jornal nocturno 144.952. × 26 = 3.768.752." },
    fecha: "2026-06-30",
    entrada: { jornada: "nocturna", dias: 26 },
    esperado: { jornal: 144952, total: 3768752 },
  },
]);
