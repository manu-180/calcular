import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIuts from "./calculadoras/calcul-iuts";
import contenidoCalculIuts from "./contenido/calcul-iuts";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import preavis from "./calculadoras/preavis";
import contenidoPreavis from "./contenido/preavis";
import periodeDEssai from "./calculadoras/periode-d-essai";
import contenidoPeriodeDEssai from "./contenido/periode-d-essai";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import congeMaternite from "./calculadoras/conge-maternite";
import contenidoCongeMaternite from "./contenido/conge-maternite";
import indemniteMaladie from "./calculadoras/indemnite-maladie";
import contenidoIndemniteMaladie from "./contenido/indemnite-maladie";
import ruptureIrreguliere from "./calculadoras/rupture-irreguliere";
import contenidoRuptureIrreguliere from "./contenido/rupture-irreguliere";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import impotSurLesBenefices from "./calculadoras/impot-sur-les-benefices";
import contenidoImpotSurLesBenefices from "./contenido/impot-sur-les-benefices";
import impotRevenusFonciers from "./calculadoras/impot-revenus-fonciers";
import contenidoImpotRevenusFonciers from "./contenido/impot-revenus-fonciers";
import calculIrcm from "./calculadoras/calcul-ircm";
import contenidoCalculIrcm from "./contenido/calcul-ircm";
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
    { definicion: calculIuts, contenido: contenidoCalculIuts, cliente: () => import("./calculadoras/calcul-iuts.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: periodeDEssai, contenido: contenidoPeriodeDEssai, cliente: () => import("./calculadoras/periode-d-essai.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: congeMaternite, contenido: contenidoCongeMaternite, cliente: () => import("./calculadoras/conge-maternite.cliente") },
    { definicion: indemniteMaladie, contenido: contenidoIndemniteMaladie, cliente: () => import("./calculadoras/indemnite-maladie.cliente") },
    { definicion: ruptureIrreguliere, contenido: contenidoRuptureIrreguliere, cliente: () => import("./calculadoras/rupture-irreguliere.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: impotSurLesBenefices, contenido: contenidoImpotSurLesBenefices, cliente: () => import("./calculadoras/impot-sur-les-benefices.cliente") },
    { definicion: impotRevenusFonciers, contenido: contenidoImpotRevenusFonciers, cliente: () => import("./calculadoras/impot-revenus-fonciers.cliente") },
    { definicion: calculIrcm, contenido: contenidoCalculIrcm, cliente: () => import("./calculadoras/calcul-ircm.cliente") },
  ],
  universales: "todas",
});
