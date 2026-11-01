import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en jemer (sin espacios entre palabras, subíndices, «។», sin plural): ejercita el idioma
// sin publicar un país (ADR 0002, D38). La locale km-001 no choca con el hreflang de Camboya cuando llegue.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "ហ្សេតាឡង់ជាប្រទេសសម្រាប់សាកល្បង។ តួលេខទាំងអស់សម្រាប់តែសាកល្បងម៉ាស៊ីនគណនា ហើយមិនមែនជាទិន្នន័យពិតទេ។" },
  },
  datos: {
    "zz.minimo": { nombre: "ប្រាក់ឈ្នួលអប្បបរមាតាមតំបន់" },
    "zz.bonificacion": { nombre: "ប្រាក់បន្ថែមលើប្រាក់រង្វាន់" },
  },
});
