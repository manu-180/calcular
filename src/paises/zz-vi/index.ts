import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en vietnamita («bạn», sin plural, miles con punto y decimales con coma):
// ejercita el idioma sin publicar un país (ADR 0002, D37). La locale vi-001 no choca con el hreflang
// de Vietnam cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetaland là quốc gia thử nghiệm. Các con số chỉ dùng để thử công cụ tính và không có thật." },
  },
  datos: {
    "zz.minimo": { nombre: "Lương tối thiểu theo vùng" },
    "zz.bonificacion": { nombre: "Phụ cấp thưởng" },
  },
});
