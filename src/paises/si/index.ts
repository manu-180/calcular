import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import izracunPlace from "./calculadoras/izracun-place";
import contenidoIzracunPlace from "./contenido/izracun-place";
import netoBrutoKalkulator from "./calculadoras/neto-bruto-kalkulator";
import contenidoNetoBrutoKalkulator from "./contenido/neto-bruto-kalkulator";
import strosekDelodajalca from "./calculadoras/strosek-delodajalca";
import contenidoStrosekDelodajalca from "./contenido/strosek-delodajalca";
import minimalnaPlaca from "./calculadoras/minimalna-placa";
import contenidoMinimalnaPlaca from "./contenido/minimalna-placa";
import izracunPrispevkov from "./calculadoras/izracun-prispevkov";
import contenidoIzracunPrispevkov from "./contenido/izracun-prispevkov";
import kalkulatorDohodnine from "./calculadoras/kalkulator-dohodnine";
import contenidoKalkulatorDohodnine from "./contenido/kalkulator-dohodnine";
import olajsavaZaOtroke from "./calculadoras/olajsava-za-otroke";
import contenidoOlajsavaZaOtroke from "./contenido/olajsava-za-otroke";
import izracunRegresa from "./calculadoras/izracun-regresa";
import contenidoIzracunRegresa from "./contenido/izracun-regresa";
import zimskiRegres from "./calculadoras/zimski-regres";
import contenidoZimskiRegres from "./contenido/zimski-regres";
import spNormiranec from "./calculadoras/sp-normiranec";
import contenidoSpNormiranec from "./contenido/sp-normiranec";
import prispevkiSp from "./calculadoras/prispevki-sp";
import contenidoPrispevkiSp from "./contenido/prispevki-sp";
import ddvKalkulator from "./calculadoras/ddv-kalkulator";
import contenidoDdvKalkulator from "./contenido/ddv-kalkulator";
import davekNaPrometNepremicnin from "./calculadoras/davek-na-promet-nepremicnin";
import contenidoDavekNaPrometNepremicnin from "./contenido/davek-na-promet-nepremicnin";
import letniDopust from "./calculadoras/letni-dopust";
import contenidoLetniDopust from "./contenido/letni-dopust";
import izracunOdpravnine from "./calculadoras/izracun-odpravnine";
import contenidoIzracunOdpravnine from "./contenido/izracun-odpravnine";
import odpovedniRok from "./calculadoras/odpovedni-rok";
import contenidoOdpovedniRok from "./contenido/odpovedni-rok";
import izracunNadur from "./calculadoras/izracun-nadur";
import contenidoIzracunNadur from "./contenido/izracun-nadur";
import izracunBolniske from "./calculadoras/izracun-bolniske";
import contenidoIzracunBolniske from "./contenido/izracun-bolniske";
import starsevskiDopust from "./calculadoras/starsevski-dopust";
import contenidoStarsevskiDopust from "./contenido/starsevski-dopust";
import otroskiDodatek from "./calculadoras/otroski-dodatek";
import contenidoOtroskiDodatek from "./contenido/otroski-dodatek";
import izracunPokojnine from "./calculadoras/izracun-pokojnine";
import contenidoIzracunPokojnine from "./contenido/izracun-pokojnine";
import kalkulatorInflacije from "./calculadoras/kalkulator-inflacije";
import contenidoKalkulatorInflacije from "./contenido/kalkulator-inflacije";
import tecajEvra from "./calculadoras/tecaj-evra";
import contenidoTecajEvra from "./contenido/tecaj-evra";
import povprecnaPlaca from "./calculadoras/povprecna-placa";
import contenidoPovprecnaPlaca from "./contenido/povprecna-placa";
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
    { definicion: izracunPlace, contenido: contenidoIzracunPlace, cliente: () => import("./calculadoras/izracun-place.cliente") },
    { definicion: netoBrutoKalkulator, contenido: contenidoNetoBrutoKalkulator, cliente: () => import("./calculadoras/neto-bruto-kalkulator.cliente") },
    { definicion: strosekDelodajalca, contenido: contenidoStrosekDelodajalca, cliente: () => import("./calculadoras/strosek-delodajalca.cliente") },
    { definicion: minimalnaPlaca, contenido: contenidoMinimalnaPlaca, cliente: () => import("./calculadoras/minimalna-placa.cliente") },
    { definicion: izracunPrispevkov, contenido: contenidoIzracunPrispevkov, cliente: () => import("./calculadoras/izracun-prispevkov.cliente") },
    { definicion: kalkulatorDohodnine, contenido: contenidoKalkulatorDohodnine, cliente: () => import("./calculadoras/kalkulator-dohodnine.cliente") },
    { definicion: olajsavaZaOtroke, contenido: contenidoOlajsavaZaOtroke, cliente: () => import("./calculadoras/olajsava-za-otroke.cliente") },
    { definicion: izracunRegresa, contenido: contenidoIzracunRegresa, cliente: () => import("./calculadoras/izracun-regresa.cliente") },
    { definicion: zimskiRegres, contenido: contenidoZimskiRegres, cliente: () => import("./calculadoras/zimski-regres.cliente") },
    { definicion: spNormiranec, contenido: contenidoSpNormiranec, cliente: () => import("./calculadoras/sp-normiranec.cliente") },
    { definicion: prispevkiSp, contenido: contenidoPrispevkiSp, cliente: () => import("./calculadoras/prispevki-sp.cliente") },
    { definicion: ddvKalkulator, contenido: contenidoDdvKalkulator, cliente: () => import("./calculadoras/ddv-kalkulator.cliente") },
    { definicion: davekNaPrometNepremicnin, contenido: contenidoDavekNaPrometNepremicnin, cliente: () => import("./calculadoras/davek-na-promet-nepremicnin.cliente") },
    { definicion: letniDopust, contenido: contenidoLetniDopust, cliente: () => import("./calculadoras/letni-dopust.cliente") },
    { definicion: izracunOdpravnine, contenido: contenidoIzracunOdpravnine, cliente: () => import("./calculadoras/izracun-odpravnine.cliente") },
    { definicion: odpovedniRok, contenido: contenidoOdpovedniRok, cliente: () => import("./calculadoras/odpovedni-rok.cliente") },
    { definicion: izracunNadur, contenido: contenidoIzracunNadur, cliente: () => import("./calculadoras/izracun-nadur.cliente") },
    { definicion: izracunBolniske, contenido: contenidoIzracunBolniske, cliente: () => import("./calculadoras/izracun-bolniske.cliente") },
    { definicion: starsevskiDopust, contenido: contenidoStarsevskiDopust, cliente: () => import("./calculadoras/starsevski-dopust.cliente") },
    { definicion: otroskiDodatek, contenido: contenidoOtroskiDodatek, cliente: () => import("./calculadoras/otroski-dodatek.cliente") },
    { definicion: izracunPokojnine, contenido: contenidoIzracunPokojnine, cliente: () => import("./calculadoras/izracun-pokojnine.cliente") },
    { definicion: kalkulatorInflacije, contenido: contenidoKalkulatorInflacije, cliente: () => import("./calculadoras/kalkulator-inflacije.cliente") },
    { definicion: tecajEvra, contenido: contenidoTecajEvra, cliente: () => import("./calculadoras/tecaj-evra.cliente") },
    { definicion: povprecnaPlaca, contenido: contenidoPovprecnaPlaca, cliente: () => import("./calculadoras/povprecna-placa.cliente") },
  ],
  novedades,
  detectores,
  universales: "todas",
});
