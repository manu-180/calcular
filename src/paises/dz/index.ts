import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIrgSalaire from "./calculadoras/calcul-irg-salaire";
import calculSalaireBrut from "./calculadoras/calcul-salaire-brut";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import cotisationsCnas from "./calculadoras/cotisations-cnas";
import contenidoCalculIrgSalaire from "./contenido/calcul-irg-salaire";
import contenidoCalculSalaireBrut from "./contenido/calcul-salaire-brut";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import contenidoCotisationsCnas from "./contenido/cotisations-cnas";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import snmgAlgerie from "./calculadoras/snmg-algerie";
import contenidoSnmgAlgerie from "./contenido/snmg-algerie";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import calculIfu from "./calculadoras/calcul-ifu";
import contenidoCalculIfu from "./contenido/calcul-ifu";
import vignetteAutomobile from "./calculadoras/vignette-automobile";
import contenidoVignetteAutomobile from "./contenido/vignette-automobile";
import droitsEnregistrement from "./calculadoras/droits-enregistrement";
import contenidoDroitsEnregistrement from "./contenido/droits-enregistrement";
import irgRevenusLocatifs from "./calculadoras/irg-revenus-locatifs";
import contenidoIrgRevenusLocatifs from "./contenido/irg-revenus-locatifs";
import irgActivitesOccasionnelles from "./calculadoras/irg-activites-occasionnelles";
import contenidoIrgActivitesOccasionnelles from "./contenido/irg-activites-occasionnelles";
import calculIrgPrime from "./calculadoras/calcul-irg-prime";
import contenidoCalculIrgPrime from "./contenido/calcul-irg-prime";
import impotSurDividendes from "./calculadoras/impot-sur-dividendes";
import contenidoImpotSurDividendes from "./contenido/impot-sur-dividendes";
import allocationChomage from "./calculadoras/allocation-chomage";
import contenidoAllocationChomage from "./contenido/allocation-chomage";
import congeMaternite from "./calculadoras/conge-maternite";
import contenidoCongeMaternite from "./contenido/conge-maternite";
import plusValueImmobiliere from "./calculadoras/plus-value-immobiliere";
import contenidoPlusValueImmobiliere from "./contenido/plus-value-immobiliere";
import impotInteretsEpargne from "./calculadoras/impot-interets-epargne";
import contenidoImpotInteretsEpargne from "./contenido/impot-interets-epargne";
import plusValueCessionActions from "./calculadoras/plus-value-cession-actions";
import contenidoPlusValueCessionActions from "./contenido/plus-value-cession-actions";
import pensionDeRetraite from "./calculadoras/pension-de-retraite";
import contenidoPensionDeRetraite from "./contenido/pension-de-retraite";
import indemniteArretMaladie from "./calculadoras/indemnite-arret-maladie";
import contenidoIndemniteArretMaladie from "./contenido/indemnite-arret-maladie";
import capitalDeces from "./calculadoras/capital-deces";
import contenidoCapitalDeces from "./contenido/capital-deces";
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
    { definicion: calculSalaireNet, contenido: contenidoCalculSalaireNet, cliente: () => import("./calculadoras/calcul-salaire-net.cliente") },
    { definicion: calculIrgSalaire, contenido: contenidoCalculIrgSalaire, cliente: () => import("./calculadoras/calcul-irg-salaire.cliente") },
    { definicion: calculSalaireBrut, contenido: contenidoCalculSalaireBrut, cliente: () => import("./calculadoras/calcul-salaire-brut.cliente") },
    { definicion: cotisationsCnas, contenido: contenidoCotisationsCnas, cliente: () => import("./calculadoras/cotisations-cnas.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: snmgAlgerie, contenido: contenidoSnmgAlgerie, cliente: () => import("./calculadoras/snmg-algerie.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: calculIfu, contenido: contenidoCalculIfu, cliente: () => import("./calculadoras/calcul-ifu.cliente") },
    { definicion: vignetteAutomobile, contenido: contenidoVignetteAutomobile, cliente: () => import("./calculadoras/vignette-automobile.cliente") },
    { definicion: droitsEnregistrement, contenido: contenidoDroitsEnregistrement, cliente: () => import("./calculadoras/droits-enregistrement.cliente") },
    { definicion: irgRevenusLocatifs, contenido: contenidoIrgRevenusLocatifs, cliente: () => import("./calculadoras/irg-revenus-locatifs.cliente") },
    { definicion: irgActivitesOccasionnelles, contenido: contenidoIrgActivitesOccasionnelles, cliente: () => import("./calculadoras/irg-activites-occasionnelles.cliente") },
    { definicion: calculIrgPrime, contenido: contenidoCalculIrgPrime, cliente: () => import("./calculadoras/calcul-irg-prime.cliente") },
    { definicion: impotSurDividendes, contenido: contenidoImpotSurDividendes, cliente: () => import("./calculadoras/impot-sur-dividendes.cliente") },
    { definicion: allocationChomage, contenido: contenidoAllocationChomage, cliente: () => import("./calculadoras/allocation-chomage.cliente") },
    { definicion: congeMaternite, contenido: contenidoCongeMaternite, cliente: () => import("./calculadoras/conge-maternite.cliente") },
    { definicion: plusValueImmobiliere, contenido: contenidoPlusValueImmobiliere, cliente: () => import("./calculadoras/plus-value-immobiliere.cliente") },
    { definicion: impotInteretsEpargne, contenido: contenidoImpotInteretsEpargne, cliente: () => import("./calculadoras/impot-interets-epargne.cliente") },
    { definicion: plusValueCessionActions, contenido: contenidoPlusValueCessionActions, cliente: () => import("./calculadoras/plus-value-cession-actions.cliente") },
    { definicion: pensionDeRetraite, contenido: contenidoPensionDeRetraite, cliente: () => import("./calculadoras/pension-de-retraite.cliente") },
    { definicion: indemniteArretMaladie, contenido: contenidoIndemniteArretMaladie, cliente: () => import("./calculadoras/indemnite-arret-maladie.cliente") },
    { definicion: capitalDeces, contenido: contenidoCapitalDeces, cliente: () => import("./calculadoras/capital-deces.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
