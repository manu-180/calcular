import { definirCasos } from "@/motor/calculo";
import succession from "./droits-de-succession";

const F14198 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F14198";

export default definirCasos(succession, [
  {
    nombre: "Enfant, part de 150 000 €",
    origen: { tipo: "oficial", url: F14198, detalle: "Exemple Service-Public : 150 000 − 100 000 = 50 000 taxables ; 403,60 + 403,70 + 573,45 + 6 813,60 = 8 194,35 €." },
    fecha: "2026-10-14",
    entrada: { part: 150000, lien: "enfant", handicap: false },
    esperado: { abattement: 100000, taxable: 50000, droits: 8194.35, net: 141805.65 },
  },
  {
    nombre: "Enfant en situation de handicap, 300 000 €",
    origen: { tipo: "oficial", url: F14198, detalle: "Exemple Service-Public : abattements 159 325 + 100 000 ; 40 675 taxables ; 6 329,35 €." },
    fecha: "2026-10-14",
    entrada: { part: 300000, lien: "enfant", handicap: true },
    esperado: { taxable: 40675, droits: 6329.35 },
  },
  {
    nombre: "Frère en situation de handicap, 200 000 €",
    origen: { tipo: "oficial", url: F14198, detalle: "Exemple Service-Public : 200 000 − 175 257 = 24 743 ; 8 550,50 + 140,85 = 8 691,35 €." },
    fecha: "2026-10-14",
    entrada: { part: 200000, lien: "frere-soeur", handicap: true },
    esperado: { taxable: 24743, droits: 8691.35 },
  },
  {
    nombre: "Neveu, 50 000 €",
    origen: { tipo: "recalculado", detalle: "50 000 − 7 967 = 42 033 × 55 % = 23 118,15 €." },
    fecha: "2026-10-14",
    entrada: { part: 50000, lien: "neveu", handicap: false },
    esperado: { droits: 23118.15 },
  },
  {
    nombre: "Personne sans lien de parenté, 20 000 €",
    origen: { tipo: "recalculado", detalle: "20 000 − 1 594 = 18 406 × 60 % = 11 043,60 €." },
    fecha: "2026-10-14",
    entrada: { part: 20000, lien: "autre", handicap: false },
    esperado: { taxable: 18406, droits: 11043.6 },
  },
  {
    nombre: "Conjoint exonéré",
    origen: { tipo: "oficial", url: F14198, detalle: "L'époux ou le partenaire de Pacs est exonéré de droits de succession." },
    fecha: "2026-10-14",
    entrada: { part: 500000, lien: "conjoint", handicap: false },
    esperado: { droits: 0, net: 500000 },
  },
  {
    nombre: "Part sous l'abattement",
    origen: { tipo: "recalculado", detalle: "80 000 € pour un enfant : sous les 100 000 € d'abattement, aucun droit." },
    fecha: "2026-10-14",
    entrada: { part: 80000, lien: "enfant", handicap: false },
    esperado: { abattement: 80000, taxable: 0, droits: 0 },
  },
]);
