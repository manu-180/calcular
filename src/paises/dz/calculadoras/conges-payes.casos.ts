import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

const LOI = "https://www.joradp.dz/Jo8499/1990/017/FP491.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Année complète",
    origen: { tipo: "recalculado", url: LOI, detalle: "Article 41 : 12 × 2,5 = 30 jours, dans la limite de 30." },
    fecha: "2026-10-27",
    entrada: { mois: 12, sud: false },
    esperado: { total: 30, principal: 30 },
  },
  {
    nombre: "Embauche en cours d'année, 5 mois",
    origen: { tipo: "recalculado", url: LOI, detalle: "5 × 2,5 = 12,5 jours." },
    fecha: "2026-10-27",
    entrada: { mois: 5, sud: false },
    esperado: { total: 12.5 },
  },
  {
    nombre: "Année complète dans le Sud",
    origen: { tipo: "recalculado", url: LOI, detalle: "Article 42 : au moins 10 jours de plus, soit 30 + 10 = 40." },
    fecha: "2026-10-27",
    entrada: { mois: 12, sud: true },
    esperado: { total: 40, supplementaire: 10 },
  },
  {
    nombre: "Plus de 12 mois",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { mois: 13, sud: false },
    esperaError: true,
  },
]);
