import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en sueco (du, signo menos U+2212, espacio como separador de miles):
// ejercita el idioma sin publicar un país (ADR 0002, D9). La locale sv-001 no choca con el hreflang del país real cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland är ett testland. Siffrorna finns för att testa motorn och är inte verkliga." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimilön per zon" },
    "zz.bonificacion": { nombre: "Tillägg till bonusen" },
  },
});
