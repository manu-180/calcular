import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIts from "./calculadoras/calcul-its";
import contenidoCalculIts from "./contenido/calcul-its";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import congeMaternite from "./calculadoras/conge-maternite";
import contenidoCongeMaternite from "./contenido/conge-maternite";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import indemniteDepartRetraite from "./calculadoras/indemnite-depart-retraite";
import contenidoIndemniteDepartRetraite from "./contenido/indemnite-depart-retraite";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import indemniteServicesRendus from "./calculadoras/indemnite-services-rendus";
import contenidoIndemniteServicesRendus from "./contenido/indemnite-services-rendus";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
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
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: congeMaternite, contenido: contenidoCongeMaternite, cliente: () => import("./calculadoras/conge-maternite.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: indemniteDepartRetraite, contenido: contenidoIndemniteDepartRetraite, cliente: () => import("./calculadoras/indemnite-depart-retraite.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: indemniteServicesRendus, contenido: contenidoIndemniteServicesRendus, cliente: () => import("./calculadoras/indemnite-services-rendus.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
  ],
  universales: "todas",
});
