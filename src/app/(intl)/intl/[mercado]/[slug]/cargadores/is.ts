// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "atvinnuleysisbaetur": () => import("@/paises/is/calculadoras/atvinnuleysisbaetur"),
  "barnabaetur": () => import("@/paises/is/calculadoras/barnabaetur"),
  "brutto-ur-neti": () => import("@/paises/is/calculadoras/brutto-ur-neti"),
  "dagpeningar": () => import("@/paises/is/calculadoras/dagpeningar"),
  "desemberuppbot": () => import("@/paises/is/calculadoras/desemberuppbot"),
  "drattarvextir": () => import("@/paises/is/calculadoras/drattarvextir"),
  "ellilifeyrir": () => import("@/paises/is/calculadoras/ellilifeyrir"),
  "erfdafjarskattur": () => import("@/paises/is/calculadoras/erfdafjarskattur"),
  "faedingarorlof": () => import("@/paises/is/calculadoras/faedingarorlof"),
  "fjarmagnstekjuskattur": () => import("@/paises/is/calculadoras/fjarmagnstekjuskattur"),
  "gengi": () => import("@/paises/is/calculadoras/gengi"),
  "launakostnadur": () => import("@/paises/is/calculadoras/launakostnadur"),
  "launareiknivel": () => import("@/paises/is/calculadoras/launareiknivel"),
  "leigutekjur": () => import("@/paises/is/calculadoras/leigutekjur"),
  "lifeyrissjodur": () => import("@/paises/is/calculadoras/lifeyrissjodur"),
  "orlofslaun": () => import("@/paises/is/calculadoras/orlofslaun"),
  "orlofsuppbot": () => import("@/paises/is/calculadoras/orlofsuppbot"),
  "personuafslattur": () => import("@/paises/is/calculadoras/personuafslattur"),
  "stimpilgjald": () => import("@/paises/is/calculadoras/stimpilgjald"),
  "tekjuskattur": () => import("@/paises/is/calculadoras/tekjuskattur"),
  "tryggingagjald": () => import("@/paises/is/calculadoras/tryggingagjald"),
  "vaxtabaetur": () => import("@/paises/is/calculadoras/vaxtabaetur"),
  "verdbolga": () => import("@/paises/is/calculadoras/verdbolga"),
  "verdtrygging": () => import("@/paises/is/calculadoras/verdtrygging"),
  "vsk-reiknivel": () => import("@/paises/is/calculadoras/vsk-reiknivel"),
};
