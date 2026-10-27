import { definirCasos } from "@/motor/calculo";
import calculadora from "./droits-enregistrement";

const LF2026 = "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Vente d'un appartement à 12 millions de DA",
    origen: { tipo: "recalculado", url: LF2026, detalle: "Article 252 du code de l'enregistrement : 5 % × 12 000 000 = 600 000." },
    fecha: "2026-10-27",
    entrada: { prix: 12000000, operation: "vente" },
    esperado: { total: 600000, vente: 600000, taux: 5 },
  },
  {
    nombre: "Promesse puis vente à 8 millions de DA",
    origen: { tipo: "recalculado", url: LF2026, detalle: "2,5 % × 8 000 000 = 200 000 sur la promesse, autant sur l'acte qui la concrétise : 400 000." },
    fecha: "2026-10-27",
    entrada: { prix: 8000000, operation: "promesse" },
    esperado: { promesse: 200000, concretisation: 200000, total: 400000 },
  },
  {
    nombre: "Prix nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { prix: 0, operation: "vente" },
    esperaError: true,
  },
]);
