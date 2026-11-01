import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulyatorZarplaty from "./calculadoras/kalkulyator-zarplaty";
import contenidoKalkulyatorZarplaty from "./contenido/kalkulyator-zarplaty";
import podokhodnyyNalog from "./calculadoras/podokhodnyy-nalog";
import contenidoPodokhodnyyNalog from "./contenido/podokhodnyy-nalog";
import sotsialnyyNalog from "./calculadoras/sotsialnyy-nalog";
import contenidoSotsialnyyNalog from "./contenido/sotsialnyy-nalog";
import nalogiRabotodatelya from "./calculadoras/nalogi-rabotodatelya";
import contenidoNalogiRabotodatelya from "./contenido/nalogi-rabotodatelya";
import kalkulyatorNds from "./calculadoras/kalkulyator-nds";
import contenidoKalkulyatorNds from "./contenido/kalkulyator-nds";
import minimalnayaZarplata from "./calculadoras/minimalnaya-zarplata";
import contenidoMinimalnayaZarplata from "./contenido/minimalnaya-zarplata";
import otpusknye from "./calculadoras/otpusknye";
import contenidoOtpusknye from "./contenido/otpusknye";
import sverkhurochnye from "./calculadoras/sverkhurochnye";
import contenidoSverkhurochnye from "./contenido/sverkhurochnye";
import vykhodnoePosobie from "./calculadoras/vykhodnoe-posobie";
import contenidoVykhodnoePosobie from "./contenido/vykhodnoe-posobie";
import srokPreduprezhdeniya from "./calculadoras/srok-preduprezhdeniya";
import contenidoSrokPreduprezhdeniya from "./contenido/srok-preduprezhdeniya";
import kursValyut from "./calculadoras/kurs-valyut";
import contenidoKursValyut from "./contenido/kurs-valyut";
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
    { definicion: podokhodnyyNalog, contenido: contenidoPodokhodnyyNalog, cliente: () => import("./calculadoras/podokhodnyy-nalog.cliente") },
    { definicion: sotsialnyyNalog, contenido: contenidoSotsialnyyNalog, cliente: () => import("./calculadoras/sotsialnyy-nalog.cliente") },
    { definicion: nalogiRabotodatelya, contenido: contenidoNalogiRabotodatelya, cliente: () => import("./calculadoras/nalogi-rabotodatelya.cliente") },
    { definicion: kalkulyatorNds, contenido: contenidoKalkulyatorNds, cliente: () => import("./calculadoras/kalkulyator-nds.cliente") },
    { definicion: minimalnayaZarplata, contenido: contenidoMinimalnayaZarplata, cliente: () => import("./calculadoras/minimalnaya-zarplata.cliente") },
    { definicion: otpusknye, contenido: contenidoOtpusknye, cliente: () => import("./calculadoras/otpusknye.cliente") },
    { definicion: sverkhurochnye, contenido: contenidoSverkhurochnye, cliente: () => import("./calculadoras/sverkhurochnye.cliente") },
    { definicion: vykhodnoePosobie, contenido: contenidoVykhodnoePosobie, cliente: () => import("./calculadoras/vykhodnoe-posobie.cliente") },
    { definicion: srokPreduprezhdeniya, contenido: contenidoSrokPreduprezhdeniya, cliente: () => import("./calculadoras/srok-preduprezhdeniya.cliente") },
    { definicion: kursValyut, contenido: contenidoKursValyut, cliente: () => import("./calculadoras/kurs-valyut.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
