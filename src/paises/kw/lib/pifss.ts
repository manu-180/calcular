import { porcentaje } from "@/motor/calculo";

export const REQUIERE_PIFSS = {
  "kw.pifss-basic-employee-rate": "numero",
  "kw.pifss-basic-employer-rate": "numero",
  "kw.pifss-basic-max": "numero",
  "kw.pifss-basic-min": "numero",
  "kw.pifss-supplementary-employee-rate": "numero",
  "kw.pifss-supplementary-employer-rate": "numero",
  "kw.pifss-supplementary-max": "numero",
  "kw.pifss-increase-employee-rate": "numero",
  "kw.pifss-increase-employer-rate": "numero",
  "kw.pifss-increase-max": "numero",
  "kw.pifss-remuneration-rate": "numero",
  "kw.pifss-remuneration-years": "numero",
  "kw.pifss-unemployment-rate": "numero",
} as const;

type Valores = Readonly<Record<keyof typeof REQUIERE_PIFSS, number>>;

export interface Aportes {
  basico: number;
  complementario: number;
  base: number;
  empleadoBasico: number;
  empleadoComplementario: number;
  empleadoAumento: number;
  empleadoRemuneracion: number;
  empleadoDesempleo: number;
  empleado: number;
  empleadorBasico: number;
  empleadorComplementario: number;
  empleadorAumento: number;
  empleador: number;
}

// Guía de PIFSS: el sueldo básico de aporte va del mínimo al tope; lo que pasa del tope es sueldo
// complementario hasta su propio tope. El fondo de aumento y el de desempleo se calculan sobre la suma.
export function aportesPifss(v: Valores, sueldo: number, anios: number, redondear: (n: number) => number): Aportes {
  const basico = Math.min(Math.max(sueldo, v["kw.pifss-basic-min"]), v["kw.pifss-basic-max"]);
  const complementario = Math.min(Math.max(0, sueldo - v["kw.pifss-basic-max"]), v["kw.pifss-supplementary-max"]);
  const base = Math.min(basico + complementario, v["kw.pifss-increase-max"]);
  const e = {
    empleadoBasico: redondear(porcentaje(basico, v["kw.pifss-basic-employee-rate"])),
    empleadoComplementario: redondear(porcentaje(complementario, v["kw.pifss-supplementary-employee-rate"])),
    empleadoAumento: redondear(porcentaje(base, v["kw.pifss-increase-employee-rate"])),
    empleadoRemuneracion: anios >= v["kw.pifss-remuneration-years"] ? 0 : redondear(porcentaje(basico, v["kw.pifss-remuneration-rate"])),
    empleadoDesempleo: redondear(porcentaje(basico + complementario, v["kw.pifss-unemployment-rate"])),
  };
  const r = {
    empleadorBasico: redondear(porcentaje(basico, v["kw.pifss-basic-employer-rate"])),
    empleadorComplementario: redondear(porcentaje(complementario, v["kw.pifss-supplementary-employer-rate"])),
    empleadorAumento: redondear(porcentaje(base, v["kw.pifss-increase-employer-rate"])),
  };
  return {
    basico,
    complementario,
    base,
    ...e,
    ...r,
    empleado: redondear(e.empleadoBasico + e.empleadoComplementario + e.empleadoAumento + e.empleadoRemuneracion + e.empleadoDesempleo),
    empleador: redondear(r.empleadorBasico + r.empleadorComplementario + r.empleadorAumento),
  };
}
