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
import sozialversicherungsRechner from "./calculadoras/sozialversicherungs-rechner";
import arbeitgeberkostenRechner from "./calculadoras/arbeitgeberkosten-rechner";
import abfindungsrechner from "./calculadoras/abfindungsrechner";
import kuendigungsfristRechner from "./calculadoras/kuendigungsfrist-rechner";
import urlaubsanspruchRechner from "./calculadoras/urlaubsanspruch-rechner";
import ueberstundenRechner from "./calculadoras/ueberstunden-rechner";
import rentenrechner from "./calculadoras/rentenrechner";
import pendlerpauschaleRechner from "./calculadoras/pendlerpauschale-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoLohnsteuerRechner from "./contenido/lohnsteuer-rechner";
import contenidoSteuerklassenRechner from "./contenido/steuerklassen-rechner";
import contenidoEinkommensteuerRechner from "./contenido/einkommensteuer-rechner";
import contenidoMehrwertsteuerRechner from "./contenido/mehrwertsteuer-rechner";
import contenidoMindestlohnRechner from "./contenido/mindestlohn-rechner";
import contenidoMinijobRechner from "./contenido/minijob-rechner";
import contenidoMidijobRechner from "./contenido/midijob-rechner";
import contenidoSozialversicherungsRechner from "./contenido/sozialversicherungs-rechner";
import contenidoArbeitgeberkostenRechner from "./contenido/arbeitgeberkosten-rechner";
import contenidoAbfindungsrechner from "./contenido/abfindungsrechner";
import contenidoKuendigungsfristRechner from "./contenido/kuendigungsfrist-rechner";
import contenidoUrlaubsanspruchRechner from "./contenido/urlaubsanspruch-rechner";
import contenidoUeberstundenRechner from "./contenido/ueberstunden-rechner";
import contenidoRentenrechner from "./contenido/rentenrechner";
import contenidoPendlerpauschaleRechner from "./contenido/pendlerpauschale-rechner";
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
    { definicion: sozialversicherungsRechner, contenido: contenidoSozialversicherungsRechner, cliente: () => import("./calculadoras/sozialversicherungs-rechner.cliente") },
    { definicion: arbeitgeberkostenRechner, contenido: contenidoArbeitgeberkostenRechner, cliente: () => import("./calculadoras/arbeitgeberkosten-rechner.cliente") },
    { definicion: abfindungsrechner, contenido: contenidoAbfindungsrechner, cliente: () => import("./calculadoras/abfindungsrechner.cliente") },
    { definicion: kuendigungsfristRechner, contenido: contenidoKuendigungsfristRechner, cliente: () => import("./calculadoras/kuendigungsfrist-rechner.cliente") },
    { definicion: urlaubsanspruchRechner, contenido: contenidoUrlaubsanspruchRechner, cliente: () => import("./calculadoras/urlaubsanspruch-rechner.cliente") },
    { definicion: ueberstundenRechner, contenido: contenidoUeberstundenRechner, cliente: () => import("./calculadoras/ueberstunden-rechner.cliente") },
    { definicion: rentenrechner, contenido: contenidoRentenrechner, cliente: () => import("./calculadoras/rentenrechner.cliente") },
    { definicion: pendlerpauschaleRechner, contenido: contenidoPendlerpauschaleRechner, cliente: () => import("./calculadoras/pendlerpauschale-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
