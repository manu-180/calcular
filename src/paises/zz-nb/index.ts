import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en noruego bokmål (du, signo menos U+2212, espacio de miles):
// ejercita el idioma sin publicar un país (ADR 0002, D9). La locale nb-001 no choca con el hreflang del país real cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland er et testland. Tallene er der for å teste motoren og er ikke ekte." },
  },
  datos: {
    "zz.minimo": { nombre: "Minstelønn per sone" },
    "zz.bonificacion": { nombre: "Tillegg til bonusen" },
  },
});
