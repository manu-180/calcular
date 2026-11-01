import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import vypocetCistejMzdy from "./calculadoras/vypocet-cistej-mzdy";
import cVypocetCistejMzdy from "./contenido/vypocet-cistej-mzdy";
import hrubaMzdaZCistej from "./calculadoras/hruba-mzda-z-cistej";
import cHrubaMzdaZCistej from "./contenido/hruba-mzda-z-cistej";
import celkovaCenaPrace from "./calculadoras/celkova-cena-prace";
import cCelkovaCenaPrace from "./contenido/celkova-cena-prace";
import minimalnaMzda from "./calculadoras/minimalna-mzda";
import cMinimalnaMzda from "./contenido/minimalna-mzda";
import odvodySzco from "./calculadoras/odvody-szco";
import cOdvodySzco from "./contenido/odvody-szco";
import pausalneVydavky from "./calculadoras/pausalne-vydavky";
import cPausalneVydavky from "./contenido/pausalne-vydavky";
import danZPrijmov from "./calculadoras/dan-z-prijmov";
import cDanZPrijmov from "./contenido/dan-z-prijmov";
import kalkulackaDph from "./calculadoras/kalkulacka-dph";
import cKalkulackaDph from "./contenido/kalkulacka-dph";
import vypocetDovolenky from "./calculadoras/vypocet-dovolenky";
import cVypocetDovolenky from "./contenido/vypocet-dovolenky";
import nahradaMzdy from "./calculadoras/nahrada-mzdy";
import cNahradaMzdy from "./contenido/nahrada-mzdy";
import kalkulackaPn from "./calculadoras/kalkulacka-pn";
import cKalkulackaPn from "./contenido/kalkulacka-pn";
import kalkulackaMaterske from "./calculadoras/kalkulacka-materske";
import cKalkulackaMaterske from "./contenido/kalkulacka-materske";
import tehotenske from "./calculadoras/tehotenske";
import cTehotenske from "./contenido/tehotenske";
import osetrovne from "./calculadoras/osetrovne";
import cOsetrovne from "./contenido/osetrovne";
import rodicovskyPrispevok from "./calculadoras/rodicovsky-prispevok";
import cRodicovskyPrispevok from "./contenido/rodicovsky-prispevok";
import odstupne from "./calculadoras/odstupne";
import cOdstupne from "./contenido/odstupne";
import odchodne from "./calculadoras/odchodne";
import cOdchodne from "./contenido/odchodne";
import vypovednaDoba from "./calculadoras/vypovedna-doba";
import cVypovednaDoba from "./contenido/vypovedna-doba";
import mzdaZaNadcas from "./calculadoras/mzda-za-nadcas";
import cMzdaZaNadcas from "./contenido/mzda-za-nadcas";
import priplatkyZaPracu from "./calculadoras/priplatky-za-pracu";
import cPriplatkyZaPracu from "./contenido/priplatky-za-pracu";
import n13Plat from "./calculadoras/13-plat";
import cN13Plat from "./contenido/13-plat";
import danovyBonus from "./calculadoras/danovy-bonus";
import cDanovyBonus from "./contenido/danovy-bonus";
import kalkulackaDochodku from "./calculadoras/kalkulacka-dochodku";
import cKalkulackaDochodku from "./contenido/kalkulacka-dochodku";
import kurzovaKalkulacka from "./calculadoras/kurzova-kalkulacka";
import cKurzovaKalkulacka from "./contenido/kurzova-kalkulacka";
import inflacnaKalkulacka from "./calculadoras/inflacna-kalkulacka";
import cInflacnaKalkulacka from "./contenido/inflacna-kalkulacka";
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
    { definicion: vypocetCistejMzdy, contenido: cVypocetCistejMzdy, cliente: () => import("./calculadoras/vypocet-cistej-mzdy.cliente") },
    { definicion: hrubaMzdaZCistej, contenido: cHrubaMzdaZCistej, cliente: () => import("./calculadoras/hruba-mzda-z-cistej.cliente") },
    { definicion: celkovaCenaPrace, contenido: cCelkovaCenaPrace, cliente: () => import("./calculadoras/celkova-cena-prace.cliente") },
    { definicion: minimalnaMzda, contenido: cMinimalnaMzda, cliente: () => import("./calculadoras/minimalna-mzda.cliente") },
    { definicion: odvodySzco, contenido: cOdvodySzco, cliente: () => import("./calculadoras/odvody-szco.cliente") },
    { definicion: pausalneVydavky, contenido: cPausalneVydavky, cliente: () => import("./calculadoras/pausalne-vydavky.cliente") },
    { definicion: danZPrijmov, contenido: cDanZPrijmov, cliente: () => import("./calculadoras/dan-z-prijmov.cliente") },
    { definicion: kalkulackaDph, contenido: cKalkulackaDph, cliente: () => import("./calculadoras/kalkulacka-dph.cliente") },
    { definicion: vypocetDovolenky, contenido: cVypocetDovolenky, cliente: () => import("./calculadoras/vypocet-dovolenky.cliente") },
    { definicion: nahradaMzdy, contenido: cNahradaMzdy, cliente: () => import("./calculadoras/nahrada-mzdy.cliente") },
    { definicion: kalkulackaPn, contenido: cKalkulackaPn, cliente: () => import("./calculadoras/kalkulacka-pn.cliente") },
    { definicion: kalkulackaMaterske, contenido: cKalkulackaMaterske, cliente: () => import("./calculadoras/kalkulacka-materske.cliente") },
    { definicion: tehotenske, contenido: cTehotenske, cliente: () => import("./calculadoras/tehotenske.cliente") },
    { definicion: osetrovne, contenido: cOsetrovne, cliente: () => import("./calculadoras/osetrovne.cliente") },
    { definicion: rodicovskyPrispevok, contenido: cRodicovskyPrispevok, cliente: () => import("./calculadoras/rodicovsky-prispevok.cliente") },
    { definicion: odstupne, contenido: cOdstupne, cliente: () => import("./calculadoras/odstupne.cliente") },
    { definicion: odchodne, contenido: cOdchodne, cliente: () => import("./calculadoras/odchodne.cliente") },
    { definicion: vypovednaDoba, contenido: cVypovednaDoba, cliente: () => import("./calculadoras/vypovedna-doba.cliente") },
    { definicion: mzdaZaNadcas, contenido: cMzdaZaNadcas, cliente: () => import("./calculadoras/mzda-za-nadcas.cliente") },
    { definicion: priplatkyZaPracu, contenido: cPriplatkyZaPracu, cliente: () => import("./calculadoras/priplatky-za-pracu.cliente") },
    { definicion: n13Plat, contenido: cN13Plat, cliente: () => import("./calculadoras/13-plat.cliente") },
    { definicion: danovyBonus, contenido: cDanovyBonus, cliente: () => import("./calculadoras/danovy-bonus.cliente") },
    { definicion: kalkulackaDochodku, contenido: cKalkulackaDochodku, cliente: () => import("./calculadoras/kalkulacka-dochodku.cliente") },
    { definicion: kurzovaKalkulacka, contenido: cKurzovaKalkulacka, cliente: () => import("./calculadoras/kurzova-kalkulacka.cliente") },
    { definicion: inflacnaKalkulacka, contenido: cInflacnaKalkulacka, cliente: () => import("./calculadoras/inflacna-kalkulacka.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
