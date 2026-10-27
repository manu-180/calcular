import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulyatorZarplaty from "./calculadoras/kalkulyator-zarplaty";
import contenidoKalkulyatorZarplaty from "./contenido/kalkulyator-zarplaty";
import zarplataNaRuki from "./calculadoras/zarplata-na-ruki";
import contenidoZarplataNaRuki from "./contenido/zarplata-na-ruki";
import podokhodnyyNalog from "./calculadoras/podokhodnyy-nalog";
import contenidoPodokhodnyyNalog from "./contenido/podokhodnyy-nalog";
import strakhovyeVznosy from "./calculadoras/strakhovye-vznosy";
import contenidoStrakhovyeVznosy from "./contenido/strakhovye-vznosy";
import nalogiRabotodatelya from "./calculadoras/nalogi-rabotodatelya";
import contenidoNalogiRabotodatelya from "./contenido/nalogi-rabotodatelya";
import minimalnayaZarplata from "./calculadoras/minimalnaya-zarplata";
import contenidoMinimalnayaZarplata from "./contenido/minimalnaya-zarplata";
import raschetnyyPokazatel from "./calculadoras/raschetnyy-pokazatel";
import contenidoRaschetnyyPokazatel from "./contenido/raschetnyy-pokazatel";
import kalkulyatorNds from "./calculadoras/kalkulyator-nds";
import contenidoKalkulyatorNds from "./contenido/kalkulyator-nds";
import nalogSProdazh from "./calculadoras/nalog-s-prodazh";
import contenidoNalogSProdazh from "./contenido/nalog-s-prodazh";
import edinyyNalog from "./calculadoras/edinyy-nalog";
import contenidoEdinyyNalog from "./contenido/edinyy-nalog";
import nalogNaPribyl from "./calculadoras/nalog-na-pribyl";
import contenidoNalogNaPribyl from "./contenido/nalog-na-pribyl";
import penyaPoNalogam from "./calculadoras/penya-po-nalogam";
import contenidoPenyaPoNalogam from "./contenido/penya-po-nalogam";
import otpusknye from "./calculadoras/otpusknye";
import contenidoOtpusknye from "./contenido/otpusknye";
import kompensatsiyaZaOtpusk from "./calculadoras/kompensatsiya-za-otpusk";
import contenidoKompensatsiyaZaOtpusk from "./contenido/kompensatsiya-za-otpusk";
import sverkhurochnye from "./calculadoras/sverkhurochnye";
import contenidoSverkhurochnye from "./contenido/sverkhurochnye";
import vykhodnoePosobie from "./calculadoras/vykhodnoe-posobie";
import contenidoVykhodnoePosobie from "./contenido/vykhodnoe-posobie";
import zaderzhkaZarplaty from "./calculadoras/zaderzhka-zarplaty";
import contenidoZaderzhkaZarplaty from "./contenido/zaderzhka-zarplaty";
import bolnichnye from "./calculadoras/bolnichnye";
import contenidoBolnichnye from "./contenido/bolnichnye";
import dekretnye from "./calculadoras/dekretnye";
import contenidoDekretnye from "./contenido/dekretnye";
import kursValyut from "./calculadoras/kurs-valyut";
import contenidoKursValyut from "./contenido/kurs-valyut";
import kalkulyatorInflyatsii from "./calculadoras/kalkulyator-inflyatsii";
import contenidoKalkulyatorInflyatsii from "./contenido/kalkulyator-inflyatsii";
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
    { definicion: kalkulyatorZarplaty, contenido: contenidoKalkulyatorZarplaty, cliente: () => import("./calculadoras/kalkulyator-zarplaty.cliente") },
    { definicion: zarplataNaRuki, contenido: contenidoZarplataNaRuki, cliente: () => import("./calculadoras/zarplata-na-ruki.cliente") },
    { definicion: podokhodnyyNalog, contenido: contenidoPodokhodnyyNalog, cliente: () => import("./calculadoras/podokhodnyy-nalog.cliente") },
    { definicion: strakhovyeVznosy, contenido: contenidoStrakhovyeVznosy, cliente: () => import("./calculadoras/strakhovye-vznosy.cliente") },
    { definicion: nalogiRabotodatelya, contenido: contenidoNalogiRabotodatelya, cliente: () => import("./calculadoras/nalogi-rabotodatelya.cliente") },
    { definicion: minimalnayaZarplata, contenido: contenidoMinimalnayaZarplata, cliente: () => import("./calculadoras/minimalnaya-zarplata.cliente") },
    { definicion: raschetnyyPokazatel, contenido: contenidoRaschetnyyPokazatel, cliente: () => import("./calculadoras/raschetnyy-pokazatel.cliente") },
    { definicion: kalkulyatorNds, contenido: contenidoKalkulyatorNds, cliente: () => import("./calculadoras/kalkulyator-nds.cliente") },
    { definicion: nalogSProdazh, contenido: contenidoNalogSProdazh, cliente: () => import("./calculadoras/nalog-s-prodazh.cliente") },
    { definicion: edinyyNalog, contenido: contenidoEdinyyNalog, cliente: () => import("./calculadoras/edinyy-nalog.cliente") },
    { definicion: nalogNaPribyl, contenido: contenidoNalogNaPribyl, cliente: () => import("./calculadoras/nalog-na-pribyl.cliente") },
    { definicion: penyaPoNalogam, contenido: contenidoPenyaPoNalogam, cliente: () => import("./calculadoras/penya-po-nalogam.cliente") },
    { definicion: otpusknye, contenido: contenidoOtpusknye, cliente: () => import("./calculadoras/otpusknye.cliente") },
    { definicion: kompensatsiyaZaOtpusk, contenido: contenidoKompensatsiyaZaOtpusk, cliente: () => import("./calculadoras/kompensatsiya-za-otpusk.cliente") },
    { definicion: sverkhurochnye, contenido: contenidoSverkhurochnye, cliente: () => import("./calculadoras/sverkhurochnye.cliente") },
    { definicion: vykhodnoePosobie, contenido: contenidoVykhodnoePosobie, cliente: () => import("./calculadoras/vykhodnoe-posobie.cliente") },
    { definicion: zaderzhkaZarplaty, contenido: contenidoZaderzhkaZarplaty, cliente: () => import("./calculadoras/zaderzhka-zarplaty.cliente") },
    { definicion: bolnichnye, contenido: contenidoBolnichnye, cliente: () => import("./calculadoras/bolnichnye.cliente") },
    { definicion: dekretnye, contenido: contenidoDekretnye, cliente: () => import("./calculadoras/dekretnye.cliente") },
    { definicion: kursValyut, contenido: contenidoKursValyut, cliente: () => import("./calculadoras/kurs-valyut.cliente") },
    { definicion: kalkulyatorInflyatsii, contenido: contenidoKalkulyatorInflyatsii, cliente: () => import("./calculadoras/kalkulyator-inflyatsii.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
