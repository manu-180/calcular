// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "13-monatslohn-rechner": () => import("@/paises/ch/calculadoras/13-monatslohn-rechner"),
  "ahv-beitraege-selbststaendige": () => import("@/paises/ch/calculadoras/ahv-beitraege-selbststaendige"),
  "ahv-rentenrechner": () => import("@/paises/ch/calculadoras/ahv-rentenrechner"),
  "arbeitslosengeld-rechner": () => import("@/paises/ch/calculadoras/arbeitslosengeld-rechner"),
  "brutto-netto-rechner": () => import("@/paises/ch/calculadoras/brutto-netto-rechner"),
  "bundessteuer-rechner": () => import("@/paises/ch/calculadoras/bundessteuer-rechner"),
  "bvg-rechner": () => import("@/paises/ch/calculadoras/bvg-rechner"),
  "ferienrechner": () => import("@/paises/ch/calculadoras/ferienrechner"),
  "kapitalbezug-steuer-rechner": () => import("@/paises/ch/calculadoras/kapitalbezug-steuer-rechner"),
  "kinderzulagen-rechner": () => import("@/paises/ch/calculadoras/kinderzulagen-rechner"),
  "kuendigungsfrist-rechner": () => import("@/paises/ch/calculadoras/kuendigungsfrist-rechner"),
  "lohnkosten-rechner": () => import("@/paises/ch/calculadoras/lohnkosten-rechner"),
  "mietzinsrechner": () => import("@/paises/ch/calculadoras/mietzinsrechner"),
  "mutterschaftsentschaedigung-rechner": () => import("@/paises/ch/calculadoras/mutterschaftsentschaedigung-rechner"),
  "mwst-rechner": () => import("@/paises/ch/calculadoras/mwst-rechner"),
  "netto-brutto-rechner": () => import("@/paises/ch/calculadoras/netto-brutto-rechner"),
  "saeule-3a-rechner": () => import("@/paises/ch/calculadoras/saeule-3a-rechner"),
  "saron-hypothek-rechner": () => import("@/paises/ch/calculadoras/saron-hypothek-rechner"),
  "teuerungsrechner": () => import("@/paises/ch/calculadoras/teuerungsrechner"),
  "ueberstunden-rechner": () => import("@/paises/ch/calculadoras/ueberstunden-rechner"),
  "vaterschaftsentschaedigung-rechner": () => import("@/paises/ch/calculadoras/vaterschaftsentschaedigung-rechner"),
  "verzugszinsrechner": () => import("@/paises/ch/calculadoras/verzugszinsrechner"),
};
