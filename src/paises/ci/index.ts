import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIts from "./calculadoras/calcul-its";
import contenidoCalculIts from "./contenido/calcul-its";
import calculCotisationsCnps from "./calculadoras/calcul-cotisations-cnps";
import contenidoCalculCotisationsCnps from "./contenido/calcul-cotisations-cnps";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import indemniteFinDeContrat from "./calculadoras/indemnite-fin-de-contrat";
import contenidoIndemniteFinDeContrat from "./contenido/indemnite-fin-de-contrat";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import primeAnciennete from "./calculadoras/prime-anciennete";
import contenidoPrimeAnciennete from "./contenido/prime-anciennete";
import primeDeFinDAnnee from "./calculadoras/prime-de-fin-d-annee";
import contenidoPrimeDeFinDAnnee from "./contenido/prime-de-fin-d-annee";
import indemniteDepartRetraite from "./calculadoras/indemnite-depart-retraite";
import contenidoIndemniteDepartRetraite from "./contenido/indemnite-depart-retraite";
import taxeEntreprenant from "./calculadoras/taxe-entreprenant";
import contenidoTaxeEntreprenant from "./contenido/taxe-entreprenant";
import impotSurLesBenefices from "./calculadoras/impot-sur-les-benefices";
import contenidoImpotSurLesBenefices from "./contenido/impot-sur-les-benefices";
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
    { definicion: calculCotisationsCnps, contenido: contenidoCalculCotisationsCnps, cliente: () => import("./calculadoras/calcul-cotisations-cnps.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: indemniteFinDeContrat, contenido: contenidoIndemniteFinDeContrat, cliente: () => import("./calculadoras/indemnite-fin-de-contrat.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: primeAnciennete, contenido: contenidoPrimeAnciennete, cliente: () => import("./calculadoras/prime-anciennete.cliente") },
    { definicion: primeDeFinDAnnee, contenido: contenidoPrimeDeFinDAnnee, cliente: () => import("./calculadoras/prime-de-fin-d-annee.cliente") },
    { definicion: indemniteDepartRetraite, contenido: contenidoIndemniteDepartRetraite, cliente: () => import("./calculadoras/indemnite-depart-retraite.cliente") },
    { definicion: taxeEntreprenant, contenido: contenidoTaxeEntreprenant, cliente: () => import("./calculadoras/taxe-entreprenant.cliente") },
    { definicion: impotSurLesBenefices, contenido: contenidoImpotSurLesBenefices, cliente: () => import("./calculadoras/impot-sur-les-benefices.cliente") },
    { definicion: convertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa, cliente: () => import("./calculadoras/convertisseur-euro-fcfa.cliente") },
    { definicion: convertisseurDollarFcfa, contenido: contenidoConvertisseurDollarFcfa, cliente: () => import("./calculadoras/convertisseur-dollar-fcfa.cliente") },
  ],
  universales: "todas",
});
