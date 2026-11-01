import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en eslovaco (ADR 0002, D25): ejercita los diacríticos, los plurales
// one/few/many/other y la declinación del país («v Zetalandii», «pre Zetalandiu») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalandia je skúšobná krajina. Hodnoty slúžia na overenie kalkulačiek a v skutočnosti neexistujú." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimálna mzda podľa krajov" },
    "zz.bonificacion": { nombre: "Príplatok k prémii" },
  },
});
