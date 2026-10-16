import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
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
  calculadoras: [],
  universales: "todas",
  novedades,
  detectores,
});
