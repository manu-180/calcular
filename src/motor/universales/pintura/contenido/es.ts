import { formatearNumero, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const neta = 14 * 2.6 - 4;
  const litros = (neta * 2) / 10;
  return {
    h1: "¿Cuánta pintura necesito?",
    title: tituloQueEntre(`Calculadora de pintura para paredes en ${ctx.nombrePais}`, `Calculadora de pintura en ${ctx.nombrePais}`, "Calculadora de pintura para paredes"),
    description: t(
      "Calcula cuántos litros de pintura necesitas para tus paredes según las medidas, las puertas y ventanas, las manos y el rendimiento de la lata.",
      "Calcule cuántos litros de pintura necesita para sus paredes según las medidas, las puertas y ventanas, las manos y el rendimiento de la lata.",
      "Calculá cuántos litros de pintura necesitás para tus paredes según las medidas, las puertas y ventanas, las manos y el rendimiento de la lata.",
    ),
    intro: [
      t(
        "Escribe el largo y el alto de las paredes (o la superficie directa), lo que ocupan puertas y ventanas y cuántas manos vas a dar.",
        "Escriba el largo y el alto de las paredes (o la superficie directa), lo que ocupan puertas y ventanas y cuántas manos va a dar.",
        "Escribí el largo y el alto de las paredes (o la superficie directa), lo que ocupan puertas y ventanas y cuántas manos vas a dar.",
      ),
      "La calculadora suma un 10 % extra para que no falte pintura a mitad de la obra.",
    ],
    comoSeCalcula: [
      "Superficie = largo total de las paredes × alto, menos puertas y ventanas.",
      "Pintura = superficie × manos ÷ rendimiento por litro.",
      `A eso se le suma un ${MARGEN * 100} % de margen.`,
    ],
    ejemplo: [
      `Un cuarto con 14 m de paredes de ${n(2.6)} m de alto y 4 m² de puerta y ventana tiene ${n(neta)} m² para pintar.`,
      `Con 2 manos y una pintura que rinde 10 m² por litro, hacen falta ${n(litros, 2)} litros. Con el margen, ${n(litros * (1 + MARGEN), 2)} litros.`,
    ],
    faq: [
      {
        pregunta: "¿Cuántos metros cuadrados rinde un litro de pintura?",
        respuesta: "Una pintura látex para interiores suele rendir entre 8 y 12 m² por litro y por mano. El dato exacto está en la lata.",
      },
      {
        pregunta: "¿Cuántas manos hay que dar?",
        respuesta: "Lo habitual son 2 manos. Sobre una pared nueva, muy absorbente o con un cambio fuerte de color, puede hacer falta una tercera.",
      },
      {
        pregunta: "¿Se descuentan puertas y ventanas?",
        respuesta: "Sí, si son grandes. Las aberturas pequeñas conviene no restarlas: ese sobrante compensa los bordes y los recortes.",
      },
    ],
    glosario: [
      { termino: "Rendimiento", definicion: "Cuánta superficie cubre un litro de pintura en una mano." },
      { termino: "Mano", definicion: "Cada capa de pintura que se aplica sobre la pared." },
    ],
  };
};
