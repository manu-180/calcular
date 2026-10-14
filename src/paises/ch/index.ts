import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bruttoNettoRechner from "./calculadoras/brutto-netto-rechner";
import nettoBruttoRechner from "./calculadoras/netto-brutto-rechner";
import lohnkostenRechner from "./calculadoras/lohnkosten-rechner";
import bundessteuerRechner from "./calculadoras/bundessteuer-rechner";
import mwstRechner from "./calculadoras/mwst-rechner";
import saeule3aRechner from "./calculadoras/saeule-3a-rechner";
import bvgRechner from "./calculadoras/bvg-rechner";
import ahvRentenrechner from "./calculadoras/ahv-rentenrechner";
import ahvBeitraegeSelbststaendige from "./calculadoras/ahv-beitraege-selbststaendige";
import kapitalbezugSteuerRechner from "./calculadoras/kapitalbezug-steuer-rechner";
import arbeitslosengeldRechner from "./calculadoras/arbeitslosengeld-rechner";
import c13MonatslohnRechner from "./calculadoras/13-monatslohn-rechner";
import ferienrechner from "./calculadoras/ferienrechner";
import ueberstundenRechner from "./calculadoras/ueberstunden-rechner";
import kuendigungsfristRechner from "./calculadoras/kuendigungsfrist-rechner";
import kinderzulagenRechner from "./calculadoras/kinderzulagen-rechner";
import mutterschaftsentschaedigungRechner from "./calculadoras/mutterschaftsentschaedigung-rechner";
import vaterschaftsentschaedigungRechner from "./calculadoras/vaterschaftsentschaedigung-rechner";
import teuerungsrechner from "./calculadoras/teuerungsrechner";
import mietzinsrechner from "./calculadoras/mietzinsrechner";
import verzugszinsrechner from "./calculadoras/verzugszinsrechner";
import saronHypothekRechner from "./calculadoras/saron-hypothek-rechner";
import contenidoBruttoNettoRechner from "./contenido/brutto-netto-rechner";
import contenidoNettoBruttoRechner from "./contenido/netto-brutto-rechner";
import contenidoLohnkostenRechner from "./contenido/lohnkosten-rechner";
import contenidoBundessteuerRechner from "./contenido/bundessteuer-rechner";
import contenidoMwstRechner from "./contenido/mwst-rechner";
import contenidoSaeule3aRechner from "./contenido/saeule-3a-rechner";
import contenidoBvgRechner from "./contenido/bvg-rechner";
import contenidoAhvRentenrechner from "./contenido/ahv-rentenrechner";
import contenidoAhvBeitraegeSelbststaendige from "./contenido/ahv-beitraege-selbststaendige";
import contenidoKapitalbezugSteuerRechner from "./contenido/kapitalbezug-steuer-rechner";
import contenidoArbeitslosengeldRechner from "./contenido/arbeitslosengeld-rechner";
import contenidoC13MonatslohnRechner from "./contenido/13-monatslohn-rechner";
import contenidoFerienrechner from "./contenido/ferienrechner";
import contenidoUeberstundenRechner from "./contenido/ueberstunden-rechner";
import contenidoKuendigungsfristRechner from "./contenido/kuendigungsfrist-rechner";
import contenidoKinderzulagenRechner from "./contenido/kinderzulagen-rechner";
import contenidoMutterschaftsentschaedigungRechner from "./contenido/mutterschaftsentschaedigung-rechner";
import contenidoVaterschaftsentschaedigungRechner from "./contenido/vaterschaftsentschaedigung-rechner";
import contenidoTeuerungsrechner from "./contenido/teuerungsrechner";
import contenidoMietzinsrechner from "./contenido/mietzinsrechner";
import contenidoVerzugszinsrechner from "./contenido/verzugszinsrechner";
import contenidoSaronHypothekRechner from "./contenido/saron-hypothek-rechner";
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
    { definicion: saeule3aRechner, contenido: contenidoSaeule3aRechner, cliente: () => import("./calculadoras/saeule-3a-rechner.cliente") },
    { definicion: bvgRechner, contenido: contenidoBvgRechner, cliente: () => import("./calculadoras/bvg-rechner.cliente") },
    { definicion: ahvRentenrechner, contenido: contenidoAhvRentenrechner, cliente: () => import("./calculadoras/ahv-rentenrechner.cliente") },
    { definicion: ahvBeitraegeSelbststaendige, contenido: contenidoAhvBeitraegeSelbststaendige, cliente: () => import("./calculadoras/ahv-beitraege-selbststaendige.cliente") },
    { definicion: kapitalbezugSteuerRechner, contenido: contenidoKapitalbezugSteuerRechner, cliente: () => import("./calculadoras/kapitalbezug-steuer-rechner.cliente") },
    { definicion: arbeitslosengeldRechner, contenido: contenidoArbeitslosengeldRechner, cliente: () => import("./calculadoras/arbeitslosengeld-rechner.cliente") },
    { definicion: c13MonatslohnRechner, contenido: contenidoC13MonatslohnRechner, cliente: () => import("./calculadoras/13-monatslohn-rechner.cliente") },
    { definicion: ferienrechner, contenido: contenidoFerienrechner, cliente: () => import("./calculadoras/ferienrechner.cliente") },
    { definicion: ueberstundenRechner, contenido: contenidoUeberstundenRechner, cliente: () => import("./calculadoras/ueberstunden-rechner.cliente") },
    { definicion: kuendigungsfristRechner, contenido: contenidoKuendigungsfristRechner, cliente: () => import("./calculadoras/kuendigungsfrist-rechner.cliente") },
    { definicion: kinderzulagenRechner, contenido: contenidoKinderzulagenRechner, cliente: () => import("./calculadoras/kinderzulagen-rechner.cliente") },
    { definicion: mutterschaftsentschaedigungRechner, contenido: contenidoMutterschaftsentschaedigungRechner, cliente: () => import("./calculadoras/mutterschaftsentschaedigung-rechner.cliente") },
    { definicion: vaterschaftsentschaedigungRechner, contenido: contenidoVaterschaftsentschaedigungRechner, cliente: () => import("./calculadoras/vaterschaftsentschaedigung-rechner.cliente") },
    { definicion: teuerungsrechner, contenido: contenidoTeuerungsrechner, cliente: () => import("./calculadoras/teuerungsrechner.cliente") },
    { definicion: mietzinsrechner, contenido: contenidoMietzinsrechner, cliente: () => import("./calculadoras/mietzinsrechner.cliente") },
    { definicion: verzugszinsrechner, contenido: contenidoVerzugszinsrechner, cliente: () => import("./calculadoras/verzugszinsrechner.cliente") },
    { definicion: saronHypothekRechner, contenido: contenidoSaronHypothekRechner, cliente: () => import("./calculadoras/saron-hypothek-rechner.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
