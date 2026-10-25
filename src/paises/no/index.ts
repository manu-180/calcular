import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import lonnEtterSkatt from "./calculadoras/lonn-etter-skatt";
import contenidoLonnEtterSkatt from "./contenido/lonn-etter-skatt";
import skattekalkulator from "./calculadoras/skattekalkulator";
import contenidoSkattekalkulator from "./contenido/skattekalkulator";
import trinnskatt from "./calculadoras/trinnskatt";
import contenidoTrinnskatt from "./contenido/trinnskatt";
import trygdeavgift from "./calculadoras/trygdeavgift";
import contenidoTrygdeavgift from "./contenido/trygdeavgift";
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
    { definicion: lonnEtterSkatt, contenido: contenidoLonnEtterSkatt, cliente: () => import("./calculadoras/lonn-etter-skatt.cliente") },
    { definicion: skattekalkulator, contenido: contenidoSkattekalkulator, cliente: () => import("./calculadoras/skattekalkulator.cliente") },
    { definicion: trinnskatt, contenido: contenidoTrinnskatt, cliente: () => import("./calculadoras/trinnskatt.cliente") },
    { definicion: trygdeavgift, contenido: contenidoTrygdeavgift, cliente: () => import("./calculadoras/trygdeavgift.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
