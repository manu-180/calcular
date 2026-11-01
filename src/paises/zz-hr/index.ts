import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en croata (ADR 0002, D27): ejercita las letras č, ć, đ, š, ž, los plurales
// one/few/other y la declinación del país («u Zetalandiji», «za Zetalandiju») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandija je probna zemlja. Vrijednosti služe za provjeru kalkulatora i u stvarnosti ne postoje." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimalna plaća po regijama" },
    "zz.bonificacion": { nombre: "Dodatak na nagradu" },
  },
});
