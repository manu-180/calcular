import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Calculadora de meta de ahorro",
    title: tituloQueEntre(`Calculadora de meta de ahorro en ${ctx.nombrePais}`, `Meta de ahorro en ${ctx.nombrePais}`, "Calculadora de meta de ahorro"),
    description: t(
      "Calcula cuánto ahorrar por mes para juntar el dinero que necesitas en el plazo que elijas. Suma lo que ya tienes y lo que rinde tu ahorro.",
      "Calcule cuánto ahorrar por mes para juntar el dinero que necesita en el plazo que elija. Sume lo que ya tiene y lo que rinde su ahorro.",
      "Calculá cuánto ahorrar por mes para juntar el dinero que necesitás en el plazo que elijas. Sumá lo que ya tenés y lo que rinde tu ahorro.",
    ),
    intro: [
      "Un viaje, el auto, la entrada de una casa o un colchón para imprevistos. Una meta con monto y fecha es mucho más fácil de cumplir.",
      t(
        "Escribe cuánto quieres juntar y en cuántos meses. Te decimos cuánto separar cada mes y cada semana.",
        "Escriba cuánto quiere juntar y en cuántos meses. Le decimos cuánto separar cada mes y cada semana.",
        "Escribí cuánto querés juntar y en cuántos meses. Te decimos cuánto separar cada mes y cada semana.",
      ),
    ],
    comoSeCalcula: [
      "Primero se ve cuánto crece lo que ya está ahorrado hasta el final del plazo.",
      "Lo que falta para la meta se divide en aportes mensuales iguales.",
      "Si el ahorro rinde, cada aporte también gana intereses, así que hace falta aportar un poco menos.",
    ],
    ejemplo: [
      `Para juntar ${m(meta)} en 24 meses sin rendimiento hay que ahorrar ${m(meta / 24)} por mes.`,
      `Con ${m(actual)} ya ahorrados y un rendimiento del 5 % anual, alcanza con ${m(aporteNecesario(meta, actual, 24, 5))} por mes.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo hago para cumplir la meta?",
        respuesta: t(
          "Separa el aporte apenas cobras, antes de gastar en otra cosa. Si puedes, programa una transferencia automática a una cuenta aparte.",
          "Separe el aporte apenas cobra, antes de gastar en otra cosa. Si puede, programe una transferencia automática a una cuenta aparte.",
          "Separá el aporte apenas cobrás, antes de gastar en otra cosa. Si podés, programá una transferencia automática a una cuenta aparte.",
        ),
      },
      {
        pregunta: "¿Qué pasa si el aporte me queda muy alto?",
        respuesta: t(
          "Alarga el plazo o baja la meta. También puedes empezar con lo que puedas y subir el aporte cuando te aumenten el sueldo.",
          "Alargue el plazo o baje la meta. También puede empezar con lo que pueda y subir el aporte cuando le aumenten el sueldo.",
          "Alargá el plazo o bajá la meta. También podés empezar con lo que puedas y subir el aporte cuando te aumenten el sueldo.",
        ),
      },
      {
        pregunta: "¿Tengo en cuenta la inflación?",
        respuesta: t(
          "Si la meta es para dentro de varios años, súmale la inflación esperada al monto. Lo que hoy cuesta 100 puede costar bastante más cuando llegues.",
          "Si la meta es para dentro de varios años, súmele la inflación esperada al monto. Lo que hoy cuesta 100 puede costar bastante más cuando llegue.",
          "Si la meta es para dentro de varios años, sumale la inflación esperada al monto. Lo que hoy cuesta 100 puede costar bastante más cuando llegues.",
        ),
      },
    ],
    glosario: [
      { termino: "Aporte", definicion: "El dinero que se separa cada mes para la meta." },
      { termino: "Rendimiento", definicion: "Lo que gana el ahorro por estar en una cuenta o inversión." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    description:
      "Calcula cuánto ahorrar al mes para reunir el dinero que necesitas en el plazo que elijas. Suma lo que ya tienes y lo que rinde tu ahorro.",
    intro: [
      "Un viaje, el coche, la entrada de un piso o un colchón para imprevistos. Una meta con cantidad y fecha es mucho más fácil de cumplir.",
      "Escribe cuánto quieres reunir y en cuántos meses. Te decimos cuánto apartar cada mes y cada semana.",
    ],
    comoSeCalcula: [
      "Primero se ve cuánto crece lo que ya está ahorrado hasta el final del plazo.",
      "Lo que falta para la meta se reparte en aportaciones mensuales iguales.",
      "Si el ahorro rinde, cada aportación también gana intereses, así que hace falta ahorrar un poco menos.",
    ],
    ejemplo: [
      `Para reunir ${m(meta)} en 24 meses sin rendimiento hay que ahorrar ${m(meta / 24)} al mes.`,
      `Con ${m(actual)} ya ahorrados y un rendimiento del 5 % anual, basta con ${m(aporteNecesario(meta, actual, 24, 5))} al mes.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo hago para cumplir la meta?",
        respuesta:
          "Aparta la aportación nada más cobrar, antes de gastar en otra cosa. Si puedes, programa una transferencia periódica a una cuenta aparte.",
      },
      {
        pregunta: "¿Qué pasa si la aportación me sale muy alta?",
        respuesta:
          "Alarga el plazo o baja la meta. También puedes empezar con lo que puedas y subir la aportación cuando te suban el sueldo.",
      },
      {
        pregunta: "¿Tengo en cuenta la inflación?",
        respuesta:
          "Si la meta es para dentro de varios años, súmale la inflación esperada a la cantidad. Lo que hoy cuesta 100 puede costar bastante más cuando llegues.",
      },
    ],
    glosario: [
      { termino: "Aportación", definicion: "El dinero que se aparta cada mes para la meta." },
      { termino: "Rendimiento", definicion: "Lo que gana el ahorro por estar en una cuenta o inversión." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
