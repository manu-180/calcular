import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import calcularIva from "./calculadoras/calcular-iva";
import contenidoCalcularIva from "./contenido/calcular-iva";
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
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
