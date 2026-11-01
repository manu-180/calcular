// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "kalkulator-godisnjeg-odmora": () => import("@/paises/rs/calculadoras/kalkulator-godisnjeg-odmora"),
  "kalkulator-inflacije": () => import("@/paises/rs/calculadoras/kalkulator-inflacije"),
  "kalkulator-pdv": () => import("@/paises/rs/calculadoras/kalkulator-pdv"),
  "kalkulator-plate": () => import("@/paises/rs/calculadoras/kalkulator-plate"),
  "kurs-nbs": () => import("@/paises/rs/calculadoras/kurs-nbs"),
  "minimalna-zarada": () => import("@/paises/rs/calculadoras/minimalna-zarada"),
  "neto-u-bruto": () => import("@/paises/rs/calculadoras/neto-u-bruto"),
  "obracun-bolovanja": () => import("@/paises/rs/calculadoras/obracun-bolovanja"),
  "obracun-doprinosa": () => import("@/paises/rs/calculadoras/obracun-doprinosa"),
  "obracun-otpremnine": () => import("@/paises/rs/calculadoras/obracun-otpremnine"),
  "obracun-prekovremenog-rada": () => import("@/paises/rs/calculadoras/obracun-prekovremenog-rada"),
  "otkazni-rok": () => import("@/paises/rs/calculadoras/otkazni-rok"),
  "pausal-kalkulator": () => import("@/paises/rs/calculadoras/pausal-kalkulator"),
  "porez-na-imovinu": () => import("@/paises/rs/calculadoras/porez-na-imovinu"),
  "porez-na-prenos-apsolutnih-prava": () => import("@/paises/rs/calculadoras/porez-na-prenos-apsolutnih-prava"),
  "porez-na-zarade": () => import("@/paises/rs/calculadoras/porez-na-zarade"),
  "porodiljsko-odsustvo": () => import("@/paises/rs/calculadoras/porodiljsko-odsustvo"),
  "prosecna-plata": () => import("@/paises/rs/calculadoras/prosecna-plata"),
  "regres-i-topli-obrok": () => import("@/paises/rs/calculadoras/regres-i-topli-obrok"),
  "trosak-poslodavca": () => import("@/paises/rs/calculadoras/trosak-poslodavca"),
};
