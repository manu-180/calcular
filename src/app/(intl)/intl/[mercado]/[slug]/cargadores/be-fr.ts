// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcul-cheques-repas": () => traducida(import("@/paises/be/calculadoras/maaltijdcheques-berekenen"), import("@/paises/be-fr/textos/maaltijdcheques-berekenen")),
  "calcul-cotisations-onss": () => traducida(import("@/paises/be/calculadoras/rsz-berekenen"), import("@/paises/be-fr/textos/rsz-berekenen")),
  "calcul-cout-employeur": () => traducida(import("@/paises/be/calculadoras/loonkost-berekenen"), import("@/paises/be-fr/textos/loonkost-berekenen")),
  "calcul-heures-supplementaires": () => traducida(import("@/paises/be/calculadoras/overuren-berekenen"), import("@/paises/be-fr/textos/overuren-berekenen")),
  "calcul-inflation": () => traducida(import("@/paises/be/calculadoras/inflatie-berekenen"), import("@/paises/be-fr/textos/inflatie-berekenen")),
  "calcul-pecule-de-vacances": () => traducida(import("@/paises/be/calculadoras/vakantiegeld-berekenen"), import("@/paises/be-fr/textos/vakantiegeld-berekenen")),
  "calcul-preavis": () => traducida(import("@/paises/be/calculadoras/opzeggingstermijn-berekenen"), import("@/paises/be-fr/textos/opzeggingstermijn-berekenen")),
  "calcul-precompte-professionnel": () => traducida(import("@/paises/be/calculadoras/bedrijfsvoorheffing-berekenen"), import("@/paises/be-fr/textos/bedrijfsvoorheffing-berekenen")),
  "calcul-salaire-brut-net": () => traducida(import("@/paises/be/calculadoras/bruto-netto-berekenen"), import("@/paises/be-fr/textos/bruto-netto-berekenen")),
  "calcul-tva": () => traducida(import("@/paises/be/calculadoras/btw-berekenen"), import("@/paises/be-fr/textos/btw-berekenen")),
  "cotisations-sociales-independant": () => traducida(import("@/paises/be/calculadoras/sociale-bijdragen-zelfstandige"), import("@/paises/be-fr/textos/sociale-bijdragen-zelfstandige")),
  "salaire-minimum-belgique": () => traducida(import("@/paises/be/calculadoras/minimumloon-berekenen"), import("@/paises/be-fr/textos/minimumloon-berekenen")),
};
