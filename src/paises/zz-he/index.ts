import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en hebreo: ejercita he (rtl, plural con dual, fuente del sistema) sin
// publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "זטלנד היא מדינת ניסיון. המספרים כאן נועדו לבדוק את המנוע ואינם אמיתיים." },
  },
  datos: {
    "zz.minimo": { nombre: "שכר המינימום לפי אזור" },
    "zz.bonificacion": { nombre: "התוספת למענק" },
  },
});
