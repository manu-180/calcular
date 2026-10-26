import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en danés (du, punto como separador de miles):
// ejercita el idioma sin publicar un país (ADR 0002, D9). La locale da-001 no choca con el hreflang del país real cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland er et testland. Tallene er der for at teste motoren og er ikke virkelige." },
  },
  datos: {
    "zz.minimo": { nombre: "Mindsteløn pr. zone" },
    "zz.bonificacion": { nombre: "Tillæg til bonussen" },
  },
});
