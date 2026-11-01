import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en estonio (sina, casos del país, partitivo en unidades): ejercita el idioma sin
// publicar un país (ADR 0002, D33). La locale et-001 no choca con el hreflang de Estonia cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetamaa on testriik. Väärtused on mõeldud kalkulaatorite kontrollimiseks ja neid päriselt ei ole." },
  },
  datos: {
    "zz.minimo": { nombre: "Miinimumpalk piirkonniti" },
    "zz.bonificacion": { nombre: "Preemia lisatasu" },
  },
});
