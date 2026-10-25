import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import lonnEtterSkatt from "./calculadoras/lonn-etter-skatt";
import contenidoLonnEtterSkatt from "./contenido/lonn-etter-skatt";
import skattekalkulator from "./calculadoras/skattekalkulator";
import contenidoSkattekalkulator from "./contenido/skattekalkulator";
import trinnskatt from "./calculadoras/trinnskatt";
import contenidoTrinnskatt from "./contenido/trinnskatt";
import trygdeavgift from "./calculadoras/trygdeavgift";
import contenidoTrygdeavgift from "./contenido/trygdeavgift";
import feriepenger from "./calculadoras/feriepenger";
import contenidoFeriepenger from "./contenido/feriepenger";
import arbeidsgiveravgift from "./calculadoras/arbeidsgiveravgift";
import contenidoArbeidsgiveravgift from "./contenido/arbeidsgiveravgift";
import sykepenger from "./calculadoras/sykepenger";
import contenidoSykepenger from "./contenido/sykepenger";
import foreldrepenger from "./calculadoras/foreldrepenger";
import contenidoForeldrepenger from "./contenido/foreldrepenger";
import dagpenger from "./calculadoras/dagpenger";
import contenidoDagpenger from "./contenido/dagpenger";
import barnetrygd from "./calculadoras/barnetrygd";
import contenidoBarnetrygd from "./contenido/barnetrygd";
import kontantstotte from "./calculadoras/kontantstotte";
import contenidoKontantstotte from "./contenido/kontantstotte";
import oppsigelsestid from "./calculadoras/oppsigelsestid";
import contenidoOppsigelsestid from "./contenido/oppsigelsestid";
import overtidstillegg from "./calculadoras/overtidstillegg";
import contenidoOvertidstillegg from "./contenido/overtidstillegg";
import mvaKalkulator from "./calculadoras/mva-kalkulator";
import contenidoMvaKalkulator from "./contenido/mva-kalkulator";
import dokumentavgift from "./calculadoras/dokumentavgift";
import contenidoDokumentavgift from "./contenido/dokumentavgift";
import formuesskatt from "./calculadoras/formuesskatt";
import contenidoFormuesskatt from "./contenido/formuesskatt";
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
    { definicion: lonnEtterSkatt, contenido: contenidoLonnEtterSkatt, cliente: () => import("./calculadoras/lonn-etter-skatt.cliente") },
    { definicion: skattekalkulator, contenido: contenidoSkattekalkulator, cliente: () => import("./calculadoras/skattekalkulator.cliente") },
    { definicion: trinnskatt, contenido: contenidoTrinnskatt, cliente: () => import("./calculadoras/trinnskatt.cliente") },
    { definicion: trygdeavgift, contenido: contenidoTrygdeavgift, cliente: () => import("./calculadoras/trygdeavgift.cliente") },
    { definicion: feriepenger, contenido: contenidoFeriepenger, cliente: () => import("./calculadoras/feriepenger.cliente") },
    { definicion: arbeidsgiveravgift, contenido: contenidoArbeidsgiveravgift, cliente: () => import("./calculadoras/arbeidsgiveravgift.cliente") },
    { definicion: sykepenger, contenido: contenidoSykepenger, cliente: () => import("./calculadoras/sykepenger.cliente") },
    { definicion: foreldrepenger, contenido: contenidoForeldrepenger, cliente: () => import("./calculadoras/foreldrepenger.cliente") },
    { definicion: dagpenger, contenido: contenidoDagpenger, cliente: () => import("./calculadoras/dagpenger.cliente") },
    { definicion: barnetrygd, contenido: contenidoBarnetrygd, cliente: () => import("./calculadoras/barnetrygd.cliente") },
    { definicion: kontantstotte, contenido: contenidoKontantstotte, cliente: () => import("./calculadoras/kontantstotte.cliente") },
    { definicion: oppsigelsestid, contenido: contenidoOppsigelsestid, cliente: () => import("./calculadoras/oppsigelsestid.cliente") },
    { definicion: overtidstillegg, contenido: contenidoOvertidstillegg, cliente: () => import("./calculadoras/overtidstillegg.cliente") },
    { definicion: mvaKalkulator, contenido: contenidoMvaKalkulator, cliente: () => import("./calculadoras/mva-kalkulator.cliente") },
    { definicion: dokumentavgift, contenido: contenidoDokumentavgift, cliente: () => import("./calculadoras/dokumentavgift.cliente") },
    { definicion: formuesskatt, contenido: contenidoFormuesskatt, cliente: () => import("./calculadoras/formuesskatt.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
