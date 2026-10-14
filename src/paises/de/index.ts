import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import nettoBruttoRechner from "./calculadoras/netto-brutto-rechner";
import lohnsteuerRechner from "./calculadoras/lohnsteuer-rechner";
import steuerklassenRechner from "./calculadoras/steuerklassen-rechner";
import einkommensteuerRechner from "./calculadoras/einkommensteuer-rechner";
import mehrwertsteuerRechner from "./calculadoras/mehrwertsteuer-rechner";
import mindestlohnRechner from "./calculadoras/mindestlohn-rechner";
import minijobRechner from "./calculadoras/minijob-rechner";
import midijobRechner from "./calculadoras/midijob-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoLohnsteuerRechner from "./contenido/lohnsteuer-rechner";
import contenidoSteuerklassenRechner from "./contenido/steuerklassen-rechner";
import contenidoEinkommensteuerRechner from "./contenido/einkommensteuer-rechner";
import contenidoMehrwertsteuerRechner from "./contenido/mehrwertsteuer-rechner";
import contenidoMindestlohnRechner from "./contenido/mindestlohn-rechner";
import contenidoMinijobRechner from "./contenido/minijob-rechner";
import contenidoMidijobRechner from "./contenido/midijob-rechner";
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
    { definicion: mehrwertsteuerRechner, contenido: contenidoMehrwertsteuerRechner, cliente: () => import("./calculadoras/mehrwertsteuer-rechner.cliente") },
    { definicion: mindestlohnRechner, contenido: contenidoMindestlohnRechner, cliente: () => import("./calculadoras/mindestlohn-rechner.cliente") },
    { definicion: minijobRechner, contenido: contenidoMinijobRechner, cliente: () => import("./calculadoras/minijob-rechner.cliente") },
    { definicion: midijobRechner, contenido: contenidoMidijobRechner, cliente: () => import("./calculadoras/midijob-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
