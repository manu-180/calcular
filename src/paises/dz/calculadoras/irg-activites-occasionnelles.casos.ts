import { definirCasos } from "@/motor/calculo";
import calculadora from "./irg-activites-occasionnelles";

const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Vacations d'enseignement, 50 000 DA",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Article 104-II-3-c : 10 % libératoire, 5 000 ; versé 45 000." },
    fecha: "2026-10-27",
    entrada: { montant: 50000, activite: "enseignement" },
    esperado: { retenue: 5000, net: 45000, taux: 10 },
  },
  {
    nombre: "Expertise ponctuelle, 120 000 DA",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Autres activités occasionnelles à caractère intellectuel : 15 %, 18 000." },
    fecha: "2026-10-27",
    entrada: { montant: 120000, activite: "autres" },
    esperado: { retenue: 18000, net: 102000 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { montant: 0, activite: "autres" },
    esperaError: true,
  },
]);
