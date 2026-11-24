// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "danok-na-imot": () => import("@/paises/mk/calculadoras/danok-na-imot"),
  "danok-na-nasledstvo-i-podarok": () => import("@/paises/mk/calculadoras/danok-na-nasledstvo-i-podarok"),
  "danok-na-promet-na-nedvizhnosti": () => import("@/paises/mk/calculadoras/danok-na-promet-na-nedvizhnosti"),
  "ddv-kalkulator": () => import("@/paises/mk/calculadoras/ddv-kalkulator"),
  "kalkulator-neto-vo-bruto": () => import("@/paises/mk/calculadoras/kalkulator-neto-vo-bruto"),
  "kalkulator-za-boleduvanje": () => import("@/paises/mk/calculadoras/kalkulator-za-boleduvanje"),
  "kalkulator-za-danok-na-dobivka": () => import("@/paises/mk/calculadoras/kalkulator-za-danok-na-dobivka"),
  "kalkulator-za-godishen-odmor": () => import("@/paises/mk/calculadoras/kalkulator-za-godishen-odmor"),
  "kalkulator-za-inflacija": () => import("@/paises/mk/calculadoras/kalkulator-za-inflacija"),
  "kalkulator-za-otpremnina": () => import("@/paises/mk/calculadoras/kalkulator-za-otpremnina"),
  "kalkulator-za-personalen-danok": () => import("@/paises/mk/calculadoras/kalkulator-za-personalen-danok"),
  "kalkulator-za-plata": () => import("@/paises/mk/calculadoras/kalkulator-za-plata"),
  "kalkulator-za-pridonesi": () => import("@/paises/mk/calculadoras/kalkulator-za-pridonesi"),
  "kalkulator-za-regres": () => import("@/paises/mk/calculadoras/kalkulator-za-regres"),
  "minimalna-plata": () => import("@/paises/mk/calculadoras/minimalna-plata"),
  "moj-ddv-povrat": () => import("@/paises/mk/calculadoras/moj-ddv-povrat"),
  "otkazen-rok": () => import("@/paises/mk/calculadoras/otkazen-rok"),
  "porodilno-otsustvo": () => import("@/paises/mk/calculadoras/porodilno-otsustvo"),
  "prekuvremena-rabota": () => import("@/paises/mk/calculadoras/prekuvremena-rabota"),
  "prosechna-plata": () => import("@/paises/mk/calculadoras/prosechna-plata"),
  "trosok-na-rabotodavach": () => import("@/paises/mk/calculadoras/trosok-na-rabotodavach"),
};
