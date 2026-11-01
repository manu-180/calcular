import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkuliatorZarplaty from "./calculadoras/kalkuliator-zarplaty";
import contenidoKalkuliatorZarplaty from "./contenido/kalkuliator-zarplaty";
import zarplataNaRuky from "./calculadoras/zarplata-na-ruky";
import contenidoZarplataNaRuky from "./contenido/zarplata-na-ruky";
import vytratyRobotodavtsia from "./calculadoras/vytraty-robotodavtsia";
import contenidoVytratyRobotodavtsia from "./contenido/vytraty-robotodavtsia";
import minimalnaZarplata from "./calculadoras/minimalna-zarplata";
import contenidoMinimalnaZarplata from "./contenido/minimalna-zarplata";
import kalkuliatorFop from "./calculadoras/kalkuliator-fop";
import contenidoKalkuliatorFop from "./contenido/kalkuliator-fop";
import yesvDliaFop from "./calculadoras/yesv-dlia-fop";
import contenidoYesvDliaFop from "./contenido/yesv-dlia-fop";
import kalkuliatorPdv from "./calculadoras/kalkuliator-pdv";
import contenidoKalkuliatorPdv from "./contenido/kalkuliator-pdv";
import kalkuliatorPdfo from "./calculadoras/kalkuliator-pdfo";
import contenidoKalkuliatorPdfo from "./contenido/kalkuliator-pdfo";
import rozrakhunokVidpusknykh from "./calculadoras/rozrakhunok-vidpusknykh";
import contenidoRozrakhunokVidpusknykh from "./contenido/rozrakhunok-vidpusknykh";
import kompensatsiiaVidpustky from "./calculadoras/kompensatsiia-vidpustky";
import contenidoKompensatsiiaVidpustky from "./contenido/kompensatsiia-vidpustky";
import likarniani from "./calculadoras/likarniani";
import contenidoLikarniani from "./contenido/likarniani";
import dekretni from "./calculadoras/dekretni";
import contenidoDekretni from "./contenido/dekretni";
import ponadnormovi from "./calculadoras/ponadnormovi";
import contenidoPonadnormovi from "./contenido/ponadnormovi";
import vykhidnaDopomoha from "./calculadoras/vykhidna-dopomoha";
import contenidoVykhidnaDopomoha from "./contenido/vykhidna-dopomoha";
import podatokNaDepozyt from "./calculadoras/podatok-na-depozyt";
import contenidoPodatokNaDepozyt from "./contenido/podatok-na-depozyt";
import podatokZProdazhuNeruhomosti from "./calculadoras/podatok-z-prodazhu-neruhomosti";
import contenidoPodatokZProdazhuNeruhomosti from "./contenido/podatok-z-prodazhu-neruhomosti";
import podatokZProdazhuAvto from "./calculadoras/podatok-z-prodazhu-avto";
import contenidoPodatokZProdazhuAvto from "./contenido/podatok-z-prodazhu-avto";
import kursValiutNbu from "./calculadoras/kurs-valiut-nbu";
import contenidoKursValiutNbu from "./contenido/kurs-valiut-nbu";
import indeksInfliatsii from "./calculadoras/indeks-infliatsii";
import contenidoIndeksInfliatsii from "./contenido/indeks-infliatsii";
import tryVidsotkyRichnykh from "./calculadoras/try-vidsotky-richnykh";
import contenidoTryVidsotkyRichnykh from "./contenido/try-vidsotky-richnykh";
import kalkuliatorPeni from "./calculadoras/kalkuliator-peni";
import contenidoKalkuliatorPeni from "./contenido/kalkuliator-peni";
import kalkuliatorAlimentiv from "./calculadoras/kalkuliator-alimentiv";
import contenidoKalkuliatorAlimentiv from "./contenido/kalkuliator-alimentiv";
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
    { definicion: kalkuliatorZarplaty, contenido: contenidoKalkuliatorZarplaty, cliente: () => import("./calculadoras/kalkuliator-zarplaty.cliente") },
    { definicion: zarplataNaRuky, contenido: contenidoZarplataNaRuky, cliente: () => import("./calculadoras/zarplata-na-ruky.cliente") },
    { definicion: vytratyRobotodavtsia, contenido: contenidoVytratyRobotodavtsia, cliente: () => import("./calculadoras/vytraty-robotodavtsia.cliente") },
    { definicion: minimalnaZarplata, contenido: contenidoMinimalnaZarplata, cliente: () => import("./calculadoras/minimalna-zarplata.cliente") },
    { definicion: kalkuliatorFop, contenido: contenidoKalkuliatorFop, cliente: () => import("./calculadoras/kalkuliator-fop.cliente") },
    { definicion: yesvDliaFop, contenido: contenidoYesvDliaFop, cliente: () => import("./calculadoras/yesv-dlia-fop.cliente") },
    { definicion: kalkuliatorPdv, contenido: contenidoKalkuliatorPdv, cliente: () => import("./calculadoras/kalkuliator-pdv.cliente") },
    { definicion: kalkuliatorPdfo, contenido: contenidoKalkuliatorPdfo, cliente: () => import("./calculadoras/kalkuliator-pdfo.cliente") },
    { definicion: rozrakhunokVidpusknykh, contenido: contenidoRozrakhunokVidpusknykh, cliente: () => import("./calculadoras/rozrakhunok-vidpusknykh.cliente") },
    { definicion: kompensatsiiaVidpustky, contenido: contenidoKompensatsiiaVidpustky, cliente: () => import("./calculadoras/kompensatsiia-vidpustky.cliente") },
    { definicion: likarniani, contenido: contenidoLikarniani, cliente: () => import("./calculadoras/likarniani.cliente") },
    { definicion: dekretni, contenido: contenidoDekretni, cliente: () => import("./calculadoras/dekretni.cliente") },
    { definicion: ponadnormovi, contenido: contenidoPonadnormovi, cliente: () => import("./calculadoras/ponadnormovi.cliente") },
    { definicion: vykhidnaDopomoha, contenido: contenidoVykhidnaDopomoha, cliente: () => import("./calculadoras/vykhidna-dopomoha.cliente") },
    { definicion: podatokNaDepozyt, contenido: contenidoPodatokNaDepozyt, cliente: () => import("./calculadoras/podatok-na-depozyt.cliente") },
    { definicion: podatokZProdazhuNeruhomosti, contenido: contenidoPodatokZProdazhuNeruhomosti, cliente: () => import("./calculadoras/podatok-z-prodazhu-neruhomosti.cliente") },
    { definicion: podatokZProdazhuAvto, contenido: contenidoPodatokZProdazhuAvto, cliente: () => import("./calculadoras/podatok-z-prodazhu-avto.cliente") },
    { definicion: kursValiutNbu, contenido: contenidoKursValiutNbu, cliente: () => import("./calculadoras/kurs-valiut-nbu.cliente") },
    { definicion: indeksInfliatsii, contenido: contenidoIndeksInfliatsii, cliente: () => import("./calculadoras/indeks-infliatsii.cliente") },
    { definicion: tryVidsotkyRichnykh, contenido: contenidoTryVidsotkyRichnykh, cliente: () => import("./calculadoras/try-vidsotky-richnykh.cliente") },
    { definicion: kalkuliatorPeni, contenido: contenidoKalkuliatorPeni, cliente: () => import("./calculadoras/kalkuliator-peni.cliente") },
    { definicion: kalkuliatorAlimentiv, contenido: contenidoKalkuliatorAlimentiv, cliente: () => import("./calculadoras/kalkuliator-alimentiv.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
