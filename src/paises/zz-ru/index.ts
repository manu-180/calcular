import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en ruso (ADR 0002, D17): ejercita el cirílico, los plurales one/few/many y
// la declinación del país sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Зеталенд является тестовой страной. Значения здесь нужны, чтобы проверить работу калькуляторов, и на самом деле не существуют." },
  },
  datos: {
    "zz.minimo": { nombre: "Минимальная зарплата по регионам" },
    "zz.bonificacion": { nombre: "Надбавка к премии" },
  },
});
