import { definirCasos } from "@/motor/calculo";
import salarioMinimoPorActividad from "./salario-minimo-por-actividad";

const R670 = "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf" as const;

export default definirCasos(salarioMinimoPorActividad, [
  {
    nombre: "Chofer cobrador",
    origen: { tipo: "oficial", url: R670, detalle: "Anexo, transporte público: chofer cobrador, salario mensual Gs. 3.996.788 y jornal Gs. 153.723." },
    fecha: "2026-10-12",
    entrada: { actividad: "chofer-cobrador", jornada: "diurna" },
    esperado: { mensual: 3996788, diario: 133226, jornal: 153723 },
  },
  {
    nombre: "Albañil oficial de primera",
    origen: { tipo: "oficial", url: R670, detalle: "Anexo, construcción: oficial de 1º, salario mensual Gs. 3.560.108 y jornal Gs. 136.927." },
    fecha: "2026-10-12",
    entrada: { actividad: "construccion-oficial-1", jornada: "diurna" },
    esperado: { mensual: 3560108, jornal: 136927 },
  },
  {
    nombre: "Guardia de seguridad, 10 horas",
    origen: { tipo: "oficial", url: R670, detalle: "Anexo, seguridad privada: 10 horas diarias, mensual Gs. 3.805.000, diario 126.833 y jornal 146.346." },
    fecha: "2026-10-12",
    entrada: { actividad: "seguridad-10", jornada: "diurna" },
    esperado: { mensual: 3805000, diario: 126833, jornal: 146346 },
  },
  {
    nombre: "Peón ganadero de noche",
    origen: { tipo: "recalculado", detalle: "Establecimientos ganaderos Gs. 2.130.800 más 30 % nocturno = 2.770.040. Diario /30 = 92.334,67 (92.335); jornal /26 = 106.540." },
    fecha: "2026-10-12",
    entrada: { actividad: "ganadero", jornada: "nocturna" },
    esperado: { mensual: 2770040, diario: 92335, jornal: 106540 },
  },
]);
