import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en uzbeko latino: ejercita uz (oʻ y gʻ con U+02BB, sufijos de caso,
// formato uz-UZ) sin publicar un país (ADR 0002, D16).
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalend sinov uchun ishlatiladigan mamlakat. Raqamlar kalkulyatorni sinash uchun, ular haqiqiy emas." },
  },
  datos: {
    "zz.minimo": { nombre: "Hudud boʻyicha eng kam ish haqi" },
    "zz.bonificacion": { nombre: "Mukofotga qoʻshimcha toʻlov" },
  },
});
