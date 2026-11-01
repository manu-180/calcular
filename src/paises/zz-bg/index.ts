import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en búlgaro (ADR 0002, D24): ejercita el cirílico búlgaro, el artículo
// pospuesto, la forma numérica de los masculinos y las comillas „ “ sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Зеталандия е тестова държава. Стойностите тук служат за проверка на калкулаторите и не съществуват в действителност." },
  },
  datos: {
    "zz.minimo": { nombre: "Минимална заплата по области" },
    "zz.bonificacion": { nombre: "Добавка към бонуса" },
  },
});
