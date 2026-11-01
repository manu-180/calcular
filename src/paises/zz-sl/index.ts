import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en esloveno (ADR 0002, D32): ejercita las letras č, š, ž, los plurales
// one/two/few/other y la declinación del país («v Zetalandiji», «za Zetalandijo») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandija je preizkusna država. Vrednosti so namenjene preverjanju kalkulatorjev in v resnici ne obstajajo." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimalna plača po regijah" },
    "zz.bonificacion": { nombre: "Dodatek k nagradi" },
  },
});
