import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorPlate from "./calculadoras/kalkulator-plate";
import contenidoKalkulatorPlate from "./contenido/kalkulator-plate";
import brutoIzNeta from "./calculadoras/bruto-iz-neta";
import contenidoBrutoIzNeta from "./contenido/bruto-iz-neta";
import trosakPoslodavca from "./calculadoras/trosak-poslodavca";
import contenidoTrosakPoslodavca from "./contenido/trosak-poslodavca";
import minimalnaPlata from "./calculadoras/minimalna-plata";
import contenidoMinimalnaPlata from "./contenido/minimalna-plata";
import porezNaDohodak from "./calculadoras/porez-na-dohodak";
import contenidoPorezNaDohodak from "./contenido/porez-na-dohodak";
import doprinosi from "./calculadoras/doprinosi";
import contenidoDoprinosi from "./contenido/doprinosi";
import kalkulatorPdv from "./calculadoras/kalkulator-pdv";
import contenidoKalkulatorPdv from "./contenido/kalkulator-pdv";
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
import topliObrokIRegres from "./calculadoras/topli-obrok-i-regres";
import contenidoTopliObrokIRegres from "./contenido/topli-obrok-i-regres";
import porezNaPrometNekretnina from "./calculadoras/porez-na-promet-nekretnina";
import contenidoPorezNaPrometNekretnina from "./contenido/porez-na-promet-nekretnina";
import kursnaLista from "./calculadoras/kursna-lista";
import contenidoKursnaLista from "./contenido/kursna-lista";
import kalkulatorInflacije from "./calculadoras/kalkulator-inflacije";
import contenidoKalkulatorInflacije from "./contenido/kalkulator-inflacije";
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
    { definicion: minimalnaPlata, contenido: contenidoMinimalnaPlata, cliente: () => import("./calculadoras/minimalna-plata.cliente") },
    { definicion: porezNaDohodak, contenido: contenidoPorezNaDohodak, cliente: () => import("./calculadoras/porez-na-dohodak.cliente") },
    { definicion: doprinosi, contenido: contenidoDoprinosi, cliente: () => import("./calculadoras/doprinosi.cliente") },
    { definicion: kalkulatorPdv, contenido: contenidoKalkulatorPdv, cliente: () => import("./calculadoras/kalkulator-pdv.cliente") },
    { definicion: godisnjiOdmor, contenido: contenidoGodisnjiOdmor, cliente: () => import("./calculadoras/godisnji-odmor.cliente") },
    { definicion: otpremnina, contenido: contenidoOtpremnina, cliente: () => import("./calculadoras/otpremnina.cliente") },
    { definicion: otkazniRok, contenido: contenidoOtkazniRok, cliente: () => import("./calculadoras/otkazni-rok.cliente") },
    { definicion: prekovremeniRad, contenido: contenidoPrekovremeniRad, cliente: () => import("./calculadoras/prekovremeni-rad.cliente") },
    { definicion: bolovanje, contenido: contenidoBolovanje, cliente: () => import("./calculadoras/bolovanje.cliente") },
    { definicion: porodiljskoOdsustvo, contenido: contenidoPorodiljskoOdsustvo, cliente: () => import("./calculadoras/porodiljsko-odsustvo.cliente") },
    { definicion: topliObrokIRegres, contenido: contenidoTopliObrokIRegres, cliente: () => import("./calculadoras/topli-obrok-i-regres.cliente") },
    { definicion: porezNaPrometNekretnina, contenido: contenidoPorezNaPrometNekretnina, cliente: () => import("./calculadoras/porez-na-promet-nekretnina.cliente") },
    { definicion: kursnaLista, contenido: contenidoKursnaLista, cliente: () => import("./calculadoras/kursna-lista.cliente") },
    { definicion: kalkulatorInflacije, contenido: contenidoKalkulatorInflacije, cliente: () => import("./calculadoras/kalkulator-inflacije.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
