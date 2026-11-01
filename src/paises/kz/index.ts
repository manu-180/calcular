import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulyatorZarplaty from "./calculadoras/kalkulyator-zarplaty";
import contenidoKalkulyatorZarplaty from "./contenido/kalkulyator-zarplaty";
import zarplataNaRuki from "./calculadoras/zarplata-na-ruki";
import contenidoZarplataNaRuki from "./contenido/zarplata-na-ruki";
import nalogiRabotodatelya from "./calculadoras/nalogi-rabotodatelya";
import contenidoNalogiRabotodatelya from "./contenido/nalogi-rabotodatelya";
import kalkulyatorIpn from "./calculadoras/kalkulyator-ipn";
import contenidoKalkulyatorIpn from "./contenido/kalkulyator-ipn";
import mrpVTenge from "./calculadoras/mrp-v-tenge";
import contenidoMrpVTenge from "./contenido/mrp-v-tenge";
import minimalnayaZarplata from "./calculadoras/minimalnaya-zarplata";
import contenidoMinimalnayaZarplata from "./contenido/minimalnaya-zarplata";
import kalkulyatorNds from "./calculadoras/kalkulyator-nds";
import contenidoKalkulyatorNds from "./contenido/kalkulyator-nds";
import uproshchennayaDeklaratsiya from "./calculadoras/uproshchennaya-deklaratsiya";
import contenidoUproshchennayaDeklaratsiya from "./contenido/uproshchennaya-deklaratsiya";
import vznosyIpZaSebya from "./calculadoras/vznosy-ip-za-sebya";
import contenidoVznosyIpZaSebya from "./contenido/vznosy-ip-za-sebya";
import otpusknye from "./calculadoras/otpusknye";
import contenidoOtpusknye from "./contenido/otpusknye";
import raschetPriUvolnenii from "./calculadoras/raschet-pri-uvolnenii";
import contenidoRaschetPriUvolnenii from "./contenido/raschet-pri-uvolnenii";
import sverkhurochnye from "./calculadoras/sverkhurochnye";
import contenidoSverkhurochnye from "./contenido/sverkhurochnye";
import bolnichnye from "./calculadoras/bolnichnye";
import contenidoBolnichnye from "./contenido/bolnichnye";
import dekretnye from "./calculadoras/dekretnye";
import contenidoDekretnye from "./contenido/dekretnye";
import posobiePoUkhoduZaRebenkom from "./calculadoras/posobie-po-ukhodu-za-rebenkom";
import contenidoPosobiePoUkhoduZaRebenkom from "./contenido/posobie-po-ukhodu-za-rebenkom";
import posobieNaRozhdenie from "./calculadoras/posobie-na-rozhdenie";
import contenidoPosobieNaRozhdenie from "./contenido/posobie-na-rozhdenie";
import nalogNaImushchestvo from "./calculadoras/nalog-na-imushchestvo";
import contenidoNalogNaImushchestvo from "./contenido/nalog-na-imushchestvo";
import transportnyyNalog from "./calculadoras/transportnyy-nalog";
import contenidoTransportnyyNalog from "./contenido/transportnyy-nalog";
import kursValyut from "./calculadoras/kurs-valyut";
import contenidoKursValyut from "./contenido/kurs-valyut";
import kalkulyatorInflyatsii from "./calculadoras/kalkulyator-inflyatsii";
import contenidoKalkulyatorInflyatsii from "./contenido/kalkulyator-inflyatsii";
import pensionnyeNakopleniya from "./calculadoras/pensionnye-nakopleniya";
import contenidoPensionnyeNakopleniya from "./contenido/pensionnye-nakopleniya";
import kalkulyatorDepozita from "./calculadoras/kalkulyator-depozita";
import contenidoKalkulyatorDepozita from "./contenido/kalkulyator-depozita";
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
    { definicion: nalogiRabotodatelya, contenido: contenidoNalogiRabotodatelya, cliente: () => import("./calculadoras/nalogi-rabotodatelya.cliente") },
    { definicion: kalkulyatorIpn, contenido: contenidoKalkulyatorIpn, cliente: () => import("./calculadoras/kalkulyator-ipn.cliente") },
    { definicion: mrpVTenge, contenido: contenidoMrpVTenge, cliente: () => import("./calculadoras/mrp-v-tenge.cliente") },
    { definicion: minimalnayaZarplata, contenido: contenidoMinimalnayaZarplata, cliente: () => import("./calculadoras/minimalnaya-zarplata.cliente") },
    { definicion: kalkulyatorNds, contenido: contenidoKalkulyatorNds, cliente: () => import("./calculadoras/kalkulyator-nds.cliente") },
    { definicion: uproshchennayaDeklaratsiya, contenido: contenidoUproshchennayaDeklaratsiya, cliente: () => import("./calculadoras/uproshchennaya-deklaratsiya.cliente") },
    { definicion: vznosyIpZaSebya, contenido: contenidoVznosyIpZaSebya, cliente: () => import("./calculadoras/vznosy-ip-za-sebya.cliente") },
    { definicion: otpusknye, contenido: contenidoOtpusknye, cliente: () => import("./calculadoras/otpusknye.cliente") },
    { definicion: raschetPriUvolnenii, contenido: contenidoRaschetPriUvolnenii, cliente: () => import("./calculadoras/raschet-pri-uvolnenii.cliente") },
    { definicion: sverkhurochnye, contenido: contenidoSverkhurochnye, cliente: () => import("./calculadoras/sverkhurochnye.cliente") },
    { definicion: bolnichnye, contenido: contenidoBolnichnye, cliente: () => import("./calculadoras/bolnichnye.cliente") },
    { definicion: dekretnye, contenido: contenidoDekretnye, cliente: () => import("./calculadoras/dekretnye.cliente") },
    { definicion: posobiePoUkhoduZaRebenkom, contenido: contenidoPosobiePoUkhoduZaRebenkom, cliente: () => import("./calculadoras/posobie-po-ukhodu-za-rebenkom.cliente") },
    { definicion: posobieNaRozhdenie, contenido: contenidoPosobieNaRozhdenie, cliente: () => import("./calculadoras/posobie-na-rozhdenie.cliente") },
    { definicion: nalogNaImushchestvo, contenido: contenidoNalogNaImushchestvo, cliente: () => import("./calculadoras/nalog-na-imushchestvo.cliente") },
    { definicion: transportnyyNalog, contenido: contenidoTransportnyyNalog, cliente: () => import("./calculadoras/transportnyy-nalog.cliente") },
    { definicion: kursValyut, contenido: contenidoKursValyut, cliente: () => import("./calculadoras/kurs-valyut.cliente") },
    { definicion: kalkulyatorInflyatsii, contenido: contenidoKalkulyatorInflyatsii, cliente: () => import("./calculadoras/kalkulyator-inflyatsii.cliente") },
    { definicion: pensionnyeNakopleniya, contenido: contenidoPensionnyeNakopleniya, cliente: () => import("./calculadoras/pensionnye-nakopleniya.cliente") },
    { definicion: kalkulyatorDepozita, contenido: contenidoKalkulyatorDepozita, cliente: () => import("./calculadoras/kalkulyator-depozita.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
