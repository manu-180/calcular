import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculadora de variación porcentual",
    title: tituloQueEntre(`Variación porcentual: calculadora en ${ctx.nombrePais}`, `Variación porcentual en ${ctx.nombrePais}`, "Calculadora de variación porcentual"),
    description: t(
      "Calcula cuánto subió o bajó un valor en porcentaje: precios, sueldos, ventas o cualquier cifra que cambió de un momento a otro.",
      "Calcule cuánto subió o bajó un valor en porcentaje: precios, sueldos, ventas o cualquier cifra que cambió de un momento a otro.",
      "Calculá cuánto subió o bajó un valor en porcentaje: precios, sueldos, ventas o cualquier cifra que cambió de un momento a otro.",
    ),
    intro: [
      t(
        "Escribe el valor de antes y el de ahora. Ves el porcentaje de aumento o de baja y la diferencia.",
        "Escriba el valor de antes y el de ahora. Verá el porcentaje de aumento o de baja y la diferencia.",
        "Escribí el valor de antes y el de ahora. Ves el porcentaje de aumento o de baja y la diferencia.",
      ),
      "También muestra cuánto tendría que cambiar para volver al punto de partida, que casi nunca es el mismo porcentaje.",
    ],
    comoSeCalcula: [
      "Variación = (valor final − valor inicial) ÷ valor inicial × 100.",
      "Si el resultado es positivo, subió. Si es negativo, bajó.",
      "Si el valor inicial es negativo, se divide por su valor absoluto para que el signo diga si mejoró o empeoró.",
    ],
    ejemplo: [
      `Un producto que costaba ${m(antes)} y ahora cuesta ${m(despues)} subió un 25 %.`,
      "Para volver al precio de antes, tendría que bajar un 20 %, no un 25 %.",
    ],
    faq: [
      {
        pregunta: "¿Cómo se calcula el porcentaje de aumento?",
        respuesta: t(
          "Resta el valor viejo al nuevo, divide por el viejo y multiplica por 100. De 80 a 100: 20 ÷ 80 × 100 = 25 %.",
          "Reste el valor viejo al nuevo, divida por el viejo y multiplique por 100. De 80 a 100: 20 ÷ 80 × 100 = 25 %.",
          "Restale el valor viejo al nuevo, dividí por el viejo y multiplicá por 100. De 80 a 100: 20 ÷ 80 × 100 = 25 %.",
        ),
      },
      {
        pregunta: "¿Cómo se calcula el porcentaje de disminución?",
        respuesta: "Es la misma cuenta. De 100 a 80: −20 ÷ 100 × 100 = −20 %, o sea que bajó un 20 %.",
      },
      {
        pregunta: "¿Por qué subir un 25 % y bajar un 25 % no deja el mismo valor?",
        respuesta: "Porque cada porcentaje se calcula sobre una base distinta. 80 más el 25 % es 100, pero 100 menos el 25 % es 75.",
      },
      {
        pregunta: "¿Qué diferencia hay entre porcentaje y puntos porcentuales?",
        respuesta: "Si una tasa pasa del 10 % al 12 %, subió 2 puntos porcentuales. En variación porcentual, subió un 20 %.",
      },
    ],
    glosario: [
      { termino: "Variación porcentual", definicion: "Cuánto cambió un valor, expresado como porcentaje del valor inicial." },
      { termino: "Punto porcentual", definicion: "La diferencia simple entre dos porcentajes." },
    ],
  };
};
