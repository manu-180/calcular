import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorWynagrodzen from "./calculadoras/kalkulator-wynagrodzen";
import contenidoKalkulatorWynagrodzen from "./contenido/kalkulator-wynagrodzen";
import umowaZlecenie from "./calculadoras/umowa-zlecenie";
import contenidoUmowaZlecenie from "./contenido/umowa-zlecenie";
import umowaODzielo from "./calculadoras/umowa-o-dzielo";
import contenidoUmowaODzielo from "./contenido/umowa-o-dzielo";
import kosztPracodawcy from "./calculadoras/koszt-pracodawcy";
import contenidoKosztPracodawcy from "./contenido/koszt-pracodawcy";
import kalkulatorVat from "./calculadoras/kalkulator-vat";
import contenidoKalkulatorVat from "./contenido/kalkulator-vat";
import placaMinimalna from "./calculadoras/placa-minimalna";
import contenidoPlacaMinimalna from "./contenido/placa-minimalna";
import kalkulatorPit from "./calculadoras/kalkulator-pit";
import contenidoKalkulatorPit from "./contenido/kalkulator-pit";
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
    { definicion: kalkulatorWynagrodzen, contenido: contenidoKalkulatorWynagrodzen, cliente: () => import("./calculadoras/kalkulator-wynagrodzen.cliente") },
    { definicion: umowaZlecenie, contenido: contenidoUmowaZlecenie, cliente: () => import("./calculadoras/umowa-zlecenie.cliente") },
    { definicion: umowaODzielo, contenido: contenidoUmowaODzielo, cliente: () => import("./calculadoras/umowa-o-dzielo.cliente") },
    { definicion: kosztPracodawcy, contenido: contenidoKosztPracodawcy, cliente: () => import("./calculadoras/koszt-pracodawcy.cliente") },
    { definicion: kalkulatorVat, contenido: contenidoKalkulatorVat, cliente: () => import("./calculadoras/kalkulator-vat.cliente") },
    { definicion: placaMinimalna, contenido: contenidoPlacaMinimalna, cliente: () => import("./calculadoras/placa-minimalna.cliente") },
    { definicion: kalkulatorPit, contenido: contenidoKalkulatorPit, cliente: () => import("./calculadoras/kalkulator-pit.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
