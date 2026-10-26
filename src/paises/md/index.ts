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
import salariulMediuPeEconomie from "./calculadoras/salariul-mediu-pe-economie";
import contenidoSalariulMediuPeEconomie from "./contenido/salariul-mediu-pe-economie";
import calculatorImpozitPeVenit from "./calculadoras/calculator-impozit-pe-venit";
import contenidoCalculatorImpozitPeVenit from "./contenido/calculator-impozit-pe-venit";
import calculatorTva from "./calculadoras/calculator-tva";
import contenidoCalculatorTva from "./contenido/calculator-tva";
import impozitPeDividende from "./calculadoras/impozit-pe-dividende";
import contenidoImpozitPeDividende from "./contenido/impozit-pe-dividende";
import cursValutarBnm from "./calculadoras/curs-valutar-bnm";
import contenidoCursValutarBnm from "./contenido/curs-valutar-bnm";
import calculatorInflatie from "./calculadoras/calculator-inflatie";
import contenidoCalculatorInflatie from "./contenido/calculator-inflatie";
import calculatorConcediuMedical from "./calculadoras/calculator-concediu-medical";
import contenidoCalculatorConcediuMedical from "./contenido/calculator-concediu-medical";
import indemnizatieDeMaternitate from "./calculadoras/indemnizatie-de-maternitate";
import contenidoIndemnizatieDeMaternitate from "./contenido/indemnizatie-de-maternitate";
import indemnizatieCrestereCopil from "./calculadoras/indemnizatie-crestere-copil";
import contenidoIndemnizatieCrestereCopil from "./contenido/indemnizatie-crestere-copil";
import indemnizatieUnicaLaNastere from "./calculadoras/indemnizatie-unica-la-nastere";
import contenidoIndemnizatieUnicaLaNastere from "./contenido/indemnizatie-unica-la-nastere";
import indemnizatieDeSomaj from "./calculadoras/indemnizatie-de-somaj";
import contenidoIndemnizatieDeSomaj from "./contenido/indemnizatie-de-somaj";
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
    { definicion: salariulMediuPeEconomie, contenido: contenidoSalariulMediuPeEconomie, cliente: () => import("./calculadoras/salariul-mediu-pe-economie.cliente") },
    { definicion: calculatorImpozitPeVenit, contenido: contenidoCalculatorImpozitPeVenit, cliente: () => import("./calculadoras/calculator-impozit-pe-venit.cliente") },
    { definicion: calculatorTva, contenido: contenidoCalculatorTva, cliente: () => import("./calculadoras/calculator-tva.cliente") },
    { definicion: impozitPeDividende, contenido: contenidoImpozitPeDividende, cliente: () => import("./calculadoras/impozit-pe-dividende.cliente") },
    { definicion: cursValutarBnm, contenido: contenidoCursValutarBnm, cliente: () => import("./calculadoras/curs-valutar-bnm.cliente") },
    { definicion: calculatorInflatie, contenido: contenidoCalculatorInflatie, cliente: () => import("./calculadoras/calculator-inflatie.cliente") },
    { definicion: calculatorConcediuMedical, contenido: contenidoCalculatorConcediuMedical, cliente: () => import("./calculadoras/calculator-concediu-medical.cliente") },
    { definicion: indemnizatieDeMaternitate, contenido: contenidoIndemnizatieDeMaternitate, cliente: () => import("./calculadoras/indemnizatie-de-maternitate.cliente") },
    { definicion: indemnizatieCrestereCopil, contenido: contenidoIndemnizatieCrestereCopil, cliente: () => import("./calculadoras/indemnizatie-crestere-copil.cliente") },
    { definicion: indemnizatieUnicaLaNastere, contenido: contenidoIndemnizatieUnicaLaNastere, cliente: () => import("./calculadoras/indemnizatie-unica-la-nastere.cliente") },
    { definicion: indemnizatieDeSomaj, contenido: contenidoIndemnizatieDeSomaj, cliente: () => import("./calculadoras/indemnizatie-de-somaj.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
