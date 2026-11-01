import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en checo (ADR 0002, D19): ejercita los diacríticos, los plurales
// one/few/many/other y la declinación del país («v Zetalandii», «pro Zetalandii») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandie je zkušební země. Hodnoty slouží k ověření kalkulaček a ve skutečnosti neexistují." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimální mzda podle krajů" },
    "zz.bonificacion": { nombre: "Příplatek k prémii" },
  },
});
