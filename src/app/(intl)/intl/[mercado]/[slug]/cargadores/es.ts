// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "baja-laboral": () => import("@/paises/es/calculadoras/baja-laboral"),
  "calcular-paro": () => import("@/paises/es/calculadoras/calcular-paro"),
  "coste-trabajador-empresa": () => import("@/paises/es/calculadoras/coste-trabajador-empresa"),
  "cotizacion-seguridad-social": () => import("@/paises/es/calculadoras/cotizacion-seguridad-social"),
  "cuota-autonomos": () => import("@/paises/es/calculadoras/cuota-autonomos"),
  "factura-autonomo": () => import("@/paises/es/calculadoras/factura-autonomo"),
  "finiquito": () => import("@/paises/es/calculadoras/finiquito"),
  "horas-extra": () => import("@/paises/es/calculadoras/horas-extra"),
  "indemnizacion-despido": () => import("@/paises/es/calculadoras/indemnizacion-despido"),
  "ipc": () => import("@/paises/es/calculadoras/ipc"),
  "iprem": () => import("@/paises/es/calculadoras/iprem"),
  "iva": () => import("@/paises/es/calculadoras/iva"),
  "pagas-extra": () => import("@/paises/es/calculadoras/pagas-extra"),
  "pension-jubilacion": () => import("@/paises/es/calculadoras/pension-jubilacion"),
  "retencion-irpf": () => import("@/paises/es/calculadoras/retencion-irpf"),
  "revision-hipoteca-euribor": () => import("@/paises/es/calculadoras/revision-hipoteca-euribor"),
  "salario-minimo": () => import("@/paises/es/calculadoras/salario-minimo"),
  "sueldo-neto": () => import("@/paises/es/calculadoras/sueldo-neto"),
  "vacaciones": () => import("@/paises/es/calculadoras/vacaciones"),
};
