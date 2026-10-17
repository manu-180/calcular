import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 1500);
  return {
    h1: "Calculadora de aumento de sueldo",
    title: tituloQueEntre(`Calculadora de aumento de sueldo en ${ctx.nombrePais}`, `Aumento de sueldo en ${ctx.nombrePais}`, "Calculadora de aumento de sueldo"),
    description: t(
      "Calcula tu nuevo sueldo después de un aumento, la diferencia por mes y por año, y si le ganas a la inflación con el aumento real.",
      "Calcule su nuevo sueldo después de un aumento, la diferencia por mes y por año, y si le gana a la inflación con el aumento real.",
      "Calculá tu nuevo sueldo después de un aumento, la diferencia por mes y por año, y si le ganás a la inflación con el aumento real.",
    ),
    intro: [
      t(
        "Te ofrecieron un aumento o lo vas a pedir. Escribe tu sueldo y el aumento, en porcentaje o en dinero, y ve cuánto cambia por mes y por año.",
        "Le ofrecieron un aumento o lo va a pedir. Escriba su sueldo y el aumento, en porcentaje o en dinero, y vea cuánto cambia por mes y por año.",
        "Te ofrecieron un aumento o lo vas a pedir. Escribí tu sueldo y el aumento, en porcentaje o en dinero, y mirá cuánto cambia por mes y por año.",
      ),
      t(
        "Si sumas la inflación del período, te decimos si de verdad ganas poder de compra o solo recuperas lo perdido.",
        "Si suma la inflación del período, le decimos si de verdad gana poder de compra o solo recupera lo perdido.",
        "Si sumás la inflación del período, te decimos si de verdad ganás poder de compra o solo recuperás lo perdido.",
      ),
    ],
    comoSeCalcula: [
      "Nuevo sueldo = sueldo actual × (1 + aumento ÷ 100).",
      "Diferencia por año = diferencia por mes × sueldos por año.",
      "Aumento real = (1 + aumento) ÷ (1 + inflación) − 1.",
    ],
    ejemplo: [
      `Un sueldo de ${m(sueldo)} con un 10 % de aumento pasa a ${m(sueldo * 1.1)}: son ${m(sueldo * 0.1)} más por mes y ${m(sueldo * 0.1 * 12)} más por año.`,
      `Si la inflación del período fue del 8 %, el aumento real es de ${p(aumentoReal(10, 8))}. Con una inflación del 12 %, es de ${p(aumentoReal(10, 12))}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es el aumento real?",
        respuesta: "Es el aumento después de descontar la inflación. Muestra si con el sueldo nuevo se puede comprar más o menos que antes.",
      },
      {
        pregunta: "¿Por qué no alcanza con restar la inflación al aumento?",
        respuesta: `Porque los dos porcentajes se multiplican, no se suman. Con 10 % de aumento y 8 % de inflación, el aumento real es ${p(aumentoReal(10, 8))}, no 2 %. Con inflación alta la diferencia es mucho mayor.`,
      },
      {
        pregunta: "¿Cuánto aumento pedir?",
        respuesta: t(
          "Como mínimo, la inflación desde tu último aumento, para no perder. A partir de ahí, lo que pagan otras empresas por un puesto como el tuyo y lo que creció tu trabajo.",
          "Como mínimo, la inflación desde su último aumento, para no perder. A partir de ahí, lo que pagan otras empresas por un puesto como el suyo y lo que creció su trabajo.",
          "Como mínimo, la inflación desde tu último aumento, para no perder. A partir de ahí, lo que pagan otras empresas por un puesto como el tuyo y lo que creció tu trabajo.",
        ),
      },
    ],
    glosario: [
      { termino: "Aumento nominal", definicion: "El aumento tal como figura en el recibo, sin descontar la inflación." },
      { termino: "Poder de compra", definicion: "Lo que se puede comprar con un sueldo." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 1500);
  return {
    h1: "Calculadora de subida de sueldo",
    title: tituloQueEntre(`Calculadora de subida de sueldo en ${ctx.nombrePais}`, `Subida de sueldo en ${ctx.nombrePais}`, "Calculadora de subida de sueldo"),
    description:
      "Calcula tu nuevo sueldo después de una subida, la diferencia al mes y al año, y si ganas a la inflación con la subida real.",
    intro: [
      "Te han ofrecido una subida o la vas a pedir. Escribe tu sueldo y la subida, en porcentaje o en dinero, y mira cuánto cambia al mes y al año.",
      "Si añades la inflación del periodo, te decimos si de verdad ganas poder adquisitivo o solo recuperas lo perdido.",
    ],
    comoSeCalcula: [
      "Nuevo sueldo = sueldo actual × (1 + subida ÷ 100).",
      "Diferencia al año = diferencia al mes × pagas al año.",
      "Subida real = (1 + subida) ÷ (1 + inflación) − 1.",
    ],
    ejemplo: [
      `Un sueldo de ${m(sueldo)} con una subida del 10 % pasa a ${m(sueldo * 1.1)}: son ${m(sueldo * 0.1)} más al mes y ${m(sueldo * 0.1 * 12)} más al año en 12 pagas.`,
      `Si la inflación del periodo fue del 8 %, la subida real es del ${p(aumentoReal(10, 8))}. Con una inflación del 12 %, es del ${p(aumentoReal(10, 12))}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es la subida real?",
        respuesta: "Es la subida después de descontar la inflación. Muestra si con el sueldo nuevo se puede comprar más o menos que antes.",
      },
      {
        pregunta: "¿Por qué no basta con restar la inflación a la subida?",
        respuesta: `Porque los dos porcentajes se multiplican, no se suman. Con una subida del 10 % y una inflación del 8 %, la subida real es del ${p(aumentoReal(10, 8))}, no del 2 %. Con inflación alta la diferencia es mucho mayor.`,
      },
      {
        pregunta: "¿Cuánta subida pedir?",
        respuesta:
          "Como mínimo, la inflación desde tu última subida, para no perder. A partir de ahí, lo que pagan otras empresas por un puesto como el tuyo y lo que ha crecido tu trabajo.",
      },
    ],
    glosario: [
      { termino: "Subida nominal", definicion: "La subida tal como aparece en la nómina, sin descontar la inflación." },
      { termino: "Poder adquisitivo", definicion: "Lo que se puede comprar con un sueldo." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
