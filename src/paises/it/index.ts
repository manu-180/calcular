import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import irpef from "./calculadoras/irpef";
import iva from "./calculadoras/iva";
import stipendioNetto from "./calculadoras/stipendio-netto";
import tfr from "./calculadoras/tfr";
import contenidoIrpef from "./contenido/irpef";
import contenidoIva from "./contenido/iva";
import contenidoStipendioNetto from "./contenido/stipendio-netto";
import contenidoTfr from "./contenido/tfr";
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
    { definicion: stipendioNetto, contenido: contenidoStipendioNetto, cliente: () => import("./calculadoras/stipendio-netto.cliente") },
    { definicion: irpef, contenido: contenidoIrpef, cliente: () => import("./calculadoras/irpef.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: tfr, contenido: contenidoTfr, cliente: () => import("./calculadoras/tfr.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
