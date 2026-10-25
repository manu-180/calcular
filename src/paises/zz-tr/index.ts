import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en turco («siz», sufijos de caso con apóstrofo, miles con punto, decimal con
// coma y la i con y sin punto): ejercita el idioma sin publicar un país (ADR 0002, D12). La locale
// tr-001 no choca con el hreflang de Turquía cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland bir deneme ülkesidir. Rakamlar yalnızca hesaplama motorunu denemek içindir, gerçek değildir." },
  },
  datos: {
    "zz.minimo": { nombre: "Bölgelere göre asgari ücret" },
    "zz.bonificacion": { nombre: "İkramiye ek ödemesi" },
  },
});
