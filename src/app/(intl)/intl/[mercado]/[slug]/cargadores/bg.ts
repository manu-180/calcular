// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "danak-dividenti": () => import("@/paises/bg/calculadoras/danak-dividenti"),
  "danak-pri-pokupka-na-imot": () => import("@/paises/bg/calculadoras/danak-pri-pokupka-na-imot"),
  "danak-varhu-dohodite": () => import("@/paises/bg/calculadoras/danak-varhu-dohodite"),
  "danak-varhu-nedvizhimi-imoti": () => import("@/paises/bg/calculadoras/danak-varhu-nedvizhimi-imoti"),
  "dds-kalkulator": () => import("@/paises/bg/calculadoras/dds-kalkulator"),
  "izchislyavane-na-bolnichni": () => import("@/paises/bg/calculadoras/izchislyavane-na-bolnichni"),
  "izvanreden-trud": () => import("@/paises/bg/calculadoras/izvanreden-trud"),
  "kalkulator-neto-bruto": () => import("@/paises/bg/calculadoras/kalkulator-neto-bruto"),
  "kalkulator-za-inflatsia": () => import("@/paises/bg/calculadoras/kalkulator-za-inflatsia"),
  "kalkulator-zaplata-bruto-neto": () => import("@/paises/bg/calculadoras/kalkulator-zaplata-bruto-neto"),
  "minimalna-rabotna-zaplata": () => import("@/paises/bg/calculadoras/minimalna-rabotna-zaplata"),
  "obezshtenie-pri-uvolnenie": () => import("@/paises/bg/calculadoras/obezshtenie-pri-uvolnenie"),
  "obezshtenie-za-bezrabotitsa": () => import("@/paises/bg/calculadoras/obezshtenie-za-bezrabotitsa"),
  "obezshtenie-za-maychinstvo": () => import("@/paises/bg/calculadoras/obezshtenie-za-maychinstvo"),
  "obezshtenie-za-otglezhdane-na-dete": () => import("@/paises/bg/calculadoras/obezshtenie-za-otglezhdane-na-dete"),
  "osiguritelni-vnoski": () => import("@/paises/bg/calculadoras/osiguritelni-vnoski"),
  "platen-godishen-otpusk": () => import("@/paises/bg/calculadoras/platen-godishen-otpusk"),
  "predizvestie-pri-napuskane": () => import("@/paises/bg/calculadoras/predizvestie-pri-napuskane"),
  "razhodi-na-rabotodatelya": () => import("@/paises/bg/calculadoras/razhodi-na-rabotodatelya"),
  "samoosiguryavashti-se-litsa": () => import("@/paises/bg/calculadoras/samoosiguryavashti-se-litsa"),
  "zakonna-lihva": () => import("@/paises/bg/calculadoras/zakonna-lihva"),
};
