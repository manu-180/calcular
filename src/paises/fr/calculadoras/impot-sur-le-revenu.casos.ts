import { definirCasos } from "@/motor/calculo";
import impot from "./impot-sur-le-revenu";

const F1419 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1419";
const imposable = { typeRevenu: "imposable", revenu2: null, parentIsole: false } as const;

export default definirCasos(impot, [
  {
    nombre: "Célibataire, 30 000 € de revenu imposable",
    origen: { tipo: "oficial", url: F1419, detalle: "Exemple Service-Public : 1 977,69 + 126,30 = 2 103,99 €, TMI 30 %." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "seul", revenu1: 30000, enfants: 0 },
    esperado: { parts: 1, tmi: 30, impotBrut: 2103.99, decote: 0, impotNet: 2103.99 },
  },
  {
    nombre: "Couple sans enfant, 60 000 €",
    origen: { tipo: "oficial", url: F1419, detalle: "Exemple Service-Public : 2 103,99 × 2 = 4 207,98 €." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "couple", revenu1: 60000, enfants: 0 },
    esperado: { parts: 2, impotBrut: 4207.98, impotNet: 4207.98 },
  },
  {
    nombre: "Couple avec 1 enfant, 60 000 € (sous le plafond)",
    origen: { tipo: "oficial", url: F1419, detalle: "Exemple Service-Public : 1 364 × 2,5 = 3 410 €, avantage de 797,98 € sous le plafond de 1 807 €." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "couple", revenu1: 60000, enfants: 1 },
    esperado: { parts: 2.5, tmi: 11, impotBrut: 3410, impotNet: 3410 },
  },
  {
    nombre: "Couple avec 1 enfant, 90 000 € (plafonnement)",
    origen: { tipo: "oficial", url: F1419, detalle: "Exemple Service-Public : 13 207,98 − 1 807 = 11 400,98 €." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "couple", revenu1: 90000, enfants: 1 },
    esperado: { impotBrut: 11400.98, impotNet: 11400.98 },
  },
  {
    nombre: "Couple avec 2 enfants, 90 000 € (plafonnement)",
    origen: { tipo: "oficial", url: F1419, detalle: "Exemple Service-Public : 13 207,98 − 3 614 = 9 593,98 €." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "couple", revenu1: 90000, enfants: 2 },
    esperado: { parts: 3, impotBrut: 9593.98 },
  },
  {
    nombre: "Couple avec 2 enfants, 60 000 € puis décote",
    origen: {
      tipo: "oficial",
      url: F1419,
      detalle: "Service-Public donne 2 772 € avant décote. Décote couple : 1 483 − 2 772 × 45,25 % = 228,67 ; impôt 2 543,33 €.",
    },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "couple", revenu1: 60000, enfants: 2 },
    esperado: { impotBrut: 2772, decote: 228.67, impotNet: 2543.33 },
  },
  {
    nombre: "Parent isolé avec 1 enfant, 30 000 €",
    origen: {
      tipo: "oficial",
      url: F1419,
      detalle: "Service-Public : 2 parts, 374 × 2 = 748 € avant décote. Décote : 897 − 748 × 45,25 % = 558,53 ; impôt 189,47 €.",
    },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "seul", revenu1: 30000, enfants: 1, parentIsole: true },
    esperado: { parts: 2, impotBrut: 748, decote: 558.53, impotNet: 189.47 },
  },
  {
    nombre: "Décote d'une personne seule",
    origen: {
      tipo: "oficial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34328",
      detalle: "Exemple Service-Public : impôt de 1 400 €, décote 897 − 633,50 = 263,50 €, impôt 1 136,50 €.",
    },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "seul", revenu1: 24327.27, enfants: 0 },
    esperado: { impotBrut: 1400, decote: 263.5, impotNet: 1136.5 },
  },
  {
    nombre: "Salaires de 32 000 € avec la déduction de 10 %",
    origen: {
      tipo: "recalculado",
      detalle: "32 000 − 3 200 = 28 800. (28 800 − 11 600) × 11 % = 1 892. Décote 897 − 856,13 = 40,87. Impôt 1 851,13.",
    },
    fecha: "2026-10-14",
    entrada: { typeRevenu: "salaires", situation: "seul", revenu1: 32000, revenu2: null, enfants: 0, parentIsole: false },
    esperado: { revenu: 28800, impotBrut: 1892, decote: 40.87, impotNet: 1851.13 },
  },
  {
    nombre: "Petit salaire : déduction minimale de 509 €",
    origen: { tipo: "recalculado", detalle: "10 % de 4 000 = 400, porté au minimum de 509 : revenu imposable 3 491, impôt nul." },
    fecha: "2026-10-14",
    entrada: { typeRevenu: "salaires", situation: "seul", revenu1: 4000, revenu2: null, enfants: 0, parentIsole: false },
    esperado: { revenu: 3491, impotNet: 0 },
  },
  {
    nombre: "Impôt sous le seuil de 61 €",
    origen: { tipo: "recalculado", detalle: "(12 500 − 11 600) × 11 % = 99 ; décote 897 − 44,80 = 852,20 plafonnée à 99 : rien à payer." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "seul", revenu1: 12500, enfants: 0 },
    esperado: { impotBrut: 99, decote: 99, impotNet: 0 },
  },
  {
    nombre: "Parent isolé déclaré en couple",
    origen: { tipo: "recalculado", detalle: "Un couple marié ne peut pas être parent isolé." },
    fecha: "2026-10-14",
    entrada: { ...imposable, situation: "couple", revenu1: 40000, enfants: 1, parentIsole: true },
    esperaError: true,
  },
]);
