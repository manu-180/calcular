import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import nettoBruttoRechner from "./calculadoras/netto-brutto-rechner";
import lohnkostenRechner from "./calculadoras/lohnkosten-rechner";
import bundessteuerRechner from "./calculadoras/bundessteuer-rechner";
import mwstRechner from "./calculadoras/mwst-rechner";
import kapitalbezugSteuerRechner from "./calculadoras/kapitalbezug-steuer-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoLohnkostenRechner from "./contenido/lohnkosten-rechner";
import contenidoBundessteuerRechner from "./contenido/bundessteuer-rechner";
import contenidoMwstRechner from "./contenido/mwst-rechner";
import contenidoKapitalbezugSteuerRechner from "./contenido/kapitalbezug-steuer-rechner";
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
    { definicion: lohnkostenRechner, contenido: contenidoLohnkostenRechner, cliente: () => import("./calculadoras/lohnkosten-rechner.cliente") },
    { definicion: bundessteuerRechner, contenido: contenidoBundessteuerRechner, cliente: () => import("./calculadoras/bundessteuer-rechner.cliente") },
    { definicion: mwstRechner, contenido: contenidoMwstRechner, cliente: () => import("./calculadoras/mwst-rechner.cliente") },
    { definicion: kapitalbezugSteuerRechner, contenido: contenidoKapitalbezugSteuerRechner, cliente: () => import("./calculadoras/kapitalbezug-steuer-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
