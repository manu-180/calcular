// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "abfertigung-alt-rechner": () => import("@/paises/at/calculadoras/abfertigung-alt-rechner"),
  "abfertigung-neu-rechner": () => import("@/paises/at/calculadoras/abfertigung-neu-rechner"),
  "arbeitslosengeld-rechner": () => import("@/paises/at/calculadoras/arbeitslosengeld-rechner"),
  "brutto-netto-rechner": () => import("@/paises/at/calculadoras/brutto-netto-rechner"),
  "einkommensteuer-rechner": () => import("@/paises/at/calculadoras/einkommensteuer-rechner"),
  "familienbeihilfe-rechner": () => import("@/paises/at/calculadoras/familienbeihilfe-rechner"),
  "familienbonus-rechner": () => import("@/paises/at/calculadoras/familienbonus-rechner"),
  "geringfuegig-rechner": () => import("@/paises/at/calculadoras/geringfuegig-rechner"),
  "grunderwerbsteuer-rechner": () => import("@/paises/at/calculadoras/grunderwerbsteuer-rechner"),
  "immoest-rechner": () => import("@/paises/at/calculadoras/immoest-rechner"),
  "inflationsrechner": () => import("@/paises/at/calculadoras/inflationsrechner"),
  "kest-rechner": () => import("@/paises/at/calculadoras/kest-rechner"),
  "kleinunternehmer-rechner": () => import("@/paises/at/calculadoras/kleinunternehmer-rechner"),
  "kuendigungsfrist-rechner": () => import("@/paises/at/calculadoras/kuendigungsfrist-rechner"),
  "lohnnebenkosten-rechner": () => import("@/paises/at/calculadoras/lohnnebenkosten-rechner"),
  "mehrwertsteuer-rechner": () => import("@/paises/at/calculadoras/mehrwertsteuer-rechner"),
  "netto-brutto-rechner": () => import("@/paises/at/calculadoras/netto-brutto-rechner"),
  "pendlerpauschale-rechner": () => import("@/paises/at/calculadoras/pendlerpauschale-rechner"),
  "sozialversicherung-rechner": () => import("@/paises/at/calculadoras/sozialversicherung-rechner"),
  "ueberstunden-rechner": () => import("@/paises/at/calculadoras/ueberstunden-rechner"),
  "urlaubsanspruch-rechner": () => import("@/paises/at/calculadoras/urlaubsanspruch-rechner"),
  "urlaubsgeld-weihnachtsgeld-rechner": () => import("@/paises/at/calculadoras/urlaubsgeld-weihnachtsgeld-rechner"),
};
