// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "arbetsgivaravgift": () => import("@/paises/se/calculadoras/arbetsgivaravgift"),
  "barnbidrag": () => import("@/paises/se/calculadoras/barnbidrag"),
  "csn-aterbetalning": () => import("@/paises/se/calculadoras/csn-aterbetalning"),
  "drojsmalsranta": () => import("@/paises/se/calculadoras/drojsmalsranta"),
  "egenavgifter": () => import("@/paises/se/calculadoras/egenavgifter"),
  "fastighetsavgift": () => import("@/paises/se/calculadoras/fastighetsavgift"),
  "foraldrapenning": () => import("@/paises/se/calculadoras/foraldrapenning"),
  "inflationskalkylator": () => import("@/paises/se/calculadoras/inflationskalkylator"),
  "isk-skatt": () => import("@/paises/se/calculadoras/isk-skatt"),
  "lagfart": () => import("@/paises/se/calculadoras/lagfart"),
  "lon-efter-skatt": () => import("@/paises/se/calculadoras/lon-efter-skatt"),
  "momskalkylator": () => import("@/paises/se/calculadoras/momskalkylator"),
  "prisbasbelopp": () => import("@/paises/se/calculadoras/prisbasbelopp"),
  "ranteavdrag": () => import("@/paises/se/calculadoras/ranteavdrag"),
  "reseavdrag": () => import("@/paises/se/calculadoras/reseavdrag"),
  "semesterdagar": () => import("@/paises/se/calculadoras/semesterdagar"),
  "semesterersattning": () => import("@/paises/se/calculadoras/semesterersattning"),
  "sjuklon": () => import("@/paises/se/calculadoras/sjuklon"),
  "sjukpenning": () => import("@/paises/se/calculadoras/sjukpenning"),
  "skatt-pa-bostadsforsaljning": () => import("@/paises/se/calculadoras/skatt-pa-bostadsforsaljning"),
  "statlig-skatt": () => import("@/paises/se/calculadoras/statlig-skatt"),
  "traktamente": () => import("@/paises/se/calculadoras/traktamente"),
  "uppsagningstid": () => import("@/paises/se/calculadoras/uppsagningstid"),
  "valutaomvandlare": () => import("@/paises/se/calculadoras/valutaomvandlare"),
};
