import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en rumano (ADR 0002, D18): ejercita ș y ț con coma, los plurales con «de»
// («20 de ani») y la gramática del país sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandia este o țară de test. Valorile de aici servesc la verificarea calculatoarelor și nu există în realitate." },
  },
  datos: {
    "zz.minimo": { nombre: "Salariul minim pe regiuni" },
    "zz.bonificacion": { nombre: "Suplimentul la primă" },
  },
});
