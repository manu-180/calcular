// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "aov-premie-berekenen": () => import("@/paises/sr/calculadoras/aov-premie-berekenen"),
  "bonus-belasting-berekenen": () => import("@/paises/sr/calculadoras/bonus-belasting-berekenen"),
  "bruto-netto-salaris": () => import("@/paises/sr/calculadoras/bruto-netto-salaris"),
  "btw-berekenen": () => import("@/paises/sr/calculadoras/btw-berekenen"),
  "huurwaardebelasting-berekenen": () => import("@/paises/sr/calculadoras/huurwaardebelasting-berekenen"),
  "hypotheekrenteaftrek-berekenen": () => import("@/paises/sr/calculadoras/hypotheekrenteaftrek-berekenen"),
  "inflatie-berekenen": () => import("@/paises/sr/calculadoras/inflatie-berekenen"),
  "inkomstenbelasting-berekenen": () => import("@/paises/sr/calculadoras/inkomstenbelasting-berekenen"),
  "loonbelasting-berekenen": () => import("@/paises/sr/calculadoras/loonbelasting-berekenen"),
  "minimumloon-berekenen": () => import("@/paises/sr/calculadoras/minimumloon-berekenen"),
  "netto-naar-bruto-berekenen": () => import("@/paises/sr/calculadoras/netto-naar-bruto-berekenen"),
  "overuren-berekenen": () => import("@/paises/sr/calculadoras/overuren-berekenen"),
  "uitkering-ineens-belasting": () => import("@/paises/sr/calculadoras/uitkering-ineens-belasting"),
  "vakantiedagen-berekenen": () => import("@/paises/sr/calculadoras/vakantiedagen-berekenen"),
  "vakantietoelage-berekenen": () => import("@/paises/sr/calculadoras/vakantietoelage-berekenen"),
};
