import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en indonesio («Anda», sin plural, miles con punto y decimales con coma):
// ejercita el idioma sin publicar un país (ADR 0002, D11). La locale id-001 no choca con el hreflang
// de Indonesia cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland adalah negara uji coba. Angkanya hanya untuk menguji mesin kalkulator dan tidak nyata." },
  },
  datos: {
    "zz.minimo": { nombre: "Upah minimum per zona" },
    "zz.bonificacion": { nombre: "Tambahan bonus" },
  },
});
