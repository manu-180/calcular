import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIts from "./calculadoras/calcul-its";
import taxeTransfertsArgent from "./calculadoras/taxe-transferts-argent";
import taxePaiementsNumeraire from "./calculadoras/taxe-paiements-numeraire";
import taxeJeuxDeHasard from "./calculadoras/taxe-jeux-de-hasard";
import droitCommandePublique from "./calculadoras/droit-commande-publique";
import droitsConservationFonciere from "./calculadoras/droits-conservation-fonciere";
import convertisseurEuroFcfa from "./calculadoras/convertisseur-euro-fcfa";
import convertisseurDollarFcfa from "./calculadoras/convertisseur-dollar-fcfa";
import calculTva from "./calculadoras/calcul-tva";
import smig from "./calculadoras/smig";
import contenidoCalculIts from "./contenido/calcul-its";
import contenidoTaxeTransfertsArgent from "./contenido/taxe-transferts-argent";
import contenidoTaxePaiementsNumeraire from "./contenido/taxe-paiements-numeraire";
import contenidoTaxeJeuxDeHasard from "./contenido/taxe-jeux-de-hasard";
import contenidoDroitCommandePublique from "./contenido/droit-commande-publique";
import contenidoDroitsConservationFonciere from "./contenido/droits-conservation-fonciere";
import contenidoConvertisseurEuroFcfa from "./contenido/convertisseur-euro-fcfa";
import contenidoConvertisseurDollarFcfa from "./contenido/convertisseur-dollar-fcfa";
import contenidoCalculTva from "./contenido/calcul-tva";
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
  calculadoras: [
    { definicion: calculIts, contenido: contenidoCalculIts, cliente: () => import("./calculadoras/calcul-its.cliente") },
    { definicion: taxeTransfertsArgent, contenido: contenidoTaxeTransfertsArgent, cliente: () => import("./calculadoras/taxe-transferts-argent.cliente") },
    { definicion: taxePaiementsNumeraire, contenido: contenidoTaxePaiementsNumeraire, cliente: () => import("./calculadoras/taxe-paiements-numeraire.cliente") },
    { definicion: taxeJeuxDeHasard, contenido: contenidoTaxeJeuxDeHasard, cliente: () => import("./calculadoras/taxe-jeux-de-hasard.cliente") },
    { definicion: droitCommandePublique, contenido: contenidoDroitCommandePublique, cliente: () => import("./calculadoras/droit-commande-publique.cliente") },
    { definicion: droitsConservationFonciere, contenido: contenidoDroitsConservationFonciere, cliente: () => import("./calculadoras/droits-conservation-fonciere.cliente") },
    { definicion: convertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa, cliente: () => import("./calculadoras/convertisseur-euro-fcfa.cliente") },
    { definicion: convertisseurDollarFcfa, contenido: contenidoConvertisseurDollarFcfa, cliente: () => import("./calculadoras/convertisseur-dollar-fcfa.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
