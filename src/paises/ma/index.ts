import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calculIrSalaire from "./calculadoras/calcul-ir-salaire";
import calculTva from "./calculadoras/calcul-tva";
import impotAutoEntrepreneur from "./calculadoras/impot-auto-entrepreneur";
import contenidoCalculIrSalaire from "./contenido/calcul-ir-salaire";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoImpotAutoEntrepreneur from "./contenido/impot-auto-entrepreneur";
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
  ],
  universales: "todas",
  novedades,
  detectores,
});
