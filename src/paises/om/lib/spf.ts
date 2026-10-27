import { enMapa, porcentaje } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const REQUIERE_SPF = {
  "om.spf-old-age": "mapa",
  "om.spf-cap": "numero",
  "om.spf-injury": "numero",
  "om.spf-job-security": "mapa",
  "om.spf-maternity": "numero",
  "om.spf-sick": "numero",
} as const;

export const CAMPO_NACIONALIDAD = {
  id: "nacionalidad",
  tipo: "opcion",
  etiqueta: "الجنسية",
  opciones: [
    { valor: "omani", etiqueta: "عماني" },
    { valor: "expat", etiqueta: "غير عماني" },
  ],
  porDefecto: "omani",
} as const satisfies Campo;

export interface TablasSpf {
  readonly "om.spf-old-age": Mapa;
  readonly "om.spf-cap": number;
  readonly "om.spf-injury": number;
  readonly "om.spf-job-security": Mapa;
  readonly "om.spf-maternity": number;
  readonly "om.spf-sick": number;
}

export interface AportesSpf {
  topeAplicado: boolean;
  vejezEmpleado: number;
  seguridadEmpleado: number;
  vejezEmpleador: number;
  lesiones: number;
  seguridadEmpleador: number;
  maternidad: number;
  enfermedad: number;
  empleado: number;
  empleador: number;
}

// Los ramos de vejez y de lesiones se calculan sobre el salario con el tope mensual (art. 52); los de
// seguridad laboral, maternidad y enfermedad, sobre el salario entero. Todos alcanzan hoy solo a
// omaníes: para extranjeros el ramo de lesiones empieza cinco años después del decreto (julio de 2028)
// y maternidad y enfermedad, para las categorías que fije el consejo del fondo.
export function aportesSpf(salario: number, omani: boolean, t: TablasSpf): AportesSpf {
  const tope = t["om.spf-cap"];
  const base = Math.min(salario, tope);
  if (!omani) {
    return { topeAplicado: false, vejezEmpleado: 0, seguridadEmpleado: 0, vejezEmpleador: 0, lesiones: 0, seguridadEmpleador: 0, maternidad: 0, enfermedad: 0, empleado: 0, empleador: 0 };
  }
  const vejezEmpleado = porcentaje(base, enMapa(t["om.spf-old-age"], "employee"));
  const seguridadEmpleado = porcentaje(salario, enMapa(t["om.spf-job-security"], "employee"));
  const vejezEmpleador = porcentaje(base, enMapa(t["om.spf-old-age"], "employer"));
  const lesiones = porcentaje(base, t["om.spf-injury"]);
  const seguridadEmpleador = porcentaje(salario, enMapa(t["om.spf-job-security"], "employer"));
  const maternidad = porcentaje(salario, t["om.spf-maternity"]);
  const enfermedad = porcentaje(salario, t["om.spf-sick"]);
  return {
    topeAplicado: salario > tope,
    vejezEmpleado,
    seguridadEmpleado,
    vejezEmpleador,
    lesiones,
    seguridadEmpleador,
    maternidad,
    enfermedad,
    empleado: vejezEmpleado + seguridadEmpleado,
    empleador: vejezEmpleador + lesiones + seguridadEmpleador + maternidad + enfermedad,
  };
}
