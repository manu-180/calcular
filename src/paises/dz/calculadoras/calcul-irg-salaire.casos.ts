import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irg-salaire";

const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Salaire brut de 60 000 DA",
    origen: {
      tipo: "recalculado",
      url: LF2022,
      detalle:
        "CNAS 9 % = 5 400 ; imposable 54 600, soit 655 200 par an. Barème : 240 000 × 23 % + 175 200 × 27 % = 102 504, soit 8 542 par mois. Abattement 40 % = 3 416,80 plafonné à 1 500. IRG = 7 042.",
    },
    fecha: "2026-10-27",
    entrada: { montant: 60000, base: "brut", special: false },
    esperado: { cnas: 5400, imposable: 54600, bareme: 8542, abattement: 1500, irg: 7042, irgAnnuel: 84504 },
  },
  {
    nombre: "Salaire brut de 35 000 DA, zone de lissage",
    origen: {
      tipo: "recalculado",
      url: LF2022,
      detalle:
        "CNAS 3 150 ; imposable 31 850. Barème mensuel (31 850 − 20 000) × 23 % = 2 725,50 ; abattement 40 % = 1 090,20 ; reste 1 635,30. IRG = 1 635,30 × 137/51 − 27 925/8 = 902,24.",
    },
    fecha: "2026-10-27",
    entrada: { montant: 35000, base: "brut", special: false },
    esperado: { imposable: 31850, abattement: 1090.2, irg: 902.24 },
  },
  {
    nombre: "Revenu imposable de 30 000 DA, exonéré",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Les revenus qui n'excèdent pas 30 000 DA sont totalement exonérés." },
    fecha: "2026-10-27",
    entrada: { montant: 30000, base: "imposable", special: false },
    esperado: { irg: 0, imposable: 30000 },
  },
  {
    nombre: "Retraité, pension imposable de 40 000 DA",
    origen: {
      tipo: "recalculado",
      url: LF2022,
      detalle: "Barème 20 000 × 23 % = 4 600 ; abattement plafonné à 1 500 ; reste 3 100. IRG = 3 100 × 93/61 − 81 213/41 = 2 745,42.",
    },
    fecha: "2026-10-27",
    entrada: { montant: 40000, base: "imposable", special: true },
    esperado: { irg: 2745.42 },
  },
  {
    nombre: "Même revenu sans abattement spécial",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Au-delà de 35 000 DA, pas de lissage général : IRG = 4 600 − 1 500 = 3 100." },
    fecha: "2026-10-27",
    entrada: { montant: 40000, base: "imposable", special: false },
    esperado: { irg: 3100 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { montant: 0, base: "brut", special: false },
    esperaError: true,
  },
]);
