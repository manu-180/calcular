// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "davek-na-promet-nepremicnin": () => import("@/paises/si/calculadoras/davek-na-promet-nepremicnin"),
  "ddv-kalkulator": () => import("@/paises/si/calculadoras/ddv-kalkulator"),
  "izracun-bolniske": () => import("@/paises/si/calculadoras/izracun-bolniske"),
  "izracun-nadur": () => import("@/paises/si/calculadoras/izracun-nadur"),
  "izracun-odpravnine": () => import("@/paises/si/calculadoras/izracun-odpravnine"),
  "izracun-place": () => import("@/paises/si/calculadoras/izracun-place"),
  "izracun-pokojnine": () => import("@/paises/si/calculadoras/izracun-pokojnine"),
  "izracun-prispevkov": () => import("@/paises/si/calculadoras/izracun-prispevkov"),
  "izracun-regresa": () => import("@/paises/si/calculadoras/izracun-regresa"),
  "kalkulator-dohodnine": () => import("@/paises/si/calculadoras/kalkulator-dohodnine"),
  "kalkulator-inflacije": () => import("@/paises/si/calculadoras/kalkulator-inflacije"),
  "letni-dopust": () => import("@/paises/si/calculadoras/letni-dopust"),
  "minimalna-placa": () => import("@/paises/si/calculadoras/minimalna-placa"),
  "neto-bruto-kalkulator": () => import("@/paises/si/calculadoras/neto-bruto-kalkulator"),
  "odpovedni-rok": () => import("@/paises/si/calculadoras/odpovedni-rok"),
  "olajsava-za-otroke": () => import("@/paises/si/calculadoras/olajsava-za-otroke"),
  "otroski-dodatek": () => import("@/paises/si/calculadoras/otroski-dodatek"),
  "povprecna-placa": () => import("@/paises/si/calculadoras/povprecna-placa"),
  "prispevki-sp": () => import("@/paises/si/calculadoras/prispevki-sp"),
  "sp-normiranec": () => import("@/paises/si/calculadoras/sp-normiranec"),
  "starsevski-dopust": () => import("@/paises/si/calculadoras/starsevski-dopust"),
  "strosek-delodajalca": () => import("@/paises/si/calculadoras/strosek-delodajalca"),
  "tecaj-evra": () => import("@/paises/si/calculadoras/tecaj-evra"),
  "zimski-regres": () => import("@/paises/si/calculadoras/zimski-regres"),
};
