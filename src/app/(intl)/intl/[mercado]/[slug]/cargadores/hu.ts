// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "afa-kalkulator": () => import("@/paises/hu/calculadoras/afa-kalkulator"),
  "arfolyam-kalkulator": () => import("@/paises/hu/calculadoras/arfolyam-kalkulator"),
  "atalanyado-kalkulator": () => import("@/paises/hu/calculadoras/atalanyado-kalkulator"),
  "brutto-ber-kalkulator": () => import("@/paises/hu/calculadoras/brutto-ber-kalkulator"),
  "csaladi-adokedvezmeny-kalkulator": () => import("@/paises/hu/calculadoras/csaladi-adokedvezmeny-kalkulator"),
  "csaladi-potlek-kalkulator": () => import("@/paises/hu/calculadoras/csaladi-potlek-kalkulator"),
  "csed-kalkulator": () => import("@/paises/hu/calculadoras/csed-kalkulator"),
  "felmondasi-ido-kalkulator": () => import("@/paises/hu/calculadoras/felmondasi-ido-kalkulator"),
  "gyed-kalkulator": () => import("@/paises/hu/calculadoras/gyed-kalkulator"),
  "illetek-kalkulator": () => import("@/paises/hu/calculadoras/illetek-kalkulator"),
  "inflacio-kalkulator": () => import("@/paises/hu/calculadoras/inflacio-kalkulator"),
  "jarulek-kalkulator": () => import("@/paises/hu/calculadoras/jarulek-kalkulator"),
  "kata-kalkulator": () => import("@/paises/hu/calculadoras/kata-kalkulator"),
  "minimalber-kalkulator": () => import("@/paises/hu/calculadoras/minimalber-kalkulator"),
  "munkaltatoi-koltseg-kalkulator": () => import("@/paises/hu/calculadoras/munkaltatoi-koltseg-kalkulator"),
  "nettober-kalkulator": () => import("@/paises/hu/calculadoras/nettober-kalkulator"),
  "szabadsag-kalkulator": () => import("@/paises/hu/calculadoras/szabadsag-kalkulator"),
  "tappenz-kalkulator": () => import("@/paises/hu/calculadoras/tappenz-kalkulator"),
  "tulora-kalkulator": () => import("@/paises/hu/calculadoras/tulora-kalkulator"),
  "vegkielegites-szamitas": () => import("@/paises/hu/calculadoras/vegkielegites-szamitas"),
};
