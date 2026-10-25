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
  ],
  universales: "todas",
  novedades,
  detectores,
});
