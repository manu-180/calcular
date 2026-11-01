import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-de-retraite";

const ORD9618 = "https://www.joradp.dz/FTP/jo-francais/1996/F1996042.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "30 ans validés, 80 000 DA de salaire de référence",
    origen: { tipo: "recalculado", url: ORD9618, detalle: "Article 12 de la loi 83-12 : 2,5 % × 30 = 75 % ; 75 % × 80 000 = 60 000 DA par mois." },
    fecha: "2026-10-27",
    entrada: { salaire: 80000, annees: 30, trimestres: 0 },
    esperado: { taux: 75, mensuelle: 60000, annuelle: 720000, duree: 30, anneesUtiles: 32 },
  },
  {
    nombre: "36 ans validés : taux plafonné",
    origen: { tipo: "recalculado", url: ORD9618, detalle: "2,5 % × 36 = 90 %, ramené au maximum de 80 % : 80 % × 100 000 = 80 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 100000, annees: 36, trimestres: 0 },
    esperado: { taux: 80, mensuelle: 80000 },
  },
  {
    nombre: "20 ans et 2 trimestres",
    origen: { tipo: "recalculado", url: ORD9618, detalle: "20,5 ans × 2,5 % = 51,25 % ; 51,25 % × 60 000 = 30 750." },
    fecha: "2026-10-27",
    entrada: { salaire: 60000, annees: 20, trimestres: 2 },
    esperado: { taux: 51.25, mensuelle: 30750, duree: 20.5 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { salaire: 0, annees: 20, trimestres: 0 },
    esperaError: true,
  },
]);
