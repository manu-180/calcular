// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "arbeidsgiveravgift": () => import("@/paises/no/calculadoras/arbeidsgiveravgift"),
  "barnetrygd": () => import("@/paises/no/calculadoras/barnetrygd"),
  "dagpenger": () => import("@/paises/no/calculadoras/dagpenger"),
  "dokumentavgift": () => import("@/paises/no/calculadoras/dokumentavgift"),
  "feriepenger": () => import("@/paises/no/calculadoras/feriepenger"),
  "foreldrepenger": () => import("@/paises/no/calculadoras/foreldrepenger"),
  "formuesskatt": () => import("@/paises/no/calculadoras/formuesskatt"),
  "forsinkelsesrente": () => import("@/paises/no/calculadoras/forsinkelsesrente"),
  "grunnbelopet": () => import("@/paises/no/calculadoras/grunnbelopet"),
  "kontantstotte": () => import("@/paises/no/calculadoras/kontantstotte"),
  "kpi-kalkulator": () => import("@/paises/no/calculadoras/kpi-kalkulator"),
  "lonn-etter-skatt": () => import("@/paises/no/calculadoras/lonn-etter-skatt"),
  "mva-kalkulator": () => import("@/paises/no/calculadoras/mva-kalkulator"),
  "oppsigelsestid": () => import("@/paises/no/calculadoras/oppsigelsestid"),
  "overtidstillegg": () => import("@/paises/no/calculadoras/overtidstillegg"),
  "skattekalkulator": () => import("@/paises/no/calculadoras/skattekalkulator"),
  "sykepenger": () => import("@/paises/no/calculadoras/sykepenger"),
  "trinnskatt": () => import("@/paises/no/calculadoras/trinnskatt"),
  "trygdeavgift": () => import("@/paises/no/calculadoras/trygdeavgift"),
  "utbytteskatt": () => import("@/paises/no/calculadoras/utbytteskatt"),
  "valutakalkulator": () => import("@/paises/no/calculadoras/valutakalkulator"),
};
