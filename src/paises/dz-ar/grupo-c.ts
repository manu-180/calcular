import type { TraduccionCalculadora } from "@/motor/registro";
import contenidoCalculIfu from "./contenido/calcul-ifu";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoDroitsEnregistrement from "./contenido/droits-enregistrement";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import contenidoIrgRevenusLocatifs from "./contenido/irg-revenus-locatifs";
import contenidoPlusValueCessionActions from "./contenido/plus-value-cession-actions";
import contenidoPlusValueImmobiliere from "./contenido/plus-value-immobiliere";
import contenidoVignetteAutomobile from "./contenido/vignette-automobile";
import textosCalculIfu from "./textos/calcul-ifu";
import textosCalculTva from "./textos/calcul-tva";
import textosDroitsEnregistrement from "./textos/droits-enregistrement";
import textosImpotSurLesSocietes from "./textos/impot-sur-les-societes";
import textosIrgRevenusLocatifs from "./textos/irg-revenus-locatifs";
import textosPlusValueCessionActions from "./textos/plus-value-cession-actions";
import textosPlusValueImmobiliere from "./textos/plus-value-immobiliere";
import textosVignetteAutomobile from "./textos/vignette-automobile";

export const traducciones: TraduccionCalculadora[] = [
  { textos: textosCalculTva, contenido: contenidoCalculTva },
  { textos: textosImpotSurLesSocietes, contenido: contenidoImpotSurLesSocietes },
  { textos: textosCalculIfu, contenido: contenidoCalculIfu },
  { textos: textosVignetteAutomobile, contenido: contenidoVignetteAutomobile },
  { textos: textosDroitsEnregistrement, contenido: contenidoDroitsEnregistrement },
  { textos: textosIrgRevenusLocatifs, contenido: contenidoIrgRevenusLocatifs },
  { textos: textosPlusValueImmobiliere, contenido: contenidoPlusValueImmobiliere },
  { textos: textosPlusValueCessionActions, contenido: contenidoPlusValueCessionActions },
];
