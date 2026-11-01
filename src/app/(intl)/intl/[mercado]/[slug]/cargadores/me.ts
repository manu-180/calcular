// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bolovanje": () => import("@/paises/me/calculadoras/bolovanje"),
  "bruto-iz-neta": () => import("@/paises/me/calculadoras/bruto-iz-neta"),
  "godisnji-odmor": () => import("@/paises/me/calculadoras/godisnji-odmor"),
  "kalkulator-inflacije": () => import("@/paises/me/calculadoras/kalkulator-inflacije"),
  "kalkulator-pdv": () => import("@/paises/me/calculadoras/kalkulator-pdv"),
  "kalkulator-plate": () => import("@/paises/me/calculadoras/kalkulator-plate"),
  "minimalna-zarada": () => import("@/paises/me/calculadoras/minimalna-zarada"),
  "obracun-doprinosa": () => import("@/paises/me/calculadoras/obracun-doprinosa"),
  "otkazni-rok": () => import("@/paises/me/calculadoras/otkazni-rok"),
  "otpremnina": () => import("@/paises/me/calculadoras/otpremnina"),
  "porez-na-dohodak": () => import("@/paises/me/calculadoras/porez-na-dohodak"),
  "porez-na-nepokretnosti": () => import("@/paises/me/calculadoras/porez-na-nepokretnosti"),
  "porez-na-promet-nepokretnosti": () => import("@/paises/me/calculadoras/porez-na-promet-nepokretnosti"),
  "porez-za-preduzetnike": () => import("@/paises/me/calculadoras/porez-za-preduzetnike"),
  "porodiljsko-odsustvo": () => import("@/paises/me/calculadoras/porodiljsko-odsustvo"),
  "prekovremeni-rad": () => import("@/paises/me/calculadoras/prekovremeni-rad"),
  "prosjecna-zarada": () => import("@/paises/me/calculadoras/prosjecna-zarada"),
  "trosak-poslodavca": () => import("@/paises/me/calculadoras/trosak-poslodavca"),
};
