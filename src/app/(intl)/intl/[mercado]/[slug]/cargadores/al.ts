// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "afati-i-njoftimit": () => import("@/paises/al/calculadoras/afati-i-njoftimit"),
  "biznesi-i-vogel": () => import("@/paises/al/calculadoras/biznesi-i-vogel"),
  "kalkulator-inflacioni": () => import("@/paises/al/calculadoras/kalkulator-inflacioni"),
  "kalkulator-page": () => import("@/paises/al/calculadoras/kalkulator-page"),
  "kalkulator-tvsh": () => import("@/paises/al/calculadoras/kalkulator-tvsh"),
  "kontributet-e-sigurimeve": () => import("@/paises/al/calculadoras/kontributet-e-sigurimeve"),
  "kosto-e-punedhenesit": () => import("@/paises/al/calculadoras/kosto-e-punedhenesit"),
  "kursi-i-kembimit": () => import("@/paises/al/calculadoras/kursi-i-kembimit"),
  "leja-vjetore": () => import("@/paises/al/calculadoras/leja-vjetore"),
  "oret-shtese": () => import("@/paises/al/calculadoras/oret-shtese"),
  "paga-bruto-nga-neto": () => import("@/paises/al/calculadoras/paga-bruto-nga-neto"),
  "paga-minimale": () => import("@/paises/al/calculadoras/paga-minimale"),
  "pagesa-e-barnise": () => import("@/paises/al/calculadoras/pagesa-e-barnise"),
  "pagesa-e-semundjes": () => import("@/paises/al/calculadoras/pagesa-e-semundjes"),
  "shperblimi-per-vjetersi": () => import("@/paises/al/calculadoras/shperblimi-per-vjetersi"),
  "taksa-e-ndertesave": () => import("@/paises/al/calculadoras/taksa-e-ndertesave"),
  "tatimi-dhurata-trashegimi": () => import("@/paises/al/calculadoras/tatimi-dhurata-trashegimi"),
  "tatimi-mbi-dividendin": () => import("@/paises/al/calculadoras/tatimi-mbi-dividendin"),
  "tatimi-mbi-fitimin": () => import("@/paises/al/calculadoras/tatimi-mbi-fitimin"),
  "tatimi-mbi-pagen": () => import("@/paises/al/calculadoras/tatimi-mbi-pagen"),
  "tatimi-mbi-qirane": () => import("@/paises/al/calculadoras/tatimi-mbi-qirane"),
  "tatimi-per-profesionistet": () => import("@/paises/al/calculadoras/tatimi-per-profesionistet"),
  "tatimi-shitja-e-prones": () => import("@/paises/al/calculadoras/tatimi-shitja-e-prones"),
};
