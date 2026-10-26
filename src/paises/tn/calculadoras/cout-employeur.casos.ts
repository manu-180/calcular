import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

export default definirCasos(calculadora, [
  {
    nombre: "2 000 DT brut, accidents du travail à 0,4 %",
    origen: { tipo: "recalculado", detalle: "CNSS 2 000 × 16,57 % = 331,4 ; AT 8 ; coût 2 339,4 ; annuel 28 072,8." },
    fecha: "2026-10-24",
    entrada: { brut: 2000, at: 0.4 },
    esperado: { cnss: 331.4, accidents: 8, cout: 2339.4, coutAnnuel: 28072.8 },
  },
  {
    nombre: "Taux accidents du travail hors fourchette",
    origen: { tipo: "recalculado", detalle: "5 % dépasse le maximum de 4 %." },
    fecha: "2026-10-24",
    entrada: { brut: 2000, at: 5 },
    esperaError: true,
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { brut: 0, at: 1 },
    esperaError: true,
  },
]);
