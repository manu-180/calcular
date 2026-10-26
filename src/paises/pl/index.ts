import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorWynagrodzen from "./calculadoras/kalkulator-wynagrodzen";
import contenidoKalkulatorWynagrodzen from "./contenido/kalkulator-wynagrodzen";
import umowaZlecenie from "./calculadoras/umowa-zlecenie";
import contenidoUmowaZlecenie from "./contenido/umowa-zlecenie";
import umowaODzielo from "./calculadoras/umowa-o-dzielo";
import contenidoUmowaODzielo from "./contenido/umowa-o-dzielo";
import kosztPracodawcy from "./calculadoras/koszt-pracodawcy";
import contenidoKosztPracodawcy from "./contenido/koszt-pracodawcy";
import kalkulatorVat from "./calculadoras/kalkulator-vat";
import contenidoKalkulatorVat from "./contenido/kalkulator-vat";
import placaMinimalna from "./calculadoras/placa-minimalna";
import contenidoPlacaMinimalna from "./contenido/placa-minimalna";
import kalkulatorPit from "./calculadoras/kalkulator-pit";
import contenidoKalkulatorPit from "./contenido/kalkulator-pit";
import skladkiZus from "./calculadoras/skladki-zus";
import contenidoSkladkiZus from "./contenido/skladki-zus";
import malyZusPlus from "./calculadoras/maly-zus-plus";
import contenidoMalyZusPlus from "./contenido/maly-zus-plus";
import kalkulatorB2b from "./calculadoras/kalkulator-b2b";
import contenidoKalkulatorB2b from "./contenido/kalkulator-b2b";
import kalkulatorRyczaltu from "./calculadoras/kalkulator-ryczaltu";
import contenidoKalkulatorRyczaltu from "./contenido/kalkulator-ryczaltu";
import urlopWypoczynkowy from "./calculadoras/urlop-wypoczynkowy";
import contenidoUrlopWypoczynkowy from "./contenido/urlop-wypoczynkowy";
import ekwiwalentZaUrlop from "./calculadoras/ekwiwalent-za-urlop";
import contenidoEkwiwalentZaUrlop from "./contenido/ekwiwalent-za-urlop";
import nadgodziny from "./calculadoras/nadgodziny";
import contenidoNadgodziny from "./contenido/nadgodziny";
import wymiarCzasuPracy from "./calculadoras/wymiar-czasu-pracy";
import contenidoWymiarCzasuPracy from "./contenido/wymiar-czasu-pracy";
import odprawa from "./calculadoras/odprawa";
import contenidoOdprawa from "./contenido/odprawa";
import okresWypowiedzenia from "./calculadoras/okres-wypowiedzenia";
import contenidoOkresWypowiedzenia from "./contenido/okres-wypowiedzenia";
import kalkulatorChorobowego from "./calculadoras/kalkulator-chorobowego";
import contenidoKalkulatorChorobowego from "./contenido/kalkulator-chorobowego";
import kalkulatorWalut from "./calculadoras/kalkulator-walut";
import contenidoKalkulatorWalut from "./contenido/kalkulator-walut";
import kalkulatorInflacji from "./calculadoras/kalkulator-inflacji";
import contenidoKalkulatorInflacji from "./contenido/kalkulator-inflacji";
import kalkulatorOdsetekUstawowych from "./calculadoras/kalkulator-odsetek-ustawowych";
import contenidoKalkulatorOdsetekUstawowych from "./contenido/kalkulator-odsetek-ustawowych";
import kalkulatorLokat from "./calculadoras/kalkulator-lokat";
import contenidoKalkulatorLokat from "./contenido/kalkulator-lokat";
import podatekBelki from "./calculadoras/podatek-belki";
import contenidoPodatekBelki from "./contenido/podatek-belki";
import kalkulatorPcc from "./calculadoras/kalkulator-pcc";
import contenidoKalkulatorPcc from "./contenido/kalkulator-pcc";
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
    { definicion: kalkulatorWynagrodzen, contenido: contenidoKalkulatorWynagrodzen, cliente: () => import("./calculadoras/kalkulator-wynagrodzen.cliente") },
    { definicion: umowaZlecenie, contenido: contenidoUmowaZlecenie, cliente: () => import("./calculadoras/umowa-zlecenie.cliente") },
    { definicion: umowaODzielo, contenido: contenidoUmowaODzielo, cliente: () => import("./calculadoras/umowa-o-dzielo.cliente") },
    { definicion: kosztPracodawcy, contenido: contenidoKosztPracodawcy, cliente: () => import("./calculadoras/koszt-pracodawcy.cliente") },
    { definicion: kalkulatorVat, contenido: contenidoKalkulatorVat, cliente: () => import("./calculadoras/kalkulator-vat.cliente") },
    { definicion: placaMinimalna, contenido: contenidoPlacaMinimalna, cliente: () => import("./calculadoras/placa-minimalna.cliente") },
    { definicion: kalkulatorPit, contenido: contenidoKalkulatorPit, cliente: () => import("./calculadoras/kalkulator-pit.cliente") },
    { definicion: skladkiZus, contenido: contenidoSkladkiZus, cliente: () => import("./calculadoras/skladki-zus.cliente") },
    { definicion: malyZusPlus, contenido: contenidoMalyZusPlus, cliente: () => import("./calculadoras/maly-zus-plus.cliente") },
    { definicion: kalkulatorB2b, contenido: contenidoKalkulatorB2b, cliente: () => import("./calculadoras/kalkulator-b2b.cliente") },
    { definicion: kalkulatorRyczaltu, contenido: contenidoKalkulatorRyczaltu, cliente: () => import("./calculadoras/kalkulator-ryczaltu.cliente") },
    { definicion: urlopWypoczynkowy, contenido: contenidoUrlopWypoczynkowy, cliente: () => import("./calculadoras/urlop-wypoczynkowy.cliente") },
    { definicion: ekwiwalentZaUrlop, contenido: contenidoEkwiwalentZaUrlop, cliente: () => import("./calculadoras/ekwiwalent-za-urlop.cliente") },
    { definicion: nadgodziny, contenido: contenidoNadgodziny, cliente: () => import("./calculadoras/nadgodziny.cliente") },
    { definicion: wymiarCzasuPracy, contenido: contenidoWymiarCzasuPracy, cliente: () => import("./calculadoras/wymiar-czasu-pracy.cliente") },
    { definicion: odprawa, contenido: contenidoOdprawa, cliente: () => import("./calculadoras/odprawa.cliente") },
    { definicion: okresWypowiedzenia, contenido: contenidoOkresWypowiedzenia, cliente: () => import("./calculadoras/okres-wypowiedzenia.cliente") },
    { definicion: kalkulatorChorobowego, contenido: contenidoKalkulatorChorobowego, cliente: () => import("./calculadoras/kalkulator-chorobowego.cliente") },
    { definicion: kalkulatorWalut, contenido: contenidoKalkulatorWalut, cliente: () => import("./calculadoras/kalkulator-walut.cliente") },
    { definicion: kalkulatorInflacji, contenido: contenidoKalkulatorInflacji, cliente: () => import("./calculadoras/kalkulator-inflacji.cliente") },
    { definicion: kalkulatorOdsetekUstawowych, contenido: contenidoKalkulatorOdsetekUstawowych, cliente: () => import("./calculadoras/kalkulator-odsetek-ustawowych.cliente") },
    { definicion: kalkulatorLokat, contenido: contenidoKalkulatorLokat, cliente: () => import("./calculadoras/kalkulator-lokat.cliente") },
    { definicion: podatekBelki, contenido: contenidoPodatekBelki, cliente: () => import("./calculadoras/podatek-belki.cliente") },
    { definicion: kalkulatorPcc, contenido: contenidoKalkulatorPcc, cliente: () => import("./calculadoras/kalkulator-pcc.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
