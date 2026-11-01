// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "chartosima": () => import("@/paises/cy/calculadoras/chartosima"),
  "eisfores-autotelos-ergazomenon": () => import("@/paises/cy/calculadoras/eisfores-autotelos-ergazomenon"),
  "eisfores-gesy": () => import("@/paises/cy/calculadoras/eisfores-gesy"),
  "eisfores-koinonikon-asfaliseon": () => import("@/paises/cy/calculadoras/eisfores-koinonikon-asfaliseon"),
  "ektakti-eisfora-merismata": () => import("@/paises/cy/calculadoras/ektakti-eisfora-merismata"),
  "etisia-adeia": () => import("@/paises/cy/calculadoras/etisia-adeia"),
  "foros-kefalaiouchikon-kerdon": () => import("@/paises/cy/calculadoras/foros-kefalaiouchikon-kerdon"),
  "katotatos-misthos": () => import("@/paises/cy/calculadoras/katotatos-misthos"),
  "kostos-ergodoti": () => import("@/paises/cy/calculadoras/kostos-ergodoti"),
  "plirome-pleonasmou": () => import("@/paises/cy/calculadoras/plirome-pleonasmou"),
  "proeidopoiisi-termatismou": () => import("@/paises/cy/calculadoras/proeidopoiisi-termatismou"),
  "teli-metavivasis": () => import("@/paises/cy/calculadoras/teli-metavivasis"),
  "tokoi-katatheseon": () => import("@/paises/cy/calculadoras/tokoi-katatheseon"),
  "ypologismos-forou-eisodimatos": () => import("@/paises/cy/calculadoras/ypologismos-forou-eisodimatos"),
  "ypologismos-fpa": () => import("@/paises/cy/calculadoras/ypologismos-fpa"),
  "ypologismos-katharou-misthou": () => import("@/paises/cy/calculadoras/ypologismos-katharou-misthou"),
  "ypologismos-miktou-apo-katharo": () => import("@/paises/cy/calculadoras/ypologismos-miktou-apo-katharo"),
  "ypologismos-plithorismou": () => import("@/paises/cy/calculadoras/ypologismos-plithorismou"),
};
