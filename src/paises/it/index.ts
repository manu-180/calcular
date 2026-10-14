import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import irpef from "./calculadoras/calcolo-irpef";
import iva from "./calculadoras/calcolo-iva";
import stipendioNetto from "./calculadoras/calcolo-stipendio-netto";
import tfr from "./calculadoras/calcolo-tfr";
import contenidoIrpef from "./contenido/calcolo-irpef";
import contenidoIva from "./contenido/calcolo-iva";
import contenidoStipendioNetto from "./contenido/calcolo-stipendio-netto";
import contenidoTfr from "./contenido/calcolo-tfr";
import tredicesima from "./calculadoras/calcolo-tredicesima";
import contenidoTredicesima from "./contenido/calcolo-tredicesima";
import quattordicesima from "./calculadoras/calcolo-quattordicesima";
import contenidoQuattordicesima from "./contenido/calcolo-quattordicesima";
import ferie from "./calculadoras/calcolo-ferie-maturate";
import contenidoFerie from "./contenido/calcolo-ferie-maturate";
import straordinari from "./calculadoras/calcolo-straordinari";
import contenidoStraordinari from "./contenido/calcolo-straordinari";
import regimeForfettario from "./calculadoras/calcolo-regime-forfettario";
import contenidoRegimeForfettario from "./contenido/calcolo-regime-forfettario";
import contributiGestioneSeparata from "./calculadoras/contributi-gestione-separata";
import contenidoContributiGestioneSeparata from "./contenido/contributi-gestione-separata";
import contributiArtigianiCommercianti from "./calculadoras/contributi-inps-artigiani-commercianti";
import contenidoContributiArtigianiCommercianti from "./contenido/contributi-inps-artigiani-commercianti";
import ritenutaAcconto from "./calculadoras/calcolo-ritenuta-d-acconto";
import contenidoRitenutaAcconto from "./contenido/calcolo-ritenuta-d-acconto";
import naspi from "./calculadoras/calcolo-naspi";
import contenidoNaspi from "./contenido/calcolo-naspi";
import cedolareSecca from "./calculadoras/calcolo-cedolare-secca";
import contenidoCedolareSecca from "./contenido/calcolo-cedolare-secca";
import imposteAcquistoCasa from "./calculadoras/calcolo-imposte-acquisto-prima-casa";
import contenidoImposteAcquistoCasa from "./contenido/calcolo-imposte-acquisto-prima-casa";
import interessiLegali from "./calculadoras/calcolo-interessi-legali";
import contenidoInteressiLegali from "./contenido/calcolo-interessi-legali";
import maternita from "./calculadoras/calcolo-maternita-obbligatoria";
import contenidoMaternita from "./contenido/calcolo-maternita-obbligatoria";
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
    { definicion: stipendioNetto, contenido: contenidoStipendioNetto, cliente: () => import("./calculadoras/calcolo-stipendio-netto.cliente") },
    { definicion: irpef, contenido: contenidoIrpef, cliente: () => import("./calculadoras/calcolo-irpef.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/calcolo-iva.cliente") },
    { definicion: tfr, contenido: contenidoTfr, cliente: () => import("./calculadoras/calcolo-tfr.cliente") },
    { definicion: tredicesima, contenido: contenidoTredicesima, cliente: () => import("./calculadoras/calcolo-tredicesima.cliente") },
    { definicion: quattordicesima, contenido: contenidoQuattordicesima, cliente: () => import("./calculadoras/calcolo-quattordicesima.cliente") },
    { definicion: ferie, contenido: contenidoFerie, cliente: () => import("./calculadoras/calcolo-ferie-maturate.cliente") },
    { definicion: straordinari, contenido: contenidoStraordinari, cliente: () => import("./calculadoras/calcolo-straordinari.cliente") },
    { definicion: regimeForfettario, contenido: contenidoRegimeForfettario, cliente: () => import("./calculadoras/calcolo-regime-forfettario.cliente") },
    { definicion: contributiGestioneSeparata, contenido: contenidoContributiGestioneSeparata, cliente: () => import("./calculadoras/contributi-gestione-separata.cliente") },
    { definicion: contributiArtigianiCommercianti, contenido: contenidoContributiArtigianiCommercianti, cliente: () => import("./calculadoras/contributi-inps-artigiani-commercianti.cliente") },
    { definicion: ritenutaAcconto, contenido: contenidoRitenutaAcconto, cliente: () => import("./calculadoras/calcolo-ritenuta-d-acconto.cliente") },
    { definicion: naspi, contenido: contenidoNaspi, cliente: () => import("./calculadoras/calcolo-naspi.cliente") },
    { definicion: cedolareSecca, contenido: contenidoCedolareSecca, cliente: () => import("./calculadoras/calcolo-cedolare-secca.cliente") },
    { definicion: imposteAcquistoCasa, contenido: contenidoImposteAcquistoCasa, cliente: () => import("./calculadoras/calcolo-imposte-acquisto-prima-casa.cliente") },
    { definicion: interessiLegali, contenido: contenidoInteressiLegali, cliente: () => import("./calculadoras/calcolo-interessi-legali.cliente") },
    { definicion: maternita, contenido: contenidoMaternita, cliente: () => import("./calculadoras/calcolo-maternita-obbligatoria.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
