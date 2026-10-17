import { formatearNumero, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Calculadora de ritmo de carrera",
    title: tituloQueEntre(`Calculadora de ritmo de carrera en ${ctx.nombrePais}`, `Ritmo de carrera en ${ctx.nombrePais}`, "Calculadora de ritmo de carrera"),
    description: t(
      "Calcula tu ritmo por kilómetro, el tiempo final o la distancia para correr un 5K, un 10K, una media maratón o una maratón.",
      "Calcule su ritmo por kilómetro, el tiempo final o la distancia para correr un 5K, un 10K, una media maratón o una maratón.",
      "Calculá tu ritmo por kilómetro, el tiempo final o la distancia para correr un 5K, un 10K, una media maratón o una maratón.",
    ),
    intro: [
      t(
        "Con dos de los tres datos (distancia, tiempo y ritmo) sacas el tercero. Sirve para planear una carrera o revisar un entrenamiento.",
        "Con dos de los tres datos (distancia, tiempo y ritmo) saca el tercero. Sirve para planear una carrera o revisar un entrenamiento.",
        "Con dos de los tres datos (distancia, tiempo y ritmo) sacás el tercero. Sirve para planear una carrera o revisar un entrenamiento.",
      ),
      "Las distancias de 5K, 10K, media maratón y maratón ya están cargadas.",
    ],
    comoSeCalcula: [
      `Ritmo = tiempo ÷ distancia, en minutos y segundos por ${u}.`,
      "Tiempo = ritmo × distancia.",
      "Distancia = tiempo ÷ ritmo. La velocidad media es la distancia dividida por las horas.",
    ],
    ejemplo: [
      "10 km en 50 minutos es un ritmo de 5:00 por km, a 12 km/h.",
      `Una media maratón (${formatearNumero(ctx, media, 1)} ${u}) a ${ritmoTexto(ritmoMedia)} por ${u} termina en ${reloj(ritmoMedia * media)}.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se calcula el ritmo por kilómetro?",
        respuesta: `Se pasa el tiempo a minutos y se divide por los kilómetros. 10 km en 55 minutos da ${formatearNumero(ctx, 5.5, 1)} minutos por km, o sea 5:30.`,
      },
      {
        pregunta: "¿Qué es un buen ritmo para empezar a correr?",
        respuesta: t(
          "El que te deja hablar mientras corres. Para muchas personas está entre 6:30 y 8:00 por kilómetro, y baja con el entrenamiento.",
          "El que le permite hablar mientras corre. Para muchas personas está entre 6:30 y 8:00 por kilómetro, y baja con el entrenamiento.",
          "El que te deja hablar mientras corrés. Para muchas personas está entre 6:30 y 8:00 por kilómetro, y baja con el entrenamiento.",
        ),
      },
      {
        pregunta: "¿Cuánto mide una maratón?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km. La media maratón mide la mitad: ${formatearNumero(ctx, DISTANCIAS_KM.media, 4)} km.`,
      },
    ],
    glosario: [
      { termino: "Ritmo", definicion: "El tiempo que se tarda en recorrer un kilómetro o una milla." },
      { termino: "Velocidad media", definicion: "La distancia recorrida por hora." },
    ],
  };
};
