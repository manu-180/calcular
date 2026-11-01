// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "13-plat": () => import("@/paises/sk/calculadoras/13-plat"),
  "celkova-cena-prace": () => import("@/paises/sk/calculadoras/celkova-cena-prace"),
  "dan-z-prijmov": () => import("@/paises/sk/calculadoras/dan-z-prijmov"),
  "danovy-bonus": () => import("@/paises/sk/calculadoras/danovy-bonus"),
  "hruba-mzda-z-cistej": () => import("@/paises/sk/calculadoras/hruba-mzda-z-cistej"),
  "inflacna-kalkulacka": () => import("@/paises/sk/calculadoras/inflacna-kalkulacka"),
  "kalkulacka-dochodku": () => import("@/paises/sk/calculadoras/kalkulacka-dochodku"),
  "kalkulacka-dph": () => import("@/paises/sk/calculadoras/kalkulacka-dph"),
  "kalkulacka-materske": () => import("@/paises/sk/calculadoras/kalkulacka-materske"),
  "kalkulacka-pn": () => import("@/paises/sk/calculadoras/kalkulacka-pn"),
  "kurzova-kalkulacka": () => import("@/paises/sk/calculadoras/kurzova-kalkulacka"),
  "minimalna-mzda": () => import("@/paises/sk/calculadoras/minimalna-mzda"),
  "mzda-za-nadcas": () => import("@/paises/sk/calculadoras/mzda-za-nadcas"),
  "nahrada-mzdy": () => import("@/paises/sk/calculadoras/nahrada-mzdy"),
  "odchodne": () => import("@/paises/sk/calculadoras/odchodne"),
  "odstupne": () => import("@/paises/sk/calculadoras/odstupne"),
  "odvody-szco": () => import("@/paises/sk/calculadoras/odvody-szco"),
  "osetrovne": () => import("@/paises/sk/calculadoras/osetrovne"),
  "pausalne-vydavky": () => import("@/paises/sk/calculadoras/pausalne-vydavky"),
  "priplatky-za-pracu": () => import("@/paises/sk/calculadoras/priplatky-za-pracu"),
  "rodicovsky-prispevok": () => import("@/paises/sk/calculadoras/rodicovsky-prispevok"),
  "tehotenske": () => import("@/paises/sk/calculadoras/tehotenske"),
  "vypocet-cistej-mzdy": () => import("@/paises/sk/calculadoras/vypocet-cistej-mzdy"),
  "vypocet-dovolenky": () => import("@/paises/sk/calculadoras/vypocet-dovolenky"),
  "vypovedna-doba": () => import("@/paises/sk/calculadoras/vypovedna-doba"),
};
