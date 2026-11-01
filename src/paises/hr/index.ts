import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import brutoNetoKalkulator from "./calculadoras/bruto-neto-kalkulator";
import brutoNetoKalkulatorTekst from "./contenido/bruto-neto-kalkulator";
import netoBrutoKalkulator from "./calculadoras/neto-bruto-kalkulator";
import netoBrutoKalkulatorTekst from "./contenido/neto-bruto-kalkulator";
import trosakPoslodavca from "./calculadoras/trosak-poslodavca";
import trosakPoslodavcaTekst from "./contenido/trosak-poslodavca";
import minimalnaPlaca from "./calculadoras/minimalna-placa";
import minimalnaPlacaTekst from "./contenido/minimalna-placa";
import porezNaDohodak from "./calculadoras/porez-na-dohodak";
import porezNaDohodakTekst from "./contenido/porez-na-dohodak";
import doprinosiNaPlacu from "./calculadoras/doprinosi-na-placu";
import doprinosiNaPlacuTekst from "./contenido/doprinosi-na-placu";
import pausalniObrt from "./calculadoras/pausalni-obrt";
import pausalniObrtTekst from "./contenido/pausalni-obrt";
import doprinosiZaObrtnike from "./calculadoras/doprinosi-za-obrtnike";
import doprinosiZaObrtnikeTekst from "./contenido/doprinosi-za-obrtnike";
import pdvKalkulator from "./calculadoras/pdv-kalkulator";
import pdvKalkulatorTekst from "./contenido/pdv-kalkulator";
import godisnjiOdmor from "./calculadoras/godisnji-odmor";
import godisnjiOdmorTekst from "./contenido/godisnji-odmor";
import regres from "./calculadoras/regres";
import regresTekst from "./contenido/regres";
import izracunOtpremnine from "./calculadoras/izracun-otpremnine";
import izracunOtpremnineTekst from "./contenido/izracun-otpremnine";
import otkazniRok from "./calculadoras/otkazni-rok";
import otkazniRokTekst from "./contenido/otkazni-rok";
import prekovremeniRad from "./calculadoras/prekovremeni-rad";
import prekovremeniRadTekst from "./contenido/prekovremeni-rad";
import bolovanje from "./calculadoras/bolovanje";
import bolovanjeTekst from "./contenido/bolovanje";
import rodiljnaNaknada from "./calculadoras/rodiljna-naknada";
import rodiljnaNaknadaTekst from "./contenido/rodiljna-naknada";
import porezNaPrometNekretnina from "./calculadoras/porez-na-promet-nekretnina";
import porezNaPrometNekretninaTekst from "./contenido/porez-na-promet-nekretnina";
import porezNaDobit from "./calculadoras/porez-na-dobit";
import porezNaDobitTekst from "./contenido/porez-na-dobit";
import kalkulatorInflacije from "./calculadoras/kalkulator-inflacije";
import kalkulatorInflacijeTekst from "./contenido/kalkulator-inflacije";
import tecajHnb from "./calculadoras/tecaj-hnb";
import tecajHnbTekst from "./contenido/tecaj-hnb";
import prosjecnaPlaca from "./calculadoras/prosjecna-placa";
import prosjecnaPlacaTekst from "./contenido/prosjecna-placa";
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
    { definicion: brutoNetoKalkulator, contenido: brutoNetoKalkulatorTekst, cliente: () => import("./calculadoras/bruto-neto-kalkulator.cliente") },
    { definicion: netoBrutoKalkulator, contenido: netoBrutoKalkulatorTekst, cliente: () => import("./calculadoras/neto-bruto-kalkulator.cliente") },
    { definicion: trosakPoslodavca, contenido: trosakPoslodavcaTekst, cliente: () => import("./calculadoras/trosak-poslodavca.cliente") },
    { definicion: minimalnaPlaca, contenido: minimalnaPlacaTekst, cliente: () => import("./calculadoras/minimalna-placa.cliente") },
    { definicion: porezNaDohodak, contenido: porezNaDohodakTekst, cliente: () => import("./calculadoras/porez-na-dohodak.cliente") },
    { definicion: doprinosiNaPlacu, contenido: doprinosiNaPlacuTekst, cliente: () => import("./calculadoras/doprinosi-na-placu.cliente") },
    { definicion: pausalniObrt, contenido: pausalniObrtTekst, cliente: () => import("./calculadoras/pausalni-obrt.cliente") },
    { definicion: doprinosiZaObrtnike, contenido: doprinosiZaObrtnikeTekst, cliente: () => import("./calculadoras/doprinosi-za-obrtnike.cliente") },
    { definicion: pdvKalkulator, contenido: pdvKalkulatorTekst, cliente: () => import("./calculadoras/pdv-kalkulator.cliente") },
    { definicion: godisnjiOdmor, contenido: godisnjiOdmorTekst, cliente: () => import("./calculadoras/godisnji-odmor.cliente") },
    { definicion: regres, contenido: regresTekst, cliente: () => import("./calculadoras/regres.cliente") },
    { definicion: izracunOtpremnine, contenido: izracunOtpremnineTekst, cliente: () => import("./calculadoras/izracun-otpremnine.cliente") },
    { definicion: otkazniRok, contenido: otkazniRokTekst, cliente: () => import("./calculadoras/otkazni-rok.cliente") },
    { definicion: prekovremeniRad, contenido: prekovremeniRadTekst, cliente: () => import("./calculadoras/prekovremeni-rad.cliente") },
    { definicion: bolovanje, contenido: bolovanjeTekst, cliente: () => import("./calculadoras/bolovanje.cliente") },
    { definicion: rodiljnaNaknada, contenido: rodiljnaNaknadaTekst, cliente: () => import("./calculadoras/rodiljna-naknada.cliente") },
    { definicion: porezNaPrometNekretnina, contenido: porezNaPrometNekretninaTekst, cliente: () => import("./calculadoras/porez-na-promet-nekretnina.cliente") },
    { definicion: porezNaDobit, contenido: porezNaDobitTekst, cliente: () => import("./calculadoras/porez-na-dobit.cliente") },
    { definicion: kalkulatorInflacije, contenido: kalkulatorInflacijeTekst, cliente: () => import("./calculadoras/kalkulator-inflacije.cliente") },
    { definicion: tecajHnb, contenido: tecajHnbTekst, cliente: () => import("./calculadoras/tecaj-hnb.cliente") },
    { definicion: prosjecnaPlaca, contenido: prosjecnaPlacaTekst, cliente: () => import("./calculadoras/prosjecna-placa.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
