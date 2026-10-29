import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import avantagesEnNature from "./calculadoras/avantages-en-nature";
import calculImpotSurLesRevenus from "./calculadoras/calcul-impot-sur-les-revenus";
import calculIrcm from "./calculadoras/calcul-ircm";
import calculIrsa from "./calculadoras/calcul-irsa";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import calculTva from "./calculadoras/calcul-tva";
import convertisseurAriaryEuro from "./calculadoras/convertisseur-ariary-euro";
import droitEnregistrementBail from "./calculadoras/droit-enregistrement-bail";
import droitsDeDonation from "./calculadoras/droits-de-donation";
import droitsDeMutationImmobiliere from "./calculadoras/droits-de-mutation-immobiliere";
import droitsEnregistrementCession from "./calculadoras/droits-enregistrement-cession";
import impotFoncierProprieteBatie from "./calculadoras/impot-foncier-propriete-batie";
import impotPlusValueImmobiliere from "./calculadoras/impot-plus-value-immobiliere";
import impotSynthetique from "./calculadoras/impot-synthetique";
import taxeSurLesAssurances from "./calculadoras/taxe-sur-les-assurances";
import taxeVehiculesAMoteur from "./calculadoras/taxe-vehicules-a-moteur";
import contenidoAvantagesEnNature from "./contenido/avantages-en-nature";
import contenidoCalculImpotSurLesRevenus from "./contenido/calcul-impot-sur-les-revenus";
import contenidoCalculIrcm from "./contenido/calcul-ircm";
import contenidoCalculIrsa from "./contenido/calcul-irsa";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoConvertisseurAriaryEuro from "./contenido/convertisseur-ariary-euro";
import contenidoDroitEnregistrementBail from "./contenido/droit-enregistrement-bail";
import contenidoDroitsDeDonation from "./contenido/droits-de-donation";
import contenidoDroitsDeMutationImmobiliere from "./contenido/droits-de-mutation-immobiliere";
import contenidoDroitsEnregistrementCession from "./contenido/droits-enregistrement-cession";
import contenidoImpotFoncierProprieteBatie from "./contenido/impot-foncier-propriete-batie";
import contenidoImpotPlusValueImmobiliere from "./contenido/impot-plus-value-immobiliere";
import contenidoImpotSynthetique from "./contenido/impot-synthetique";
import contenidoTaxeSurLesAssurances from "./contenido/taxe-sur-les-assurances";
import contenidoTaxeVehiculesAMoteur from "./contenido/taxe-vehicules-a-moteur";
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
    { definicion: calculIrsa, contenido: contenidoCalculIrsa, cliente: () => import("./calculadoras/calcul-irsa.cliente") },
    { definicion: calculSalaireNet, contenido: contenidoCalculSalaireNet, cliente: () => import("./calculadoras/calcul-salaire-net.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: convertisseurAriaryEuro, contenido: contenidoConvertisseurAriaryEuro, cliente: () => import("./calculadoras/convertisseur-ariary-euro.cliente") },
    { definicion: impotSynthetique, contenido: contenidoImpotSynthetique, cliente: () => import("./calculadoras/impot-synthetique.cliente") },
    { definicion: calculImpotSurLesRevenus, contenido: contenidoCalculImpotSurLesRevenus, cliente: () => import("./calculadoras/calcul-impot-sur-les-revenus.cliente") },
    { definicion: calculIrcm, contenido: contenidoCalculIrcm, cliente: () => import("./calculadoras/calcul-ircm.cliente") },
    { definicion: impotPlusValueImmobiliere, contenido: contenidoImpotPlusValueImmobiliere, cliente: () => import("./calculadoras/impot-plus-value-immobiliere.cliente") },
    { definicion: droitsDeMutationImmobiliere, contenido: contenidoDroitsDeMutationImmobiliere, cliente: () => import("./calculadoras/droits-de-mutation-immobiliere.cliente") },
    { definicion: droitEnregistrementBail, contenido: contenidoDroitEnregistrementBail, cliente: () => import("./calculadoras/droit-enregistrement-bail.cliente") },
    { definicion: droitsEnregistrementCession, contenido: contenidoDroitsEnregistrementCession, cliente: () => import("./calculadoras/droits-enregistrement-cession.cliente") },
    { definicion: droitsDeDonation, contenido: contenidoDroitsDeDonation, cliente: () => import("./calculadoras/droits-de-donation.cliente") },
    { definicion: avantagesEnNature, contenido: contenidoAvantagesEnNature, cliente: () => import("./calculadoras/avantages-en-nature.cliente") },
    { definicion: taxeVehiculesAMoteur, contenido: contenidoTaxeVehiculesAMoteur, cliente: () => import("./calculadoras/taxe-vehicules-a-moteur.cliente") },
    { definicion: impotFoncierProprieteBatie, contenido: contenidoImpotFoncierProprieteBatie, cliente: () => import("./calculadoras/impot-foncier-propriete-batie.cliente") },
    { definicion: taxeSurLesAssurances, contenido: contenidoTaxeSurLesAssurances, cliente: () => import("./calculadoras/taxe-sur-les-assurances.cliente") },
  ],
  universales: "todas",
});
