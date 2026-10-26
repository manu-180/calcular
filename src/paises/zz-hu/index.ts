import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en húngaro (ADR 0002, D21): ejercita la ő y la ű, el singular detrás del
// número, los sufijos del país con armonía vocálica («Zetaországban») y el artículo a/az delante de
// cifras sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaország tesztország. Az értékek a kalkulátorok ellenőrzésére szolgálnak, a valóságban nem léteznek." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimálbér megyénként" },
    "zz.bonificacion": { nombre: "A prémium kiegészítése" },
  },
});
