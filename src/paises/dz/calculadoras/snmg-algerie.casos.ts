import { definirCasos } from "@/motor/calculo";
import calculadora from "./snmg-algerie";

const DECRET = "https://www.joradp.dz/FTP/jo-francais/2026/F2026001.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Temps plein en 2026",
    origen: { tipo: "oficial", url: DECRET, detalle: "Décret 26-01, article 1er : 24 000 DA par mois pour 40 heures, soit 173,33 heures et 138,46 DA de l'heure." },
    fecha: "2026-10-27",
    entrada: { heures: 40, salaire: null },
    esperado: { minimum: 24000, horaire: 138.46, heuresMois: 173.33, annuel: 288000 },
  },
  {
    nombre: "Mi-temps, salaire de 11 000 DA",
    origen: { tipo: "recalculado", url: DECRET, detalle: "24 000 × 20/40 = 12 000 ; 173,33 × 20/40 = 86,67 heures ; écart 11 000 − 12 000 = −1 000." },
    fecha: "2026-10-27",
    entrada: { heures: 20, salaire: 11000 },
    esperado: { minimum: 12000, heuresMois: 86.67, ecart: -1000 },
  },
  {
    nombre: "Heures nulles",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { heures: 0, salaire: null },
    esperaError: true,
  },
]);
