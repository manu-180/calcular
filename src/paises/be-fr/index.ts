import { definirEdicion } from "@/motor/registro";
import be from "../be";
import contenidoBedrijfsvoorheffing from "./contenido/bedrijfsvoorheffing-berekenen";
import contenidoBrutoNetto from "./contenido/bruto-netto-berekenen";
import contenidoBtw from "./contenido/btw-berekenen";
import contenidoRsz from "./contenido/rsz-berekenen";
import { mercado } from "./mercado";
import textosBedrijfsvoorheffing from "./textos/bedrijfsvoorheffing-berekenen";
import textosBrutoNetto from "./textos/bruto-netto-berekenen";
import textosBtw from "./textos/btw-berekenen";
import textosRsz from "./textos/rsz-berekenen";

export default definirEdicion(be, {
  mercado,
  traducciones: [
    { textos: textosBrutoNetto, contenido: contenidoBrutoNetto },
    { textos: textosBedrijfsvoorheffing, contenido: contenidoBedrijfsvoorheffing },
    { textos: textosRsz, contenido: contenidoRsz },
    { textos: textosBtw, contenido: contenidoBtw },
  ],
  universales: "todas",
});
