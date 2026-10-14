import { formatearNumero, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const volumen = 4 * 3 * 0.1;
  const cemento = MEZCLA.cementoKg * volumen;
  return {
    h1: "Calculadora de hormigón",
    title: tituloQueEntre(`Calculadora de hormigón y materiales en ${ctx.nombrePais}`, `Calculadora de hormigón en ${ctx.nombrePais}`, "Calculadora de hormigón y materiales"),
    description: t(
      "Calcula los metros cúbicos de hormigón para una losa o un contrapiso y cuánto cemento, arena y piedra necesitas, con las bolsas a comprar.",
      "Calcule los metros cúbicos de hormigón para una losa o un contrapiso y cuánto cemento, arena y piedra necesita, con las bolsas a comprar.",
      "Calculá los metros cúbicos de hormigón para una losa o un contrapiso y cuánto cemento, arena y piedra necesitás, con las bolsas a comprar.",
    ),
    intro: [
      t(
        "Escribe el largo, el ancho y el espesor. Ves el volumen de hormigón (o concreto) y los materiales aproximados para prepararlo.",
        "Escriba el largo, el ancho y el espesor. Verá el volumen de hormigón (o concreto) y los materiales aproximados para prepararlo.",
        "Escribí el largo, el ancho y el espesor. Ves el volumen de hormigón (o concreto) y los materiales aproximados para prepararlo.",
      ),
      "Los materiales dependen de la dosificación. Esta calculadora usa una mezcla 1:2:3 de uso general como referencia.",
    ],
    comoSeCalcula: [
      "Volumen = largo × ancho × espesor, con el espesor pasado a metros.",
      "Al volumen se le suma el margen para desniveles y pérdidas.",
      `Por cada m³: unos ${MEZCLA.cementoKg} kg de cemento, ${n(MEZCLA.arenaM3)} m³ de arena, ${n(MEZCLA.piedraM3, 1)} m³ de piedra y ${MEZCLA.aguaL} litros de agua.`,
    ],
    ejemplo: [
      `Un contrapiso de 4 × 3 m y 10 cm de espesor lleva ${n(volumen, 1)} m³ de hormigón.`,
      `Con la mezcla de referencia son unos ${n(cemento, 0)} kg de cemento (${Math.ceil(cemento / 50)} bolsas de 50 kg), ${n(MEZCLA.arenaM3 * volumen)} m³ de arena y ${n(MEZCLA.piedraM3 * volumen)} m³ de piedra.`,
    ],
    faq: [
      {
        pregunta: "¿Cuántas bolsas de cemento lleva un metro cúbico de hormigón?",
        respuesta: `Con una mezcla 1:2:3, unos ${MEZCLA.cementoKg} kg: ${MEZCLA.cementoKg / 50} bolsas de 50 kg. Un hormigón más resistente lleva más cemento.`,
      },
      {
        pregunta: "¿Qué diferencia hay entre hormigón y concreto?",
        respuesta: "Ninguna: son dos nombres para la misma mezcla de cemento, arena, piedra y agua. Depende del país.",
      },
      {
        pregunta: "¿Conviene comprar hormigón elaborado?",
        respuesta: "Para volúmenes grandes, suele ser más parejo y más rápido. Para trabajos chicos, mezclar en obra con estas cantidades es lo habitual.",
      },
    ],
    glosario: [
      { termino: "Dosificación", definicion: "La proporción de cemento, arena, piedra y agua de una mezcla." },
      { termino: "Metro cúbico (m³)", definicion: "El volumen de un cubo de 1 metro de lado: 1000 litros." },
    ],
  };
};
