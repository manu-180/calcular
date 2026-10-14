import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import sueldoNeto from "./calculadoras/sueldo-neto";
import contenidoSueldoNeto from "./contenido/sueldo-neto";
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
  calculadoras: [{ definicion: sueldoNeto, contenido: contenidoSueldoNeto, cliente: () => import("./calculadoras/sueldo-neto.cliente") }],
  universales: { todas: true },
  novedades,
  detectores,
});
