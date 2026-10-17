import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-auto-entrepreneur";

export default definirCasos(calculadora, [
  {
    nombre: "Prestataire de services, 120 000 DH",
    origen: { tipo: "recalculado", detalle: "1 % × 120 000 = 1 200 par an, 300 par trimestre." },
    fecha: "2026-10-16",
    entrada: { ca: 120000, activite: "services" },
    esperado: { impot: 1200, parTrimestre: 300, taux: 1, plafond: 200000 },
  },
  {
    nombre: "Commerce, 450 000 DH",
    origen: { tipo: "recalculado", detalle: "0,5 % × 450 000 = 2 250." },
    fecha: "2026-10-16",
    entrada: { ca: 450000, activite: "commerce" },
    esperado: { impot: 2250, taux: 0.5, plafond: 500000 },
  },
  {
    nombre: "Chiffre d'affaires nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-16",
    entrada: { ca: 0, activite: "services" },
    esperaError: true,
  },
]);
