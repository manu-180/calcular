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
  ],
  universales: "todas",
  novedades,
  detectores,
});
