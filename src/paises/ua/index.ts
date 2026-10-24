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
  ],
  universales: "todas",
  novedades,
  detectores,
});
