// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calculator-concediu-de-odihna": () => import("@/paises/md/calculadoras/calculator-concediu-de-odihna"),
  "calculator-concediu-medical": () => import("@/paises/md/calculadoras/calculator-concediu-medical"),
  "calculator-impozit-pe-venit": () => import("@/paises/md/calculadoras/calculator-impozit-pe-venit"),
  "calculator-inflatie": () => import("@/paises/md/calculadoras/calculator-inflatie"),
  "calculator-ore-suplimentare": () => import("@/paises/md/calculadoras/calculator-ore-suplimentare"),
  "calculator-salariu-brut": () => import("@/paises/md/calculadoras/calculator-salariu-brut"),
  "calculator-salariu-net": () => import("@/paises/md/calculadoras/calculator-salariu-net"),
  "calculator-tva": () => import("@/paises/md/calculadoras/calculator-tva"),
  "cost-total-angajator": () => import("@/paises/md/calculadoras/cost-total-angajator"),
  "curs-valutar-bnm": () => import("@/paises/md/calculadoras/curs-valutar-bnm"),
  "impozit-pe-dividende": () => import("@/paises/md/calculadoras/impozit-pe-dividende"),
  "indemnizatie-crestere-copil": () => import("@/paises/md/calculadoras/indemnizatie-crestere-copil"),
  "indemnizatie-de-maternitate": () => import("@/paises/md/calculadoras/indemnizatie-de-maternitate"),
  "indemnizatie-de-somaj": () => import("@/paises/md/calculadoras/indemnizatie-de-somaj"),
  "indemnizatie-unica-la-nastere": () => import("@/paises/md/calculadoras/indemnizatie-unica-la-nastere"),
  "polita-de-asigurare-medicala": () => import("@/paises/md/calculadoras/polita-de-asigurare-medicala"),
  "salariul-mediu-pe-economie": () => import("@/paises/md/calculadoras/salariul-mediu-pe-economie"),
  "salariul-minim": () => import("@/paises/md/calculadoras/salariul-minim"),
  "varsta-de-pensionare": () => import("@/paises/md/calculadoras/varsta-de-pensionare"),
};
