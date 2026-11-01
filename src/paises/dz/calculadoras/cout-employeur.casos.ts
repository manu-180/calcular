import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

const DECRET = "https://www.joradp.dz/FTP/jo-francais/2006/F2006060.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Un salarié à 60 000 DA",
    origen: { tipo: "recalculado", url: DECRET, detalle: "Part patronale 25 % = 15 000 ; œuvres sociales 0,5 % = 300 ; coût 75 300 par mois, 903 600 par an." },
    fecha: "2026-10-27",
    entrada: { brut: 60000, salaries: 1 },
    esperado: { patronale: 15000, oeuvres: 300, cout: 75300, coutAnnuel: 903600, surcout: 25.5 },
  },
  {
    nombre: "Trois salariés au SNMG",
    origen: { tipo: "recalculado", url: DECRET, detalle: "24 000 + 6 000 + 120 = 30 120 par salarié ; × 3 = 90 360 par mois ; × 12 = 1 084 320." },
    fecha: "2026-10-27",
    entrada: { brut: 24000, salaries: 3 },
    esperado: { cout: 30120, coutMensuelTotal: 90360, coutAnnuel: 1084320 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { brut: 0, salaries: 1 },
    esperaError: true,
  },
]);
