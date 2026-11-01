import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en albanés (ADR 0002, D31): ejercita las letras ë y ç, los plurales one/other
// y las formas definidas del país («në Zetalandë», «të Zetalandës», «për Zetalandën») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalanda është një vend prove. Vlerat shërbejnë për të kontrolluar kalkulatorët dhe nuk ekzistojnë në realitet." },
  },
  datos: {
    "zz.minimo": { nombre: "Paga minimale sipas rajoneve" },
    "zz.bonificacion": { nombre: "Shtesa mbi bonusin" },
  },
});
