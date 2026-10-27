// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import { traducida } from "@/motor/edicion";
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "cnps-contributions": () => traducida(import("@/paises/cm/calculadoras/cotisations-cnps"), import("@/paises/cm-en/textos/cotisations-cnps")),
  "employer-cost-calculator": () => traducida(import("@/paises/cm/calculadoras/cout-employeur"), import("@/paises/cm-en/textos/cout-employeur")),
  "euro-to-cfa-franc": () => traducida(import("@/paises/cm/calculadoras/convertisseur-euro-fcfa"), import("@/paises/cm-en/textos/convertisseur-euro-fcfa")),
  "global-synthetic-tax": () => traducida(import("@/paises/cm/calculadoras/impot-general-synthetique"), import("@/paises/cm-en/textos/impot-general-synthetique")),
  "irpp-calculator": () => traducida(import("@/paises/cm/calculadoras/calcul-irpp"), import("@/paises/cm-en/textos/calcul-irpp")),
  "minimum-wage": () => traducida(import("@/paises/cm/calculadoras/smig"), import("@/paises/cm-en/textos/smig")),
  "net-salary-calculator": () => traducida(import("@/paises/cm/calculadoras/calcul-salaire-net"), import("@/paises/cm-en/textos/calcul-salaire-net")),
  "net-to-gross-salary": () => traducida(import("@/paises/cm/calculadoras/salaire-net-en-brut"), import("@/paises/cm-en/textos/salaire-net-en-brut")),
  "vat-calculator": () => traducida(import("@/paises/cm/calculadoras/calcul-tva"), import("@/paises/cm-en/textos/calcul-tva")),
  "vehicle-stamp-duty": () => traducida(import("@/paises/cm/calculadoras/vignette-automobile"), import("@/paises/cm-en/textos/vignette-automobile")),
};
