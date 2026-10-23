import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement";

const CT = "https://adala.justice.gov.ma/api/uploads/2024/04/30/code%20du%20travail-1714463246806.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "8 000 DH, 8 ans et 9 mois d'ancienneté",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle: "105 mois = 8,75 ans. Heures : 5 × 96 + 3,75 × 144 = 1 020. Horaire 8 000 × 12 ÷ 2 288 = 41,96. Indemnité 1 020 × 41,96 = 42 799,20.",
    },
    fecha: "2026-10-16",
    entrada: { mensuel: 8000, embauche: "2018-01-01", rupture: "2026-10-01" },
    esperado: { heures: 1020, horaire: 41.96, indemnite: 42799.2, anciennete: "8 ans et 9 mois" },
  },
  {
    nombre: "6 000 DH, 20 ans d'ancienneté",
    origen: { tipo: "recalculado", url: CT, detalle: "5 × 96 + 5 × 144 + 5 × 192 + 5 × 240 = 3 360 heures. Horaire 31,47. Indemnité 105 739,20." },
    fecha: "2026-10-16",
    entrada: { mensuel: 6000, embauche: "2006-01-01", rupture: "2026-01-01" },
    esperado: { heures: 3360, indemnite: 105739.2 },
  },
  {
    nombre: "Moins de six mois",
    origen: { tipo: "recalculado", url: CT, detalle: "Article 52 : pas d'indemnité avant six mois." },
    fecha: "2026-10-16",
    entrada: { mensuel: 6000, embauche: "2026-06-01", rupture: "2026-10-01" },
    esperado: { indemnite: 0, heures: 0 },
  },
]);
