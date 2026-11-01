// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "bolovanje": () => import("@/paises/hr/calculadoras/bolovanje"),
  "bruto-neto-kalkulator": () => import("@/paises/hr/calculadoras/bruto-neto-kalkulator"),
  "doprinosi-na-placu": () => import("@/paises/hr/calculadoras/doprinosi-na-placu"),
  "doprinosi-za-obrtnike": () => import("@/paises/hr/calculadoras/doprinosi-za-obrtnike"),
  "godisnji-odmor": () => import("@/paises/hr/calculadoras/godisnji-odmor"),
  "izracun-otpremnine": () => import("@/paises/hr/calculadoras/izracun-otpremnine"),
  "kalkulator-inflacije": () => import("@/paises/hr/calculadoras/kalkulator-inflacije"),
  "minimalna-placa": () => import("@/paises/hr/calculadoras/minimalna-placa"),
  "neto-bruto-kalkulator": () => import("@/paises/hr/calculadoras/neto-bruto-kalkulator"),
  "otkazni-rok": () => import("@/paises/hr/calculadoras/otkazni-rok"),
  "pausalni-obrt": () => import("@/paises/hr/calculadoras/pausalni-obrt"),
  "pdv-kalkulator": () => import("@/paises/hr/calculadoras/pdv-kalkulator"),
  "porez-na-dobit": () => import("@/paises/hr/calculadoras/porez-na-dobit"),
  "porez-na-dohodak": () => import("@/paises/hr/calculadoras/porez-na-dohodak"),
  "porez-na-promet-nekretnina": () => import("@/paises/hr/calculadoras/porez-na-promet-nekretnina"),
  "prekovremeni-rad": () => import("@/paises/hr/calculadoras/prekovremeni-rad"),
  "prosjecna-placa": () => import("@/paises/hr/calculadoras/prosjecna-placa"),
  "regres": () => import("@/paises/hr/calculadoras/regres"),
  "rodiljna-naknada": () => import("@/paises/hr/calculadoras/rodiljna-naknada"),
  "tecaj-hnb": () => import("@/paises/hr/calculadoras/tecaj-hnb"),
  "trosak-poslodavca": () => import("@/paises/hr/calculadoras/trosak-poslodavca"),
};
