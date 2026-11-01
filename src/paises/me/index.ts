import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorPlate from "./calculadoras/kalkulator-plate";
import contenidoKalkulatorPlate from "./contenido/kalkulator-plate";
import brutoIzNeta from "./calculadoras/bruto-iz-neta";
import contenidoBrutoIzNeta from "./contenido/bruto-iz-neta";
import trosakPoslodavca from "./calculadoras/trosak-poslodavca";
import contenidoTrosakPoslodavca from "./contenido/trosak-poslodavca";
import minimalnaZarada from "./calculadoras/minimalna-zarada";
import contenidoMinimalnaZarada from "./contenido/minimalna-zarada";
import porezNaDohodak from "./calculadoras/porez-na-dohodak";
import contenidoPorezNaDohodak from "./contenido/porez-na-dohodak";
import obracunDoprinosa from "./calculadoras/obracun-doprinosa";
import contenidoObracunDoprinosa from "./contenido/obracun-doprinosa";
import godisnjiOdmor from "./calculadoras/godisnji-odmor";
import contenidoGodisnjiOdmor from "./contenido/godisnji-odmor";
import otpremnina from "./calculadoras/otpremnina";
import contenidoOtpremnina from "./contenido/otpremnina";
import otkazniRok from "./calculadoras/otkazni-rok";
import contenidoOtkazniRok from "./contenido/otkazni-rok";
import prekovremeniRad from "./calculadoras/prekovremeni-rad";
import contenidoPrekovremeniRad from "./contenido/prekovremeni-rad";
import bolovanje from "./calculadoras/bolovanje";
import contenidoBolovanje from "./contenido/bolovanje";
import porodiljskoOdsustvo from "./calculadoras/porodiljsko-odsustvo";
import contenidoPorodiljskoOdsustvo from "./contenido/porodiljsko-odsustvo";
import porezZaPreduzetnike from "./calculadoras/porez-za-preduzetnike";
import contenidoPorezZaPreduzetnike from "./contenido/porez-za-preduzetnike";
import kalkulatorPdv from "./calculadoras/kalkulator-pdv";
import contenidoKalkulatorPdv from "./contenido/kalkulator-pdv";
import porezNaPrometNepokretnosti from "./calculadoras/porez-na-promet-nepokretnosti";
import contenidoPorezNaPrometNepokretnosti from "./contenido/porez-na-promet-nepokretnosti";
import porezNaNepokretnosti from "./calculadoras/porez-na-nepokretnosti";
import contenidoPorezNaNepokretnosti from "./contenido/porez-na-nepokretnosti";
import kalkulatorInflacije from "./calculadoras/kalkulator-inflacije";
import contenidoKalkulatorInflacije from "./contenido/kalkulator-inflacije";
import prosjecnaZarada from "./calculadoras/prosjecna-zarada";
import contenidoProsjecnaZarada from "./contenido/prosjecna-zarada";
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
    { definicion: kalkulatorPlate, contenido: contenidoKalkulatorPlate, cliente: () => import("./calculadoras/kalkulator-plate.cliente") },
    { definicion: brutoIzNeta, contenido: contenidoBrutoIzNeta, cliente: () => import("./calculadoras/bruto-iz-neta.cliente") },
    { definicion: trosakPoslodavca, contenido: contenidoTrosakPoslodavca, cliente: () => import("./calculadoras/trosak-poslodavca.cliente") },
    { definicion: minimalnaZarada, contenido: contenidoMinimalnaZarada, cliente: () => import("./calculadoras/minimalna-zarada.cliente") },
    { definicion: porezNaDohodak, contenido: contenidoPorezNaDohodak, cliente: () => import("./calculadoras/porez-na-dohodak.cliente") },
    { definicion: obracunDoprinosa, contenido: contenidoObracunDoprinosa, cliente: () => import("./calculadoras/obracun-doprinosa.cliente") },
    { definicion: godisnjiOdmor, contenido: contenidoGodisnjiOdmor, cliente: () => import("./calculadoras/godisnji-odmor.cliente") },
    { definicion: otpremnina, contenido: contenidoOtpremnina, cliente: () => import("./calculadoras/otpremnina.cliente") },
    { definicion: otkazniRok, contenido: contenidoOtkazniRok, cliente: () => import("./calculadoras/otkazni-rok.cliente") },
    { definicion: prekovremeniRad, contenido: contenidoPrekovremeniRad, cliente: () => import("./calculadoras/prekovremeni-rad.cliente") },
    { definicion: bolovanje, contenido: contenidoBolovanje, cliente: () => import("./calculadoras/bolovanje.cliente") },
    { definicion: porodiljskoOdsustvo, contenido: contenidoPorodiljskoOdsustvo, cliente: () => import("./calculadoras/porodiljsko-odsustvo.cliente") },
    { definicion: porezZaPreduzetnike, contenido: contenidoPorezZaPreduzetnike, cliente: () => import("./calculadoras/porez-za-preduzetnike.cliente") },
    { definicion: kalkulatorPdv, contenido: contenidoKalkulatorPdv, cliente: () => import("./calculadoras/kalkulator-pdv.cliente") },
    { definicion: porezNaPrometNepokretnosti, contenido: contenidoPorezNaPrometNepokretnosti, cliente: () => import("./calculadoras/porez-na-promet-nepokretnosti.cliente") },
    { definicion: porezNaNepokretnosti, contenido: contenidoPorezNaNepokretnosti, cliente: () => import("./calculadoras/porez-na-nepokretnosti.cliente") },
    { definicion: kalkulatorInflacije, contenido: contenidoKalkulatorInflacije, cliente: () => import("./calculadoras/kalkulator-inflacije.cliente") },
    { definicion: prosjecnaZarada, contenido: contenidoProsjecnaZarada, cliente: () => import("./calculadoras/prosjecna-zarada.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
