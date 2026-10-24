// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "brutto-netto-rechner": () => import("@/paises/li/calculadoras/brutto-netto-rechner"),
  "ferienrechner": () => import("@/paises/li/calculadoras/ferienrechner"),
  "geburtszulage-rechner": () => import("@/paises/li/calculadoras/geburtszulage-rechner"),
  "kinderzulagen-rechner": () => import("@/paises/li/calculadoras/kinderzulagen-rechner"),
  "kuendigungsfrist-rechner": () => import("@/paises/li/calculadoras/kuendigungsfrist-rechner"),
  "lohnkosten-rechner": () => import("@/paises/li/calculadoras/lohnkosten-rechner"),
  "lohnsteuer-rechner": () => import("@/paises/li/calculadoras/lohnsteuer-rechner"),
  "mwst-rechner": () => import("@/paises/li/calculadoras/mwst-rechner"),
  "pensionskasse-rechner": () => import("@/paises/li/calculadoras/pensionskasse-rechner"),
  "sperrfrist-rechner": () => import("@/paises/li/calculadoras/sperrfrist-rechner"),
  "steuerrechner": () => import("@/paises/li/calculadoras/steuerrechner"),
  "ueberstunden-rechner": () => import("@/paises/li/calculadoras/ueberstunden-rechner"),
};
