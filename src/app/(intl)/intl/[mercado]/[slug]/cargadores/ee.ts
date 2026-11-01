// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "brutopalga-kalkulaator": () => import("@/paises/ee/calculadoras/brutopalga-kalkulaator"),
  "dividendide-tulumaks": () => import("@/paises/ee/calculadoras/dividendide-tulumaks"),
  "etteteatamistahtaeg": () => import("@/paises/ee/calculadoras/etteteatamistahtaeg"),
  "ettevotluskonto": () => import("@/paises/ee/calculadoras/ettevotluskonto"),
  "fie-maksud": () => import("@/paises/ee/calculadoras/fie-maksud"),
  "haigushuvitis": () => import("@/paises/ee/calculadoras/haigushuvitis"),
  "inflatsiooni-kalkulaator": () => import("@/paises/ee/calculadoras/inflatsiooni-kalkulaator"),
  "kaibemaksu-kalkulaator": () => import("@/paises/ee/calculadoras/kaibemaksu-kalkulaator"),
  "koondamishuvitis": () => import("@/paises/ee/calculadoras/koondamishuvitis"),
  "lastetoetus": () => import("@/paises/ee/calculadoras/lastetoetus"),
  "maamaks": () => import("@/paises/ee/calculadoras/maamaks"),
  "miinimumpalk": () => import("@/paises/ee/calculadoras/miinimumpalk"),
  "palgakalkulaator": () => import("@/paises/ee/calculadoras/palgakalkulaator"),
  "pensionikalkulaator": () => import("@/paises/ee/calculadoras/pensionikalkulaator"),
  "puhkusetasu-arvutamine": () => import("@/paises/ee/calculadoras/puhkusetasu-arvutamine"),
  "sotsiaalmaks": () => import("@/paises/ee/calculadoras/sotsiaalmaks"),
  "tooandja-kulu": () => import("@/paises/ee/calculadoras/tooandja-kulu"),
  "tootuskindlustushuvitis": () => import("@/paises/ee/calculadoras/tootuskindlustushuvitis"),
  "tulumaksu-kalkulaator": () => import("@/paises/ee/calculadoras/tulumaksu-kalkulaator"),
  "uletunnitoo": () => import("@/paises/ee/calculadoras/uletunnitoo"),
  "vanemahuvitis": () => import("@/paises/ee/calculadoras/vanemahuvitis"),
};
