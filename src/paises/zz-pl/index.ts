import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en polaco (país declinado, plurales few/many, Ty implícito):
// ejercita el idioma sin publicar un país (ADR 0002, D9). La locale pl-001 no choca con el hreflang del país real cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandia to kraj testowy. Liczby służą do sprawdzania silnika i nie są prawdziwe." },
  },
  datos: {
    "zz.minimo": { nombre: "Płaca minimalna według strefy" },
    "zz.bonificacion": { nombre: "Dodatek do premii" },
  },
});
