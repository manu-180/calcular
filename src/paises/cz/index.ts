import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import vypocetCisteMzdy from "./calculadoras/vypocet-ciste-mzdy";
import contenidoVypocetCisteMzdy from "./contenido/vypocet-ciste-mzdy";
import nakladyZamestnavatele from "./calculadoras/naklady-zamestnavatele";
import contenidoNakladyZamestnavatele from "./contenido/naklady-zamestnavatele";
import minimalniMzda from "./calculadoras/minimalni-mzda";
import contenidoMinimalniMzda from "./contenido/minimalni-mzda";
import kalkulackaDph from "./calculadoras/kalkulacka-dph";
import contenidoKalkulackaDph from "./contenido/kalkulacka-dph";
import pausalniDan from "./calculadoras/pausalni-dan";
import contenidoPausalniDan from "./contenido/pausalni-dan";
import pausalniVydaje from "./calculadoras/pausalni-vydaje";
import contenidoPausalniVydaje from "./contenido/pausalni-vydaje";
import zalohyOsvc from "./calculadoras/zalohy-osvc";
import contenidoZalohyOsvc from "./contenido/zalohy-osvc";
import dohodaOProvedeniPrace from "./calculadoras/dohoda-o-provedeni-prace";
import contenidoDohodaOProvedeniPrace from "./contenido/dohoda-o-provedeni-prace";
import kalkulackaNemocenske from "./calculadoras/kalkulacka-nemocenske";
import contenidoKalkulackaNemocenske from "./contenido/kalkulacka-nemocenske";
import kalkulackaMaterske from "./calculadoras/kalkulacka-materske";
import contenidoKalkulackaMaterske from "./contenido/kalkulacka-materske";
import rodicovskyPrispevek from "./calculadoras/rodicovsky-prispevek";
import contenidoRodicovskyPrispevek from "./contenido/rodicovsky-prispevek";
import prumernyVydelek from "./calculadoras/prumerny-vydelek";
import contenidoPrumernyVydelek from "./contenido/prumerny-vydelek";
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
    { definicion: vypocetCisteMzdy, contenido: contenidoVypocetCisteMzdy, cliente: () => import("./calculadoras/vypocet-ciste-mzdy.cliente") },
    { definicion: nakladyZamestnavatele, contenido: contenidoNakladyZamestnavatele, cliente: () => import("./calculadoras/naklady-zamestnavatele.cliente") },
    { definicion: minimalniMzda, contenido: contenidoMinimalniMzda, cliente: () => import("./calculadoras/minimalni-mzda.cliente") },
    { definicion: kalkulackaDph, contenido: contenidoKalkulackaDph, cliente: () => import("./calculadoras/kalkulacka-dph.cliente") },
    { definicion: pausalniDan, contenido: contenidoPausalniDan, cliente: () => import("./calculadoras/pausalni-dan.cliente") },
    { definicion: pausalniVydaje, contenido: contenidoPausalniVydaje, cliente: () => import("./calculadoras/pausalni-vydaje.cliente") },
    { definicion: zalohyOsvc, contenido: contenidoZalohyOsvc, cliente: () => import("./calculadoras/zalohy-osvc.cliente") },
    { definicion: dohodaOProvedeniPrace, contenido: contenidoDohodaOProvedeniPrace, cliente: () => import("./calculadoras/dohoda-o-provedeni-prace.cliente") },
    { definicion: kalkulackaNemocenske, contenido: contenidoKalkulackaNemocenske, cliente: () => import("./calculadoras/kalkulacka-nemocenske.cliente") },
    { definicion: kalkulackaMaterske, contenido: contenidoKalkulackaMaterske, cliente: () => import("./calculadoras/kalkulacka-materske.cliente") },
    { definicion: rodicovskyPrispevek, contenido: contenidoRodicovskyPrispevek, cliente: () => import("./calculadoras/rodicovsky-prispevek.cliente") },
    { definicion: prumernyVydelek, contenido: contenidoPrumernyVydelek, cliente: () => import("./calculadoras/prumerny-vydelek.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
