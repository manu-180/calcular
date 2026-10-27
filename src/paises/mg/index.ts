import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculImpotSurLesRevenus from "./calculadoras/calcul-impot-sur-les-revenus";
import calculIrcm from "./calculadoras/calcul-ircm";
import calculIrsa from "./calculadoras/calcul-irsa";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import calculTva from "./calculadoras/calcul-tva";
import convertisseurAriaryEuro from "./calculadoras/convertisseur-ariary-euro";
import impotPlusValueImmobiliere from "./calculadoras/impot-plus-value-immobiliere";
import impotSynthetique from "./calculadoras/impot-synthetique";
import contenidoCalculImpotSurLesRevenus from "./contenido/calcul-impot-sur-les-revenus";
import contenidoCalculIrcm from "./contenido/calcul-ircm";
import contenidoCalculIrsa from "./contenido/calcul-irsa";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoConvertisseurAriaryEuro from "./contenido/convertisseur-ariary-euro";
import contenidoImpotPlusValueImmobiliere from "./contenido/impot-plus-value-immobiliere";
import contenidoImpotSynthetique from "./contenido/impot-synthetique";
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
  ],
  universales: "todas",
});
