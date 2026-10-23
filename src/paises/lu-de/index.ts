import { definirEdicion } from "@/motor/registro";
import lu from "../lu";
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
import { AVISOS, DATOS } from "./lib/datos";
import { mercado } from "./mercado";
import textosSalaireBrutNet from "./textos/salaire-brut-net";
import textosImpotSurLeRevenu from "./textos/impot-sur-le-revenu";
import textosCotisationsSociales from "./textos/cotisations-sociales";
import textosCoutEmployeur from "./textos/cout-employeur";
import textosSalaireSocialMinimum from "./textos/salaire-social-minimum";
import textosCalculTva from "./textos/calcul-tva";
import textosCongesPayes from "./textos/conges-payes";
import textosHeuresSupplementaires from "./textos/heures-supplementaires";
import textosPreavisLicenciement from "./textos/preavis-licenciement";
import textosIndemniteDeDepart from "./textos/indemnite-de-depart";
import textosAllocationsFamiliales from "./textos/allocations-familiales";
import textosDroitsEnregistrement from "./textos/droits-enregistrement";
import textosCalculInflation from "./textos/calcul-inflation";
import textosIndexationSalaires from "./textos/indexation-salaires";

export default definirEdicion(lu, {
  mercado,
  traducciones: [
    { textos: textosSalaireBrutNet, contenido: contenidoSalaireBrutNet },
    { textos: textosImpotSurLeRevenu, contenido: contenidoImpotSurLeRevenu },
    { textos: textosCotisationsSociales, contenido: contenidoCotisationsSociales },
    { textos: textosCoutEmployeur, contenido: contenidoCoutEmployeur },
    { textos: textosSalaireSocialMinimum, contenido: contenidoSalaireSocialMinimum },
    { textos: textosCalculTva, contenido: contenidoCalculTva },
    { textos: textosCongesPayes, contenido: contenidoCongesPayes },
    { textos: textosHeuresSupplementaires, contenido: contenidoHeuresSupplementaires },
    { textos: textosPreavisLicenciement, contenido: contenidoPreavisLicenciement },
    { textos: textosIndemniteDeDepart, contenido: contenidoIndemniteDeDepart },
    { textos: textosAllocationsFamiliales, contenido: contenidoAllocationsFamiliales },
    { textos: textosDroitsEnregistrement, contenido: contenidoDroitsEnregistrement },
    { textos: textosCalculInflation, contenido: contenidoCalculInflation },
    { textos: textosIndexationSalaires, contenido: contenidoIndexationSalaires },
  ],
  universales: "todas",
  avisos: AVISOS,
  datos: DATOS,
});
