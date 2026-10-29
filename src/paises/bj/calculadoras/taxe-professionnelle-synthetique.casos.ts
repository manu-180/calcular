import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-professionnelle-synthetique";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "4 000 000 F de recettes, un établissement",
    origen: { tipo: "recalculado", detalle: "Art. 183 du CGI : 5 % de 4 000 000 = 200 000, plus 4 000 de redevance = 204 000." },
    fecha: F,
    entrada: { recettes: 4000000, etablissements: 1 },
    esperado: { impot: 200000, redevance: 4000, total: 204000 },
  },
  {
    nombre: "150 000 F de recettes : minimum de perception",
    origen: { tipo: "recalculado", detalle: "5 % de 150 000 = 7 500, inférieur au minimum de 10 000 ; plus 4 000 de redevance = 14 000." },
    fecha: F,
    entrada: { recettes: 150000, etablissements: 1 },
    esperado: { impot: 10000, total: 14000, minimumApplique: "Oui, le minimum de perception s'applique." },
  },
  {
    nombre: "Deux établissements",
    origen: { tipo: "recalculado", detalle: "La taxe est due par commune et par établissement : 2 × (5 % de 1 000 000 + 4 000) = 108 000." },
    fecha: F,
    entrada: { recettes: 1000000, etablissements: 2 },
    esperado: { total: 108000, parEtablissement: 54000 },
  },
]);
