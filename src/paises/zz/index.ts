import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bono from "./calculadoras/bono";
import contenidoBono from "./contenido/bono";
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
  calculadoras: [{ definicion: bono, contenido: contenidoBono, cliente: () => import("./calculadoras/bono.cliente") }],
  universales: "todas",
  novedades,
  detectores,
});
