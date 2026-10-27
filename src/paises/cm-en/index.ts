import { definirEdicion } from "@/motor/registro";
import cm from "../cm";
import { DATOS } from "./lib/comun";
import { mercado } from "./mercado";
import textosCalculSalaireNet from "./textos/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import textosCalculIrpp from "./textos/calcul-irpp";
import contenidoCalculIrpp from "./contenido/calcul-irpp";
import textosCotisationsCnps from "./textos/cotisations-cnps";
import contenidoCotisationsCnps from "./contenido/cotisations-cnps";
import textosCoutEmployeur from "./textos/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import textosCalculTva from "./textos/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import textosSmig from "./textos/smig";
import contenidoSmig from "./contenido/smig";
import textosSalaireNetEnBrut from "./textos/salaire-net-en-brut";
import contenidoSalaireNetEnBrut from "./contenido/salaire-net-en-brut";
import textosImpotGeneralSynthetique from "./textos/impot-general-synthetique";
import contenidoImpotGeneralSynthetique from "./contenido/impot-general-synthetique";
import textosConvertisseurEuroFcfa from "./textos/convertisseur-euro-fcfa";
import contenidoConvertisseurEuroFcfa from "./contenido/convertisseur-euro-fcfa";
import textosVignetteAutomobile from "./textos/vignette-automobile";
import contenidoVignetteAutomobile from "./contenido/vignette-automobile";

export default definirEdicion(cm, {
  mercado,
  traducciones: [
    { textos: textosCalculSalaireNet, contenido: contenidoCalculSalaireNet },
    { textos: textosCalculIrpp, contenido: contenidoCalculIrpp },
    { textos: textosCotisationsCnps, contenido: contenidoCotisationsCnps },
    { textos: textosCoutEmployeur, contenido: contenidoCoutEmployeur },
    { textos: textosCalculTva, contenido: contenidoCalculTva },
    { textos: textosSmig, contenido: contenidoSmig },
    { textos: textosSalaireNetEnBrut, contenido: contenidoSalaireNetEnBrut },
    { textos: textosImpotGeneralSynthetique, contenido: contenidoImpotGeneralSynthetique },
    { textos: textosConvertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa },
    { textos: textosVignetteAutomobile, contenido: contenidoVignetteAutomobile },
  ],
  universales: "todas",
  avisos: {
    "cm.smig-decret-2024": {
      titulo: "Two decrees in force",
      texto: "The February 2024 decree only sets the minimum wage for State employees under the Labour Code. The amounts for agriculture and other sectors come from the March 2023 decree.",
    },
    "cm.cas-particuliers-paie": {
      titulo: "Special cases",
      texto: "The calculation is for an employee in the general scheme. Domestic staff and farm workers don't pay the broadcasting fee, and a tax treaty can change IRPP.",
    },
  },
  datos: DATOS,
});
