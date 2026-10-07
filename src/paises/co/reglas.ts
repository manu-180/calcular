import { aplicarEscala, enMapa, porcentaje } from "@/motor/calculo";
import { redondear } from "@/motor/formato";
import type { FechaISO, FilaEscala } from "@/motor/tipos";

function partes(fecha: FechaISO): [number, number, number] {
  const [a, m, d] = fecha.split("-").map(Number);
  return [a, m, d];
}

function esUltimoDeFebrero(a: number, m: number, d: number): boolean {
  if (m !== 2) return false;
  const bisiesto = (a % 4 === 0 && a % 100 !== 0) || a % 400 === 0;
  return d === (bisiesto ? 29 : 28);
}

// Año comercial de 360 días (meses de 30) que usa la nómina colombiana, contando el primer y el
// último día: del 1 de enero al 30 de junio son 180 días y el año completo, 360. El 31 cuenta como
// 30 y el último día de febrero como 30 cuando cierra el período.
export function dias360(desde: FechaISO, hasta: FechaISO): number {
  const [a1, m1, d1] = partes(desde);
  const [a2, m2, d2] = partes(hasta);
  const dia1 = Math.min(d1, 30);
  const dia2 = esUltimoDeFebrero(a2, m2, d2) ? 30 : Math.min(d2, 30);
  return (a2 - a1) * 360 + (m2 - m1) * 30 + (dia2 - dia1) + 1;
}

export function mayorFecha(a: FechaISO, b: FechaISO): FechaISO {
  return a > b ? a : b;
}

export function anioDe(fecha: FechaISO): number {
  return partes(fecha)[0];
}

export function mesDe(fecha: FechaISO): number {
  return partes(fecha)[1];
}

export function filaDe(escala: readonly FilaEscala[], base: number): FilaEscala {
  let elegida = escala[0];
  for (const f of escala) if (base >= f.desde) elegida = f;
  return elegida;
}

export interface ValoresAportes {
  smmlv: number;
  saludTrabajador: number;
  pensionCotizacion: number;
  pensionParteTrabajador: number;
  fsp: readonly FilaEscala[];
  topeIbc: number;
}

export interface Aportes {
  ibc: number;
  salud: number;
  pension: number;
  fsp: number;
  tasaFsp: number;
}

// El IBC no baja de un salario mínimo (Ley 100, art. 204) ni sube de 25 (art. 18).
export function aportesTrabajador(salario: number, v: ValoresAportes, red: (n: number) => number): Aportes {
  const ibc = Math.min(Math.max(salario, v.smmlv), v.topeIbc * v.smmlv);
  const tasaPension = (v.pensionCotizacion * v.pensionParteTrabajador) / 100;
  const tasaFsp = filaDe(v.fsp, ibc / v.smmlv).tasa;
  return {
    ibc,
    salud: red(porcentaje(ibc, v.saludTrabajador)),
    pension: red(porcentaje(ibc, tasaPension)),
    fsp: red(porcentaje(ibc, tasaFsp)),
    tasaFsp,
  };
}

export interface ValoresRetencion {
  uvt: number;
  tabla: readonly FilaEscala[];
  rentaExenta: number;
  rentaExentaTopeAnual: number;
  limiteBeneficios: number;
  limiteBeneficiosTopeAnual: number;
  dependientes: number;
  dependientesTope: number;
  saludTope: number;
}

export interface Retencion {
  ingresoNeto: number;
  deducciones: number;
  rentaExenta: number;
  beneficios: number;
  base: number;
  baseUvt: number;
  retencion: number;
}

// Procedimiento 1 (ET arts. 383, 385, 387, 206 num. 10 y 336 num. 3) con los topes anuales
// llevados a mes dividiendo por 12, como se hace en la retención mensual.
export function retencionMensual(
  ingreso: number,
  ingresosNoConstitutivos: number,
  conDependiente: boolean,
  pagosSalud: number,
  v: ValoresRetencion,
  red: (n: number) => number,
): Retencion {
  const ingresoNeto = Math.max(0, ingreso - ingresosNoConstitutivos);
  const dependiente = conDependiente ? Math.min(porcentaje(ingreso, v.dependientes), v.dependientesTope * v.uvt) : 0;
  const salud = Math.min(Math.max(0, pagosSalud), v.saludTope * v.uvt);
  const deducciones = red(dependiente + salud);
  const subtotal = Math.max(0, ingresoNeto - deducciones);
  const rentaExenta = red(Math.min(porcentaje(subtotal, v.rentaExenta), (v.rentaExentaTopeAnual / 12) * v.uvt));
  const limite = Math.min(porcentaje(ingresoNeto, v.limiteBeneficios), (v.limiteBeneficiosTopeAnual / 12) * v.uvt);
  const beneficios = red(Math.min(deducciones + rentaExenta, limite));
  const base = Math.max(0, ingresoNeto - beneficios);
  const baseUvt = base / v.uvt;
  const retencion = red(aplicarEscala(v.tabla, baseUvt) * v.uvt);
  return { ingresoNeto, deducciones, rentaExenta, beneficios, base, baseUvt: redondear(baseUvt, { decimales: 2, modo: "mitad-arriba" }), retencion };
}

export interface Indemnizacion {
  dias: number;
  valor: number;
  tablaAlta: boolean;
}

// CST art. 64, contrato a término indefinido: hasta un año se pagan los días base completos; desde
// ahí se suman los días adicionales por año y en proporción por la fracción (días/360).
export function indemnizacionIndefinido(
  salario: number,
  diasServicio: number,
  smmlv: number,
  dias: Readonly<Record<string, number>>,
  umbralSmmlv: number,
  red: (n: number) => number,
): Indemnizacion {
  const tablaAlta = salario >= umbralSmmlv * smmlv;
  const base = enMapa(dias, tablaAlta ? "primer-anio-mayor" : "primer-anio-menor");
  const adicional = enMapa(dias, tablaAlta ? "anio-adicional-mayor" : "anio-adicional-menor");
  const diasIndemnizacion = diasServicio <= 360 ? base : base + (adicional * (diasServicio - 360)) / 360;
  return {
    dias: redondear(diasIndemnizacion, { decimales: 2, modo: "mitad-arriba" }),
    valor: red((salario / 30) * diasIndemnizacion),
    tablaAlta,
  };
}

export function recibeAuxilio(salario: number, smmlv: number, topeEnSmmlv: number): boolean {
  return salario <= topeEnSmmlv * smmlv;
}

// ET art. 868: hasta $100 se redondea al peso, hasta $10.000 al múltiplo de 100 y desde ahí al de 1.000.
export function aproximarUvtAPesos(valor: number): number {
  if (valor <= 100) return redondear(valor, { decimales: 0, modo: "mitad-arriba" });
  if (valor <= 10000) return redondear(valor / 100, { decimales: 0, modo: "mitad-arriba" }) * 100;
  return redondear(valor / 1000, { decimales: 0, modo: "mitad-arriba" }) * 1000;
}
