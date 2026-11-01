// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "ajil-olgogchiin-zardal-tootsooluur": () => import("@/paises/mn/calculadoras/ajil-olgogchiin-zardal-tootsooluur"),
  "ajlaas-garakh-medegdel": () => import("@/paises/mn/calculadoras/ajlaas-garakh-medegdel"),
  "bokhir-tsever-tsalin": () => import("@/paises/mn/calculadoras/bokhir-tsever-tsalin"),
  "dood-tsalin": () => import("@/paises/mn/calculadoras/dood-tsalin"),
  "eeljiin-amraltyn-olgovor": () => import("@/paises/mn/calculadoras/eeljiin-amraltyn-olgovor"),
  "iluu-tsagiin-khols": () => import("@/paises/mn/calculadoras/iluu-tsagiin-khols"),
  "inflyatsiin-tootsooluur": () => import("@/paises/mn/calculadoras/inflyatsiin-tootsooluur"),
  "jiremsnii-tetgemj": () => import("@/paises/mn/calculadoras/jiremsnii-tetgemj"),
  "khalagdsany-tetgemj": () => import("@/paises/mn/calculadoras/khalagdsany-tetgemj"),
  "khkhoat-tootsooluur": () => import("@/paises/mn/calculadoras/khkhoat-tootsooluur"),
  "ndsh-tootsooluur": () => import("@/paises/mn/calculadoras/ndsh-tootsooluur"),
  "ovchnii-tetgemj": () => import("@/paises/mn/calculadoras/ovchnii-tetgemj"),
  "tetgever-tootsooluur": () => import("@/paises/mn/calculadoras/tetgever-tootsooluur"),
  "tsalingiin-tootsooluur": () => import("@/paises/mn/calculadoras/tsalingiin-tootsooluur"),
  "ul-khodlokh-khorongiin-tatvar": () => import("@/paises/mn/calculadoras/ul-khodlokh-khorongiin-tatvar"),
  "valyutyn-khansh": () => import("@/paises/mn/calculadoras/valyutyn-khansh"),
};
