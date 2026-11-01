// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "algas-kalkulators": () => import("@/paises/lv/calculadoras/algas-kalkulators"),
  "atlaisanas-pabalsts": () => import("@/paises/lv/calculadoras/atlaisanas-pabalsts"),
  "atvalinajuma-naudas-aprekins": () => import("@/paises/lv/calculadoras/atvalinajuma-naudas-aprekins"),
  "bezdarbnieka-pabalsts": () => import("@/paises/lv/calculadoras/bezdarbnieka-pabalsts"),
  "darba-deveja-izmaksas": () => import("@/paises/lv/calculadoras/darba-deveja-izmaksas"),
  "iin-kalkulators": () => import("@/paises/lv/calculadoras/iin-kalkulators"),
  "inflacijas-kalkulators": () => import("@/paises/lv/calculadoras/inflacijas-kalkulators"),
  "maternitates-pabalsts": () => import("@/paises/lv/calculadoras/maternitates-pabalsts"),
  "mikrouznemuma-nodoklis": () => import("@/paises/lv/calculadoras/mikrouznemuma-nodoklis"),
  "minimala-alga": () => import("@/paises/lv/calculadoras/minimala-alga"),
  "neapliekamais-minimums": () => import("@/paises/lv/calculadoras/neapliekamais-minimums"),
  "nekustama-ipasuma-nodoklis": () => import("@/paises/lv/calculadoras/nekustama-ipasuma-nodoklis"),
  "neto-bruto-kalkulators": () => import("@/paises/lv/calculadoras/neto-bruto-kalkulators"),
  "pasnodarbinata-nodokli": () => import("@/paises/lv/calculadoras/pasnodarbinata-nodokli"),
  "pvn-kalkulators": () => import("@/paises/lv/calculadoras/pvn-kalkulators"),
  "slimibas-naudas-aprekins": () => import("@/paises/lv/calculadoras/slimibas-naudas-aprekins"),
  "uzteikuma-termins": () => import("@/paises/lv/calculadoras/uzteikuma-termins"),
  "vecaku-pabalsts": () => import("@/paises/lv/calculadoras/vecaku-pabalsts"),
  "videja-alga": () => import("@/paises/lv/calculadoras/videja-alga"),
  "virsstundu-aprekins": () => import("@/paises/lv/calculadoras/virsstundu-aprekins"),
  "vsaoi-kalkulators": () => import("@/paises/lv/calculadoras/vsaoi-kalkulators"),
};
