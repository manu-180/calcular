import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en bengalí: ejercita bn (dígitos ০-৯, lakh, dari, ancho visual, fuente del
// sistema) sin publicar un país (ADR 0002, D14).
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "জেটাল্যান্ড একটি পরীক্ষামূলক দেশ। এর সংখ্যাগুলো ইঞ্জিন যাচাইয়ের জন্য, বাস্তবে নেই।" },
  },
  datos: {
    "zz.minimo": { nombre: "অঞ্চলভিত্তিক ন্যূনতম মজুরি" },
    "zz.bonificacion": { nombre: "বোনাসের অতিরিক্ত অংশ" },
  },
});
