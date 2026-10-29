import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIts from "./calculadoras/calcul-its";
import contenidoCalculIts from "./contenido/calcul-its";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import salaireBrut from "./calculadoras/salaire-brut";
import contenidoSalaireBrut from "./contenido/salaire-brut";
import salaireNet from "./calculadoras/salaire-net";
import contenidoSalaireNet from "./contenido/salaire-net";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

// La TVA es local (calcul-tva): la universal del mismo concepto se cae sola.
export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: calculIts, contenido: contenidoCalculIts, cliente: () => import("./calculadoras/calcul-its.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: salaireBrut, contenido: contenidoSalaireBrut, cliente: () => import("./calculadoras/salaire-brut.cliente") },
    { definicion: salaireNet, contenido: contenidoSalaireNet, cliente: () => import("./calculadoras/salaire-net.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
