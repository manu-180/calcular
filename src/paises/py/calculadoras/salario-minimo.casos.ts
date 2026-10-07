import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const RES670 = "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf" as const;

export default definirCasos(salarioMinimo, [
  {
    nombre: "Jornada diurna desde julio de 2026",
    origen: { tipo: "oficial", url: RES670, detalle: "Resolución MTESS 670/2026, arts. 1 y 2: mensual 3.044.000, jornal 117.077, diario 101.467, hora 12.683, hora a tiempo parcial 14.635." },
    fecha: "2026-10-07",
    entrada: { jornada: "diurna", horas: null },
    esperado: { mensual: 3044000, jornal: 117077, diario: 101467, hora: 12683, horaParcial: 14635, paraTusHoras: null },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "oficial", url: RES670, detalle: "Resolución MTESS 670/2026: mensual 3.957.200, jornal 152.200, diario 131.907, hora 18.844, hora a tiempo parcial 21.743." },
    fecha: "2026-07-01",
    entrada: { jornada: "nocturna", horas: null },
    esperado: { mensual: 3957200, jornal: 152200, diario: 131907, hora: 18844, horaParcial: 21743 },
  },
  {
    nombre: "Tiempo parcial de 80 horas por mes",
    origen: { tipo: "oficial", url: "https://portal.ips.gov.py/sistemas/ipsportal/contenido.php?c=372", detalle: "Tabla N° 2 del IPS (tiempo parcial): 20 horas semanales, 80 por mes, salario mínimo 1.170.800 (14.635 × 80)." },
    fecha: "2026-10-07",
    entrada: { jornada: "diurna", horas: 80 },
    esperado: { paraTusHoras: 1170800 },
  },
  {
    nombre: "Último día del tramo 2025",
    origen: { tipo: "oficial", url: "https://www.mtess.gov.py/?p=30682", detalle: "MTESS, Resolución 677/2025: mensual 2.899.048, jornal 111.502, diario 96.635, hora 12.080, tiempo parcial 13.937." },
    fecha: "2026-06-30",
    entrada: { jornada: "diurna", horas: null },
    esperado: { mensual: 2899048, jornal: 111502, diario: 96635, hora: 12080, horaParcial: 13937 },
  },
]);
