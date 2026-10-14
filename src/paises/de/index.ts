import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import nettoBruttoRechner from "./calculadoras/netto-brutto-rechner";
import lohnsteuerRechner from "./calculadoras/lohnsteuer-rechner";
import steuerklassenRechner from "./calculadoras/steuerklassen-rechner";
import einkommensteuerRechner from "./calculadoras/einkommensteuer-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoLohnsteuerRechner from "./contenido/lohnsteuer-rechner";
import contenidoSteuerklassenRechner from "./contenido/steuerklassen-rechner";
import contenidoEinkommensteuerRechner from "./contenido/einkommensteuer-rechner";
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
    { definicion: lohnsteuerRechner, contenido: contenidoLohnsteuerRechner, cliente: () => import("./calculadoras/lohnsteuer-rechner.cliente") },
    { definicion: steuerklassenRechner, contenido: contenidoSteuerklassenRechner, cliente: () => import("./calculadoras/steuerklassen-rechner.cliente") },
    { definicion: einkommensteuerRechner, contenido: contenidoEinkommensteuerRechner, cliente: () => import("./calculadoras/einkommensteuer-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
