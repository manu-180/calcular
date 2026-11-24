import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en macedonio (ADR 0002, D36): ejercita el cirílico macedonio, el artículo
// pospuesto, la forma numérica de los masculinos y las comillas „ “ sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Зеталандија е пробна држава. Вредностите овде служат за проверка на калкулаторите и не постојат во реалноста." },
  },
  datos: {
    "zz.minimo": { nombre: "Минимална плата по региони" },
    "zz.bonificacion": { nombre: "Додаток на бонусот" },
  },
});
