import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import baremeIrpp from "./calculadoras/bareme-irpp";
import calculIrppSalaire from "./calculadoras/calcul-irpp-salaire";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import calculTva from "./calculadoras/calcul-tva";
import congesPayes from "./calculadoras/conges-payes";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import coutEmployeur from "./calculadoras/cout-employeur";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import impotSurPension from "./calculadoras/impot-sur-pension";
import indemniteFinDeService from "./calculadoras/indemnite-fin-de-service";
import smigTunisie from "./calculadoras/smig-tunisie";
import contenidoBaremeIrpp from "./contenido/bareme-irpp";
import contenidoCalculIrppSalaire from "./contenido/calcul-irpp-salaire";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoCongesPayes from "./contenido/conges-payes";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import contenidoImpotSurPension from "./contenido/impot-sur-pension";
import contenidoIndemniteFinDeService from "./contenido/indemnite-fin-de-service";
import contenidoSmigTunisie from "./contenido/smig-tunisie";
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
    { definicion: calculSalaireNet, contenido: contenidoCalculSalaireNet, cliente: () => import("./calculadoras/calcul-salaire-net.cliente") },
    { definicion: calculIrppSalaire, contenido: contenidoCalculIrppSalaire, cliente: () => import("./calculadoras/calcul-irpp-salaire.cliente") },
    { definicion: baremeIrpp, contenido: contenidoBaremeIrpp, cliente: () => import("./calculadoras/bareme-irpp.cliente") },
    { definicion: impotSurPension, contenido: contenidoImpotSurPension, cliente: () => import("./calculadoras/impot-sur-pension.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: indemniteFinDeService, contenido: contenidoIndemniteFinDeService, cliente: () => import("./calculadoras/indemnite-fin-de-service.cliente") },
    { definicion: smigTunisie, contenido: contenidoSmigTunisie, cliente: () => import("./calculadoras/smig-tunisie.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
