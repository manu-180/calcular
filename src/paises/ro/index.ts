import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculatorSalariuNet from "./calculadoras/calculator-salariu-net";
import contenidoCalculatorSalariuNet from "./contenido/calculator-salariu-net";
import calculatorSalariuBrut from "./calculadoras/calculator-salariu-brut";
import contenidoCalculatorSalariuBrut from "./contenido/calculator-salariu-brut";
import costTotalAngajator from "./calculadoras/cost-total-angajator";
import contenidoCostTotalAngajator from "./contenido/cost-total-angajator";
import salariulMinim from "./calculadoras/salariul-minim";
import contenidoSalariulMinim from "./contenido/salariul-minim";
import calculatorTva from "./calculadoras/calculator-tva";
import contenidoCalculatorTva from "./contenido/calculator-tva";
import calculatorPfa from "./calculadoras/calculator-pfa";
import contenidoCalculatorPfa from "./contenido/calculator-pfa";
import calculatorMicrointreprindere from "./calculadoras/calculator-microintreprindere";
import contenidoCalculatorMicrointreprindere from "./contenido/calculator-microintreprindere";
import impozitDividende from "./calculadoras/impozit-dividende";
import contenidoImpozitDividende from "./contenido/impozit-dividende";
import impozitChirie from "./calculadoras/impozit-chirie";
import contenidoImpozitChirie from "./contenido/impozit-chirie";
import impozitVanzareApartament from "./calculadoras/impozit-vanzare-apartament";
import contenidoImpozitVanzareApartament from "./contenido/impozit-vanzare-apartament";
import calculatorCass from "./calculadoras/calculator-cass";
import contenidoCalculatorCass from "./contenido/calculator-cass";
import calculatorDrepturiDeAutor from "./calculadoras/calculator-drepturi-de-autor";
import contenidoCalculatorDrepturiDeAutor from "./contenido/calculator-drepturi-de-autor";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: calculatorSalariuNet, contenido: contenidoCalculatorSalariuNet, cliente: () => import("./calculadoras/calculator-salariu-net.cliente") },
    { definicion: calculatorSalariuBrut, contenido: contenidoCalculatorSalariuBrut, cliente: () => import("./calculadoras/calculator-salariu-brut.cliente") },
    { definicion: costTotalAngajator, contenido: contenidoCostTotalAngajator, cliente: () => import("./calculadoras/cost-total-angajator.cliente") },
    { definicion: salariulMinim, contenido: contenidoSalariulMinim, cliente: () => import("./calculadoras/salariul-minim.cliente") },
    { definicion: calculatorTva, contenido: contenidoCalculatorTva, cliente: () => import("./calculadoras/calculator-tva.cliente") },
    { definicion: calculatorPfa, contenido: contenidoCalculatorPfa, cliente: () => import("./calculadoras/calculator-pfa.cliente") },
    { definicion: calculatorMicrointreprindere, contenido: contenidoCalculatorMicrointreprindere, cliente: () => import("./calculadoras/calculator-microintreprindere.cliente") },
    { definicion: impozitDividende, contenido: contenidoImpozitDividende, cliente: () => import("./calculadoras/impozit-dividende.cliente") },
    { definicion: impozitChirie, contenido: contenidoImpozitChirie, cliente: () => import("./calculadoras/impozit-chirie.cliente") },
    { definicion: impozitVanzareApartament, contenido: contenidoImpozitVanzareApartament, cliente: () => import("./calculadoras/impozit-vanzare-apartament.cliente") },
    { definicion: calculatorCass, contenido: contenidoCalculatorCass, cliente: () => import("./calculadoras/calculator-cass.cliente") },
    { definicion: calculatorDrepturiDeAutor, contenido: contenidoCalculatorDrepturiDeAutor, cliente: () => import("./calculadoras/calculator-drepturi-de-autor.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
