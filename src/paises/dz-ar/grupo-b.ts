import type { TraduccionCalculadora } from "@/motor/registro";
import contenidoAllocationChomage from "./contenido/allocation-chomage";
import textosAllocationChomage from "./textos/allocation-chomage";
import contenidoCongeMaternite from "./contenido/conge-maternite";
import textosCongeMaternite from "./textos/conge-maternite";
import contenidoIndemniteArretMaladie from "./contenido/indemnite-arret-maladie";
import textosIndemniteArretMaladie from "./textos/indemnite-arret-maladie";
import contenidoPensionDeRetraite from "./contenido/pension-de-retraite";
import textosPensionDeRetraite from "./textos/pension-de-retraite";
import contenidoCapitalDeces from "./contenido/capital-deces";
import textosCapitalDeces from "./textos/capital-deces";
import contenidoIrgActivitesOccasionnelles from "./contenido/irg-activites-occasionnelles";
import textosIrgActivitesOccasionnelles from "./textos/irg-activites-occasionnelles";
import contenidoImpotSurDividendes from "./contenido/impot-sur-dividendes";
import textosImpotSurDividendes from "./textos/impot-sur-dividendes";
import contenidoImpotInteretsEpargne from "./contenido/impot-interets-epargne";
import textosImpotInteretsEpargne from "./textos/impot-interets-epargne";

export const traducciones: TraduccionCalculadora[] = [
  { textos: textosAllocationChomage, contenido: contenidoAllocationChomage },
  { textos: textosCongeMaternite, contenido: contenidoCongeMaternite },
  { textos: textosIndemniteArretMaladie, contenido: contenidoIndemniteArretMaladie },
  { textos: textosPensionDeRetraite, contenido: contenidoPensionDeRetraite },
  { textos: textosCapitalDeces, contenido: contenidoCapitalDeces },
  { textos: textosIrgActivitesOccasionnelles, contenido: contenidoIrgActivitesOccasionnelles },
  { textos: textosImpotSurDividendes, contenido: contenidoImpotSurDividendes },
  { textos: textosImpotInteretsEpargne, contenido: contenidoImpotInteretsEpargne },
];
