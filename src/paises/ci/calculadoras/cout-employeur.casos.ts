import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

const F = "2026-10-23";

export default definirCasos(calculadora, [
  {
    nombre: "Salarié local à 300 000 F, accidents du travail 2 %",
    origen: { tipo: "recalculado", detalle: "CNPS patronale 28 525 ; contribution employeur 0 % ; taxe d'apprentissage 0,4 % = 1 200. Charges 29 725, coût 329 725." },
    fecha: F,
    entrada: { brut: 300000, personnel: "local", tauxAt: 2 },
    esperado: { cnps: 28525, contribution: 0, apprentissage: 1200, charges: 29725, cout: 329725, tauxCharges: 9.91 },
  },
  {
    nombre: "Salarié expatrié à 300 000 F",
    origen: { tipo: "recalculado", detalle: "Contribution employeur 9,2 % = 27 600. Charges 28 525 + 27 600 + 1 200 = 57 325, coût 357 325." },
    fecha: F,
    entrada: { brut: 300000, personnel: "expatrie", tauxAt: 2 },
    esperado: { contribution: 27600, charges: 57325, cout: 357325, tauxCharges: 19.11 },
  },
]);
