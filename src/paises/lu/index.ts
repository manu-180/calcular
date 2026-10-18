import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaireBrutNet from "./calculadoras/salaire-brut-net";
import impotSurLeRevenu from "./calculadoras/impot-sur-le-revenu";
import cotisationsSociales from "./calculadoras/cotisations-sociales";
import coutEmployeur from "./calculadoras/cout-employeur";
import salaireSocialMinimum from "./calculadoras/salaire-social-minimum";
import calculTva from "./calculadoras/calcul-tva";
import congesPayes from "./calculadoras/conges-payes";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import preavisLicenciement from "./calculadoras/preavis-licenciement";
import indemniteDeDepart from "./calculadoras/indemnite-de-depart";
import allocationsFamiliales from "./calculadoras/allocations-familiales";
import droitsEnregistrement from "./calculadoras/droits-enregistrement";
import calculInflation from "./calculadoras/calcul-inflation";
import indexationSalaires from "./calculadoras/indexation-salaires";
import contenidoSalaireBrutNet from "./contenido/salaire-brut-net";
import contenidoImpotSurLeRevenu from "./contenido/impot-sur-le-revenu";
import contenidoCotisationsSociales from "./contenido/cotisations-sociales";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import contenidoSalaireSocialMinimum from "./contenido/salaire-social-minimum";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoCongesPayes from "./contenido/conges-payes";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import contenidoPreavisLicenciement from "./contenido/preavis-licenciement";
import contenidoIndemniteDeDepart from "./contenido/indemnite-de-depart";
import contenidoAllocationsFamiliales from "./contenido/allocations-familiales";
import contenidoDroitsEnregistrement from "./contenido/droits-enregistrement";
import contenidoCalculInflation from "./contenido/calcul-inflation";
import contenidoIndexationSalaires from "./contenido/indexation-salaires";
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
    { definicion: salaireBrutNet, contenido: contenidoSalaireBrutNet, cliente: () => import("./calculadoras/salaire-brut-net.cliente") },
    { definicion: impotSurLeRevenu, contenido: contenidoImpotSurLeRevenu, cliente: () => import("./calculadoras/impot-sur-le-revenu.cliente") },
    { definicion: cotisationsSociales, contenido: contenidoCotisationsSociales, cliente: () => import("./calculadoras/cotisations-sociales.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: salaireSocialMinimum, contenido: contenidoSalaireSocialMinimum, cliente: () => import("./calculadoras/salaire-social-minimum.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: preavisLicenciement, contenido: contenidoPreavisLicenciement, cliente: () => import("./calculadoras/preavis-licenciement.cliente") },
    { definicion: indemniteDeDepart, contenido: contenidoIndemniteDeDepart, cliente: () => import("./calculadoras/indemnite-de-depart.cliente") },
    { definicion: allocationsFamiliales, contenido: contenidoAllocationsFamiliales, cliente: () => import("./calculadoras/allocations-familiales.cliente") },
    { definicion: droitsEnregistrement, contenido: contenidoDroitsEnregistrement, cliente: () => import("./calculadoras/droits-enregistrement.cliente") },
    { definicion: calculInflation, contenido: contenidoCalculInflation, cliente: () => import("./calculadoras/calcul-inflation.cliente") },
    { definicion: indexationSalaires, contenido: contenidoIndexationSalaires, cliente: () => import("./calculadoras/indexation-salaires.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
