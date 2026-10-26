// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calculator-cass": () => import("@/paises/ro/calculadoras/calculator-cass"),
  "calculator-concediu-de-odihna": () => import("@/paises/ro/calculadoras/calculator-concediu-de-odihna"),
  "calculator-concediu-medical": () => import("@/paises/ro/calculadoras/calculator-concediu-medical"),
  "calculator-depozit-bancar": () => import("@/paises/ro/calculadoras/calculator-depozit-bancar"),
  "calculator-drepturi-de-autor": () => import("@/paises/ro/calculadoras/calculator-drepturi-de-autor"),
  "calculator-inflatie": () => import("@/paises/ro/calculadoras/calculator-inflatie"),
  "calculator-microintreprindere": () => import("@/paises/ro/calculadoras/calculator-microintreprindere"),
  "calculator-ore-suplimentare": () => import("@/paises/ro/calculadoras/calculator-ore-suplimentare"),
  "calculator-pfa": () => import("@/paises/ro/calculadoras/calculator-pfa"),
  "calculator-preaviz": () => import("@/paises/ro/calculadoras/calculator-preaviz"),
  "calculator-salariu-brut": () => import("@/paises/ro/calculadoras/calculator-salariu-brut"),
  "calculator-salariu-net": () => import("@/paises/ro/calculadoras/calculator-salariu-net"),
  "calculator-tva": () => import("@/paises/ro/calculadoras/calculator-tva"),
  "cost-total-angajator": () => import("@/paises/ro/calculadoras/cost-total-angajator"),
  "curs-valutar-bnr": () => import("@/paises/ro/calculadoras/curs-valutar-bnr"),
  "impozit-chirie": () => import("@/paises/ro/calculadoras/impozit-chirie"),
  "impozit-dividende": () => import("@/paises/ro/calculadoras/impozit-dividende"),
  "impozit-vanzare-apartament": () => import("@/paises/ro/calculadoras/impozit-vanzare-apartament"),
  "indemnizatie-crestere-copil": () => import("@/paises/ro/calculadoras/indemnizatie-crestere-copil"),
  "salariul-minim": () => import("@/paises/ro/calculadoras/salariul-minim"),
};
