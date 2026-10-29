import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irpp";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "2 400 000 F par an, salarié affilié, sans charge",
    origen: {
      tipo: "recalculado",
      detalle: "Retenues 96 000 + 120 000. 2 184 000 − 611 520 = 1 572 480, arrondi 1 572 000. (1 572 000 − 900 000) × 3 % = 20 160.",
    },
    fecha: F,
    entrada: { brut: 2400000, personnes: 0, affilie: true },
    esperado: { retenues: 216000, abattement: 611520, revenuImposable: 1572000, impot: 20160, mensuel: 1680, tauxMarginal: 3 },
  },
  {
    nombre: "180 000 000 F par an : plafond de la déduction et dernière tranche",
    origen: {
      tipo: "recalculado",
      detalle:
        "Retenues 7 200 000 + 9 000 000. 163 800 000 moins 28 % de 10 000 000 = 161 000 000. 63 000 + 300 000 + 450 000 + 600 000 + 750 000 + 1 500 000 + 35 % × 141 000 000 = 53 013 000.",
    },
    fecha: F,
    entrada: { brut: 180000000, personnes: 0, affilie: true },
    esperado: { abattement: 2800000, revenuImposable: 161000000, impot: 53013000, tauxMarginal: 35 },
  },
  {
    nombre: "Six personnes à charge au plus",
    origen: {
      tipo: "recalculado",
      detalle: "Sans cotisations. 6 000 000 − 1 680 000 = 4 320 000 ; huit personnes comptent pour six : − 720 000 = 3 600 000. 63 000 + 60 000 = 123 000.",
    },
    fecha: F,
    entrada: { brut: 6000000, personnes: 8, affilie: false },
    esperado: { deductionCharges: 720000, revenuImposable: 3600000, impot: 123000 },
  },
  {
    nombre: "Revenu sous la tranche exonérée",
    origen: { tipo: "recalculado", detalle: "900 000 − 252 000 = 648 000, sous 900 000 : pas d'impôt." },
    fecha: F,
    entrada: { brut: 900000, personnes: 0, affilie: false },
    esperado: { impot: 0, tauxMarginal: 0 },
  },
]);
