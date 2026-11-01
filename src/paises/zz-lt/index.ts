import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en lituano (ADR 0002, D29): ejercita los diacríticos, los plurales
// one/few/many/other y los casos del país («Zetalandijoje», «Zetalandijos», «Zetalandijai») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandija yra bandomoji šalis. Reikšmės skirtos skaičiuoklėms tikrinti ir realybėje neegzistuoja." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimalus atlyginimas pagal regionus" },
    "zz.bonificacion": { nombre: "Priedas prie premijos" },
  },
});
