// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "calcolo-cedolare-secca": () => import("@/paises/it/calculadoras/calcolo-cedolare-secca"),
  "calcolo-ferie-maturate": () => import("@/paises/it/calculadoras/calcolo-ferie-maturate"),
  "calcolo-imposte-acquisto-prima-casa": () => import("@/paises/it/calculadoras/calcolo-imposte-acquisto-prima-casa"),
  "calcolo-interessi-legali": () => import("@/paises/it/calculadoras/calcolo-interessi-legali"),
  "calcolo-irpef": () => import("@/paises/it/calculadoras/calcolo-irpef"),
  "calcolo-iva": () => import("@/paises/it/calculadoras/calcolo-iva"),
  "calcolo-maternita-obbligatoria": () => import("@/paises/it/calculadoras/calcolo-maternita-obbligatoria"),
  "calcolo-naspi": () => import("@/paises/it/calculadoras/calcolo-naspi"),
  "calcolo-quattordicesima": () => import("@/paises/it/calculadoras/calcolo-quattordicesima"),
  "calcolo-regime-forfettario": () => import("@/paises/it/calculadoras/calcolo-regime-forfettario"),
  "calcolo-ritenuta-d-acconto": () => import("@/paises/it/calculadoras/calcolo-ritenuta-d-acconto"),
  "calcolo-stipendio-netto": () => import("@/paises/it/calculadoras/calcolo-stipendio-netto"),
  "calcolo-straordinari": () => import("@/paises/it/calculadoras/calcolo-straordinari"),
  "calcolo-tfr": () => import("@/paises/it/calculadoras/calcolo-tfr"),
  "calcolo-tredicesima": () => import("@/paises/it/calculadoras/calcolo-tredicesima"),
  "contributi-gestione-separata": () => import("@/paises/it/calculadoras/contributi-gestione-separata"),
  "contributi-inps-artigiani-commercianti": () => import("@/paises/it/calculadoras/contributi-inps-artigiani-commercianti"),
};
