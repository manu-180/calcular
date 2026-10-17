import { definirCasos } from "@/motor/calculo";
import donation from "./droits-de-donation";

const F14203 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14203";
const base = { dejaUtilise: 0, handicap: false } as const;

export default definirCasos(donation, [
  {
    nombre: "Donation de 200 000 € à un enfant",
    origen: {
      tipo: "oficial",
      url: F14203,
      detalle: "Exemple Service-Public : 100 000 € taxables ; 403,60 + 403,70 + 573,45 + 16 813,60 = 18 194,35 € (la fiche affiche 18 194 €).",
    },
    fecha: "2026-10-14",
    entrada: { ...base, montant: 200000, lien: "enfant" },
    esperado: { taxable: 100000, droits: 18194.35 },
  },
  {
    nombre: "Donation de 100 000 € à un petit-enfant",
    origen: { tipo: "oficial", url: F14203, detalle: "Exemple Service-Public : 68 135 € taxables, 11 821,35 € de droits (la fiche affiche 11 821 €)." },
    fecha: "2026-10-14",
    entrada: { ...base, montant: 100000, lien: "petit-enfant" },
    esperado: { taxable: 68135, droits: 11821.35 },
  },
  {
    nombre: "Donation de 200 000 € entre époux",
    origen: { tipo: "oficial", url: F14203, detalle: "Exemple Service-Public : 119 276 € taxables ; 403,60 + 786 + 2 389,95 + 17 482,20 = 21 061,75 €." },
    fecha: "2026-10-14",
    entrada: { ...base, montant: 200000, lien: "epoux" },
    esperado: { taxable: 119276, droits: 21061.75 },
  },
  {
    nombre: "Donation de 50 000 € à un frère",
    origen: { tipo: "oficial", url: F14203, detalle: "Exemple Service-Public : 34 068 € taxables ; 8 550,50 + 4 337,10 = 12 887,60 €." },
    fecha: "2026-10-14",
    entrada: { ...base, montant: 50000, lien: "frere-soeur" },
    esperado: { taxable: 34068, droits: 12887.6 },
  },
  {
    nombre: "Donation de 20 000 € à un cousin germain",
    origen: { tipo: "oficial", url: F14203, detalle: "Exemple Service-Public : aucun abattement, 20 000 × 55 % = 11 000 €." },
    fecha: "2026-10-14",
    entrada: { ...base, montant: 20000, lien: "parent-eloigne" },
    esperado: { abattement: 0, droits: 11000 },
  },
  {
    nombre: "Abattement en partie utilisé",
    origen: { tipo: "recalculado", detalle: "60 000 € déjà utilisés : reste 40 000. 80 000 − 40 000 = 40 000 taxables, droits 1 380,75 + 20 % × 24 068 = 6 194,35 €." },
    fecha: "2026-10-14",
    entrada: { ...base, montant: 80000, lien: "enfant", dejaUtilise: 60000 },
    esperado: { abattement: 40000, taxable: 40000, droits: 6194.35 },
  },
]);
