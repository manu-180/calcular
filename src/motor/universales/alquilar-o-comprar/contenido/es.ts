import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "comprar" : "alquilar");
  return {
    h1: "¿Alquilar o comprar vivienda?",
    title: tituloQueEntre(`Alquilar o comprar vivienda en ${ctx.nombrePais}`, `Alquilar o comprar en ${ctx.nombrePais}`, "¿Alquilar o comprar vivienda?"),
    description: t(
      "Compara alquilar con comprar con hipoteca a los años que elijas. Te decimos qué conviene, desde qué año y cuánto patrimonio tendrías en cada caso.",
      "Compare alquilar con comprar con hipoteca a los años que elija. Le decimos qué conviene, desde qué año y cuánto patrimonio tendría en cada caso.",
      "Compará alquilar con comprar con hipoteca a los años que elijas. Te decimos qué conviene, desde qué año y cuánto patrimonio tendrías en cada caso.",
    ),
    intro: [
      t(
        "Comparar la cuota con el alquiler no alcanza. Al comprar pagas intereses, mantenimiento e impuestos, pero la vivienda queda a tu nombre. Al alquilar, el dinero de la entrada puede seguir rindiendo.",
        "Comparar la cuota con el alquiler no alcanza. Al comprar paga intereses, mantenimiento e impuestos, pero la vivienda queda a su nombre. Al alquilar, el dinero de la entrada puede seguir rindiendo.",
        "Comparar la cuota con el alquiler no alcanza. Al comprar pagás intereses, mantenimiento e impuestos, pero la vivienda queda a tu nombre. Al alquilar, el dinero de la entrada puede seguir rindiendo.",
      ),
      t(
        "Esta calculadora suma todo eso año por año y te dice con cuál de las dos opciones terminas con más patrimonio.",
        "Esta calculadora suma todo eso año por año y le dice con cuál de las dos opciones termina con más patrimonio.",
        "Esta calculadora suma todo eso año por año y te dice con cuál de las dos opciones terminás con más patrimonio.",
      ),
    ],
    comoSeCalcula: [
      "Comprando: cada mes se paga la cuota de la hipoteca y los gastos del dueño. El patrimonio es el valor de la vivienda menos lo que se debe.",
      "Alquilando: la entrada y los gastos de compra quedan invertidos al rendimiento alternativo, y el alquiler sube cada año.",
      "Cada mes, quien gasta menos invierte la diferencia. Así las dos opciones salen del mismo bolsillo.",
      "Conviene la opción con más patrimonio al final del período.",
    ],
    ejemplo: [
      `Vivienda de ${m(precio)} con 20 % de entrada, hipoteca al 7 % a 25 años, contra un alquiler de ${m(alquiler)} por mes.`,
      `A 10 años conviene ${quien(a10)} por ${m(Math.abs(a10.comprar - a10.alquilar))}. A 3 años conviene ${quien(a3)} por ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "¿Es verdad que alquilar es tirar el dinero?",
        respuesta: t(
          "No del todo. Comprando también pagas cosas que no vuelven: intereses, impuestos y mantenimiento. Lo que importa es cuánto patrimonio tienes al final en cada caso.",
          "No del todo. Comprando también paga cosas que no vuelven: intereses, impuestos y mantenimiento. Lo que importa es cuánto patrimonio tiene al final en cada caso.",
          "No del todo. Comprando también pagás cosas que no vuelven: intereses, impuestos y mantenimiento. Lo que importa es cuánto patrimonio tenés al final en cada caso.",
        ),
      },
      {
        pregunta: "¿Por qué el resultado cambia según los años?",
        respuesta: t(
          "Porque comprar tiene costos altos al principio (gastos de compra e intereses) que se recuperan con el tiempo. Si piensas mudarte pronto, alquilar suele salir mejor.",
          "Porque comprar tiene costos altos al principio (gastos de compra e intereses) que se recuperan con el tiempo. Si piensa mudarse pronto, alquilar suele salir mejor.",
          "Porque comprar tiene costos altos al principio (gastos de compra e intereses) que se recuperan con el tiempo. Si pensás mudarte pronto, alquilar suele salir mejor.",
        ),
      },
      {
        pregunta: "¿Qué dato pesa más en el resultado?",
        respuesta: t(
          "La relación entre el precio y el alquiler, la tasa de la hipoteca y cuánto sube el valor de la vivienda. Prueba cambiar la revalorización y el rendimiento para ver cuánto se mueve.",
          "La relación entre el precio y el alquiler, la tasa de la hipoteca y cuánto sube el valor de la vivienda. Pruebe cambiar la revalorización y el rendimiento para ver cuánto se mueve.",
          "La relación entre el precio y el alquiler, la tasa de la hipoteca y cuánto sube el valor de la vivienda. Probá cambiar la revalorización y el rendimiento para ver cuánto se mueve.",
        ),
      },
    ],
    glosario: [
      { termino: "Patrimonio", definicion: "Lo que se tiene menos lo que se debe." },
      { termino: "Revalorización", definicion: "Cuánto sube por año el precio de la vivienda." },
      { termino: "Costo de oportunidad", definicion: "Lo que deja de ganar el dinero de la entrada por no estar invertido." },
    ],
  };
};
