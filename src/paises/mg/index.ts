import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIrsa from "./calculadoras/calcul-irsa";
import calculSalaireNet from "./calculadoras/calcul-salaire-net";
import calculTva from "./calculadoras/calcul-tva";
import convertisseurAriaryEuro from "./calculadoras/convertisseur-ariary-euro";
import contenidoCalculIrsa from "./contenido/calcul-irsa";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoConvertisseurAriaryEuro from "./contenido/convertisseur-ariary-euro";
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
  ],
  universales: "todas",
});
