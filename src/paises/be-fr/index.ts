import { definirEdicion } from "@/motor/registro";
import be from "../be";
import contenidoBedrijfsvoorheffing from "./contenido/bedrijfsvoorheffing-berekenen";
import contenidoBrutoNetto from "./contenido/bruto-netto-berekenen";
import contenidoBtw from "./contenido/btw-berekenen";
import contenidoRsz from "./contenido/rsz-berekenen";
import contenidoLoonkost from "./contenido/loonkost-berekenen";
import contenidoMinimumloon from "./contenido/minimumloon-berekenen";
import contenidoVakantiegeld from "./contenido/vakantiegeld-berekenen";
import contenidoOpzeggingstermijn from "./contenido/opzeggingstermijn-berekenen";
import contenidoOveruren from "./contenido/overuren-berekenen";
import contenidoZelfstandige from "./contenido/sociale-bijdragen-zelfstandige";
import contenidoMaaltijdcheques from "./contenido/maaltijdcheques-berekenen";
import contenidoInflatie from "./contenido/inflatie-berekenen";
import { datos } from "./datos";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import textosBedrijfsvoorheffing from "./textos/bedrijfsvoorheffing-berekenen";
import textosBrutoNetto from "./textos/bruto-netto-berekenen";
import textosBtw from "./textos/btw-berekenen";
import textosRsz from "./textos/rsz-berekenen";
import textosLoonkost from "./textos/loonkost-berekenen";
import textosMinimumloon from "./textos/minimumloon-berekenen";
import textosVakantiegeld from "./textos/vakantiegeld-berekenen";
import textosOpzeggingstermijn from "./textos/opzeggingstermijn-berekenen";
import textosOveruren from "./textos/overuren-berekenen";
import textosZelfstandige from "./textos/sociale-bijdragen-zelfstandige";
import textosMaaltijdcheques from "./textos/maaltijdcheques-berekenen";
import textosInflatie from "./textos/inflatie-berekenen";

export default definirEdicion(be, {
  mercado,
  traducciones: [
    { textos: textosBrutoNetto, contenido: contenidoBrutoNetto },
    { textos: textosBedrijfsvoorheffing, contenido: contenidoBedrijfsvoorheffing },
    { textos: textosRsz, contenido: contenidoRsz },
    { textos: textosBtw, contenido: contenidoBtw },
    { textos: textosLoonkost, contenido: contenidoLoonkost },
    { textos: textosMinimumloon, contenido: contenidoMinimumloon },
    { textos: textosVakantiegeld, contenido: contenidoVakantiegeld },
    { textos: textosOpzeggingstermijn, contenido: contenidoOpzeggingstermijn },
    { textos: textosOveruren, contenido: contenidoOveruren },
    { textos: textosZelfstandige, contenido: contenidoZelfstandige },
    { textos: textosMaaltijdcheques, contenido: contenidoMaaltijdcheques },
    { textos: textosInflatie, contenido: contenidoInflatie },
  ],
  universales: "todas",
  datos,
  novedades,
});
