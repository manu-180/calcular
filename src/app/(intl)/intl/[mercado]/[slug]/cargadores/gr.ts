// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "apozimiosi-apolysis": () => import("@/paises/gr/calculadoras/apozimiosi-apolysis"),
  "asfalistikes-eisfores-misthoton": () => import("@/paises/gr/calculadoras/asfalistikes-eisfores-misthoton"),
  "doro-christougennon": () => import("@/paises/gr/calculadoras/doro-christougennon"),
  "doro-pascha": () => import("@/paises/gr/calculadoras/doro-pascha"),
  "eisfores-eleftheron-epangelmation": () => import("@/paises/gr/calculadoras/eisfores-eleftheron-epangelmation"),
  "elachisto-tekmarto-eisodima": () => import("@/paises/gr/calculadoras/elachisto-tekmarto-eisodima"),
  "epidoma-adeias": () => import("@/paises/gr/calculadoras/epidoma-adeias"),
  "foros-eleftheron-epangelmation": () => import("@/paises/gr/calculadoras/foros-eleftheron-epangelmation"),
  "foros-enoikion": () => import("@/paises/gr/calculadoras/foros-enoikion"),
  "foros-metavivasis-akinitou": () => import("@/paises/gr/calculadoras/foros-metavivasis-akinitou"),
  "imeres-adeias": () => import("@/paises/gr/calculadoras/imeres-adeias"),
  "katotatos-misthos": () => import("@/paises/gr/calculadoras/katotatos-misthos"),
  "kostos-ergodoti": () => import("@/paises/gr/calculadoras/kostos-ergodoti"),
  "nychterini-ergasia-kyriaki": () => import("@/paises/gr/calculadoras/nychterini-ergasia-kyriaki"),
  "proeidopoiisi-apolysis": () => import("@/paises/gr/calculadoras/proeidopoiisi-apolysis"),
  "tokoi-katatheseon": () => import("@/paises/gr/calculadoras/tokoi-katatheseon"),
  "ypologismos-forou-eisodimatos": () => import("@/paises/gr/calculadoras/ypologismos-forou-eisodimatos"),
  "ypologismos-fpa": () => import("@/paises/gr/calculadoras/ypologismos-fpa"),
  "ypologismos-katharou-misthou": () => import("@/paises/gr/calculadoras/ypologismos-katharou-misthou"),
  "ypologismos-miktou-apo-katharo": () => import("@/paises/gr/calculadoras/ypologismos-miktou-apo-katharo"),
  "ypologismos-plithorismou": () => import("@/paises/gr/calculadoras/ypologismos-plithorismou"),
  "ypologismos-yperorion": () => import("@/paises/gr/calculadoras/ypologismos-yperorion"),
};
