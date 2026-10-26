// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "aktieskat": () => import("@/paises/dk/calculadoras/aktieskat"),
  "am-bidrag": () => import("@/paises/dk/calculadoras/am-bidrag"),
  "atp-bidrag": () => import("@/paises/dk/calculadoras/atp-bidrag"),
  "boerne-og-ungeydelse": () => import("@/paises/dk/calculadoras/boerne-og-ungeydelse"),
  "dagpenge": () => import("@/paises/dk/calculadoras/dagpenge"),
  "ejendomsvaerdiskat": () => import("@/paises/dk/calculadoras/ejendomsvaerdiskat"),
  "feriepenge": () => import("@/paises/dk/calculadoras/feriepenge"),
  "folkepension": () => import("@/paises/dk/calculadoras/folkepension"),
  "fratraedelsesgodtgoerelse": () => import("@/paises/dk/calculadoras/fratraedelsesgodtgoerelse"),
  "gaveafgift": () => import("@/paises/dk/calculadoras/gaveafgift"),
  "grundskyld": () => import("@/paises/dk/calculadoras/grundskyld"),
  "inflationsberegner": () => import("@/paises/dk/calculadoras/inflationsberegner"),
  "koerselsfradrag": () => import("@/paises/dk/calculadoras/koerselsfradrag"),
  "koerselsgodtgoerelse": () => import("@/paises/dk/calculadoras/koerselsgodtgoerelse"),
  "kommuneskat": () => import("@/paises/dk/calculadoras/kommuneskat"),
  "loen-efter-skat": () => import("@/paises/dk/calculadoras/loen-efter-skat"),
  "momsberegner": () => import("@/paises/dk/calculadoras/momsberegner"),
  "morarenter": () => import("@/paises/dk/calculadoras/morarenter"),
  "opsigelsesvarsel": () => import("@/paises/dk/calculadoras/opsigelsesvarsel"),
  "su-beregner": () => import("@/paises/dk/calculadoras/su-beregner"),
  "topskat": () => import("@/paises/dk/calculadoras/topskat"),
  "valutaomregner": () => import("@/paises/dk/calculadoras/valutaomregner"),
};
