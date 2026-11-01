import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import khelpasisKalkulatori from "./calculadoras/khelpasis-kalkulatori";
import contenidoKhelpasisKalkulatori from "./contenido/khelpasis-kalkulatori";
import brutoNetodan from "./calculadoras/bruto-netodan";
import contenidoBrutoNetodan from "./contenido/bruto-netodan";
import damsakmeblisKharji from "./calculadoras/damsakmeblis-kharji";
import contenidoDamsakmeblisKharji from "./contenido/damsakmeblis-kharji";
import sashemosavloGadasakhadi from "./calculadoras/sashemosavlo-gadasakhadi";
import contenidoSashemosavloGadasakhadi from "./contenido/sashemosavlo-gadasakhadi";
import mtsireBiznesisGadasakhadi from "./calculadoras/mtsire-biznesis-gadasakhadi";
import contenidoMtsireBiznesisGadasakhadi from "./contenido/mtsire-biznesis-gadasakhadi";
import dghgKalkulatori from "./calculadoras/dghg-kalkulatori";
import contenidoDghgKalkulatori from "./contenido/dghg-kalkulatori";
import dividendisGadasakhadi from "./calculadoras/dividendis-gadasakhadi";
import contenidoDividendisGadasakhadi from "./contenido/dividendis-gadasakhadi";
import saprotsentoShemosavlisGadasakhadi from "./calculadoras/saprotsento-shemosavlis-gadasakhadi";
import contenidoSaprotsentoShemosavlisGadasakhadi from "./contenido/saprotsento-shemosavlis-gadasakhadi";
import konebisGadasakhadi from "./calculadoras/konebis-gadasakhadi";
import contenidoKonebisGadasakhadi from "./contenido/konebis-gadasakhadi";
import kirisGadasakhadi from "./calculadoras/kiris-gadasakhadi";
import contenidoKirisGadasakhadi from "./contenido/kiris-gadasakhadi";
import binisGakidvisGadasakhadi from "./calculadoras/binis-gakidvis-gadasakhadi";
import contenidoBinisGakidvisGadasakhadi from "./contenido/binis-gakidvis-gadasakhadi";
import mogebisGadasakhadi from "./calculadoras/mogebis-gadasakhadi";
import contenidoMogebisGadasakhadi from "./contenido/mogebis-gadasakhadi";
import shvebulebisAnazghaureba from "./calculadoras/shvebulebis-anazghaureba";
import contenidoShvebulebisAnazghaureba from "./contenido/shvebulebis-anazghaureba";
import zeganakveturiAnazghaureba from "./calculadoras/zeganakveturi-anazghaureba";
import contenidoZeganakveturiAnazghaureba from "./contenido/zeganakveturi-anazghaureba";
import gatavisuplebisKompensatsia from "./calculadoras/gatavisuplebis-kompensatsia";
import contenidoGatavisuplebisKompensatsia from "./contenido/gatavisuplebis-kompensatsia";
import gaprtkhilebisVada from "./calculadoras/gaprtkhilebis-vada";
import contenidoGaprtkhilebisVada from "./contenido/gaprtkhilebis-vada";
import dekretuliShvebuleba from "./calculadoras/dekretuli-shvebuleba";
import contenidoDekretuliShvebuleba from "./contenido/dekretuli-shvebuleba";
import daavadebisAnazghaureba from "./calculadoras/daavadebis-anazghaureba";
import contenidoDaavadebisAnazghaureba from "./contenido/daavadebis-anazghaureba";
import sapensioShenatani from "./calculadoras/sapensio-shenatani";
import contenidoSapensioShenatani from "./contenido/sapensio-shenatani";
import dagrovebitiPensia from "./calculadoras/dagrovebiti-pensia";
import contenidoDagrovebitiPensia from "./contenido/dagrovebiti-pensia";
import khelpasisDagvianeba from "./calculadoras/khelpasis-dagvianeba";
import contenidoKhelpasisDagvianeba from "./contenido/khelpasis-dagvianeba";
import valutisKursi from "./calculadoras/valutis-kursi";
import contenidoValutisKursi from "./contenido/valutis-kursi";
import inflatsiisKalkulatori from "./calculadoras/inflatsiis-kalkulatori";
import contenidoInflatsiisKalkulatori from "./contenido/inflatsiis-kalkulatori";
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
    { definicion: khelpasisKalkulatori, contenido: contenidoKhelpasisKalkulatori, cliente: () => import("./calculadoras/khelpasis-kalkulatori.cliente") },
    { definicion: brutoNetodan, contenido: contenidoBrutoNetodan, cliente: () => import("./calculadoras/bruto-netodan.cliente") },
    { definicion: damsakmeblisKharji, contenido: contenidoDamsakmeblisKharji, cliente: () => import("./calculadoras/damsakmeblis-kharji.cliente") },
    { definicion: sashemosavloGadasakhadi, contenido: contenidoSashemosavloGadasakhadi, cliente: () => import("./calculadoras/sashemosavlo-gadasakhadi.cliente") },
    { definicion: mtsireBiznesisGadasakhadi, contenido: contenidoMtsireBiznesisGadasakhadi, cliente: () => import("./calculadoras/mtsire-biznesis-gadasakhadi.cliente") },
    { definicion: dghgKalkulatori, contenido: contenidoDghgKalkulatori, cliente: () => import("./calculadoras/dghg-kalkulatori.cliente") },
    { definicion: dividendisGadasakhadi, contenido: contenidoDividendisGadasakhadi, cliente: () => import("./calculadoras/dividendis-gadasakhadi.cliente") },
    { definicion: saprotsentoShemosavlisGadasakhadi, contenido: contenidoSaprotsentoShemosavlisGadasakhadi, cliente: () => import("./calculadoras/saprotsento-shemosavlis-gadasakhadi.cliente") },
    { definicion: konebisGadasakhadi, contenido: contenidoKonebisGadasakhadi, cliente: () => import("./calculadoras/konebis-gadasakhadi.cliente") },
    { definicion: kirisGadasakhadi, contenido: contenidoKirisGadasakhadi, cliente: () => import("./calculadoras/kiris-gadasakhadi.cliente") },
    { definicion: binisGakidvisGadasakhadi, contenido: contenidoBinisGakidvisGadasakhadi, cliente: () => import("./calculadoras/binis-gakidvis-gadasakhadi.cliente") },
    { definicion: mogebisGadasakhadi, contenido: contenidoMogebisGadasakhadi, cliente: () => import("./calculadoras/mogebis-gadasakhadi.cliente") },
    { definicion: shvebulebisAnazghaureba, contenido: contenidoShvebulebisAnazghaureba, cliente: () => import("./calculadoras/shvebulebis-anazghaureba.cliente") },
    { definicion: zeganakveturiAnazghaureba, contenido: contenidoZeganakveturiAnazghaureba, cliente: () => import("./calculadoras/zeganakveturi-anazghaureba.cliente") },
    { definicion: gatavisuplebisKompensatsia, contenido: contenidoGatavisuplebisKompensatsia, cliente: () => import("./calculadoras/gatavisuplebis-kompensatsia.cliente") },
    { definicion: gaprtkhilebisVada, contenido: contenidoGaprtkhilebisVada, cliente: () => import("./calculadoras/gaprtkhilebis-vada.cliente") },
    { definicion: dekretuliShvebuleba, contenido: contenidoDekretuliShvebuleba, cliente: () => import("./calculadoras/dekretuli-shvebuleba.cliente") },
    { definicion: daavadebisAnazghaureba, contenido: contenidoDaavadebisAnazghaureba, cliente: () => import("./calculadoras/daavadebis-anazghaureba.cliente") },
    { definicion: sapensioShenatani, contenido: contenidoSapensioShenatani, cliente: () => import("./calculadoras/sapensio-shenatani.cliente") },
    { definicion: dagrovebitiPensia, contenido: contenidoDagrovebitiPensia, cliente: () => import("./calculadoras/dagrovebiti-pensia.cliente") },
    { definicion: khelpasisDagvianeba, contenido: contenidoKhelpasisDagvianeba, cliente: () => import("./calculadoras/khelpasis-dagvianeba.cliente") },
    { definicion: valutisKursi, contenido: contenidoValutisKursi, cliente: () => import("./calculadoras/valutis-kursi.cliente") },
    { definicion: inflatsiisKalkulatori, contenido: contenidoInflatsiisKalkulatori, cliente: () => import("./calculadoras/inflatsiis-kalkulatori.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
