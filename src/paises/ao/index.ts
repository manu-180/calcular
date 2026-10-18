import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calcularIrt from "./calculadoras/calcular-irt";
import contenidoCalcularIrt from "./contenido/calcular-irt";
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
    { definicion: calcularIrt, contenido: contenidoCalcularIrt, cliente: () => import("./calculadoras/calcular-irt.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
