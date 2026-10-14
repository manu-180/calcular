import { formatearNumero, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "Calculadora de promedio ponderado",
    title: tituloQueEntre(`Promedio ponderado: calculadora en ${ctx.nombrePais}`, `Promedio ponderado en ${ctx.nombrePais}`, "Calculadora de promedio ponderado"),
    description: t(
      "Calcula tu promedio de notas, simple o ponderado, con hasta 10 notas y el peso de cada una: porcentajes, créditos o veces que cuenta.",
      "Calcule su promedio de notas, simple o ponderado, con hasta 10 notas y el peso de cada una: porcentajes, créditos o veces que cuenta.",
      "Calculá tu promedio de notas, simple o ponderado, con hasta 10 notas y el peso de cada una: porcentajes, créditos o veces que cuenta.",
    ),
    intro: [
      t(
        "Escribe cada nota y lo que pesa en el total. Ves el promedio ponderado y, al lado, el simple.",
        "Escriba cada nota y lo que pesa en el total. Verá el promedio ponderado y, al lado, el simple.",
        "Escribí cada nota y lo que pesa en el total. Ves el promedio ponderado y, al lado, el simple.",
      ),
      "Sirve para notas del colegio o la universidad, pero también para cualquier promedio donde algunos valores cuentan más que otros.",
    ],
    comoSeCalcula: [
      "Promedio simple = suma de las notas ÷ cantidad de notas.",
      "Promedio ponderado = suma de (nota × peso) ÷ suma de los pesos.",
      "Los pesos no necesitan sumar 100: la cuenta los divide por su total.",
    ],
    ejemplo: [
      `Con un 7 que vale 20 %, un 8 que vale 30 % y un 9 que vale 50 %, el promedio ponderado es ${n(8.3)}.`,
      `El promedio simple de esas tres notas es ${n(8)}: el 9 pesa más y sube el ponderado.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se saca un promedio ponderado?",
        respuesta: t(
          "Multiplica cada nota por su peso, suma todo y divide por la suma de los pesos.",
          "Multiplique cada nota por su peso, sume todo y divida por la suma de los pesos.",
          "Multiplicá cada nota por su peso, sumá todo y dividí por la suma de los pesos.",
        ),
      },
      {
        pregunta: "¿Qué pasa si los pesos no suman 100 %?",
        respuesta: "No importa. Si una materia tiene 6 créditos y otra 4, se usan 6 y 4. La cuenta divide por el total de pesos.",
      },
      {
        pregunta: "¿Cuál es la diferencia entre promedio simple y ponderado?",
        respuesta: "En el simple, todas las notas valen lo mismo. En el ponderado, cada una cuenta según su peso.",
      },
    ],
    glosario: [
      { termino: "Peso", definicion: "Cuánto cuenta una nota en el promedio final." },
      { termino: "Promedio ponderado", definicion: "Promedio en el que cada valor se multiplica por su peso." },
    ],
  };
};
