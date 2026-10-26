import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en griego (ADR 0002, D20): ejercita la escritura griega, el «;» de las
// preguntas, el formato el (punto de miles, coma decimal) y el artículo del país («στη Ζηταλάνδη»,
// «της Ζηταλάνδης») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Η Ζηταλάνδη είναι χώρα δοκιμών. Οι τιμές χρησιμεύουν για τον έλεγχο των υπολογισμών και δεν υπάρχουν στην πραγματικότητα." },
  },
  datos: {
    "zz.minimo": { nombre: "Κατώτατος μισθός ανά περιφέρεια" },
    "zz.bonificacion": { nombre: "Προσαύξηση του επιδόματος" },
  },
});
