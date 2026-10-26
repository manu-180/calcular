// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "ekwiwalent-za-urlop": () => import("@/paises/pl/calculadoras/ekwiwalent-za-urlop"),
  "kalkulator-b2b": () => import("@/paises/pl/calculadoras/kalkulator-b2b"),
  "kalkulator-chorobowego": () => import("@/paises/pl/calculadoras/kalkulator-chorobowego"),
  "kalkulator-inflacji": () => import("@/paises/pl/calculadoras/kalkulator-inflacji"),
  "kalkulator-lokat": () => import("@/paises/pl/calculadoras/kalkulator-lokat"),
  "kalkulator-odsetek-ustawowych": () => import("@/paises/pl/calculadoras/kalkulator-odsetek-ustawowych"),
  "kalkulator-pcc": () => import("@/paises/pl/calculadoras/kalkulator-pcc"),
  "kalkulator-pit": () => import("@/paises/pl/calculadoras/kalkulator-pit"),
  "kalkulator-ryczaltu": () => import("@/paises/pl/calculadoras/kalkulator-ryczaltu"),
  "kalkulator-vat": () => import("@/paises/pl/calculadoras/kalkulator-vat"),
  "kalkulator-walut": () => import("@/paises/pl/calculadoras/kalkulator-walut"),
  "kalkulator-wynagrodzen": () => import("@/paises/pl/calculadoras/kalkulator-wynagrodzen"),
  "koszt-pracodawcy": () => import("@/paises/pl/calculadoras/koszt-pracodawcy"),
  "maly-zus-plus": () => import("@/paises/pl/calculadoras/maly-zus-plus"),
  "nadgodziny": () => import("@/paises/pl/calculadoras/nadgodziny"),
  "odprawa": () => import("@/paises/pl/calculadoras/odprawa"),
  "okres-wypowiedzenia": () => import("@/paises/pl/calculadoras/okres-wypowiedzenia"),
  "placa-minimalna": () => import("@/paises/pl/calculadoras/placa-minimalna"),
  "podatek-belki": () => import("@/paises/pl/calculadoras/podatek-belki"),
  "skladki-zus": () => import("@/paises/pl/calculadoras/skladki-zus"),
  "umowa-o-dzielo": () => import("@/paises/pl/calculadoras/umowa-o-dzielo"),
  "umowa-zlecenie": () => import("@/paises/pl/calculadoras/umowa-zlecenie"),
  "urlop-wypoczynkowy": () => import("@/paises/pl/calculadoras/urlop-wypoczynkowy"),
  "wymiar-czasu-pracy": () => import("@/paises/pl/calculadoras/wymiar-czasu-pracy"),
};
