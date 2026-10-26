// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "dohoda-o-provedeni-prace": () => import("@/paises/cz/calculadoras/dohoda-o-provedeni-prace"),
  "duchodova-kalkulacka": () => import("@/paises/cz/calculadoras/duchodova-kalkulacka"),
  "inflacni-kalkulacka": () => import("@/paises/cz/calculadoras/inflacni-kalkulacka"),
  "kalkulacka-dph": () => import("@/paises/cz/calculadoras/kalkulacka-dph"),
  "kalkulacka-materske": () => import("@/paises/cz/calculadoras/kalkulacka-materske"),
  "kalkulacka-nemocenske": () => import("@/paises/cz/calculadoras/kalkulacka-nemocenske"),
  "kurzova-kalkulacka": () => import("@/paises/cz/calculadoras/kurzova-kalkulacka"),
  "minimalni-mzda": () => import("@/paises/cz/calculadoras/minimalni-mzda"),
  "nahrada-mzdy-za-dovolenou": () => import("@/paises/cz/calculadoras/nahrada-mzdy-za-dovolenou"),
  "naklady-zamestnavatele": () => import("@/paises/cz/calculadoras/naklady-zamestnavatele"),
  "odstupne": () => import("@/paises/cz/calculadoras/odstupne"),
  "pausalni-dan": () => import("@/paises/cz/calculadoras/pausalni-dan"),
  "pausalni-vydaje": () => import("@/paises/cz/calculadoras/pausalni-vydaje"),
  "priplatek-za-prescas": () => import("@/paises/cz/calculadoras/priplatek-za-prescas"),
  "prumerny-vydelek": () => import("@/paises/cz/calculadoras/prumerny-vydelek"),
  "rodicovsky-prispevek": () => import("@/paises/cz/calculadoras/rodicovsky-prispevek"),
  "urok-z-prodleni": () => import("@/paises/cz/calculadoras/urok-z-prodleni"),
  "vypocet-ciste-mzdy": () => import("@/paises/cz/calculadoras/vypocet-ciste-mzdy"),
  "vypocet-dovolene": () => import("@/paises/cz/calculadoras/vypocet-dovolene"),
  "vypovedni-doba": () => import("@/paises/cz/calculadoras/vypovedni-doba"),
  "zalohy-osvc": () => import("@/paises/cz/calculadoras/zalohy-osvc"),
};
