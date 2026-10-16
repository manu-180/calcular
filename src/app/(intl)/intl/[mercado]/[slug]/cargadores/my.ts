// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave": () => import("@/paises/my/calculadoras/annual-leave"),
  "daily-rate-calculator": () => import("@/paises/my/calculadoras/daily-rate-calculator"),
  "eis-calculator": () => import("@/paises/my/calculadoras/eis-calculator"),
  "employer-cost": () => import("@/paises/my/calculadoras/employer-cost"),
  "epf-calculator": () => import("@/paises/my/calculadoras/epf-calculator"),
  "income-tax-calculator": () => import("@/paises/my/calculadoras/income-tax-calculator"),
  "inflation-calculator": () => import("@/paises/my/calculadoras/inflation-calculator"),
  "maternity-leave": () => import("@/paises/my/calculadoras/maternity-leave"),
  "minimum-wage": () => import("@/paises/my/calculadoras/minimum-wage"),
  "notice-period": () => import("@/paises/my/calculadoras/notice-period"),
  "opr-calculator": () => import("@/paises/my/calculadoras/opr-calculator"),
  "overtime-calculator": () => import("@/paises/my/calculadoras/overtime-calculator"),
  "paternity-leave": () => import("@/paises/my/calculadoras/paternity-leave"),
  "pcb-calculator": () => import("@/paises/my/calculadoras/pcb-calculator"),
  "rpgt-calculator": () => import("@/paises/my/calculadoras/rpgt-calculator"),
  "sick-leave": () => import("@/paises/my/calculadoras/sick-leave"),
  "socso-calculator": () => import("@/paises/my/calculadoras/socso-calculator"),
  "sst-calculator": () => import("@/paises/my/calculadoras/sst-calculator"),
  "stamp-duty-calculator": () => import("@/paises/my/calculadoras/stamp-duty-calculator"),
  "take-home-pay": () => import("@/paises/my/calculadoras/take-home-pay"),
  "termination-benefits": () => import("@/paises/my/calculadoras/termination-benefits"),
};
