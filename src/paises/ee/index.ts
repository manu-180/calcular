import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import brutopalga from "./calculadoras/brutopalga-kalkulaator";
import dividendideTulumaks from "./calculadoras/dividendide-tulumaks";
import etteteatamistahtaeg from "./calculadoras/etteteatamistahtaeg";
import ettevotluskonto from "./calculadoras/ettevotluskonto";
import fieMaksud from "./calculadoras/fie-maksud";
import haigushuvitis from "./calculadoras/haigushuvitis";
import inflatsioon from "./calculadoras/inflatsiooni-kalkulaator";
import kaibemaks from "./calculadoras/kaibemaksu-kalkulaator";
import koondamishuvitis from "./calculadoras/koondamishuvitis";
import lastetoetus from "./calculadoras/lastetoetus";
import maamaks from "./calculadoras/maamaks";
import miinimumpalk from "./calculadoras/miinimumpalk";
import palgakalkulaator from "./calculadoras/palgakalkulaator";
import pensionikalkulaator from "./calculadoras/pensionikalkulaator";
import puhkusetasu from "./calculadoras/puhkusetasu";
import sotsiaalmaks from "./calculadoras/sotsiaalmaks";
import tooandjaKulu from "./calculadoras/tooandja-kulu";
import tootuskindlustushuvitis from "./calculadoras/tootuskindlustushuvitis";
import tulumaks from "./calculadoras/tulumaksu-kalkulaator";
import uletunnitoo from "./calculadoras/uletunnitoo";
import vanemahuvitis from "./calculadoras/vanemahuvitis";
import cBrutopalga from "./contenido/brutopalga-kalkulaator";
import cDividendideTulumaks from "./contenido/dividendide-tulumaks";
import cEtteteatamistahtaeg from "./contenido/etteteatamistahtaeg";
import cEttevotluskonto from "./contenido/ettevotluskonto";
import cFieMaksud from "./contenido/fie-maksud";
import cHaigushuvitis from "./contenido/haigushuvitis";
import cInflatsioon from "./contenido/inflatsiooni-kalkulaator";
import cKaibemaks from "./contenido/kaibemaksu-kalkulaator";
import cKoondamishuvitis from "./contenido/koondamishuvitis";
import cLastetoetus from "./contenido/lastetoetus";
import cMaamaks from "./contenido/maamaks";
import cMiinimumpalk from "./contenido/miinimumpalk";
import cPalgakalkulaator from "./contenido/palgakalkulaator";
import cPensionikalkulaator from "./contenido/pensionikalkulaator";
import cPuhkusetasu from "./contenido/puhkusetasu";
import cSotsiaalmaks from "./contenido/sotsiaalmaks";
import cTooandjaKulu from "./contenido/tooandja-kulu";
import cTootuskindlustushuvitis from "./contenido/tootuskindlustushuvitis";
import cTulumaks from "./contenido/tulumaksu-kalkulaator";
import cUletunnitoo from "./contenido/uletunnitoo";
import cVanemahuvitis from "./contenido/vanemahuvitis";
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
    { definicion: palgakalkulaator, contenido: cPalgakalkulaator, cliente: () => import("./calculadoras/palgakalkulaator.cliente") },
    { definicion: brutopalga, contenido: cBrutopalga, cliente: () => import("./calculadoras/brutopalga-kalkulaator.cliente") },
    { definicion: tooandjaKulu, contenido: cTooandjaKulu, cliente: () => import("./calculadoras/tooandja-kulu.cliente") },
    { definicion: miinimumpalk, contenido: cMiinimumpalk, cliente: () => import("./calculadoras/miinimumpalk.cliente") },
    { definicion: tulumaks, contenido: cTulumaks, cliente: () => import("./calculadoras/tulumaksu-kalkulaator.cliente") },
    { definicion: sotsiaalmaks, contenido: cSotsiaalmaks, cliente: () => import("./calculadoras/sotsiaalmaks.cliente") },
    { definicion: fieMaksud, contenido: cFieMaksud, cliente: () => import("./calculadoras/fie-maksud.cliente") },
    { definicion: ettevotluskonto, contenido: cEttevotluskonto, cliente: () => import("./calculadoras/ettevotluskonto.cliente") },
    { definicion: kaibemaks, contenido: cKaibemaks, cliente: () => import("./calculadoras/kaibemaksu-kalkulaator.cliente") },
    { definicion: puhkusetasu, contenido: cPuhkusetasu, cliente: () => import("./calculadoras/puhkusetasu.cliente") },
    { definicion: haigushuvitis, contenido: cHaigushuvitis, cliente: () => import("./calculadoras/haigushuvitis.cliente") },
    { definicion: vanemahuvitis, contenido: cVanemahuvitis, cliente: () => import("./calculadoras/vanemahuvitis.cliente") },
    { definicion: lastetoetus, contenido: cLastetoetus, cliente: () => import("./calculadoras/lastetoetus.cliente") },
    { definicion: tootuskindlustushuvitis, contenido: cTootuskindlustushuvitis, cliente: () => import("./calculadoras/tootuskindlustushuvitis.cliente") },
    { definicion: koondamishuvitis, contenido: cKoondamishuvitis, cliente: () => import("./calculadoras/koondamishuvitis.cliente") },
    { definicion: etteteatamistahtaeg, contenido: cEtteteatamistahtaeg, cliente: () => import("./calculadoras/etteteatamistahtaeg.cliente") },
    { definicion: uletunnitoo, contenido: cUletunnitoo, cliente: () => import("./calculadoras/uletunnitoo.cliente") },
    { definicion: dividendideTulumaks, contenido: cDividendideTulumaks, cliente: () => import("./calculadoras/dividendide-tulumaks.cliente") },
    { definicion: maamaks, contenido: cMaamaks, cliente: () => import("./calculadoras/maamaks.cliente") },
    { definicion: pensionikalkulaator, contenido: cPensionikalkulaator, cliente: () => import("./calculadoras/pensionikalkulaator.cliente") },
    { definicion: inflatsioon, contenido: cInflatsioon, cliente: () => import("./calculadoras/inflatsiooni-kalkulaator.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
