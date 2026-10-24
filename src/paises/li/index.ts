import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import lohnsteuerRechner from "./calculadoras/lohnsteuer-rechner";
import steuerrechner from "./calculadoras/steuerrechner";
import lohnkostenRechner from "./calculadoras/lohnkosten-rechner";
import mwstRechner from "./calculadoras/mwst-rechner";
import pensionskasseRechner from "./calculadoras/pensionskasse-rechner";
import kinderzulagenRechner from "./calculadoras/kinderzulagen-rechner";
import geburtszulageRechner from "./calculadoras/geburtszulage-rechner";
import ferienrechner from "./calculadoras/ferienrechner";
import ueberstundenRechner from "./calculadoras/ueberstunden-rechner";
import kuendigungsfristRechner from "./calculadoras/kuendigungsfrist-rechner";
import sperrfristRechner from "./calculadoras/sperrfrist-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoLohnsteuerRechner from "./contenido/lohnsteuer-rechner";
import contenidoSteuerrechner from "./contenido/steuerrechner";
import contenidoLohnkostenRechner from "./contenido/lohnkosten-rechner";
import contenidoMwstRechner from "./contenido/mwst-rechner";
import contenidoPensionskasseRechner from "./contenido/pensionskasse-rechner";
import contenidoKinderzulagenRechner from "./contenido/kinderzulagen-rechner";
import contenidoGeburtszulageRechner from "./contenido/geburtszulage-rechner";
import contenidoFerienrechner from "./contenido/ferienrechner";
import contenidoUeberstundenRechner from "./contenido/ueberstunden-rechner";
import contenidoKuendigungsfristRechner from "./contenido/kuendigungsfrist-rechner";
import contenidoSperrfristRechner from "./contenido/sperrfrist-rechner";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";

export default definirPais({
  mercado,
  datos,
  avisos,
  calculadoras: [
    { definicion: bruttoNettoRechner, contenido: contenidoBruttoNettoRechner, cliente: () => import("./calculadoras/brutto-netto-rechner.cliente") },
    { definicion: lohnsteuerRechner, contenido: contenidoLohnsteuerRechner, cliente: () => import("./calculadoras/lohnsteuer-rechner.cliente") },
    { definicion: steuerrechner, contenido: contenidoSteuerrechner, cliente: () => import("./calculadoras/steuerrechner.cliente") },
    { definicion: lohnkostenRechner, contenido: contenidoLohnkostenRechner, cliente: () => import("./calculadoras/lohnkosten-rechner.cliente") },
    { definicion: mwstRechner, contenido: contenidoMwstRechner, cliente: () => import("./calculadoras/mwst-rechner.cliente") },
    { definicion: pensionskasseRechner, contenido: contenidoPensionskasseRechner, cliente: () => import("./calculadoras/pensionskasse-rechner.cliente") },
    { definicion: kinderzulagenRechner, contenido: contenidoKinderzulagenRechner, cliente: () => import("./calculadoras/kinderzulagen-rechner.cliente") },
    { definicion: geburtszulageRechner, contenido: contenidoGeburtszulageRechner, cliente: () => import("./calculadoras/geburtszulage-rechner.cliente") },
    { definicion: ferienrechner, contenido: contenidoFerienrechner, cliente: () => import("./calculadoras/ferienrechner.cliente") },
    { definicion: ueberstundenRechner, contenido: contenidoUeberstundenRechner, cliente: () => import("./calculadoras/ueberstunden-rechner.cliente") },
    { definicion: kuendigungsfristRechner, contenido: contenidoKuendigungsfristRechner, cliente: () => import("./calculadoras/kuendigungsfrist-rechner.cliente") },
    { definicion: sperrfristRechner, contenido: contenidoSperrfristRechner, cliente: () => import("./calculadoras/sperrfrist-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
