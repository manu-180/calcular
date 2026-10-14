// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "abfindungsrechner": () => import("@/paises/de/calculadoras/abfindungsrechner"),
  "abgeltungsteuer-rechner": () => import("@/paises/de/calculadoras/abgeltungsteuer-rechner"),
  "arbeitgeberkosten-rechner": () => import("@/paises/de/calculadoras/arbeitgeberkosten-rechner"),
  "brutto-netto-rechner": () => import("@/paises/de/calculadoras/brutto-netto-rechner"),
  "einkommensteuer-rechner": () => import("@/paises/de/calculadoras/einkommensteuer-rechner"),
  "elterngeld-rechner": () => import("@/paises/de/calculadoras/elterngeld-rechner"),
  "erbschaftsteuer-rechner": () => import("@/paises/de/calculadoras/erbschaftsteuer-rechner"),
  "gewerbesteuer-rechner": () => import("@/paises/de/calculadoras/gewerbesteuer-rechner"),
  "grunderwerbsteuer-rechner": () => import("@/paises/de/calculadoras/grunderwerbsteuer-rechner"),
  "inflationsrechner": () => import("@/paises/de/calculadoras/inflationsrechner"),
  "kindergeld-rechner": () => import("@/paises/de/calculadoras/kindergeld-rechner"),
  "kirchensteuer-rechner": () => import("@/paises/de/calculadoras/kirchensteuer-rechner"),
  "kleinunternehmer-rechner": () => import("@/paises/de/calculadoras/kleinunternehmer-rechner"),
  "kuendigungsfrist-rechner": () => import("@/paises/de/calculadoras/kuendigungsfrist-rechner"),
  "lohnsteuer-rechner": () => import("@/paises/de/calculadoras/lohnsteuer-rechner"),
  "mehrwertsteuer-rechner": () => import("@/paises/de/calculadoras/mehrwertsteuer-rechner"),
  "midijob-rechner": () => import("@/paises/de/calculadoras/midijob-rechner"),
  "mindestlohn-rechner": () => import("@/paises/de/calculadoras/mindestlohn-rechner"),
  "minijob-rechner": () => import("@/paises/de/calculadoras/minijob-rechner"),
  "netto-brutto-rechner": () => import("@/paises/de/calculadoras/netto-brutto-rechner"),
  "pendlerpauschale-rechner": () => import("@/paises/de/calculadoras/pendlerpauschale-rechner"),
  "rentenrechner": () => import("@/paises/de/calculadoras/rentenrechner"),
  "solidaritaetszuschlag-rechner": () => import("@/paises/de/calculadoras/solidaritaetszuschlag-rechner"),
  "sozialversicherungs-rechner": () => import("@/paises/de/calculadoras/sozialversicherungs-rechner"),
  "steuerklassen-rechner": () => import("@/paises/de/calculadoras/steuerklassen-rechner"),
  "ueberstunden-rechner": () => import("@/paises/de/calculadoras/ueberstunden-rechner"),
  "urlaubsanspruch-rechner": () => import("@/paises/de/calculadoras/urlaubsanspruch-rechner"),
};
