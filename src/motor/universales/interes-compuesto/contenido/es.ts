import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Calculadora de interés compuesto",
    title: tituloQueEntre(`Calculadora de interés compuesto en ${ctx.nombrePais}`, `Interés compuesto en ${ctx.nombrePais}`, "Calculadora de interés compuesto"),
    description: t(
      "Calcula cuánto crece tu dinero con interés compuesto y aportes mensuales. Ve el saldo final, los intereses ganados y la evolución año por año.",
      "Calcule cuánto crece su dinero con interés compuesto y aportes mensuales. Vea el saldo final, los intereses ganados y la evolución año por año.",
      "Calculá cuánto crece tu dinero con interés compuesto y aportes mensuales. Mirá el saldo final, los intereses ganados y la evolución año por año.",
    ),
    intro: [
      "Con interés compuesto, los intereses se suman al capital y empiezan a generar sus propios intereses. Por eso el ahorro crece cada vez más rápido.",
      t(
        "Escribe cuánto tienes hoy, cuánto puedes sumar por mes, la tasa y el plazo. Te mostramos el saldo final y cuánto de eso son intereses.",
        "Escriba cuánto tiene hoy, cuánto puede sumar por mes, la tasa y el plazo. Le mostramos el saldo final y cuánto de eso son intereses.",
        "Escribí cuánto tenés hoy, cuánto podés sumar por mes, la tasa y el plazo. Te mostramos el saldo final y cuánto de eso son intereses.",
      ),
    ],
    comoSeCalcula: [
      "Saldo final = capital × (1 + i) elevado a n + aporte × ((1 + i) elevado a n − 1) ÷ i.",
      "La i es la tasa mensual equivalente a la capitalización elegida y n la cantidad de meses.",
      "Los aportes se suman al final de cada mes.",
    ],
    ejemplo: [
      `Con ${m(capital)} iniciales y ${m(aporte)} por mes al 7 % anual, en 10 años se llega a ${m(a10)}.`,
      `Si se sigue 10 años más, el saldo llega a ${m(a20)}. Los segundos 10 años rinden mucho más que los primeros.`,
    ],
    faq: [
      {
        pregunta: "¿Qué diferencia hay entre interés simple y compuesto?",
        respuesta:
          "Con interés simple, los intereses se calculan siempre sobre el capital inicial. Con compuesto, se calculan sobre el capital más los intereses ya ganados.",
      },
      {
        pregunta: "¿Qué es la regla del 72?",
        respuesta:
          "Un atajo para saber en cuántos años se duplica el dinero: 72 dividido por la tasa anual. Al 6 %, se duplica en unos 12 años.",
      },
      {
        pregunta: "¿Qué tasa uso?",
        respuesta: t(
          "Una que sea realista para lo que vas a hacer con el dinero. Si quieres ver cuánto vale en dinero de hoy, usa la tasa menos la inflación esperada.",
          "Una que sea realista para lo que va a hacer con el dinero. Si quiere ver cuánto vale en dinero de hoy, use la tasa menos la inflación esperada.",
          "Una que sea realista para lo que vas a hacer con el dinero. Si querés ver cuánto vale en dinero de hoy, usá la tasa menos la inflación esperada.",
        ),
      },
    ],
    glosario: [
      { termino: "Capitalización", definicion: "El momento en que los intereses se suman al capital." },
      { termino: "Interés compuesto", definicion: "Interés que se calcula sobre el capital más los intereses acumulados." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    description:
      "Calcula cuánto crece tu dinero con interés compuesto y aportaciones mensuales. Mira el saldo final, los intereses ganados y la evolución año a año.",
    intro: [
      "Con interés compuesto, los intereses se suman al capital y empiezan a generar sus propios intereses. Por eso el ahorro crece cada vez más rápido.",
      "Escribe cuánto tienes hoy, cuánto puedes añadir al mes, el tipo de interés y el plazo. Te mostramos el saldo final y cuánto de eso son intereses.",
    ],
    comoSeCalcula: [
      "Saldo final = capital × (1 + i) elevado a n + aportación × ((1 + i) elevado a n − 1) ÷ i.",
      "La i es el tipo mensual equivalente a la capitalización elegida y n el número de meses.",
      "Las aportaciones se suman al final de cada mes.",
    ],
    ejemplo: [
      `Con ${m(capital)} iniciales y ${m(aporte)} al mes al 7 % anual, en 10 años se llega a ${m(a10)}.`,
      `Si se sigue 10 años más, el saldo llega a ${m(a20)}. Los segundos 10 años rinden mucho más que los primeros.`,
    ],
    faq: [
      {
        pregunta: "¿Qué diferencia hay entre interés simple y compuesto?",
        respuesta:
          "Con interés simple, los intereses se calculan siempre sobre el capital inicial. Con compuesto, se calculan sobre el capital más los intereses ya ganados.",
      },
      {
        pregunta: "¿Qué es la regla del 72?",
        respuesta: "Un atajo para saber en cuántos años se duplica el dinero: 72 dividido entre el tipo de interés anual. Al 6 %, se duplica en unos 12 años.",
      },
      {
        pregunta: "¿Qué tipo de interés uso?",
        respuesta:
          "Uno que sea realista para lo que vas a hacer con el dinero. Si quieres ver cuánto vale en dinero de hoy, usa el tipo menos la inflación esperada.",
      },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
