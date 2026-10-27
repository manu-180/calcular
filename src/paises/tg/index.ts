import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIrpp from "./calculadoras/calcul-irpp";
import contenidoCalculIrpp from "./contenido/calcul-irpp";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import indemniteFinDeContrat from "./calculadoras/indemnite-fin-de-contrat";
import contenidoIndemniteFinDeContrat from "./contenido/indemnite-fin-de-contrat";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import taxeProfessionnelleUnique from "./calculadoras/taxe-professionnelle-unique";
import contenidoTaxeProfessionnelleUnique from "./contenido/taxe-professionnelle-unique";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import plusValueImmobiliere from "./calculadoras/plus-value-immobiliere";
import contenidoPlusValueImmobiliere from "./contenido/plus-value-immobiliere";
import impotSurLesDividendes from "./calculadoras/impot-sur-les-dividendes";
import contenidoImpotSurLesDividendes from "./contenido/impot-sur-les-dividendes";
import vignetteAuto from "./calculadoras/vignette-auto";
import contenidoVignetteAuto from "./contenido/vignette-auto";
import taxeFonciere from "./calculadoras/taxe-fonciere";
import contenidoTaxeFonciere from "./contenido/taxe-fonciere";
import allocationsFamiliales from "./calculadoras/allocations-familiales";
import contenidoAllocationsFamiliales from "./contenido/allocations-familiales";
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
    { definicion: calculIrpp, contenido: contenidoCalculIrpp, cliente: () => import("./calculadoras/calcul-irpp.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: indemniteFinDeContrat, contenido: contenidoIndemniteFinDeContrat, cliente: () => import("./calculadoras/indemnite-fin-de-contrat.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: taxeProfessionnelleUnique, contenido: contenidoTaxeProfessionnelleUnique, cliente: () => import("./calculadoras/taxe-professionnelle-unique.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: plusValueImmobiliere, contenido: contenidoPlusValueImmobiliere, cliente: () => import("./calculadoras/plus-value-immobiliere.cliente") },
    { definicion: impotSurLesDividendes, contenido: contenidoImpotSurLesDividendes, cliente: () => import("./calculadoras/impot-sur-les-dividendes.cliente") },
    { definicion: vignetteAuto, contenido: contenidoVignetteAuto, cliente: () => import("./calculadoras/vignette-auto.cliente") },
    { definicion: taxeFonciere, contenido: contenidoTaxeFonciere, cliente: () => import("./calculadoras/taxe-fonciere.cliente") },
    { definicion: allocationsFamiliales, contenido: contenidoAllocationsFamiliales, cliente: () => import("./calculadoras/allocations-familiales.cliente") },
    { definicion: convertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa, cliente: () => import("./calculadoras/convertisseur-euro-fcfa.cliente") },
    { definicion: convertisseurDollarFcfa, contenido: contenidoConvertisseurDollarFcfa, cliente: () => import("./calculadoras/convertisseur-dollar-fcfa.cliente") },
  ],
  universales: "todas",
});
