import { enMapa, porcentaje } from "@/motor/calculo";
import { recibeAuxilio } from "../reglas";

export interface ValoresCosto {
  smmlv: number;
  auxilioTransporte: number;
  auxilioTope: number;
  topeIbc: number;
  saludEmpleador: number;
  pensionCotizacion: number;
  pensionParteTrabajador: number;
  arl: Readonly<Record<string, number>>;
  parafiscales: Readonly<Record<string, number>>;
  exoneracionTope: number;
  primaDias: number;
  vacacionesDias: number;
  interesesCesantias: number;
}

export interface EntradaCosto {
  salario: number;
  auxilio: boolean;
  claseRiesgo: string;
  // Sociedad declarante de renta, o persona natural con dos o más trabajadores (ET art. 114-1).
  puedeExonerarse: boolean;
  pagaSenaIcbf: boolean;
}

export interface CostoEmpleador {
  ibc: number;
  auxilio: number;
  exonerado: boolean;
  salud: number;
  pension: number;
  arl: number;
  caja: number;
  sena: number;
  icbf: number;
  aportes: number;
  prima: number;
  cesantias: number;
  intereses: number;
  vacaciones: number;
  prestaciones: number;
  costoMensual: number;
}

// Valores mensuales. Las prestaciones son la provisión de cada mes: prima (30 días por año) y
// cesantías (un mes por año) se calculan con salario más auxilio de transporte; vacaciones (15 días
// hábiles por año) solo con el salario; intereses, 12 % anual sobre las cesantías.
export function costoEmpleador(e: EntradaCosto, v: ValoresCosto, red: (n: number) => number): CostoEmpleador {
  const ibc = Math.min(Math.max(e.salario, v.smmlv), v.topeIbc * v.smmlv);
  const auxilio = e.auxilio && recibeAuxilio(e.salario, v.smmlv, v.auxilioTope) ? v.auxilioTransporte : 0;
  const exonerado = e.puedeExonerarse && e.salario < v.exoneracionTope * v.smmlv;
  const tasaPension = (v.pensionCotizacion * (100 - v.pensionParteTrabajador)) / 100;

  const salud = exonerado ? 0 : red(porcentaje(ibc, v.saludEmpleador));
  const pension = red(porcentaje(ibc, tasaPension));
  const arl = red(porcentaje(ibc, enMapa(v.arl, e.claseRiesgo)));
  const caja = red(porcentaje(ibc, enMapa(v.parafiscales, "caja")));
  const sena = e.pagaSenaIcbf && !exonerado ? red(porcentaje(ibc, enMapa(v.parafiscales, "sena"))) : 0;
  const icbf = e.pagaSenaIcbf && !exonerado ? red(porcentaje(ibc, enMapa(v.parafiscales, "icbf"))) : 0;
  const aportes = salud + pension + arl + caja + sena + icbf;

  const basePrestaciones = e.salario + auxilio;
  const prima = red((basePrestaciones * v.primaDias) / 360);
  const cesantias = red(basePrestaciones / 12);
  const intereses = red(porcentaje(cesantias, v.interesesCesantias));
  const vacaciones = red((e.salario * v.vacacionesDias) / 360);
  const prestaciones = prima + cesantias + intereses + vacaciones;

  return {
    ibc,
    auxilio,
    exonerado,
    salud,
    pension,
    arl,
    caja,
    sena,
    icbf,
    aportes,
    prima,
    cesantias,
    intereses,
    vacaciones,
    prestaciones,
    costoMensual: e.salario + auxilio + aportes + prestaciones,
  };
}
