import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en armenio (ADR 0002, D30): ejercita la escritura armenia, los signos «։», «՞» y
// «՝», el formato hy (espacio de miles, coma decimal) y los sufijos del país («Զետալանդիայում»,
// «Զետալանդիայի») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Զետալանդիան փորձարկման երկիր է։ Արժեքները ծառայում են հաշվարկները ստուգելու համար և իրականում գոյություն չունեն։" },
  },
  datos: {
    "zz.minimo": { nombre: "Նվազագույն աշխատավարձն ըստ մարզի" },
    "zz.bonificacion": { nombre: "Պարգևի հավելում" },
  },
});
