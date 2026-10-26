import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en finés (sinä, casos del país, partitivo en unidades):
// ejercita el idioma sin publicar un país (ADR 0002, D9). La locale fi-001 no choca con el hreflang del país real cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetamaa on testimaa. Luvut ovat moottorin testaamista varten, eivätkä ne ole todellisia." },
  },
  datos: {
    "zz.minimo": { nombre: "Vähimmäispalkka vyöhykkeittäin" },
    "zz.bonificacion": { nombre: "Bonuksen lisä" },
  },
});
