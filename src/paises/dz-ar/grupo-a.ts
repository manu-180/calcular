import type { TraduccionCalculadora } from "@/motor/registro";
import contenidoCalculIrgPrime from "./contenido/calcul-irg-prime";
import contenidoCalculIrgSalaire from "./contenido/calcul-irg-salaire";
import contenidoCalculSalaireBrut from "./contenido/calcul-salaire-brut";
import contenidoCongesPayes from "./contenido/conges-payes";
import contenidoCotisationsCnas from "./contenido/cotisations-cnas";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import contenidoSnmgAlgerie from "./contenido/snmg-algerie";
import textosCalculIrgPrime from "./textos/calcul-irg-prime";
import textosCalculIrgSalaire from "./textos/calcul-irg-salaire";
import textosCalculSalaireBrut from "./textos/calcul-salaire-brut";
import textosCongesPayes from "./textos/conges-payes";
import textosCotisationsCnas from "./textos/cotisations-cnas";
import textosCoutEmployeur from "./textos/cout-employeur";
import textosHeuresSupplementaires from "./textos/heures-supplementaires";
import textosSnmgAlgerie from "./textos/snmg-algerie";

export const traducciones: TraduccionCalculadora[] = [
  { textos: textosCalculIrgSalaire, contenido: contenidoCalculIrgSalaire },
  { textos: textosCalculSalaireBrut, contenido: contenidoCalculSalaireBrut },
  { textos: textosCotisationsCnas, contenido: contenidoCotisationsCnas },
  { textos: textosCoutEmployeur, contenido: contenidoCoutEmployeur },
  { textos: textosSnmgAlgerie, contenido: contenidoSnmgAlgerie },
  { textos: textosHeuresSupplementaires, contenido: contenidoHeuresSupplementaires },
  { textos: textosCongesPayes, contenido: contenidoCongesPayes },
  { textos: textosCalculIrgPrime, contenido: contenidoCalculIrgPrime },
];
