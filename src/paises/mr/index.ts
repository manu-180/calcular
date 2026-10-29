import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIts from "./calculadoras/calcul-its";
import contenidoCalculIts from "./contenido/calcul-its";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import coursDollarOuguiya from "./calculadoras/cours-dollar-ouguiya";
import contenidoCoursDollarOuguiya from "./contenido/cours-dollar-ouguiya";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import impotDividendes from "./calculadoras/impot-dividendes";
import contenidoImpotDividendes from "./contenido/impot-dividendes";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import pensionRetraite from "./calculadoras/pension-retraite";
import contenidoPensionRetraite from "./contenido/pension-retraite";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import salaireBrut from "./calculadoras/salaire-brut";
import contenidoSalaireBrut from "./contenido/salaire-brut";
import salaireNet from "./calculadoras/salaire-net";
import contenidoSalaireNet from "./contenido/salaire-net";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import vignetteAutomobile from "./calculadoras/vignette-automobile";
import contenidoVignetteAutomobile from "./contenido/vignette-automobile";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// La TVA es local (calcul-tva): la universal del mismo concepto se cae sola.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: calculIts, contenido: contenidoCalculIts, cliente: () => import("./calculadoras/calcul-its.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coursDollarOuguiya, contenido: contenidoCoursDollarOuguiya, cliente: () => import("./calculadoras/cours-dollar-ouguiya.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: impotDividendes, contenido: contenidoImpotDividendes, cliente: () => import("./calculadoras/impot-dividendes.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: pensionRetraite, contenido: contenidoPensionRetraite, cliente: () => import("./calculadoras/pension-retraite.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: salaireBrut, contenido: contenidoSalaireBrut, cliente: () => import("./calculadoras/salaire-brut.cliente") },
    { definicion: salaireNet, contenido: contenidoSalaireNet, cliente: () => import("./calculadoras/salaire-net.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: vignetteAutomobile, contenido: contenidoVignetteAutomobile, cliente: () => import("./calculadoras/vignette-automobile.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
