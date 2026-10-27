import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import calculIrpp from "./calculadoras/calcul-irpp";
import contenidoCalculIrpp from "./contenido/calcul-irpp";
import cotisationsCnps from "./calculadoras/cotisations-cnps";
import contenidoCotisationsCnps from "./contenido/cotisations-cnps";
import coutEmployeur from "./calculadoras/cout-employeur";
import contenidoCoutEmployeur from "./contenido/cout-employeur";
import calculTva from "./calculadoras/calcul-tva";
import contenidoCalculTva from "./contenido/calcul-tva";
import smig from "./calculadoras/smig";
import contenidoSmig from "./contenido/smig";
import redevanceAudiovisuelle from "./calculadoras/redevance-audiovisuelle";
import contenidoRedevanceAudiovisuelle from "./contenido/redevance-audiovisuelle";
import taxeDeveloppementLocal from "./calculadoras/taxe-developpement-local";
import contenidoTaxeDeveloppementLocal from "./contenido/taxe-developpement-local";
import impotGeneralSynthetique from "./calculadoras/impot-general-synthetique";
import contenidoImpotGeneralSynthetique from "./contenido/impot-general-synthetique";
import impotSurLesSocietes from "./calculadoras/impot-sur-les-societes";
import contenidoImpotSurLesSocietes from "./contenido/impot-sur-les-societes";
import convertisseurEuroFcfa from "./calculadoras/convertisseur-euro-fcfa";
import contenidoConvertisseurEuroFcfa from "./contenido/convertisseur-euro-fcfa";
import avantagesEnNature from "./calculadoras/avantages-en-nature";
import contenidoAvantagesEnNature from "./contenido/avantages-en-nature";
import salaireNetEnBrut from "./calculadoras/salaire-net-en-brut";
import contenidoSalaireNetEnBrut from "./contenido/salaire-net-en-brut";
import impotRevenusCapitauxMobiliers from "./calculadoras/impot-revenus-capitaux-mobiliers";
import contenidoImpotRevenusCapitauxMobiliers from "./contenido/impot-revenus-capitaux-mobiliers";
import taxeFonciere from "./calculadoras/taxe-fonciere";
import contenidoTaxeFonciere from "./contenido/taxe-fonciere";
import congesPayes from "./calculadoras/conges-payes";
import contenidoCongesPayes from "./contenido/conges-payes";
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
    { definicion: calculIrpp, contenido: contenidoCalculIrpp, cliente: () => import("./calculadoras/calcul-irpp.cliente") },
    { definicion: cotisationsCnps, contenido: contenidoCotisationsCnps, cliente: () => import("./calculadoras/cotisations-cnps.cliente") },
    { definicion: coutEmployeur, contenido: contenidoCoutEmployeur, cliente: () => import("./calculadoras/cout-employeur.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: smig, contenido: contenidoSmig, cliente: () => import("./calculadoras/smig.cliente") },
    { definicion: redevanceAudiovisuelle, contenido: contenidoRedevanceAudiovisuelle, cliente: () => import("./calculadoras/redevance-audiovisuelle.cliente") },
    { definicion: taxeDeveloppementLocal, contenido: contenidoTaxeDeveloppementLocal, cliente: () => import("./calculadoras/taxe-developpement-local.cliente") },
    { definicion: impotGeneralSynthetique, contenido: contenidoImpotGeneralSynthetique, cliente: () => import("./calculadoras/impot-general-synthetique.cliente") },
    { definicion: impotSurLesSocietes, contenido: contenidoImpotSurLesSocietes, cliente: () => import("./calculadoras/impot-sur-les-societes.cliente") },
    { definicion: convertisseurEuroFcfa, contenido: contenidoConvertisseurEuroFcfa, cliente: () => import("./calculadoras/convertisseur-euro-fcfa.cliente") },
    { definicion: avantagesEnNature, contenido: contenidoAvantagesEnNature, cliente: () => import("./calculadoras/avantages-en-nature.cliente") },
    { definicion: salaireNetEnBrut, contenido: contenidoSalaireNetEnBrut, cliente: () => import("./calculadoras/salaire-net-en-brut.cliente") },
    { definicion: impotRevenusCapitauxMobiliers, contenido: contenidoImpotRevenusCapitauxMobiliers, cliente: () => import("./calculadoras/impot-revenus-capitaux-mobiliers.cliente") },
    { definicion: taxeFonciere, contenido: contenidoTaxeFonciere, cliente: () => import("./calculadoras/taxe-fonciere.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
  ],
  universales: "todas",
});
