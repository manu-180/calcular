import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import lonEfterSkatt from "./calculadoras/lon-efter-skatt";
import contenidoLonEfterSkatt from "./contenido/lon-efter-skatt";
import statligSkatt from "./calculadoras/statlig-skatt";
import contenidoStatligSkatt from "./contenido/statlig-skatt";
import arbetsgivaravgift from "./calculadoras/arbetsgivaravgift";
import contenidoArbetsgivaravgift from "./contenido/arbetsgivaravgift";
import egenavgifter from "./calculadoras/egenavgifter";
import contenidoEgenavgifter from "./contenido/egenavgifter";
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
    { definicion: lonEfterSkatt, contenido: contenidoLonEfterSkatt, cliente: () => import("./calculadoras/lon-efter-skatt.cliente") },
    { definicion: statligSkatt, contenido: contenidoStatligSkatt, cliente: () => import("./calculadoras/statlig-skatt.cliente") },
    { definicion: arbetsgivaravgift, contenido: contenidoArbetsgivaravgift, cliente: () => import("./calculadoras/arbetsgivaravgift.cliente") },
    { definicion: egenavgifter, contenido: contenidoEgenavgifter, cliente: () => import("./calculadoras/egenavgifter.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
