import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import kalkulatorPage from "./calculadoras/kalkulator-page";
import contenidoKalkulatorPage from "./contenido/kalkulator-page";
import pagaBrutoNgaNeto from "./calculadoras/paga-bruto-nga-neto";
import contenidoPagaBrutoNgaNeto from "./contenido/paga-bruto-nga-neto";
import kostoEPunedhenesit from "./calculadoras/kosto-e-punedhenesit";
import contenidoKostoEPunedhenesit from "./contenido/kosto-e-punedhenesit";
import pagaMinimale from "./calculadoras/paga-minimale";
import contenidoPagaMinimale from "./contenido/paga-minimale";
import kontributetESigurimeve from "./calculadoras/kontributet-e-sigurimeve";
import contenidoKontributetESigurimeve from "./contenido/kontributet-e-sigurimeve";
import tatimiMbiPagen from "./calculadoras/tatimi-mbi-pagen";
import contenidoTatimiMbiPagen from "./contenido/tatimi-mbi-pagen";
import kalkulatorTvsh from "./calculadoras/kalkulator-tvsh";
import contenidoKalkulatorTvsh from "./contenido/kalkulator-tvsh";
import tatimiMbiFitimin from "./calculadoras/tatimi-mbi-fitimin";
import contenidoTatimiMbiFitimin from "./contenido/tatimi-mbi-fitimin";
import biznesiIVogel from "./calculadoras/biznesi-i-vogel";
import contenidoBiznesiIVogel from "./contenido/biznesi-i-vogel";
import tatimiPerProfesionistet from "./calculadoras/tatimi-per-profesionistet";
import contenidoTatimiPerProfesionistet from "./contenido/tatimi-per-profesionistet";
import tatimiMbiDividendin from "./calculadoras/tatimi-mbi-dividendin";
import contenidoTatimiMbiDividendin from "./contenido/tatimi-mbi-dividendin";
import tatimiMbiQirane from "./calculadoras/tatimi-mbi-qirane";
import contenidoTatimiMbiQirane from "./contenido/tatimi-mbi-qirane";
import taksaENdertesave from "./calculadoras/taksa-e-ndertesave";
import contenidoTaksaENdertesave from "./contenido/taksa-e-ndertesave";
import tatimiShitjaEProness from "./calculadoras/tatimi-shitja-e-prones";
import contenidoTatimiShitjaEProness from "./contenido/tatimi-shitja-e-prones";
import tatimiDhurataTrashegimi from "./calculadoras/tatimi-dhurata-trashegimi";
import contenidoTatimiDhurataTrashegimi from "./contenido/tatimi-dhurata-trashegimi";
import pagesaESemundjes from "./calculadoras/pagesa-e-semundjes";
import contenidoPagesaESemundjes from "./contenido/pagesa-e-semundjes";
import pagesaEBarnise from "./calculadoras/pagesa-e-barnise";
import contenidoPagesaEBarnise from "./contenido/pagesa-e-barnise";
import kursiIKembimit from "./calculadoras/kursi-i-kembimit";
import contenidoKursiIKembimit from "./contenido/kursi-i-kembimit";
import kalkulatorInflacioni from "./calculadoras/kalkulator-inflacioni";
import contenidoKalkulatorInflacioni from "./contenido/kalkulator-inflacioni";
import lejaVjetore from "./calculadoras/leja-vjetore";
import contenidoLejaVjetore from "./contenido/leja-vjetore";
import oretShtese from "./calculadoras/oret-shtese";
import contenidoOretShtese from "./contenido/oret-shtese";
import afatiINjoftimit from "./calculadoras/afati-i-njoftimit";
import contenidoAfatiINjoftimit from "./contenido/afati-i-njoftimit";
import shperblimiPerVjetersi from "./calculadoras/shperblimi-per-vjetersi";
import contenidoShperblimiPerVjetersi from "./contenido/shperblimi-per-vjetersi";
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
    { definicion: kalkulatorPage, contenido: contenidoKalkulatorPage, cliente: () => import("./calculadoras/kalkulator-page.cliente") },
    { definicion: pagaBrutoNgaNeto, contenido: contenidoPagaBrutoNgaNeto, cliente: () => import("./calculadoras/paga-bruto-nga-neto.cliente") },
    { definicion: kostoEPunedhenesit, contenido: contenidoKostoEPunedhenesit, cliente: () => import("./calculadoras/kosto-e-punedhenesit.cliente") },
    { definicion: pagaMinimale, contenido: contenidoPagaMinimale, cliente: () => import("./calculadoras/paga-minimale.cliente") },
    { definicion: kontributetESigurimeve, contenido: contenidoKontributetESigurimeve, cliente: () => import("./calculadoras/kontributet-e-sigurimeve.cliente") },
    { definicion: tatimiMbiPagen, contenido: contenidoTatimiMbiPagen, cliente: () => import("./calculadoras/tatimi-mbi-pagen.cliente") },
    { definicion: kalkulatorTvsh, contenido: contenidoKalkulatorTvsh, cliente: () => import("./calculadoras/kalkulator-tvsh.cliente") },
    { definicion: tatimiMbiFitimin, contenido: contenidoTatimiMbiFitimin, cliente: () => import("./calculadoras/tatimi-mbi-fitimin.cliente") },
    { definicion: biznesiIVogel, contenido: contenidoBiznesiIVogel, cliente: () => import("./calculadoras/biznesi-i-vogel.cliente") },
    { definicion: tatimiPerProfesionistet, contenido: contenidoTatimiPerProfesionistet, cliente: () => import("./calculadoras/tatimi-per-profesionistet.cliente") },
    { definicion: tatimiMbiDividendin, contenido: contenidoTatimiMbiDividendin, cliente: () => import("./calculadoras/tatimi-mbi-dividendin.cliente") },
    { definicion: tatimiMbiQirane, contenido: contenidoTatimiMbiQirane, cliente: () => import("./calculadoras/tatimi-mbi-qirane.cliente") },
    { definicion: taksaENdertesave, contenido: contenidoTaksaENdertesave, cliente: () => import("./calculadoras/taksa-e-ndertesave.cliente") },
    { definicion: tatimiShitjaEProness, contenido: contenidoTatimiShitjaEProness, cliente: () => import("./calculadoras/tatimi-shitja-e-prones.cliente") },
    { definicion: tatimiDhurataTrashegimi, contenido: contenidoTatimiDhurataTrashegimi, cliente: () => import("./calculadoras/tatimi-dhurata-trashegimi.cliente") },
    { definicion: pagesaESemundjes, contenido: contenidoPagesaESemundjes, cliente: () => import("./calculadoras/pagesa-e-semundjes.cliente") },
    { definicion: pagesaEBarnise, contenido: contenidoPagesaEBarnise, cliente: () => import("./calculadoras/pagesa-e-barnise.cliente") },
    { definicion: kursiIKembimit, contenido: contenidoKursiIKembimit, cliente: () => import("./calculadoras/kursi-i-kembimit.cliente") },
    { definicion: kalkulatorInflacioni, contenido: contenidoKalkulatorInflacioni, cliente: () => import("./calculadoras/kalkulator-inflacioni.cliente") },
    { definicion: lejaVjetore, contenido: contenidoLejaVjetore, cliente: () => import("./calculadoras/leja-vjetore.cliente") },
    { definicion: oretShtese, contenido: contenidoOretShtese, cliente: () => import("./calculadoras/oret-shtese.cliente") },
    { definicion: afatiINjoftimit, contenido: contenidoAfatiINjoftimit, cliente: () => import("./calculadoras/afati-i-njoftimit.cliente") },
    { definicion: shperblimiPerVjetersi, contenido: contenidoShperblimiPerVjetersi, cliente: () => import("./calculadoras/shperblimi-per-vjetersi.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
