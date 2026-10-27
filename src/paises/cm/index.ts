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
  ],
  universales: "todas",
});
