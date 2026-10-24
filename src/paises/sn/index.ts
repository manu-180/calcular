import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculCfce from "./calculadoras/calcul-cfce";
import calculContributionFonciere from "./calculadoras/calcul-contribution-fonciere";
import calculImpotSurLeRevenu from "./calculadoras/calcul-impot-sur-le-revenu";
import calculImpotSurLesSocietes from "./calculadoras/calcul-impot-sur-les-societes";
import calculNombreDeParts from "./calculadoras/calcul-nombre-de-parts";
import calculTrimf from "./calculadoras/calcul-trimf";
import calculTva from "./calculadoras/calcul-tva";
import convertisseurFrancCfaEuro from "./calculadoras/convertisseur-franc-cfa-euro";
import retenueRevenusCapitauxMobiliers from "./calculadoras/retenue-revenus-capitaux-mobiliers";
import contenidoCalculCfce from "./contenido/calcul-cfce";
import contenidoCalculContributionFonciere from "./contenido/calcul-contribution-fonciere";
import contenidoCalculImpotSurLeRevenu from "./contenido/calcul-impot-sur-le-revenu";
import contenidoCalculImpotSurLesSocietes from "./contenido/calcul-impot-sur-les-societes";
import contenidoCalculNombreDeParts from "./contenido/calcul-nombre-de-parts";
import contenidoCalculTrimf from "./contenido/calcul-trimf";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoConvertisseurFrancCfaEuro from "./contenido/convertisseur-franc-cfa-euro";
import contenidoRetenueRevenusCapitauxMobiliers from "./contenido/retenue-revenus-capitaux-mobiliers";
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
    { definicion: calculImpotSurLeRevenu, contenido: contenidoCalculImpotSurLeRevenu, cliente: () => import("./calculadoras/calcul-impot-sur-le-revenu.cliente") },
    { definicion: calculNombreDeParts, contenido: contenidoCalculNombreDeParts, cliente: () => import("./calculadoras/calcul-nombre-de-parts.cliente") },
    { definicion: calculTrimf, contenido: contenidoCalculTrimf, cliente: () => import("./calculadoras/calcul-trimf.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: calculImpotSurLesSocietes, contenido: contenidoCalculImpotSurLesSocietes, cliente: () => import("./calculadoras/calcul-impot-sur-les-societes.cliente") },
    { definicion: calculCfce, contenido: contenidoCalculCfce, cliente: () => import("./calculadoras/calcul-cfce.cliente") },
    { definicion: retenueRevenusCapitauxMobiliers, contenido: contenidoRetenueRevenusCapitauxMobiliers, cliente: () => import("./calculadoras/retenue-revenus-capitaux-mobiliers.cliente") },
    { definicion: calculContributionFonciere, contenido: contenidoCalculContributionFonciere, cliente: () => import("./calculadoras/calcul-contribution-fonciere.cliente") },
    { definicion: convertisseurFrancCfaEuro, contenido: contenidoConvertisseurFrancCfaEuro, cliente: () => import("./calculadoras/convertisseur-franc-cfa-euro.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
