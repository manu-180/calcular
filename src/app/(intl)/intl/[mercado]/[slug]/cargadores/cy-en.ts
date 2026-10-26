// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "annual-leave-calculator": () => traducida(import("@/paises/cy/calculadoras/etisia-adeia"), import("@/paises/cy-en/textos/etisia-adeia")),
  "capital-gains-tax-calculator": () => traducida(import("@/paises/cy/calculadoras/foros-kefalaiouchikon-kerdon"), import("@/paises/cy-en/textos/foros-kefalaiouchikon-kerdon")),
  "cyprus-vat-calculator": () => traducida(import("@/paises/cy/calculadoras/ypologismos-fpa"), import("@/paises/cy-en/textos/ypologismos-fpa")),
  "dividend-tax-calculator": () => traducida(import("@/paises/cy/calculadoras/ektakti-eisfora-merismata"), import("@/paises/cy-en/textos/ektakti-eisfora-merismata")),
  "employer-cost-calculator": () => traducida(import("@/paises/cy/calculadoras/kostos-ergodoti"), import("@/paises/cy-en/textos/kostos-ergodoti")),
  "fixed-deposit-interest": () => traducida(import("@/paises/cy/calculadoras/tokoi-katatheseon"), import("@/paises/cy-en/textos/tokoi-katatheseon")),
  "gesy-contribution-calculator": () => traducida(import("@/paises/cy/calculadoras/eisfores-gesy"), import("@/paises/cy-en/textos/eisfores-gesy")),
  "income-tax-calculator": () => traducida(import("@/paises/cy/calculadoras/ypologismos-forou-eisodimatos"), import("@/paises/cy-en/textos/ypologismos-forou-eisodimatos")),
  "inflation-calculator": () => traducida(import("@/paises/cy/calculadoras/ypologismos-plithorismou"), import("@/paises/cy-en/textos/ypologismos-plithorismou")),
  "minimum-wage": () => traducida(import("@/paises/cy/calculadoras/katotatos-misthos"), import("@/paises/cy-en/textos/katotatos-misthos")),
  "net-salary-calculator": () => traducida(import("@/paises/cy/calculadoras/ypologismos-katharou-misthou"), import("@/paises/cy-en/textos/ypologismos-katharou-misthou")),
  "net-to-gross-salary": () => traducida(import("@/paises/cy/calculadoras/ypologismos-miktou-apo-katharo"), import("@/paises/cy-en/textos/ypologismos-miktou-apo-katharo")),
  "notice-period-calculator": () => traducida(import("@/paises/cy/calculadoras/proeidopoiisi-termatismou"), import("@/paises/cy-en/textos/proeidopoiisi-termatismou")),
  "property-transfer-fees": () => traducida(import("@/paises/cy/calculadoras/teli-metavivasis"), import("@/paises/cy-en/textos/teli-metavivasis")),
  "redundancy-pay-calculator": () => traducida(import("@/paises/cy/calculadoras/plirome-pleonasmou"), import("@/paises/cy-en/textos/plirome-pleonasmou")),
  "self-employed-contributions": () => traducida(import("@/paises/cy/calculadoras/eisfores-autotelos-ergazomenon"), import("@/paises/cy-en/textos/eisfores-autotelos-ergazomenon")),
  "social-insurance-calculator": () => traducida(import("@/paises/cy/calculadoras/eisfores-koinonikon-asfaliseon"), import("@/paises/cy-en/textos/eisfores-koinonikon-asfaliseon")),
  "stamp-duty-calculator": () => traducida(import("@/paises/cy/calculadoras/chartosima"), import("@/paises/cy-en/textos/chartosima")),
};
