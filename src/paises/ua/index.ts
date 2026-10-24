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
  ],
  universales: "todas",
  novedades,
  detectores,
});
