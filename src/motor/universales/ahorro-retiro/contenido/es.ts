import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Calculadora de ahorro para el retiro",
    title: tituloQueEntre(`Ahorro para el retiro en ${ctx.nombrePais}`, `Retiro en ${ctx.nombrePais}`, "Calculadora de ahorro para el retiro"),
    description: t(
      "Calcula cuánto juntarías para tu retiro con aportes mensuales y qué ingreso mensual te daría ese ahorro. En dinero de hoy, sin contar la jubilación pública.",
      "Calcule cuánto juntaría para su retiro con aportes mensuales y qué ingreso mensual le daría ese ahorro. En dinero de hoy, sin contar la jubilación pública.",
      "Calculá cuánto juntarías para tu retiro con aportes mensuales y qué ingreso mensual te daría ese ahorro. En dinero de hoy, sin contar la jubilación pública.",
    ),
    intro: [
      t(
        "La jubilación o pensión pública muchas veces no alcanza para mantener el nivel de vida. Un ahorro propio, aunque sea chico, cambia mucho si empiezas temprano.",
        "La jubilación o pensión pública muchas veces no alcanza para mantener el nivel de vida. Un ahorro propio, aunque sea chico, cambia mucho si empieza temprano.",
        "La jubilación o pensión pública muchas veces no alcanza para mantener el nivel de vida. Un ahorro propio, aunque sea chico, cambia mucho si empezás temprano.",
      ),
      t(
        "Escribe tu edad, cuándo te quieres retirar, lo que ya tienes y lo que puedes aportar por mes. Te mostramos el ahorro al retirarte y cuánto podrías cobrar de él cada mes.",
        "Escriba su edad, cuándo se quiere retirar, lo que ya tiene y lo que puede aportar por mes. Le mostramos el ahorro al retirarse y cuánto podría cobrar de él cada mes.",
        "Escribí tu edad, cuándo te querés retirar, lo que ya tenés y lo que podés aportar por mes. Te mostramos el ahorro al retirarte y cuánto podrías cobrar de él cada mes.",
      ),
    ],
    comoSeCalcula: [
      "El ahorro crece cada mes con el rendimiento real, que es el rendimiento menos la inflación. Por eso el resultado queda en dinero de hoy.",
      "Al retirarse, el ahorro se reparte en cuotas mensuales iguales durante los años elegidos. Mientras tanto, lo que queda sigue rindiendo.",
      "No incluye la jubilación pública, ni impuestos, ni comisiones de la inversión.",
    ],
    ejemplo: [
      `Con ${m(actual)} ahorrados a los 30 años y ${m(aporte)} por mes al 4 % real, a los 65 se juntan ${m(capital30)}. Eso da ${m(rentaMensual(capital30, 4, 25))} por mes durante 25 años.`,
      `Si se empieza a los 40 con lo mismo, se llega a ${m(capital40)}. Diez años de diferencia cambian mucho el resultado.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es el rendimiento real?",
        respuesta:
          "Es lo que rinde una inversión después de descontar la inflación. Si una inversión da 7 % y la inflación es 3 %, el rendimiento real es de alrededor de 4 %.",
      },
      {
        pregunta: "¿Esto reemplaza la jubilación pública?",
        respuesta: t(
          "No. Es un ahorro propio que se suma a lo que cobres del sistema público o de un fondo obligatorio. Para conocer tu jubilación pública, consulta al organismo de tu país.",
          "No. Es un ahorro propio que se suma a lo que cobre del sistema público o de un fondo obligatorio. Para conocer su jubilación pública, consulte al organismo de su país.",
          "No. Es un ahorro propio que se suma a lo que cobres del sistema público o de un fondo obligatorio. Para conocer tu jubilación pública, consultá al organismo de tu país.",
        ),
      },
      {
        pregunta: "¿Cuánto debería ahorrar para el retiro?",
        respuesta: t(
          "No hay un número único. Una referencia común es apartar entre el 10 % y el 15 % de lo que ganas. Lo más importante es empezar cuanto antes.",
          "No hay un número único. Una referencia común es apartar entre el 10 % y el 15 % de lo que gana. Lo más importante es empezar cuanto antes.",
          "No hay un número único. Una referencia común es apartar entre el 10 % y el 15 % de lo que ganás. Lo más importante es empezar cuanto antes.",
        ),
      },
    ],
    glosario: [
      { termino: "Rendimiento real", definicion: "La ganancia de una inversión por encima de la inflación." },
      { termino: "Dinero de hoy", definicion: "Un monto futuro expresado según lo que se puede comprar hoy con él." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Calculadora de ahorro para la jubilación",
    title: tituloQueEntre(`Ahorro para la jubilación en ${ctx.nombrePais}`, `Jubilación en ${ctx.nombrePais}`, "Calculadora de ahorro para la jubilación"),
    description:
      "Calcula cuánto reunirías para tu jubilación ahorrando cada mes y qué ingreso mensual te daría. En dinero de hoy, sin contar la pensión pública.",
    intro: [
      "La pensión pública muchas veces no basta para mantener el nivel de vida. Un ahorro propio, aunque sea pequeño, cambia mucho si empiezas pronto.",
      "Escribe tu edad, cuándo te quieres jubilar, lo que ya tienes y lo que puedes aportar al mes. Te mostramos el ahorro al jubilarte y cuánto podrías cobrar de él cada mes.",
    ],
    comoSeCalcula: [
      "El ahorro crece cada mes con el rendimiento real, que es el rendimiento menos la inflación. Por eso el resultado queda en dinero de hoy.",
      "Al jubilarse, el ahorro se reparte en cantidades mensuales iguales durante los años elegidos. Mientras tanto, lo que queda sigue rindiendo.",
      "No incluye la pensión pública, ni impuestos, ni comisiones de la inversión.",
    ],
    ejemplo: [
      `Con ${m(actual)} ahorrados a los 30 años y ${m(aporte)} al mes al 4 % real, a los 65 se reúnen ${m(capital30)}. Eso da ${m(rentaMensual(capital30, 4, 25))} al mes durante 25 años.`,
      `Si se empieza a los 40 con lo mismo, se llega a ${m(capital40)}. Diez años de diferencia cambian mucho el resultado.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es el rendimiento real?",
        respuesta:
          "Es lo que rinde una inversión después de descontar la inflación. Si una inversión da un 7 % y la inflación es del 3 %, el rendimiento real ronda el 4 %.",
      },
      {
        pregunta: "¿Esto sustituye a la pensión pública?",
        respuesta:
          "No. Es un ahorro propio que se suma a la pensión de la Seguridad Social o a un plan de pensiones. Para conocer tu pensión pública, consulta tu informe en la Seguridad Social.",
      },
      {
        pregunta: "¿Cuánto debería ahorrar para la jubilación?",
        respuesta: "No hay un número único. Una referencia habitual es apartar entre el 10 % y el 15 % de lo que ganas. Lo más importante es empezar cuanto antes.",
      },
    ],
    glosario: [
      { termino: "Rendimiento real", definicion: "El rendimiento de una inversión por encima de la inflación." },
      { termino: "Dinero de hoy", definicion: "Una cantidad futura expresada según lo que se puede comprar hoy con ella." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
