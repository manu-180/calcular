import { definirCasos } from "@/motor/calculo";
import calculadora from "./plus-value-immobiliere";

const LF2021 = "https://www.joradp.dz/FTP/jo-francais/2020/F2020083.pdf" as const;
const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;
const LF2025 = "https://www.joradp.dz/FTP/jo-francais/2024/F2024084.pdf" as const;
const LF2026 = "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Appartement acheté 7 millions, revendu 12 millions après 5 ans",
    origen: {
      tipo: "recalculado",
      url: LF2021,
      detalle: "Plus-value 5 000 000 ; abattement 5 % × 3 ans (3e, 4e et 5e années) = 15 %, soit 750 000 ; imposable 4 250 000 ; IRG 15 % = 637 500.",
    },
    fecha: "2026-10-27",
    entrada: { cession: 12000000, fraisCession: 0, acquisition: 7000000, fraisAcquisition: 0, annees: 5, unique: false },
    esperado: { plusValue: 5000000, tauxAbattement: 15, abattement: 750000, imposable: 4250000, impot: 637500 },
  },
  {
    nombre: "Unique logement détenu 15 ans, frais plafonnés",
    origen: {
      tipo: "recalculado",
      url: LF2025,
      detalle:
        "Frais retenus 30 % de 4 000 000 = 1 200 000 ; prix de revient 5 200 000 ; plus-value 10 000 000 − 200 000 − 5 200 000 = 4 600 000 ; abattement plafonné à 50 % ; imposable 2 300 000 ; IRG 345 000 réduit de 50 % = 172 500.",
    },
    fecha: "2026-10-27",
    entrada: { cession: 10000000, fraisCession: 200000, acquisition: 4000000, fraisAcquisition: 2000000, annees: 15, unique: true },
    esperado: { prixRevient: 5200000, plusValue: 4600000, tauxAbattement: 50, imposable: 2300000, brut: 345000, reduction: 172500, impot: 172500 },
  },
  {
    nombre: "Prix d'acquisition inconnu, cession après 2 ans",
    origen: { tipo: "recalculado", url: LF2026, detalle: "Valeur d'acquisition forfaitaire 40 % × 8 000 000 = 3 200 000 ; plus-value 4 800 000 ; pas d'abattement avant la 3e année ; IRG 720 000." },
    fecha: "2026-10-27",
    entrada: { cession: 8000000, fraisCession: 0, acquisition: 0, fraisAcquisition: 0, annees: 2, unique: false },
    esperado: { prixRevient: 3200000, plusValue: 4800000, tauxAbattement: 0, impot: 720000 },
  },
  {
    nombre: "Vente à perte",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Seule la différence positive est imposable : pas d'impôt." },
    fecha: "2026-10-27",
    entrada: { cession: 5000000, fraisCession: 0, acquisition: 6000000, fraisAcquisition: 0, annees: 4, unique: false },
    esperado: { plusValue: 0, impot: 0 },
  },
  {
    nombre: "Prix de cession nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { cession: 0, fraisCession: 0, acquisition: 1000000, fraisAcquisition: 0, annees: 4, unique: false },
    esperaError: true,
  },
]);
