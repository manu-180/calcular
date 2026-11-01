// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "alut-maasik": () => import("@/paises/il/calculadoras/alut-maasik"),
  "bituach-leumi": () => import("@/paises/il/calculadoras/bituach-leumi"),
  "bituach-leumi-atzmai": () => import("@/paises/il/calculadoras/bituach-leumi-atzmai"),
  "bituach-leumi-lo-oved": () => import("@/paises/il/calculadoras/bituach-leumi-lo-oved"),
  "bruto-neto": () => import("@/paises/il/calculadoras/bruto-neto"),
  "dmei-avtala": () => import("@/paises/il/calculadoras/dmei-avtala"),
  "dmei-havraa": () => import("@/paises/il/calculadoras/dmei-havraa"),
  "dmei-leida": () => import("@/paises/il/calculadoras/dmei-leida"),
  "dmei-machala": () => import("@/paises/il/calculadoras/dmei-machala"),
  "dmei-pgia": () => import("@/paises/il/calculadoras/dmei-pgia"),
  "gil-prisha": () => import("@/paises/il/calculadoras/gil-prisha"),
  "hatzmada-lamadad": () => import("@/paises/il/calculadoras/hatzmada-lamadad"),
  "hodaa-mukdemet": () => import("@/paises/il/calculadoras/hodaa-mukdemet"),
  "kitzbat-nechut": () => import("@/paises/il/calculadoras/kitzbat-nechut"),
  "kitzbat-yeladim": () => import("@/paises/il/calculadoras/kitzbat-yeladim"),
  "kitzbat-zikna": () => import("@/paises/il/calculadoras/kitzbat-zikna"),
  "maam": () => import("@/paises/il/calculadoras/maam"),
  "maanak-leida": () => import("@/paises/il/calculadoras/maanak-leida"),
  "mas-hachnasa": () => import("@/paises/il/calculadoras/mas-hachnasa"),
  "mas-rechisha": () => import("@/paises/il/calculadoras/mas-rechisha"),
  "pitzuyei-piturim": () => import("@/paises/il/calculadoras/pitzuyei-piturim"),
  "sachar-minimum": () => import("@/paises/il/calculadoras/sachar-minimum"),
  "sachar-neto": () => import("@/paises/il/calculadoras/sachar-neto"),
  "shaar-chalifin": () => import("@/paises/il/calculadoras/shaar-chalifin"),
  "shaot-nosafot": () => import("@/paises/il/calculadoras/shaot-nosafot"),
  "tagmulei-miluim": () => import("@/paises/il/calculadoras/tagmulei-miluim"),
  "yemei-chufsha": () => import("@/paises/il/calculadoras/yemei-chufsha"),
};
