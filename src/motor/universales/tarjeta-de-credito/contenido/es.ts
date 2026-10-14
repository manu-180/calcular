import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 30, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 30, { modo: "minimo", fijo: 0, porcentaje: 5, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Calculadora para pagar la tarjeta de crédito",
    title: tituloQueEntre(`Pagar la tarjeta de crédito en ${ctx.nombrePais}`, `Pagar la tarjeta en ${ctx.nombrePais}`, "Calculadora para pagar la tarjeta de crédito"),
    description: t(
      "Calcula en cuántos meses saldas tu tarjeta de crédito y cuánto pagas de intereses, con un pago fijo o pagando el mínimo.",
      "Calcule en cuántos meses salda su tarjeta de crédito y cuánto paga de intereses, con un pago fijo o pagando el mínimo.",
      "Calculá en cuántos meses saldás tu tarjeta de crédito y cuánto pagás de intereses, con un pago fijo o pagando el mínimo.",
    ),
    intro: [
      "La tarjeta de crédito suele ser la deuda más cara. Pagar solo el mínimo la estira por años y multiplica los intereses.",
      t(
        "Escribe el saldo, la tasa y cuánto puedes pagar por mes. Te mostramos cuándo terminas, cuánto pagas de intereses y el plan mes a mes.",
        "Escriba el saldo, la tasa y cuánto puede pagar por mes. Le mostramos cuándo termina, cuánto paga de intereses y el plan mes a mes.",
        "Escribí el saldo, la tasa y cuánto podés pagar por mes. Te mostramos cuándo terminás, cuánto pagás de intereses y el plan mes a mes.",
      ),
    ],
    comoSeCalcula: [
      "Cada mes se suma el interés: saldo × tasa anual ÷ 12.",
      "Después se resta el pago. Con el pago mínimo, el pago es un porcentaje de lo que se debe, con un piso.",
      "Se repite hasta que el saldo llega a cero. Si el pago no supera el interés, la deuda no baja nunca.",
    ],
    ejemplo: [
      `Una deuda de ${m(saldo)} al 30 % anual pagando ${m(fijo)} fijos por mes se salda en ${conFijo.meses} meses, con ${m(conFijo.intereses)} de intereses.`,
      `Pagando solo el mínimo del 5 % se tarda ${conMinimo.meses} meses y los intereses suben a ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué pasa si pago solo el mínimo?",
        respuesta: t(
          "Como el mínimo baja junto con la deuda, cada mes pagas menos y la deuda se estira por años. Si puedes, paga un monto fijo más alto, aunque sea un poco.",
          "Como el mínimo baja junto con la deuda, cada mes paga menos y la deuda se estira por años. Si puede, pague un monto fijo más alto, aunque sea un poco.",
          "Como el mínimo baja junto con la deuda, cada mes pagás menos y la deuda se estira por años. Si podés, pagá un monto fijo más alto, aunque sea un poco.",
        ),
      },
      {
        pregunta: "¿Conviene pasar la deuda a un préstamo personal?",
        respuesta:
          "Si la tasa del préstamo es bastante más baja que la de la tarjeta, sí suele convenir. Compara el total de intereses de las dos opciones, con comisiones incluidas.",
      },
      {
        pregunta: "Si tengo varias tarjetas, ¿cuál pago primero?",
        respuesta: t(
          "Paga el mínimo en todas y el resto ponlo en la de tasa más alta. Así es como menos intereses pagas en total.",
          "Pague el mínimo en todas y el resto póngalo en la de tasa más alta. Así es como menos intereses paga en total.",
          "Pagá el mínimo en todas y el resto ponelo en la de tasa más alta. Así es como menos intereses pagás en total.",
        ),
      },
    ],
    glosario: [
      { termino: "Pago mínimo", definicion: "Lo menos que se puede pagar en el mes sin caer en mora. No cancela la deuda." },
      { termino: "Tasa de financiación", definicion: "El interés que cobra la tarjeta sobre el saldo que no se paga." },
    ],
  };
};
