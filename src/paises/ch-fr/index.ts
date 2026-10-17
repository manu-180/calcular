import { definirEdicion } from "@/motor/registro";
import ch from "../ch";
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
import { AVISOS, DATOS } from "./lib/datos";
import { mercado } from "./mercado";
import textosBruttoNettoRechner from "./textos/brutto-netto-rechner";
import textosNettoBruttoRechner from "./textos/netto-brutto-rechner";
import textosLohnkostenRechner from "./textos/lohnkosten-rechner";
import textosBundessteuerRechner from "./textos/bundessteuer-rechner";
import textosMwstRechner from "./textos/mwst-rechner";
import textosSaeule3aRechner from "./textos/saeule-3a-rechner";
import textosBvgRechner from "./textos/bvg-rechner";
import textosAhvRentenrechner from "./textos/ahv-rentenrechner";
import textosAhvBeitraegeSelbststaendige from "./textos/ahv-beitraege-selbststaendige";
import textosKapitalbezugSteuerRechner from "./textos/kapitalbezug-steuer-rechner";
import textosArbeitslosengeldRechner from "./textos/arbeitslosengeld-rechner";
import textosC13MonatslohnRechner from "./textos/13-monatslohn-rechner";
import textosFerienrechner from "./textos/ferienrechner";
import textosUeberstundenRechner from "./textos/ueberstunden-rechner";
import textosKuendigungsfristRechner from "./textos/kuendigungsfrist-rechner";
import textosKinderzulagenRechner from "./textos/kinderzulagen-rechner";
import textosMutterschaftsentschaedigungRechner from "./textos/mutterschaftsentschaedigung-rechner";
import textosVaterschaftsentschaedigungRechner from "./textos/vaterschaftsentschaedigung-rechner";
import textosTeuerungsrechner from "./textos/teuerungsrechner";
import textosMietzinsrechner from "./textos/mietzinsrechner";
import textosVerzugszinsrechner from "./textos/verzugszinsrechner";
import textosSaronHypothekRechner from "./textos/saron-hypothek-rechner";

export default definirEdicion(ch, {
  mercado,
  traducciones: [
    { textos: textosBruttoNettoRechner, contenido: contenidoBruttoNettoRechner },
    { textos: textosNettoBruttoRechner, contenido: contenidoNettoBruttoRechner },
    { textos: textosLohnkostenRechner, contenido: contenidoLohnkostenRechner },
    { textos: textosBundessteuerRechner, contenido: contenidoBundessteuerRechner },
    { textos: textosMwstRechner, contenido: contenidoMwstRechner },
    { textos: textosSaeule3aRechner, contenido: contenidoSaeule3aRechner },
    { textos: textosBvgRechner, contenido: contenidoBvgRechner },
    { textos: textosAhvRentenrechner, contenido: contenidoAhvRentenrechner },
    { textos: textosAhvBeitraegeSelbststaendige, contenido: contenidoAhvBeitraegeSelbststaendige },
    { textos: textosKapitalbezugSteuerRechner, contenido: contenidoKapitalbezugSteuerRechner },
    { textos: textosArbeitslosengeldRechner, contenido: contenidoArbeitslosengeldRechner },
    { textos: textosC13MonatslohnRechner, contenido: contenidoC13MonatslohnRechner },
    { textos: textosFerienrechner, contenido: contenidoFerienrechner },
    { textos: textosUeberstundenRechner, contenido: contenidoUeberstundenRechner },
    { textos: textosKuendigungsfristRechner, contenido: contenidoKuendigungsfristRechner },
    { textos: textosKinderzulagenRechner, contenido: contenidoKinderzulagenRechner },
    { textos: textosMutterschaftsentschaedigungRechner, contenido: contenidoMutterschaftsentschaedigungRechner },
    { textos: textosVaterschaftsentschaedigungRechner, contenido: contenidoVaterschaftsentschaedigungRechner },
    { textos: textosTeuerungsrechner, contenido: contenidoTeuerungsrechner },
    { textos: textosMietzinsrechner, contenido: contenidoMietzinsrechner },
    { textos: textosVerzugszinsrechner, contenido: contenidoVerzugszinsrechner },
    { textos: textosSaronHypothekRechner, contenido: contenidoSaronHypothekRechner },
  ],
  universales: "todas",
  avisos: AVISOS,
  datos: DATOS,
});
