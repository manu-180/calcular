import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import loenEfterSkat from "./calculadoras/loen-efter-skat";
import contenidoLoenEfterSkat from "./contenido/loen-efter-skat";
import topskat from "./calculadoras/topskat";
import contenidoTopskat from "./contenido/topskat";
import amBidrag from "./calculadoras/am-bidrag";
import contenidoAmBidrag from "./contenido/am-bidrag";
import kommuneskat from "./calculadoras/kommuneskat";
import contenidoKommuneskat from "./contenido/kommuneskat";
import feriepenge from "./calculadoras/feriepenge";
import contenidoFeriepenge from "./contenido/feriepenge";
import fratraedelsesgodtgoerelse from "./calculadoras/fratraedelsesgodtgoerelse";
import contenidoFratraedelsesgodtgoerelse from "./contenido/fratraedelsesgodtgoerelse";
import opsigelsesvarsel from "./calculadoras/opsigelsesvarsel";
import contenidoOpsigelsesvarsel from "./contenido/opsigelsesvarsel";
import momsberegner from "./calculadoras/momsberegner";
import contenidoMomsberegner from "./contenido/momsberegner";
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
    { definicion: loenEfterSkat, contenido: contenidoLoenEfterSkat, cliente: () => import("./calculadoras/loen-efter-skat.cliente") },
    { definicion: topskat, contenido: contenidoTopskat, cliente: () => import("./calculadoras/topskat.cliente") },
    { definicion: amBidrag, contenido: contenidoAmBidrag, cliente: () => import("./calculadoras/am-bidrag.cliente") },
    { definicion: kommuneskat, contenido: contenidoKommuneskat, cliente: () => import("./calculadoras/kommuneskat.cliente") },
    { definicion: feriepenge, contenido: contenidoFeriepenge, cliente: () => import("./calculadoras/feriepenge.cliente") },
    { definicion: fratraedelsesgodtgoerelse, contenido: contenidoFratraedelsesgodtgoerelse, cliente: () => import("./calculadoras/fratraedelsesgodtgoerelse.cliente") },
    { definicion: opsigelsesvarsel, contenido: contenidoOpsigelsesvarsel, cliente: () => import("./calculadoras/opsigelsesvarsel.cliente") },
    { definicion: momsberegner, contenido: contenidoMomsberegner, cliente: () => import("./calculadoras/momsberegner.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
