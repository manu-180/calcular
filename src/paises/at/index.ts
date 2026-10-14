import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import nettoBruttoRechner from "./calculadoras/netto-brutto-rechner";
import einkommensteuerRechner from "./calculadoras/einkommensteuer-rechner";
import sozialversicherungRechner from "./calculadoras/sozialversicherung-rechner";
import lohnnebenkostenRechner from "./calculadoras/lohnnebenkosten-rechner";
import urlaubsgeldWeihnachtsgeldRechner from "./calculadoras/urlaubsgeld-weihnachtsgeld-rechner";
import familienbonusRechner from "./calculadoras/familienbonus-rechner";
import pendlerpauschaleRechner from "./calculadoras/pendlerpauschale-rechner";
import ueberstundenRechner from "./calculadoras/ueberstunden-rechner";
import urlaubsanspruchRechner from "./calculadoras/urlaubsanspruch-rechner";
import kuendigungsfristRechner from "./calculadoras/kuendigungsfrist-rechner";
import abfertigungNeuRechner from "./calculadoras/abfertigung-neu-rechner";
import abfertigungAltRechner from "./calculadoras/abfertigung-alt-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoEinkommensteuerRechner from "./contenido/einkommensteuer-rechner";
import contenidoSozialversicherungRechner from "./contenido/sozialversicherung-rechner";
import contenidoLohnnebenkostenRechner from "./contenido/lohnnebenkosten-rechner";
import contenidoUrlaubsgeldWeihnachtsgeldRechner from "./contenido/urlaubsgeld-weihnachtsgeld-rechner";
import contenidoFamilienbonusRechner from "./contenido/familienbonus-rechner";
import contenidoPendlerpauschaleRechner from "./contenido/pendlerpauschale-rechner";
import contenidoUeberstundenRechner from "./contenido/ueberstunden-rechner";
import contenidoUrlaubsanspruchRechner from "./contenido/urlaubsanspruch-rechner";
import contenidoKuendigungsfristRechner from "./contenido/kuendigungsfrist-rechner";
import contenidoAbfertigungNeuRechner from "./contenido/abfertigung-neu-rechner";
import contenidoAbfertigungAltRechner from "./contenido/abfertigung-alt-rechner";
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
    { definicion: einkommensteuerRechner, contenido: contenidoEinkommensteuerRechner, cliente: () => import("./calculadoras/einkommensteuer-rechner.cliente") },
    { definicion: sozialversicherungRechner, contenido: contenidoSozialversicherungRechner, cliente: () => import("./calculadoras/sozialversicherung-rechner.cliente") },
    { definicion: lohnnebenkostenRechner, contenido: contenidoLohnnebenkostenRechner, cliente: () => import("./calculadoras/lohnnebenkosten-rechner.cliente") },
    { definicion: urlaubsgeldWeihnachtsgeldRechner, contenido: contenidoUrlaubsgeldWeihnachtsgeldRechner, cliente: () => import("./calculadoras/urlaubsgeld-weihnachtsgeld-rechner.cliente") },
    { definicion: familienbonusRechner, contenido: contenidoFamilienbonusRechner, cliente: () => import("./calculadoras/familienbonus-rechner.cliente") },
    { definicion: pendlerpauschaleRechner, contenido: contenidoPendlerpauschaleRechner, cliente: () => import("./calculadoras/pendlerpauschale-rechner.cliente") },
    { definicion: ueberstundenRechner, contenido: contenidoUeberstundenRechner, cliente: () => import("./calculadoras/ueberstunden-rechner.cliente") },
    { definicion: urlaubsanspruchRechner, contenido: contenidoUrlaubsanspruchRechner, cliente: () => import("./calculadoras/urlaubsanspruch-rechner.cliente") },
    { definicion: kuendigungsfristRechner, contenido: contenidoKuendigungsfristRechner, cliente: () => import("./calculadoras/kuendigungsfrist-rechner.cliente") },
    { definicion: abfertigungNeuRechner, contenido: contenidoAbfertigungNeuRechner, cliente: () => import("./calculadoras/abfertigung-neu-rechner.cliente") },
    { definicion: abfertigungAltRechner, contenido: contenidoAbfertigungAltRechner, cliente: () => import("./calculadoras/abfertigung-alt-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
