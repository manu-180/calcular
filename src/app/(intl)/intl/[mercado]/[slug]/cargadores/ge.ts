// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "binis-gakidvis-gadasakhadi": () => import("@/paises/ge/calculadoras/binis-gakidvis-gadasakhadi"),
  "bruto-netodan": () => import("@/paises/ge/calculadoras/bruto-netodan"),
  "daavadebis-anazghaureba": () => import("@/paises/ge/calculadoras/daavadebis-anazghaureba"),
  "dagrovebiti-pensia": () => import("@/paises/ge/calculadoras/dagrovebiti-pensia"),
  "damsakmeblis-kharji": () => import("@/paises/ge/calculadoras/damsakmeblis-kharji"),
  "dekretuli-shvebuleba": () => import("@/paises/ge/calculadoras/dekretuli-shvebuleba"),
  "dghg-kalkulatori": () => import("@/paises/ge/calculadoras/dghg-kalkulatori"),
  "dividendis-gadasakhadi": () => import("@/paises/ge/calculadoras/dividendis-gadasakhadi"),
  "gaprtkhilebis-vada": () => import("@/paises/ge/calculadoras/gaprtkhilebis-vada"),
  "gatavisuplebis-kompensatsia": () => import("@/paises/ge/calculadoras/gatavisuplebis-kompensatsia"),
  "inflatsiis-kalkulatori": () => import("@/paises/ge/calculadoras/inflatsiis-kalkulatori"),
  "khelpasis-dagvianeba": () => import("@/paises/ge/calculadoras/khelpasis-dagvianeba"),
  "khelpasis-kalkulatori": () => import("@/paises/ge/calculadoras/khelpasis-kalkulatori"),
  "kiris-gadasakhadi": () => import("@/paises/ge/calculadoras/kiris-gadasakhadi"),
  "konebis-gadasakhadi": () => import("@/paises/ge/calculadoras/konebis-gadasakhadi"),
  "mogebis-gadasakhadi": () => import("@/paises/ge/calculadoras/mogebis-gadasakhadi"),
  "mtsire-biznesis-gadasakhadi": () => import("@/paises/ge/calculadoras/mtsire-biznesis-gadasakhadi"),
  "sapensio-shenatani": () => import("@/paises/ge/calculadoras/sapensio-shenatani"),
  "saprotsento-shemosavlis-gadasakhadi": () => import("@/paises/ge/calculadoras/saprotsento-shemosavlis-gadasakhadi"),
  "sashemosavlo-gadasakhadi": () => import("@/paises/ge/calculadoras/sashemosavlo-gadasakhadi"),
  "shvebulebis-anazghaureba": () => import("@/paises/ge/calculadoras/shvebulebis-anazghaureba"),
  "valutis-kursi": () => import("@/paises/ge/calculadoras/valutis-kursi"),
  "zeganakveturi-anazghaureba": () => import("@/paises/ge/calculadoras/zeganakveturi-anazghaureba"),
};
