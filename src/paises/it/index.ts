import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import irpef from "./calculadoras/irpef";
import iva from "./calculadoras/iva";
import stipendioNetto from "./calculadoras/stipendio-netto";
import tfr from "./calculadoras/tfr";
import contenidoIrpef from "./contenido/irpef";
import contenidoIva from "./contenido/iva";
import contenidoStipendioNetto from "./contenido/stipendio-netto";
import contenidoTfr from "./contenido/tfr";
import tredicesima from "./calculadoras/tredicesima";
import contenidoTredicesima from "./contenido/tredicesima";
import quattordicesima from "./calculadoras/quattordicesima";
import contenidoQuattordicesima from "./contenido/quattordicesima";
import ferie from "./calculadoras/ferie";
import contenidoFerie from "./contenido/ferie";
import straordinari from "./calculadoras/straordinari";
import contenidoStraordinari from "./contenido/straordinari";
import regimeForfettario from "./calculadoras/regime-forfettario";
import contenidoRegimeForfettario from "./contenido/regime-forfettario";
import contributiGestioneSeparata from "./calculadoras/contributi-gestione-separata";
import contenidoContributiGestioneSeparata from "./contenido/contributi-gestione-separata";
import contributiArtigianiCommercianti from "./calculadoras/contributi-artigiani-commercianti";
import contenidoContributiArtigianiCommercianti from "./contenido/contributi-artigiani-commercianti";
import ritenutaAcconto from "./calculadoras/ritenuta-acconto";
import contenidoRitenutaAcconto from "./contenido/ritenuta-acconto";
import naspi from "./calculadoras/naspi";
import contenidoNaspi from "./contenido/naspi";
import cedolareSecca from "./calculadoras/cedolare-secca";
import contenidoCedolareSecca from "./contenido/cedolare-secca";
import imposteAcquistoCasa from "./calculadoras/imposte-acquisto-casa";
import contenidoImposteAcquistoCasa from "./contenido/imposte-acquisto-casa";
import interessiLegali from "./calculadoras/interessi-legali";
import contenidoInteressiLegali from "./contenido/interessi-legali";
import maternita from "./calculadoras/maternita";
import contenidoMaternita from "./contenido/maternita";
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
    { definicion: stipendioNetto, contenido: contenidoStipendioNetto, cliente: () => import("./calculadoras/stipendio-netto.cliente") },
    { definicion: irpef, contenido: contenidoIrpef, cliente: () => import("./calculadoras/irpef.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: tfr, contenido: contenidoTfr, cliente: () => import("./calculadoras/tfr.cliente") },
    { definicion: tredicesima, contenido: contenidoTredicesima, cliente: () => import("./calculadoras/tredicesima.cliente") },
    { definicion: quattordicesima, contenido: contenidoQuattordicesima, cliente: () => import("./calculadoras/quattordicesima.cliente") },
    { definicion: ferie, contenido: contenidoFerie, cliente: () => import("./calculadoras/ferie.cliente") },
    { definicion: straordinari, contenido: contenidoStraordinari, cliente: () => import("./calculadoras/straordinari.cliente") },
    { definicion: regimeForfettario, contenido: contenidoRegimeForfettario, cliente: () => import("./calculadoras/regime-forfettario.cliente") },
    { definicion: contributiGestioneSeparata, contenido: contenidoContributiGestioneSeparata, cliente: () => import("./calculadoras/contributi-gestione-separata.cliente") },
    { definicion: contributiArtigianiCommercianti, contenido: contenidoContributiArtigianiCommercianti, cliente: () => import("./calculadoras/contributi-artigiani-commercianti.cliente") },
    { definicion: ritenutaAcconto, contenido: contenidoRitenutaAcconto, cliente: () => import("./calculadoras/ritenuta-acconto.cliente") },
    { definicion: naspi, contenido: contenidoNaspi, cliente: () => import("./calculadoras/naspi.cliente") },
    { definicion: cedolareSecca, contenido: contenidoCedolareSecca, cliente: () => import("./calculadoras/cedolare-secca.cliente") },
    { definicion: imposteAcquistoCasa, contenido: contenidoImposteAcquistoCasa, cliente: () => import("./calculadoras/imposte-acquisto-casa.cliente") },
    { definicion: interessiLegali, contenido: contenidoInteressiLegali, cliente: () => import("./calculadoras/interessi-legali.cliente") },
    { definicion: maternita, contenido: contenidoMaternita, cliente: () => import("./calculadoras/maternita.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
