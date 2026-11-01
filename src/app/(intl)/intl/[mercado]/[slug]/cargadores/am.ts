// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "ardzakman-npast": () => import("@/paises/am/calculadoras/ardzakman-npast"),
  "ardzakurdayin-hashvich": () => import("@/paises/am/calculadoras/ardzakurdayin-hashvich"),
  "aroghjutyan-apahovagravchar": () => import("@/paises/am/calculadoras/aroghjutyan-apahovagravchar"),
  "artazhamya-ashkhatank": () => import("@/paises/am/calculadoras/artazhamya-ashkhatank"),
  "ashkhatavardzi-hashvich": () => import("@/paises/am/calculadoras/ashkhatavardzi-hashvich"),
  "droshmanishayin-vchar": () => import("@/paises/am/calculadoras/droshmanishayin-vchar"),
  "gnachi-hashvich": () => import("@/paises/am/calculadoras/gnachi-hashvich"),
  "gortatui-tsakhs": () => import("@/paises/am/calculadoras/gortatui-tsakhs"),
  "hivandutyan-npast": () => import("@/paises/am/calculadoras/hivandutyan-npast"),
  "kutakayin-vchar": () => import("@/paises/am/calculadoras/kutakayin-vchar"),
  "mayrutyan-npast": () => import("@/paises/am/calculadoras/mayrutyan-npast"),
  "mikrodzernarkatirutyun": () => import("@/paises/am/calculadoras/mikrodzernarkatirutyun"),
  "nvazaguyn-ashkhatavardz": () => import("@/paises/am/calculadoras/nvazaguyn-ashkhatavardz"),
  "pokharzheki-hashvich": () => import("@/paises/am/calculadoras/pokharzheki-hashvich"),
  "sepakanutyan-hark": () => import("@/paises/am/calculadoras/sepakanutyan-hark"),
  "shahabazhni-hark": () => import("@/paises/am/calculadoras/shahabazhni-hark"),
  "shrjanarutyan-hark": () => import("@/paises/am/calculadoras/shrjanarutyan-hark"),
  "tsanutsman-zhamket": () => import("@/paises/am/calculadoras/tsanutsman-zhamket"),
  "vardzakalutyan-hark": () => import("@/paises/am/calculadoras/vardzakalutyan-hark"),
  "yekamtayin-hark": () => import("@/paises/am/calculadoras/yekamtayin-hark"),
  "zut-hamakhar-ashkhatavardz": () => import("@/paises/am/calculadoras/zut-hamakhar-ashkhatavardz"),
};
