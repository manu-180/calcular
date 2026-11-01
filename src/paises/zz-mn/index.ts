import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en mongol (ADR 0002, D28): ejercita el cirílico mongol con ө y ү, el sufijo
// sobre «улс», el singular detrás de un número y el tugrik sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Зеталанд бол туршилтын улс. Эндэх утгууд нь тооцоолуурыг шалгахад зориулагдсан бөгөөд бодит байдал дээр байхгүй." },
  },
  datos: {
    "zz.minimo": { nombre: "Бүс нутгийн хөдөлмөрийн хөлсний доод хэмжээ" },
    "zz.bonificacion": { nombre: "Урамшууллын нэмэгдэл" },
  },
});
