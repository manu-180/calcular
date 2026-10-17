// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "13e-salaire": () => traducida(import("@/paises/ch/calculadoras/13-monatslohn-rechner"), import("@/paises/ch-fr/textos/13-monatslohn-rechner")),
  "allocation-maternite": () => traducida(import("@/paises/ch/calculadoras/mutterschaftsentschaedigung-rechner"), import("@/paises/ch-fr/textos/mutterschaftsentschaedigung-rechner")),
  "allocations-familiales": () => traducida(import("@/paises/ch/calculadoras/kinderzulagen-rechner"), import("@/paises/ch-fr/textos/kinderzulagen-rechner")),
  "calcul-loyer-taux-reference": () => traducida(import("@/paises/ch/calculadoras/mietzinsrechner"), import("@/paises/ch-fr/textos/mietzinsrechner")),
  "calcul-lpp": () => traducida(import("@/paises/ch/calculadoras/bvg-rechner"), import("@/paises/ch-fr/textos/bvg-rechner")),
  "calcul-rencherissement": () => traducida(import("@/paises/ch/calculadoras/teuerungsrechner"), import("@/paises/ch-fr/textos/teuerungsrechner")),
  "calcul-salaire-net": () => traducida(import("@/paises/ch/calculadoras/brutto-netto-rechner"), import("@/paises/ch-fr/textos/brutto-netto-rechner")),
  "calcul-tva": () => traducida(import("@/paises/ch/calculadoras/mwst-rechner"), import("@/paises/ch-fr/textos/mwst-rechner")),
  "calcul-vacances": () => traducida(import("@/paises/ch/calculadoras/ferienrechner"), import("@/paises/ch-fr/textos/ferienrechner")),
  "conge-paternite": () => traducida(import("@/paises/ch/calculadoras/vaterschaftsentschaedigung-rechner"), import("@/paises/ch-fr/textos/vaterschaftsentschaedigung-rechner")),
  "cotisations-avs-independants": () => traducida(import("@/paises/ch/calculadoras/ahv-beitraege-selbststaendige"), import("@/paises/ch-fr/textos/ahv-beitraege-selbststaendige")),
  "cout-employeur": () => traducida(import("@/paises/ch/calculadoras/lohnkosten-rechner"), import("@/paises/ch-fr/textos/lohnkosten-rechner")),
  "delai-de-conge": () => traducida(import("@/paises/ch/calculadoras/kuendigungsfrist-rechner"), import("@/paises/ch-fr/textos/kuendigungsfrist-rechner")),
  "heures-supplementaires": () => traducida(import("@/paises/ch/calculadoras/ueberstunden-rechner"), import("@/paises/ch-fr/textos/ueberstunden-rechner")),
  "hypotheque-saron": () => traducida(import("@/paises/ch/calculadoras/saron-hypothek-rechner"), import("@/paises/ch-fr/textos/saron-hypothek-rechner")),
  "impot-federal-direct": () => traducida(import("@/paises/ch/calculadoras/bundessteuer-rechner"), import("@/paises/ch-fr/textos/bundessteuer-rechner")),
  "impot-retrait-capital": () => traducida(import("@/paises/ch/calculadoras/kapitalbezug-steuer-rechner"), import("@/paises/ch-fr/textos/kapitalbezug-steuer-rechner")),
  "indemnite-chomage": () => traducida(import("@/paises/ch/calculadoras/arbeitslosengeld-rechner"), import("@/paises/ch-fr/textos/arbeitslosengeld-rechner")),
  "interet-moratoire": () => traducida(import("@/paises/ch/calculadoras/verzugszinsrechner"), import("@/paises/ch-fr/textos/verzugszinsrechner")),
  "pilier-3a": () => traducida(import("@/paises/ch/calculadoras/saeule-3a-rechner"), import("@/paises/ch-fr/textos/saeule-3a-rechner")),
  "rente-avs": () => traducida(import("@/paises/ch/calculadoras/ahv-rentenrechner"), import("@/paises/ch-fr/textos/ahv-rentenrechner")),
  "salaire-net-en-brut": () => traducida(import("@/paises/ch/calculadoras/netto-brutto-rechner"), import("@/paises/ch-fr/textos/netto-brutto-rechner")),
};
