import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "60 000 DA brut",
    origen: {
      tipo: "recalculado",
      url: LF2022,
      detalle: "CNAS 9 % = 5 400 ; imposable 54 600 ; barème 8 542 ; abattement plafonné 1 500 ; IRG 7 042. Net = 60 000 − 5 400 − 7 042 = 47 558.",
    },
    fecha: "2026-10-27",
    entrada: { brut: 60000, special: false },
    esperado: { cnas: 5400, irg: 7042, net: 47558, retenues: 12442, netAnnuel: 570696 },
  },
  {
    nombre: "SNMG de 24 000 DA brut",
    origen: { tipo: "recalculado", url: LF2022, detalle: "CNAS 2 160 ; imposable 21 840, sous le seuil de 30 000 DA : pas d'IRG. Net = 21 840." },
    fecha: "2026-10-27",
    entrada: { brut: 24000, special: false },
    esperado: { cnas: 2160, irg: 0, net: 21840 },
  },
  {
    nombre: "35 000 DA brut, lissage",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Imposable 31 850 ; IRG = 1 635,30 × 137/51 − 27 925/8 = 902,24. Net = 35 000 − 3 150 − 902,24 = 30 947,76." },
    fecha: "2026-10-27",
    entrada: { brut: 35000, special: false },
    esperado: { irg: 902.24, net: 30947.76 },
  },
  {
    nombre: "150 000 DA brut",
    origen: {
      tipo: "recalculado",
      url: LF2022,
      detalle: "CNAS 13 500 ; imposable 136 500, soit 1 638 000 par an. Barème 55 200 + 129 600 + 203 400 = 388 200, soit 32 350 par mois ; moins 1 500 = 30 850. Net = 105 650.",
    },
    fecha: "2026-10-27",
    entrada: { brut: 150000, special: false },
    esperado: { irg: 30850, net: 105650 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { brut: 0, special: false },
    esperaError: true,
  },
]);
