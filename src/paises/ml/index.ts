import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIts from "./calculadoras/calcul-its";
import contenidoCalculIts from "./contenido/calcul-its";
import calculIrvm from "./calculadoras/calcul-irvm";
import contenidoCalculIrvm from "./contenido/calcul-irvm";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import congeMaternite from "./calculadoras/conge-maternite";
import contenidoCongeMaternite from "./contenido/conge-maternite";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import convertisseurDollarFcfa from "./calculadoras/convertisseur-dollar-fcfa";
import contenidoConvertisseurDollarFcfa from "./contenido/convertisseur-dollar-fcfa";
import convertisseurEuroFcfa from "./calculadoras/convertisseur-euro-fcfa";
import contenidoConvertisseurEuroFcfa from "./contenido/convertisseur-euro-fcfa";
import cotisationAmo from "./calculadoras/cotisation-amo";
import contenidoCotisationAmo from "./contenido/cotisation-amo";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import impotRevenusFonciers from "./calculadoras/impot-revenus-fonciers";
import contenidoImpotRevenusFonciers from "./contenido/impot-revenus-fonciers";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import impotSynthetique from "./calculadoras/impot-synthetique";
import contenidoImpotSynthetique from "./contenido/impot-synthetique";
import indemniteDepartRetraite from "./calculadoras/indemnite-depart-retraite";
import contenidoIndemniteDepartRetraite from "./contenido/indemnite-depart-retraite";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import indemniteServicesRendus from "./calculadoras/indemnite-services-rendus";
import contenidoIndemniteServicesRendus from "./contenido/indemnite-services-rendus";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import retenueNonResidents from "./calculadoras/retenue-non-residents";
import contenidoRetenueNonResidents from "./contenido/retenue-non-residents";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import taxesSurSalaires from "./calculadoras/taxes-sur-salaires";
import contenidoTaxesSurSalaires from "./contenido/taxes-sur-salaires";
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
    { definicion: calculIrvm, contenido: contenidoCalculIrvm, cliente: () => import("./calculadoras/calcul-irvm.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: congeMaternite, contenido: contenidoCongeMaternite, cliente: () => import("./calculadoras/conge-maternite.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: convertisseurDollarFcfa, contenido: contenidoConvertisseurDollarFcfa, cliente: () => import("./calculadoras/convertisseur-dollar-fcfa.cliente") },
    { definicion: convertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa, cliente: () => import("./calculadoras/convertisseur-euro-fcfa.cliente") },
    { definicion: cotisationAmo, contenido: contenidoCotisationAmo, cliente: () => import("./calculadoras/cotisation-amo.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: impotRevenusFonciers, contenido: contenidoImpotRevenusFonciers, cliente: () => import("./calculadoras/impot-revenus-fonciers.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: impotSynthetique, contenido: contenidoImpotSynthetique, cliente: () => import("./calculadoras/impot-synthetique.cliente") },
    { definicion: indemniteDepartRetraite, contenido: contenidoIndemniteDepartRetraite, cliente: () => import("./calculadoras/indemnite-depart-retraite.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: indemniteServicesRendus, contenido: contenidoIndemniteServicesRendus, cliente: () => import("./calculadoras/indemnite-services-rendus.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: retenueNonResidents, contenido: contenidoRetenueNonResidents, cliente: () => import("./calculadoras/retenue-non-residents.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: taxesSurSalaires, contenido: contenidoTaxesSurSalaires, cliente: () => import("./calculadoras/taxes-sur-salaires.cliente") },
  ],
  universales: "todas",
});
