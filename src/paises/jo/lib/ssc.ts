import { enMapa, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

export const REQUIERE_SSC = {
  "jo.ssc-old-age": "mapa",
  "jo.ssc-unemployment": "mapa",
  "jo.ssc-work-injury": "numero",
  "jo.ssc-maternity": "numero",
  "jo.ssc-wage-cap": "numero",
} as const;

export interface TablasSsc {
  readonly "jo.ssc-old-age": Mapa;
  readonly "jo.ssc-unemployment": Mapa;
  readonly "jo.ssc-work-injury": number;
  readonly "jo.ssc-maternity": number;
  readonly "jo.ssc-wage-cap": number;
}

export interface AportesSsc {
  base: number;
  topeAplicado: boolean;
  vejezEmpleado: number;
  desempleoEmpleado: number;
  vejezEmpleador: number;
  desempleoEmpleador: number;
  lesiones: number;
  maternidad: number;
  empleado: number;
  empleador: number;
  tasaEmpleado: number;
  tasaEmpleador: number;
}

// Ley 1/2014: el aporte se calcula sobre el salario mensual con el tope del art. 20, que se indexa cada
// enero. El trabajador paga vejez (art. 59) y desempleo (art. 48); el empleador además lesiones (art. 24)
// y maternidad (art. 42). Quien entró antes de 2010 con más de 5.000 dinares tiene otro tope: no se cubre.
export function aportesSsc(salario: number, t: TablasSsc): AportesSsc {
  const tope = t["jo.ssc-wage-cap"];
  const base = Math.min(salario, tope);
  const vejez = t["jo.ssc-old-age"];
  const desempleo = t["jo.ssc-unemployment"];
  const tasaEmpleado = enMapa(vejez, "employee") + enMapa(desempleo, "employee");
  const tasaEmpleador = enMapa(vejez, "employer") + enMapa(desempleo, "employer") + t["jo.ssc-work-injury"] + t["jo.ssc-maternity"];
  const vejezEmpleado = porcentaje(base, enMapa(vejez, "employee"));
  const desempleoEmpleado = porcentaje(base, enMapa(desempleo, "employee"));
  const vejezEmpleador = porcentaje(base, enMapa(vejez, "employer"));
  const desempleoEmpleador = porcentaje(base, enMapa(desempleo, "employer"));
  const lesiones = porcentaje(base, t["jo.ssc-work-injury"]);
  const maternidad = porcentaje(base, t["jo.ssc-maternity"]);
  return {
    base,
    topeAplicado: salario > tope,
    vejezEmpleado,
    desempleoEmpleado,
    vejezEmpleador,
    desempleoEmpleador,
    lesiones,
    maternidad,
    empleado: vejezEmpleado + desempleoEmpleado,
    empleador: vejezEmpleador + desempleoEmpleador + lesiones + maternidad,
    tasaEmpleado,
    tasaEmpleador,
  };
}
