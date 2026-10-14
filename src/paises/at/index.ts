import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import nettoBruttoRechner from "./calculadoras/netto-brutto-rechner";
import sozialversicherungRechner from "./calculadoras/sozialversicherung-rechner";
import lohnnebenkostenRechner from "./calculadoras/lohnnebenkosten-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoSozialversicherungRechner from "./contenido/sozialversicherung-rechner";
import contenidoLohnnebenkostenRechner from "./contenido/lohnnebenkosten-rechner";
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
    { definicion: bruttoNettoRechner, contenido: contenidoBruttoNettoRechner, cliente: () => import("./calculadoras/brutto-netto-rechner.cliente") },
    { definicion: nettoBruttoRechner, contenido: contenidoNettoBruttoRechner, cliente: () => import("./calculadoras/netto-brutto-rechner.cliente") },
    { definicion: sozialversicherungRechner, contenido: contenidoSozialversicherungRechner, cliente: () => import("./calculadoras/sozialversicherung-rechner.cliente") },
    { definicion: lohnnebenkostenRechner, contenido: contenidoLohnnebenkostenRechner, cliente: () => import("./calculadoras/lohnnebenkosten-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
