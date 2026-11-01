import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en islandés (ADR 0002, D34): ejercita las letras þ, ð, æ, ö, los plurales one/other
// y la declinación del país («í Zetalandi», «fyrir Zetaland») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland er prófunarland. Gildin eru notuð til að prófa reiknivélarnar og eru ekki til í raun." },
  },
  datos: {
    "zz.minimo": { nombre: "Lágmarkslaun eftir svæðum" },
    "zz.bonificacion": { nombre: "Viðbót við kaupauka" },
  },
});
