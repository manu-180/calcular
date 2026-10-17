// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "assegni-familiari": () => traducida(import("@/paises/ch/calculadoras/kinderzulagen-rechner"), import("@/paises/ch-it/textos/kinderzulagen-rechner")),
  "calcolo-iva": () => traducida(import("@/paises/ch/calculadoras/mwst-rechner"), import("@/paises/ch-it/textos/mwst-rechner")),
  "calcolo-lpp": () => traducida(import("@/paises/ch/calculadoras/bvg-rechner"), import("@/paises/ch-it/textos/bvg-rechner")),
  "calcolo-pigione-tasso-di-riferimento": () => traducida(import("@/paises/ch/calculadoras/mietzinsrechner"), import("@/paises/ch-it/textos/mietzinsrechner")),
  "calcolo-rincaro": () => traducida(import("@/paises/ch/calculadoras/teuerungsrechner"), import("@/paises/ch-it/textos/teuerungsrechner")),
  "calcolo-stipendio-netto": () => traducida(import("@/paises/ch/calculadoras/brutto-netto-rechner"), import("@/paises/ch-it/textos/brutto-netto-rechner")),
  "calcolo-vacanze": () => traducida(import("@/paises/ch/calculadoras/ferienrechner"), import("@/paises/ch-it/textos/ferienrechner")),
  "congedo-di-paternita": () => traducida(import("@/paises/ch/calculadoras/vaterschaftsentschaedigung-rechner"), import("@/paises/ch-it/textos/vaterschaftsentschaedigung-rechner")),
  "contributi-avs-indipendenti": () => traducida(import("@/paises/ch/calculadoras/ahv-beitraege-selbststaendige"), import("@/paises/ch-it/textos/ahv-beitraege-selbststaendige")),
  "costo-datore-di-lavoro": () => traducida(import("@/paises/ch/calculadoras/lohnkosten-rechner"), import("@/paises/ch-it/textos/lohnkosten-rechner")),
  "imposta-federale-diretta": () => traducida(import("@/paises/ch/calculadoras/bundessteuer-rechner"), import("@/paises/ch-it/textos/bundessteuer-rechner")),
  "imposta-prelievo-capitale": () => traducida(import("@/paises/ch/calculadoras/kapitalbezug-steuer-rechner"), import("@/paises/ch-it/textos/kapitalbezug-steuer-rechner")),
  "indennita-di-disoccupazione": () => traducida(import("@/paises/ch/calculadoras/arbeitslosengeld-rechner"), import("@/paises/ch-it/textos/arbeitslosengeld-rechner")),
  "indennita-di-maternita": () => traducida(import("@/paises/ch/calculadoras/mutterschaftsentschaedigung-rechner"), import("@/paises/ch-it/textos/mutterschaftsentschaedigung-rechner")),
  "interessi-di-mora": () => traducida(import("@/paises/ch/calculadoras/verzugszinsrechner"), import("@/paises/ch-it/textos/verzugszinsrechner")),
  "ipoteca-saron": () => traducida(import("@/paises/ch/calculadoras/saron-hypothek-rechner"), import("@/paises/ch-it/textos/saron-hypothek-rechner")),
  "lavoro-straordinario": () => traducida(import("@/paises/ch/calculadoras/ueberstunden-rechner"), import("@/paises/ch-it/textos/ueberstunden-rechner")),
  "pilastro-3a": () => traducida(import("@/paises/ch/calculadoras/saeule-3a-rechner"), import("@/paises/ch-it/textos/saeule-3a-rechner")),
  "rendita-avs": () => traducida(import("@/paises/ch/calculadoras/ahv-rentenrechner"), import("@/paises/ch-it/textos/ahv-rentenrechner")),
  "stipendio-netto-lordo": () => traducida(import("@/paises/ch/calculadoras/netto-brutto-rechner"), import("@/paises/ch-it/textos/netto-brutto-rechner")),
  "termine-di-disdetta": () => traducida(import("@/paises/ch/calculadoras/kuendigungsfrist-rechner"), import("@/paises/ch-it/textos/kuendigungsfrist-rechner")),
  "tredicesima": () => traducida(import("@/paises/ch/calculadoras/13-monatslohn-rechner"), import("@/paises/ch-it/textos/13-monatslohn-rechner")),
};
