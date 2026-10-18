import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIrSalaire from "./calculadoras/calcul-ir-salaire";
import calculTva from "./calculadoras/calcul-tva";
import impotAutoEntrepreneur from "./calculadoras/impot-auto-entrepreneur";
import contenidoCalculIrSalaire from "./contenido/calcul-ir-salaire";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoImpotAutoEntrepreneur from "./contenido/impot-auto-entrepreneur";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import droitsEnregistrement from "./calculadoras/droits-enregistrement";
import contenidoDroitsEnregistrement from "./contenido/droits-enregistrement";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import cotisationsCnss from "./calculadoras/cotisations-cnss";
import contenidoCotisationsCnss from "./contenido/cotisations-cnss";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import smigMaroc from "./calculadoras/smig-maroc";
import contenidoSmigMaroc from "./contenido/smig-maroc";
import delaiDePreavis from "./calculadoras/delai-de-preavis";
import contenidoDelaiDePreavis from "./contenido/delai-de-preavis";
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
    { definicion: calculIrSalaire, contenido: contenidoCalculIrSalaire, cliente: () => import("./calculadoras/calcul-ir-salaire.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: impotAutoEntrepreneur, contenido: contenidoImpotAutoEntrepreneur, cliente: () => import("./calculadoras/impot-auto-entrepreneur.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: droitsEnregistrement, contenido: contenidoDroitsEnregistrement, cliente: () => import("./calculadoras/droits-enregistrement.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: calculSalaireNet, contenido: contenidoCalculSalaireNet, cliente: () => import("./calculadoras/calcul-salaire-net.cliente") },
    { definicion: cotisationsCnss, contenido: contenidoCotisationsCnss, cliente: () => import("./calculadoras/cotisations-cnss.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: smigMaroc, contenido: contenidoSmigMaroc, cliente: () => import("./calculadoras/smig-maroc.cliente") },
    { definicion: delaiDePreavis, contenido: contenidoDelaiDePreavis, cliente: () => import("./calculadoras/delai-de-preavis.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
