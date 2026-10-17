import { definirCasos } from "@/motor/calculo";
import droitsEnregistrement from "./droits-enregistrement";

const GUICHET = "https://guichet.public.lu/fr/citoyens/logement/aides/aides-indirectes-avantages-fiscaux/credit-impot-actes-notaries.html";

export default definirCasos(droitsEnregistrement, [
  {
    nombre: "750 000 euros, une personne",
    origen: { tipo: "recalculado", url: GUICHET, detalle: "7 % = 52 500 (6 % + 1 %). Crédit plafonné à 40 000 : reste 12 500." },
    fecha: "2026-10-16",
    entrada: { prix: 750000, habitation: true, acquereurs: 1 },
    esperado: { droits: 52500, enregistrement: 45000, transcription: 7500, credit: 40000, apayer: 12500 },
  },
  {
    nombre: "750 000 euros, deux personnes",
    origen: { tipo: "recalculado", url: GUICHET, detalle: "Crédit jusqu'à 80 000, mais au moins 100 euros restent dus : crédit 52 400, à payer 100." },
    fecha: "2026-10-16",
    entrada: { prix: 750000, habitation: true, acquereurs: 2 },
    esperado: { credit: 52400, apayer: 100 },
  },
  {
    nombre: "Investissement locatif",
    origen: { tipo: "recalculado", url: GUICHET, detalle: "Pas de crédit pour un bien loué : 7 % de 400 000 = 28 000." },
    fecha: "2026-10-16",
    entrada: { prix: 400000, habitation: false, acquereurs: 1 },
    esperado: { credit: 0, apayer: 28000 },
  },
]);
