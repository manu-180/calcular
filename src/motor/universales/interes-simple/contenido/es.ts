import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Calculadora de interés simple",
    title: tituloQueEntre(`Calculadora de interés simple en ${ctx.nombrePais}`, `Interés simple en ${ctx.nombrePais}`, "Calculadora de interés simple"),
    description: t(
      "Calcula el interés simple de un capital a una tasa anual por días, meses o años. Elige año de 365 o de 360 días y ve el monto final.",
      "Calcule el interés simple de un capital a una tasa anual por días, meses o años. Elija año de 365 o de 360 días y vea el monto final.",
      "Calculá el interés simple de un capital a una tasa anual por días, meses o años. Elegí año de 365 o de 360 días y mirá el monto final.",
    ),
    intro: [
      "El interés simple se calcula siempre sobre el capital inicial: los intereses no se suman al capital durante el plazo.",
      "Se usa en depósitos a plazo fijo cortos, en préstamos entre personas y en muchos ejercicios de clase.",
    ],
    comoSeCalcula: [
      "Interés = capital × tasa anual × tiempo en años.",
      "Si el plazo está en meses, se divide por 12. Si está en días, por 365 o por 360 según el año que use la entidad.",
      "Monto final = capital + interés.",
    ],
    ejemplo: [
      `${m(capital)} al 10 % anual durante 6 meses ganan ${m(capital * 0.1 * 0.5)} de interés.`,
      `El mismo capital durante 90 días gana ${m((capital * 0.1 * 90) / 365)} con año de 365 días y ${m((capital * 0.1 * 90) / 360)} con año de 360.`,
    ],
    faq: [
      {
        pregunta: "¿Cuál es la fórmula del interés simple?",
        respuesta: `I = C × r × t. La C es el capital, la r la tasa anual en decimal (10 % es ${formatearNumero(ctx, 0.1, 2)}) y la t el tiempo en años.`,
      },
      {
        pregunta: "¿En qué se diferencia del interés compuesto?",
        respuesta:
          "En el simple, el interés se calcula siempre sobre el mismo capital. En el compuesto, los intereses se suman al capital y también generan intereses.",
      },
      {
        pregunta: "¿Por qué algunos cálculos usan años de 360 días?",
        respuesta: t(
          "Es una costumbre bancaria que simplifica las cuentas. Con 360 días el interés da un poco más alto. Revisa qué base usa tu banco.",
          "Es una costumbre bancaria que simplifica las cuentas. Con 360 días el interés da un poco más alto. Revise qué base usa su banco.",
          "Es una costumbre bancaria que simplifica las cuentas. Con 360 días el interés da un poco más alto. Revisá qué base usa tu banco.",
        ),
      },
    ],
    glosario: [
      { termino: "Capital", definicion: "El dinero que se presta o se invierte." },
      { termino: "Año comercial", definicion: "Un año contado como de 360 días, con meses de 30." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => ({
  description:
    "Calcula el interés simple de un capital a un tipo de interés anual por días, meses o años. Elige año de 365 o de 360 días y mira el importe final.",
  intro: [
    "El interés simple se calcula siempre sobre el capital inicial: los intereses no se suman al capital durante el plazo.",
    "Se usa en depósitos a plazo cortos, en préstamos entre particulares y en muchos ejercicios de clase.",
  ],
  comoSeCalcula: [
    "Interés = capital × tipo anual × tiempo en años.",
    "Si el plazo está en meses, se divide entre 12. Si está en días, entre 365 o entre 360 según el año que use la entidad.",
    "Importe final = capital + interés.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la fórmula del interés simple?",
      respuesta: `I = C × r × t. La C es el capital, la r el tipo anual en decimal (10 % es ${formatearNumero(ctx, 0.1, 2)}) y la t el tiempo en años.`,
    },
    {
      pregunta: "¿En qué se diferencia del interés compuesto?",
      respuesta:
        "En el simple, el interés se calcula siempre sobre el mismo capital. En el compuesto, los intereses se suman al capital y también generan intereses.",
    },
    {
      pregunta: "¿Por qué algunos cálculos usan años de 360 días?",
      respuesta: "Es una costumbre bancaria que simplifica las cuentas. Con 360 días el interés sale un poco más alto. Comprueba qué base usa tu banco.",
    },
  ],
});

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
