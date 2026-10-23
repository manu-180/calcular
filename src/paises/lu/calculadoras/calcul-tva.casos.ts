import { definirCasos } from "@/motor/calculo";
import calculTva from "./calcul-tva";

const AED = "https://pfi.public.lu/dam-assets/pdf/tva/loi-tva-2025-01-01.pdf";

export default definirCasos(calculTva, [
  {
    nombre: "100 euros au taux normal",
    origen: { tipo: "recalculado", url: AED, detalle: "100 x 17 % = 17 ; TTC 117 (art. 39 de la loi TVA)." },
    fecha: "2026-10-16",
    entrada: { montant: 100, sens: "ajouter", taux: "normal" },
    esperado: { taux: 17, tva: 17, ttc: 117 },
  },
  {
    nombre: "117 euros TTC, TVA extraite",
    origen: { tipo: "recalculado", url: AED, detalle: "117 / 1,17 = 100 ; TVA 17." },
    fecha: "2026-10-16",
    entrada: { montant: 117, sens: "extraire", taux: "normal" },
    esperado: { ht: 100, tva: 17 },
  },
  {
    nombre: "Taux super-réduit",
    origen: { tipo: "recalculado", url: AED, detalle: "50 x 3 % = 1,50 ; TTC 51,50." },
    fecha: "2026-10-16",
    entrada: { montant: 50, sens: "ajouter", taux: "super-reduit" },
    esperado: { taux: 3, tva: 1.5, ttc: 51.5 },
  },
  {
    nombre: "Taux intermédiaire et réduit",
    origen: { tipo: "recalculado", url: AED, detalle: "114 / 1,14 = 100 au taux de 14 % ; 108 / 1,08 = 100 au taux de 8 %." },
    fecha: "2026-10-16",
    entrada: { montant: 114, sens: "extraire", taux: "intermediaire" },
    esperado: { taux: 14, ht: 100, tva: 14 },
  },
]);
