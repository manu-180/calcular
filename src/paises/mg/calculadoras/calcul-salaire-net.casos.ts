import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const valores = {
  "mg.irsa-bareme": [
    { desde: 0, hasta: 350000, tasa: 0 },
    { desde: 350000, hasta: 400000, tasa: 5 },
    { desde: 400000, hasta: 500000, tasa: 10 },
    { desde: 500000, hasta: 600000, tasa: 15 },
    { desde: 600000, hasta: 4000000, tasa: 20 },
    { desde: 4000000, hasta: null, tasa: 25 },
  ],
  "mg.irsa-minimum": 3000,
  "mg.irsa-reduction-charge": 2000,
  "mg.irsa-deductions": { retraite: 10, sante: 2 },
  "mg.sme-general": 300000,
  "mg.plafond-cnaps-sme": 8,
  "mg.cotisation-cnaps-salarie": 1,
  "mg.cotisation-sante-salarie": 1,
};

// Fórmula sola, con los taux pisados: los datos de cotisation no están verificados.
export default definirCasos(calculadora, [
  {
    nombre: "1 000 000 Ar bruts, taux de 1 % et 1 %",
    origen: { tipo: "recalculado", detalle: "CNaPS 10 000, santé 10 000, IRSA sur 980 000 = 103 500. Net 1 000 000 − 123 500 = 876 500." },
    fecha: "2026-09-15",
    entrada: { brut: 1000000, personnesCharge: 0, autres: 0 },
    valores,
    esperado: { cnaps: 10000, sante: 10000, irsa: 103500, net: 876500 },
  },
  {
    nombre: "3 000 000 Ar : CNaPS plafonnée à 8 SME",
    origen: { tipo: "recalculado", detalle: "CNaPS 1 % × 2 400 000 = 24 000 ; santé 30 000. Base 2 946 000 : 27 500 + 2 346 000 × 20 % = 496 700. Net 3 000 000 − 550 700 = 2 449 300." },
    fecha: "2026-09-15",
    entrada: { brut: 3000000, personnesCharge: 0, autres: 0 },
    valores,
    esperado: { cnaps: 24000, sante: 30000, irsa: 496700, net: 2449300 },
  },
]);
