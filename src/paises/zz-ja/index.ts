import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en japonés: ejercita ja (CJK, ancho visual, fuentes) sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "ゼータランドはテスト用の国です。数値はエンジンを試すためのもので、実在しません。" },
  },
  datos: {
    "zz.minimo": { nombre: "地域別の最低賃金" },
    "zz.bonificacion": { nombre: "賞与の加算金" },
  },
});
