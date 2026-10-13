import {
  APORTE_ADICIONAL_FAMILIAR,
  APORTE_TRABAJADOR,
  CONTRIBUCION_EMPLEADOR,
  REPARTO_ANTERIOR,
  REPARTO_VIGENTE,
  type TipoEntidad,
} from "@/data/obra-social-aportes";
import { topeSipa } from "@/data/sueldo";

export type EntradaObraSocial = {
  brutoMensual: number;
  familiaresACargo: number;
  tipoEntidad: TipoEntidad;
  /** Cuota mensual del plan de prepaga, si la hay. 0 = no se contrató ningún plan superador. */
  cuotaPlan: number;
};

export type ResultadoObraSocial = {
  baseAporte: number;
  topeAplicado: boolean;
  aporteTrabajador: number;
  aporteAdicional: number;
  contribucionEmpleador: number;
  totalRecaudado: number;
  aLaEntidad: number;
  alFondo: number;
  /** Lo mismo, con el reparto vigente hasta el 31/7/2024. Sirve para mostrar qué cambió de verdad. */
  aLaEntidadAnterior: number;
  alFondoAnterior: number;
  porcentajeEntidadAnterior: number;
  reparoCambio: boolean;
  /** Sólo si se cargó una cuota: diferencia entre la cuota y lo que llega por aportes. */
  diferenciaBolsillo: number | null;
  excedente: number | null;
  cubrePlan: boolean;
};

/**
 * El tope de la base imponible se aplica al aporte del trabajador —igual que en la calculadora de
 * sueldo neto— y NO a la contribución del empleador: el art. 1° del Decreto 491/2004 dejó el límite
 * máximo del art. 9 de la Ley 24.241 sólo para los aportes de los incisos a) y c) del art. 10.
 * Si alguien "empareja" las dos bases, sobreestima el descuento del sueldo alto o subestima lo que
 * paga el empleador; en los dos casos el número deja de ser el que se liquida.
 */
export function calcularObraSocial(e: EntradaObraSocial): ResultadoObraSocial {
  const bruto = Math.max(0, e.brutoMensual);
  const familiares = Math.max(0, Math.floor(e.familiaresACargo));
  const cuota = Math.max(0, e.cuotaPlan);

  const baseAporte = Math.min(bruto, topeSipa().baseMaxima);
  const aporteTrabajador = baseAporte * APORTE_TRABAJADOR;
  const aporteAdicional = baseAporte * APORTE_ADICIONAL_FAMILIAR * familiares;
  const contribucionEmpleador = bruto * CONTRIBUCION_EMPLEADOR;

  const totalRecaudado = aporteTrabajador + aporteAdicional + contribucionEmpleador;

  const aLaEntidad = totalRecaudado * REPARTO_VIGENTE.entidad;
  const alFondo = totalRecaudado * REPARTO_VIGENTE.fondo;

  // Reparto anterior al Decreto 600/2024. El umbral de mil pesos no se toca ni se actualiza: es el
  // número literal del art. 19 inc. a) y la razón por la que la escala vieja ya no discriminaba nada.
  const escala =
    e.tipoEntidad === "direccion-o-prepaga"
      ? REPARTO_ANTERIOR.personalDireccion
      : REPARTO_ANTERIOR.obraSocial;
  const porcentajeEntidadAnterior =
    bruto <= REPARTO_ANTERIOR.umbralRemuneracion ? escala.hastaUmbral : escala.sobreUmbral;
  const aLaEntidadAnterior = totalRecaudado * porcentajeEntidadAnterior;
  const alFondoAnterior = totalRecaudado - aLaEntidadAnterior;

  const diferencia = cuota > 0 ? cuota - aLaEntidad : null;

  return {
    baseAporte,
    topeAplicado: bruto > topeSipa().baseMaxima,
    aporteTrabajador,
    aporteAdicional,
    contribucionEmpleador,
    totalRecaudado,
    aLaEntidad,
    alFondo,
    aLaEntidadAnterior,
    alFondoAnterior,
    porcentajeEntidadAnterior,
    reparoCambio: porcentajeEntidadAnterior !== REPARTO_VIGENTE.entidad,
    diferenciaBolsillo: diferencia === null ? null : Math.max(0, diferencia),
    excedente: diferencia === null ? null : Math.max(0, -diferencia),
    cubrePlan: diferencia !== null && diferencia <= 0,
  };
}
