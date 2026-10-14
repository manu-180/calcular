import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota25 = cuotaFrancesa(prestado, 7, 300);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Calculadora de hipoteca",
    title: tituloQueEntre(`Calculadora de hipoteca en ${ctx.nombrePais}`, `Hipoteca en ${ctx.nombrePais}`, "Calculadora de hipoteca"),
    description: t(
      "Calcula la cuota de tu hipoteca según el precio, la entrada, la tasa y el plazo. Mira cuánto pagas de intereses y cómo baja la deuda año a año.",
      "Calcule la cuota de su hipoteca según el precio, la entrada, la tasa y el plazo. Vea cuánto paga de intereses y cómo baja la deuda año a año.",
      "Calculá la cuota de tu hipoteca según el precio, la entrada, la tasa y el plazo. Mirá cuánto pagás de intereses y cómo baja la deuda año a año.",
    ),
    intro: [
      "Una hipoteca es la deuda más grande que tiene casi cualquier familia. Conviene ver los números completos antes de hablar con el banco.",
      t(
        "Escribe el precio, cuánto pones de entrada, la tasa y el plazo. Si pagas seguros o impuestos junto con la cuota, súmalos para ver el pago real de cada mes.",
        "Escriba el precio, cuánto pone de entrada, la tasa y el plazo. Si paga seguros o impuestos junto con la cuota, súmelos para ver el pago real de cada mes.",
        "Escribí el precio, cuánto ponés de entrada, la tasa y el plazo. Si pagás seguros o impuestos junto con la cuota, sumalos para ver el pago real de cada mes.",
      ),
    ],
    comoSeCalcula: [
      "Monto del préstamo = precio de la vivienda − entrada.",
      "Cuota fija (sistema francés) con la tasa anual dividida por 12 y el plazo en meses.",
      "Cada año se suman los intereses y el capital que se pagaron, y se muestra lo que queda de deuda.",
    ],
    ejemplo: [
      `Una vivienda de ${m(precio)} con un 20 % de entrada deja un préstamo de ${m(prestado)}. Al 7 % anual a 25 años, la cuota es de ${m(cuota25)}.`,
      `En los 25 años se pagan ${m(interesesTotales(prestado, 7, 300))} de intereses. A 15 años la cuota sube a ${m(cuota15)}, pero los intereses bajan a ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "¿Cuánto tengo que tener de entrada?",
        respuesta: t(
          "Depende del banco y del país. Cuanto más pongas, menos te prestan, más baja es la cuota y menos intereses pagas. Además de la entrada, guarda dinero para los gastos de compra.",
          "Depende del banco y del país. Cuanto más ponga, menos le prestan, más baja es la cuota y menos intereses paga. Además de la entrada, guarde dinero para los gastos de compra.",
          "Depende del banco y del país. Cuanto más pongas, menos te prestan, más baja es la cuota y menos intereses pagás. Además de la entrada, guardá dinero para los gastos de compra.",
        ),
      },
      {
        pregunta: "¿Por qué los primeros años casi no baja la deuda?",
        respuesta:
          "Con cuota fija, los intereses se calculan sobre lo que se debe. Al principio la deuda es grande, así que casi toda la cuota se va en intereses. Con los años se invierte.",
      },
      {
        pregunta: "¿Conviene un plazo más corto?",
        respuesta: t(
          "Si puedes pagar la cuota más alta, sí: pagas mucho menos de intereses. Si no, un plazo largo con pagos extra cuando puedas también funciona.",
          "Si puede pagar la cuota más alta, sí: paga mucho menos de intereses. Si no, un plazo largo con pagos extra cuando pueda también funciona.",
          "Si podés pagar la cuota más alta, sí: pagás mucho menos de intereses. Si no, un plazo largo con pagos extra cuando puedas también funciona.",
        ),
      },
      {
        pregunta: "¿La cuota puede cambiar?",
        respuesta:
          "Con tasa fija, la cuota de la hipoteca no cambia. Con tasa variable o indexada a la inflación, sí. Este cálculo supone que la tasa queda igual todo el plazo.",
      },
    ],
    glosario: [
      { termino: "Entrada", definicion: "La parte del precio que se paga con ahorro propio. En algunos países se le dice pie o enganche." },
      { termino: "Sistema francés", definicion: "El sistema de cuota fija, donde al inicio se paga más interés y al final más capital." },
      { termino: "Saldo", definicion: "Lo que todavía se debe del préstamo." },
    ],
  };
};
