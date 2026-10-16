import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import bedrijfsvoorheffingBerekenen from "./calculadoras/bedrijfsvoorheffing-berekenen";
import brutoNettoBerekenen from "./calculadoras/bruto-netto-berekenen";
import btwBerekenen from "./calculadoras/btw-berekenen";
import rszBerekenen from "./calculadoras/rsz-berekenen";
import contenidoBedrijfsvoorheffingBerekenen from "./contenido/bedrijfsvoorheffing-berekenen";
import contenidoBrutoNettoBerekenen from "./contenido/bruto-netto-berekenen";
import contenidoBtwBerekenen from "./contenido/btw-berekenen";
import contenidoRszBerekenen from "./contenido/rsz-berekenen";
import loonkostBerekenen from "./calculadoras/loonkost-berekenen";
import contenidoLoonkostBerekenen from "./contenido/loonkost-berekenen";
import minimumloonBerekenen from "./calculadoras/minimumloon-berekenen";
import contenidoMinimumloonBerekenen from "./contenido/minimumloon-berekenen";
import vakantiegeldBerekenen from "./calculadoras/vakantiegeld-berekenen";
import contenidoVakantiegeldBerekenen from "./contenido/vakantiegeld-berekenen";
import opzeggingstermijnBerekenen from "./calculadoras/opzeggingstermijn-berekenen";
import contenidoOpzeggingstermijnBerekenen from "./contenido/opzeggingstermijn-berekenen";
import overurenBerekenen from "./calculadoras/overuren-berekenen";
import contenidoOverurenBerekenen from "./contenido/overuren-berekenen";
import socialeBijdragenZelfstandige from "./calculadoras/sociale-bijdragen-zelfstandige";
import contenidoSocialeBijdragenZelfstandige from "./contenido/sociale-bijdragen-zelfstandige";
import groeipakketBerekenen from "./calculadoras/groeipakket-berekenen";
import contenidoGroeipakketBerekenen from "./contenido/groeipakket-berekenen";
import maaltijdchequesBerekenen from "./calculadoras/maaltijdcheques-berekenen";
import contenidoMaaltijdchequesBerekenen from "./contenido/maaltijdcheques-berekenen";
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
    { definicion: brutoNettoBerekenen, contenido: contenidoBrutoNettoBerekenen, cliente: () => import("./calculadoras/bruto-netto-berekenen.cliente") },
    { definicion: bedrijfsvoorheffingBerekenen, contenido: contenidoBedrijfsvoorheffingBerekenen, cliente: () => import("./calculadoras/bedrijfsvoorheffing-berekenen.cliente") },
    { definicion: rszBerekenen, contenido: contenidoRszBerekenen, cliente: () => import("./calculadoras/rsz-berekenen.cliente") },
    { definicion: btwBerekenen, contenido: contenidoBtwBerekenen, cliente: () => import("./calculadoras/btw-berekenen.cliente") },
    { definicion: loonkostBerekenen, contenido: contenidoLoonkostBerekenen, cliente: () => import("./calculadoras/loonkost-berekenen.cliente") },
    { definicion: minimumloonBerekenen, contenido: contenidoMinimumloonBerekenen, cliente: () => import("./calculadoras/minimumloon-berekenen.cliente") },
    { definicion: vakantiegeldBerekenen, contenido: contenidoVakantiegeldBerekenen, cliente: () => import("./calculadoras/vakantiegeld-berekenen.cliente") },
    { definicion: opzeggingstermijnBerekenen, contenido: contenidoOpzeggingstermijnBerekenen, cliente: () => import("./calculadoras/opzeggingstermijn-berekenen.cliente") },
    { definicion: overurenBerekenen, contenido: contenidoOverurenBerekenen, cliente: () => import("./calculadoras/overuren-berekenen.cliente") },
    { definicion: socialeBijdragenZelfstandige, contenido: contenidoSocialeBijdragenZelfstandige, cliente: () => import("./calculadoras/sociale-bijdragen-zelfstandige.cliente") },
    { definicion: groeipakketBerekenen, contenido: contenidoGroeipakketBerekenen, cliente: () => import("./calculadoras/groeipakket-berekenen.cliente") },
    { definicion: maaltijdchequesBerekenen, contenido: contenidoMaaltijdchequesBerekenen, cliente: () => import("./calculadoras/maaltijdcheques-berekenen.cliente") },
  ],
  universales: "todas",
  novedades,
  detectores,
});
