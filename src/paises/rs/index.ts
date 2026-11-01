import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorPlate from "./calculadoras/kalkulator-plate";
import contenidoKalkulatorPlate from "./contenido/kalkulator-plate";
import netoUBruto from "./calculadoras/neto-u-bruto";
import contenidoNetoUBruto from "./contenido/neto-u-bruto";
import trosakPoslodavca from "./calculadoras/trosak-poslodavca";
import contenidoTrosakPoslodavca from "./contenido/trosak-poslodavca";
import minimalnaZarada from "./calculadoras/minimalna-zarada";
import contenidoMinimalnaZarada from "./contenido/minimalna-zarada";
import porezNaZarade from "./calculadoras/porez-na-zarade";
import contenidoPorezNaZarade from "./contenido/porez-na-zarade";
import obracunDoprinosa from "./calculadoras/obracun-doprinosa";
import contenidoObracunDoprinosa from "./contenido/obracun-doprinosa";
import kalkulatorGodisnjegOdmora from "./calculadoras/kalkulator-godisnjeg-odmora";
import contenidoKalkulatorGodisnjegOdmora from "./contenido/kalkulator-godisnjeg-odmora";
import regresITopliObrok from "./calculadoras/regres-i-topli-obrok";
import contenidoRegresITopliObrok from "./contenido/regres-i-topli-obrok";
import obracunPrekovremenogRada from "./calculadoras/obracun-prekovremenog-rada";
import contenidoObracunPrekovremenogRada from "./contenido/obracun-prekovremenog-rada";
import obracunOtpremnine from "./calculadoras/obracun-otpremnine";
import contenidoObracunOtpremnine from "./contenido/obracun-otpremnine";
import otkazniRok from "./calculadoras/otkazni-rok";
import contenidoOtkazniRok from "./contenido/otkazni-rok";
import obracunBolovanja from "./calculadoras/obracun-bolovanja";
import contenidoObracunBolovanja from "./contenido/obracun-bolovanja";
import porodiljskoOdsustvo from "./calculadoras/porodiljsko-odsustvo";
import contenidoPorodiljskoOdsustvo from "./contenido/porodiljsko-odsustvo";
import pausalKalkulator from "./calculadoras/pausal-kalkulator";
import contenidoPausalKalkulator from "./contenido/pausal-kalkulator";
import kalkulatorPdv from "./calculadoras/kalkulator-pdv";
import contenidoKalkulatorPdv from "./contenido/kalkulator-pdv";
import porezNaImovinu from "./calculadoras/porez-na-imovinu";
import contenidoPorezNaImovinu from "./contenido/porez-na-imovinu";
import porezNaPrenosApsolutnihPrava from "./calculadoras/porez-na-prenos-apsolutnih-prava";
import contenidoPorezNaPrenosApsolutnihPrava from "./contenido/porez-na-prenos-apsolutnih-prava";
import kursNbs from "./calculadoras/kurs-nbs";
import contenidoKursNbs from "./contenido/kurs-nbs";
import kalkulatorInflacije from "./calculadoras/kalkulator-inflacije";
import contenidoKalkulatorInflacije from "./contenido/kalkulator-inflacije";
import prosecnaPlata from "./calculadoras/prosecna-plata";
import contenidoProsecnaPlata from "./contenido/prosecna-plata";
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
    { definicion: netoUBruto, contenido: contenidoNetoUBruto, cliente: () => import("./calculadoras/neto-u-bruto.cliente") },
    { definicion: trosakPoslodavca, contenido: contenidoTrosakPoslodavca, cliente: () => import("./calculadoras/trosak-poslodavca.cliente") },
    { definicion: minimalnaZarada, contenido: contenidoMinimalnaZarada, cliente: () => import("./calculadoras/minimalna-zarada.cliente") },
    { definicion: porezNaZarade, contenido: contenidoPorezNaZarade, cliente: () => import("./calculadoras/porez-na-zarade.cliente") },
    { definicion: obracunDoprinosa, contenido: contenidoObracunDoprinosa, cliente: () => import("./calculadoras/obracun-doprinosa.cliente") },
    { definicion: kalkulatorGodisnjegOdmora, contenido: contenidoKalkulatorGodisnjegOdmora, cliente: () => import("./calculadoras/kalkulator-godisnjeg-odmora.cliente") },
    { definicion: regresITopliObrok, contenido: contenidoRegresITopliObrok, cliente: () => import("./calculadoras/regres-i-topli-obrok.cliente") },
    { definicion: obracunPrekovremenogRada, contenido: contenidoObracunPrekovremenogRada, cliente: () => import("./calculadoras/obracun-prekovremenog-rada.cliente") },
    { definicion: obracunOtpremnine, contenido: contenidoObracunOtpremnine, cliente: () => import("./calculadoras/obracun-otpremnine.cliente") },
    { definicion: otkazniRok, contenido: contenidoOtkazniRok, cliente: () => import("./calculadoras/otkazni-rok.cliente") },
    { definicion: obracunBolovanja, contenido: contenidoObracunBolovanja, cliente: () => import("./calculadoras/obracun-bolovanja.cliente") },
    { definicion: porodiljskoOdsustvo, contenido: contenidoPorodiljskoOdsustvo, cliente: () => import("./calculadoras/porodiljsko-odsustvo.cliente") },
    { definicion: pausalKalkulator, contenido: contenidoPausalKalkulator, cliente: () => import("./calculadoras/pausal-kalkulator.cliente") },
    { definicion: kalkulatorPdv, contenido: contenidoKalkulatorPdv, cliente: () => import("./calculadoras/kalkulator-pdv.cliente") },
    { definicion: porezNaImovinu, contenido: contenidoPorezNaImovinu, cliente: () => import("./calculadoras/porez-na-imovinu.cliente") },
    { definicion: porezNaPrenosApsolutnihPrava, contenido: contenidoPorezNaPrenosApsolutnihPrava, cliente: () => import("./calculadoras/porez-na-prenos-apsolutnih-prava.cliente") },
    { definicion: kursNbs, contenido: contenidoKursNbs, cliente: () => import("./calculadoras/kurs-nbs.cliente") },
    { definicion: kalkulatorInflacije, contenido: contenidoKalkulatorInflacije, cliente: () => import("./calculadoras/kalkulator-inflacije.cliente") },
    { definicion: prosecnaPlata, contenido: contenidoProsecnaPlata, cliente: () => import("./calculadoras/prosecna-plata.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
