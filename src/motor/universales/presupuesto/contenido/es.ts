import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Calculadora de presupuesto 50/30/20",
    title: tituloQueEntre(`Presupuesto 50/30/20 en ${ctx.nombrePais}`, "Calculadora de presupuesto 50/30/20", "Presupuesto 50/30/20"),
    description: t(
      "Reparte tu ingreso mensual con la regla 50/30/20: cuánto va a necesidades, cuánto a gustos y cuánto a ahorro. Cambia los porcentajes si lo necesitas.",
      "Reparta su ingreso mensual con la regla 50/30/20: cuánto va a necesidades, cuánto a gustos y cuánto a ahorro. Cambie los porcentajes si lo necesita.",
      "Repartí tu ingreso mensual con la regla 50/30/20: cuánto va a necesidades, cuánto a gustos y cuánto a ahorro. Cambiá los porcentajes si lo necesitás.",
    ),
    intro: [
      "La regla 50/30/20 es una forma simple de ordenar el dinero del mes. La mitad va a lo imprescindible, un 30 % a lo que se disfruta y un 20 % al ahorro.",
      t(
        "Escribe lo que cobras en mano y te mostramos cuánto corresponde a cada parte. Si tu realidad es otra, por ejemplo un alquiler alto, ajusta los porcentajes.",
        "Escriba lo que cobra en mano y le mostramos cuánto corresponde a cada parte. Si su realidad es otra, por ejemplo un alquiler alto, ajuste los porcentajes.",
        "Escribí lo que cobrás en mano y te mostramos cuánto corresponde a cada parte. Si tu realidad es otra, por ejemplo un alquiler alto, ajustá los porcentajes.",
      ),
    ],
    comoSeCalcula: [
      "Necesidades = ingreso × 50 %.",
      "Gustos = ingreso × 30 %.",
      "Ahorro = ingreso × 20 %. Los tres porcentajes tienen que sumar 100 %.",
    ],
    ejemplo: [
      `Con un ingreso de ${m(ingreso)} por mes: ${m(ingreso * 0.5)} para necesidades, ${m(ingreso * 0.3)} para gustos y ${m(ingreso * 0.2)} para ahorro.`,
      `En un año, ese 20 % suma ${m(ingreso * 0.2 * 12)} ahorrados.`,
    ],
    faq: [
      {
        pregunta: "¿Qué entra en necesidades y qué en gustos?",
        respuesta:
          "Necesidades es lo que se paga sí o sí: vivienda, comida básica, servicios, transporte, salud y el mínimo de las deudas. Gustos es lo que podría recortarse si hiciera falta.",
      },
      {
        pregunta: "¿Y si mis necesidades pasan del 50 %?",
        respuesta: t(
          "Es común, sobre todo con alquileres altos. Usa por ejemplo 60/20/20 o 70/20/10 y trata de no bajar el ahorro a cero.",
          "Es común, sobre todo con alquileres altos. Use por ejemplo 60/20/20 o 70/20/10 y trate de no bajar el ahorro a cero.",
          "Es común, sobre todo con alquileres altos. Usá por ejemplo 60/20/20 o 70/20/10 y tratá de no bajar el ahorro a cero.",
        ),
      },
      {
        pregunta: "¿El ahorro incluye pagar deudas?",
        respuesta:
          "El pago mínimo va en necesidades. Lo que se paga de más para cancelar antes una deuda cuenta como ahorro, porque mejora el patrimonio igual que ahorrar.",
      },
    ],
    glosario: [
      { termino: "Ingreso neto", definicion: "Lo que se cobra después de impuestos y aportes." },
      { termino: "Regla 50/30/20", definicion: "Un reparto del ingreso entre necesidades, gustos y ahorro." },
    ],
  };
};
