import { definirCasos } from "@/motor/calculo";
import licenciasEspeciales from "./licencias-especiales";

const URL = "https://www.impo.com.uy/bases/leyes/18345-2008" as const;

export default definirCasos(licenciasEspeciales, [
  {
    nombre: "Duelo con sueldo de $ 45.000",
    origen: { tipo: "oficial", url: URL, detalle: "Ley 18.345, art. 7: tres días hábiles. 45.000 / 30 = 1.500; × 3 = 4.500." },
    fecha: "2026-10-12",
    entrada: { motivo: "duelo", sueldo: 45000, horasDiarias: 8 },
    esperado: { dias: 3, valorDia: 1500, pago: 4500, horas: null },
  },
  {
    nombre: "Estudio con 48 horas semanales",
    origen: { tipo: "oficial", url: URL, detalle: "Ley 18.345, art. 2 C: 12 días por año." },
    fecha: "2026-10-12",
    entrada: { motivo: "estudio-48", sueldo: null, horasDiarias: 8 },
    esperado: { dias: 12, pago: null },
  },
  {
    nombre: "Estudio con jornada de hasta 36 horas",
    origen: { tipo: "oficial", url: URL, detalle: "Ley 18.345, art. 2 A: 6 días por año." },
    fecha: "2026-10-12",
    entrada: { motivo: "estudio-36", sueldo: null, horasDiarias: 6 },
    esperado: { dias: 6 },
  },
  {
    nombre: "Familiar con discapacidad",
    origen: { tipo: "oficial", url: URL, detalle: "Ley 18.345, art. 11: 96 horas por año, 64 a cargo del empleador. Hora 45.000 / 30 / 8 = 187,50; × 64 = 12.000." },
    fecha: "2026-10-12",
    entrada: { motivo: "familiar-discapacidad", sueldo: 45000, horasDiarias: 8 },
    esperado: { horas: 96, horasPagas: 64, pago: 12000, dias: null },
  },
]);
