import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-synthetique";

export default definirCasos(calculadora, [
  {
    nombre: "Commerce de 20 millions de chiffre d'affaires",
    origen: { tipo: "recalculado", detalle: "20 000 000 × 3 % = 600 000." },
    fecha: "2026-10-27",
    entrada: {"ca": 20000000, "premiereAnnee": false},
    esperado: {"impot": 600000, "regime": "Impôt synthétique", "parMois": 50000},
  },
  {
    nombre: "Chiffre d'affaires de 50 millions",
    origen: { tipo: "recalculado", detalle: "Seuil atteint : régime du bénéfice réel." },
    fecha: "2026-10-27",
    entrada: {"ca": 50000000, "premiereAnnee": false},
    esperado: {"impot": 0, "regime": "Régime du bénéfice réel"},
  },
  {
    nombre: "Première année d'activité",
    origen: { tipo: "recalculado", detalle: "Exonération la première année civile." },
    fecha: "2026-10-27",
    entrada: {"ca": 12000000, "premiereAnnee": true},
    esperado: {"impot": 0},
  },
]);
