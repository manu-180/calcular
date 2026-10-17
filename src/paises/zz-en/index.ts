import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en inglés: ejercita el contrato de ediciones (docs/global/BRIEF-PAIS.md).
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland is a test country. The figures are there to test the engine and are not real." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimum wage by zone" },
    "zz.bonificacion": { nombre: "Extra payment on the bonus" },
  },
});
