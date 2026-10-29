import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIts from "./calculadoras/calcul-its";
import contenidoCalculIts from "./contenido/calcul-its";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import indemniteLicenciementAbusif from "./calculadoras/indemnite-licenciement-abusif";
import contenidoIndemniteLicenciementAbusif from "./contenido/indemnite-licenciement-abusif";
import taxeProfessionnelleSynthetique from "./calculadoras/taxe-professionnelle-synthetique";
import contenidoTaxeProfessionnelleSynthetique from "./contenido/taxe-professionnelle-synthetique";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import impotSurLesBeneficesDAffaires from "./calculadoras/impot-sur-les-benefices-d-affaires";
import contenidoImpotSurLesBeneficesDAffaires from "./contenido/impot-sur-les-benefices-d-affaires";
import impotRevenusFonciers from "./calculadoras/impot-revenus-fonciers";
import contenidoImpotRevenusFonciers from "./contenido/impot-revenus-fonciers";
import plusValueImmobiliere from "./calculadoras/plus-value-immobiliere";
import contenidoPlusValueImmobiliere from "./contenido/plus-value-immobiliere";
import impotRevenusCapitauxMobiliers from "./calculadoras/impot-revenus-capitaux-mobiliers";
import contenidoImpotRevenusCapitauxMobiliers from "./contenido/impot-revenus-capitaux-mobiliers";
import acompteAib from "./calculadoras/acompte-aib";
import contenidoAcompteAib from "./contenido/acompte-aib";
import taxeVehiculesAMoteur from "./calculadoras/taxe-vehicules-a-moteur";
import contenidoTaxeVehiculesAMoteur from "./contenido/taxe-vehicules-a-moteur";
import avantagesEnNature from "./calculadoras/avantages-en-nature";
import contenidoAvantagesEnNature from "./contenido/avantages-en-nature";
import itsTreiziemeMois from "./calculadoras/its-treizieme-mois";
import contenidoItsTreiziemeMois from "./contenido/its-treizieme-mois";
import convertisseurEuroFcfa from "./calculadoras/convertisseur-euro-fcfa";
import contenidoConvertisseurEuroFcfa from "./contenido/convertisseur-euro-fcfa";
import convertisseurDollarFcfa from "./calculadoras/convertisseur-dollar-fcfa";
import contenidoConvertisseurDollarFcfa from "./contenido/convertisseur-dollar-fcfa";
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
  novedades,
  detectores,
  calculadoras: [
    { definicion: calculSalaireNet, contenido: contenidoCalculSalaireNet, cliente: () => import("./calculadoras/calcul-salaire-net.cliente") },
    { definicion: calculIts, contenido: contenidoCalculIts, cliente: () => import("./calculadoras/calcul-its.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: indemniteLicenciementAbusif, contenido: contenidoIndemniteLicenciementAbusif, cliente: () => import("./calculadoras/indemnite-licenciement-abusif.cliente") },
    { definicion: taxeProfessionnelleSynthetique, contenido: contenidoTaxeProfessionnelleSynthetique, cliente: () => import("./calculadoras/taxe-professionnelle-synthetique.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: impotSurLesBeneficesDAffaires, contenido: contenidoImpotSurLesBeneficesDAffaires, cliente: () => import("./calculadoras/impot-sur-les-benefices-d-affaires.cliente") },
    { definicion: impotRevenusFonciers, contenido: contenidoImpotRevenusFonciers, cliente: () => import("./calculadoras/impot-revenus-fonciers.cliente") },
    { definicion: plusValueImmobiliere, contenido: contenidoPlusValueImmobiliere, cliente: () => import("./calculadoras/plus-value-immobiliere.cliente") },
    { definicion: impotRevenusCapitauxMobiliers, contenido: contenidoImpotRevenusCapitauxMobiliers, cliente: () => import("./calculadoras/impot-revenus-capitaux-mobiliers.cliente") },
    { definicion: acompteAib, contenido: contenidoAcompteAib, cliente: () => import("./calculadoras/acompte-aib.cliente") },
    { definicion: taxeVehiculesAMoteur, contenido: contenidoTaxeVehiculesAMoteur, cliente: () => import("./calculadoras/taxe-vehicules-a-moteur.cliente") },
    { definicion: avantagesEnNature, contenido: contenidoAvantagesEnNature, cliente: () => import("./calculadoras/avantages-en-nature.cliente") },
    { definicion: itsTreiziemeMois, contenido: contenidoItsTreiziemeMois, cliente: () => import("./calculadoras/its-treizieme-mois.cliente") },
    { definicion: convertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa, cliente: () => import("./calculadoras/convertisseur-euro-fcfa.cliente") },
    { definicion: convertisseurDollarFcfa, contenido: contenidoConvertisseurDollarFcfa, cliente: () => import("./calculadoras/convertisseur-dollar-fcfa.cliente") },
  ],
  universales: "todas",
});
