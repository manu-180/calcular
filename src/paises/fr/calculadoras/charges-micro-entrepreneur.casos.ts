import { definirCasos } from "@/motor/calculo";
import micro from "./charges-micro-entrepreneur";

const F36232 = "https://entreprendre.service-public.gouv.fr/vosdroits/F36232";

export default definirCasos(micro, [
  {
    nombre: "Prestations de services BIC, 3 000 €",
    origen: { tipo: "oficial", url: F36232, detalle: "Cotisations à 21,2 % du chiffre d'affaires : 3 000 × 21,2 % = 636 €." },
    fecha: "2026-10-14",
    entrada: { activite: "services", chiffreAffaires: 3000, versementLiberatoire: false },
    esperado: { tauxCotisations: 21.2, cotisations: 636, impot: 0, total: 636, reste: 2364 },
  },
  {
    nombre: "Vente de marchandises avec versement libératoire",
    origen: { tipo: "oficial", url: F36232, detalle: "Taux global avec option de 13,3 % (12,3 % + 1 %) : 10 000 × 13,3 % = 1 330 €." },
    fecha: "2026-10-14",
    entrada: { activite: "vente", chiffreAffaires: 10000, versementLiberatoire: true },
    esperado: { cotisations: 1230, impot: 100, total: 1330, tauxGlobal: 13.3 },
  },
  {
    nombre: "Libéral non réglementé avec versement libératoire",
    origen: { tipo: "oficial", url: F36232, detalle: "25,6 % de cotisations, 27,8 % avec l'option : 5 000 × 27,8 % = 1 390 €." },
    fecha: "2026-10-14",
    entrada: { activite: "liberal", chiffreAffaires: 5000, versementLiberatoire: true },
    esperado: { cotisations: 1280, impot: 110, total: 1390, tauxGlobal: 27.8 },
  },
  {
    nombre: "Libéral Cipav sans option",
    origen: { tipo: "oficial", url: F36232, detalle: "23,2 % du chiffre d'affaires : 4 000 × 23,2 % = 928 €." },
    fecha: "2026-10-14",
    entrada: { activite: "cipav", chiffreAffaires: 4000, versementLiberatoire: false },
    esperado: { cotisations: 928, total: 928 },
  },
  {
    nombre: "Chiffre d'affaires nul",
    origen: { tipo: "recalculado", detalle: "Rien à déclarer, rien à calculer." },
    fecha: "2026-10-14",
    entrada: { activite: "vente", chiffreAffaires: 0, versementLiberatoire: false },
    esperaError: true,
  },
]);
