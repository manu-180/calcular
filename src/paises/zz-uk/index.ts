import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en ucraniano (ADR 0002, D15): ejercita el cirílico, los plurales
// one/few/many y la declinación del país sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Зеталенд є тестовою країною. Значення тут потрібні, щоб перевірити роботу калькуляторів, і не існують насправді." },
  },
  datos: {
    "zz.minimo": { nombre: "Мінімальна зарплата за регіонами" },
    "zz.bonificacion": { nombre: "Надбавка до премії" },
  },
});
