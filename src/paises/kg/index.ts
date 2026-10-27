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
  ],
  universales: "todas",
  novedades,
  detectores,
});
