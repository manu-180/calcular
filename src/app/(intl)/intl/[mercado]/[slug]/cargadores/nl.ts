// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "algemene-heffingskorting-berekenen": () => import("@/paises/nl/calculadoras/algemene-heffingskorting-berekenen"),
  "aow-berekenen": () => import("@/paises/nl/calculadoras/aow-berekenen"),
  "arbeidskorting-berekenen": () => import("@/paises/nl/calculadoras/arbeidskorting-berekenen"),
  "bijtelling-berekenen": () => import("@/paises/nl/calculadoras/bijtelling-berekenen"),
  "box-3-berekenen": () => import("@/paises/nl/calculadoras/box-3-berekenen"),
  "bruto-netto-salaris": () => import("@/paises/nl/calculadoras/bruto-netto-salaris"),
  "btw-berekenen": () => import("@/paises/nl/calculadoras/btw-berekenen"),
  "eigenwoningforfait-berekenen": () => import("@/paises/nl/calculadoras/eigenwoningforfait-berekenen"),
  "hypotheekrenteaftrek-berekenen": () => import("@/paises/nl/calculadoras/hypotheekrenteaftrek-berekenen"),
  "inflatie-berekenen": () => import("@/paises/nl/calculadoras/inflatie-berekenen"),
  "inkomstenbelasting-berekenen": () => import("@/paises/nl/calculadoras/inkomstenbelasting-berekenen"),
  "kilometervergoeding-berekenen": () => import("@/paises/nl/calculadoras/kilometervergoeding-berekenen"),
  "kinderbijslag-berekenen": () => import("@/paises/nl/calculadoras/kinderbijslag-berekenen"),
  "minimumloon-berekenen": () => import("@/paises/nl/calculadoras/minimumloon-berekenen"),
  "opzegtermijn-berekenen": () => import("@/paises/nl/calculadoras/opzegtermijn-berekenen"),
  "overdrachtsbelasting-berekenen": () => import("@/paises/nl/calculadoras/overdrachtsbelasting-berekenen"),
  "thuiswerkvergoeding-berekenen": () => import("@/paises/nl/calculadoras/thuiswerkvergoeding-berekenen"),
  "transitievergoeding-berekenen": () => import("@/paises/nl/calculadoras/transitievergoeding-berekenen"),
  "vakantiedagen-berekenen": () => import("@/paises/nl/calculadoras/vakantiedagen-berekenen"),
  "vakantiegeld-berekenen": () => import("@/paises/nl/calculadoras/vakantiegeld-berekenen"),
  "werkgeverslasten-berekenen": () => import("@/paises/nl/calculadoras/werkgeverslasten-berekenen"),
  "ww-uitkering-berekenen": () => import("@/paises/nl/calculadoras/ww-uitkering-berekenen"),
  "zzp-belasting-berekenen": () => import("@/paises/nl/calculadoras/zzp-belasting-berekenen"),
};
