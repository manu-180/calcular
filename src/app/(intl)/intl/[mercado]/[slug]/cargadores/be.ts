// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bedrijfsvoorheffing-berekenen": () => import("@/paises/be/calculadoras/bedrijfsvoorheffing-berekenen"),
  "bruto-netto-berekenen": () => import("@/paises/be/calculadoras/bruto-netto-berekenen"),
  "btw-berekenen": () => import("@/paises/be/calculadoras/btw-berekenen"),
  "erfbelasting-berekenen": () => import("@/paises/be/calculadoras/erfbelasting-berekenen"),
  "groeipakket-berekenen": () => import("@/paises/be/calculadoras/groeipakket-berekenen"),
  "huurindexatie-berekenen": () => import("@/paises/be/calculadoras/huurindexatie-berekenen"),
  "inflatie-berekenen": () => import("@/paises/be/calculadoras/inflatie-berekenen"),
  "loonkost-berekenen": () => import("@/paises/be/calculadoras/loonkost-berekenen"),
  "maaltijdcheques-berekenen": () => import("@/paises/be/calculadoras/maaltijdcheques-berekenen"),
  "minimumloon-berekenen": () => import("@/paises/be/calculadoras/minimumloon-berekenen"),
  "opzeggingstermijn-berekenen": () => import("@/paises/be/calculadoras/opzeggingstermijn-berekenen"),
  "overuren-berekenen": () => import("@/paises/be/calculadoras/overuren-berekenen"),
  "registratierechten-berekenen": () => import("@/paises/be/calculadoras/registratierechten-berekenen"),
  "rsz-berekenen": () => import("@/paises/be/calculadoras/rsz-berekenen"),
  "sociale-bijdragen-zelfstandige": () => import("@/paises/be/calculadoras/sociale-bijdragen-zelfstandige"),
  "vakantiegeld-berekenen": () => import("@/paises/be/calculadoras/vakantiegeld-berekenen"),
};
