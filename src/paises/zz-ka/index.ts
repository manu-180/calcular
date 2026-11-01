import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en georgiano (ADR 0002, D26): ejercita la escritura sin mayúsculas, el
// singular detrás del número y los sufijos del país («ზეტალანდში», «ზეტალანდისთვის») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "ზეტალანდი საცდელი ქვეყანაა. მნიშვნელობები კალკულატორების შესამოწმებლად გამოიყენება და რეალურად არ არსებობს." },
  },
  datos: {
    "zz.minimo": { nombre: "მინიმალური ხელფასი რეგიონების მიხედვით" },
    "zz.bonificacion": { nombre: "პრემიის დანამატი" },
  },
});
