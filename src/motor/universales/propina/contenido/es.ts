import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculadora de propina",
    title: `Calculadora de propina en ${ctx.nombrePais}`,
    description: t(
      "Calcula la propina, el total de la cuenta y cuánto paga cada uno cuando dividen entre varias personas. Con redondeo hacia arriba.",
      "Calcule la propina, el total de la cuenta y cuánto paga cada uno cuando dividen entre varias personas. Con redondeo hacia arriba.",
      "Calculá la propina, el total de la cuenta y cuánto paga cada uno cuando dividen entre varias personas. Con redondeo hacia arriba.",
    ),
    intro: [
      t(
        "Escribe el total de la cuenta, el porcentaje de propina y cuántos pagan. Ves la propina, el total y lo que pone cada uno.",
        "Escriba el total de la cuenta, el porcentaje de propina y cuántos pagan. Verá la propina, el total y lo que pone cada uno.",
        "Escribí el total de la cuenta, el porcentaje de propina y cuántos pagan. Ves la propina, el total y lo que pone cada uno.",
      ),
      "Si prefieren montos redondos, la calculadora sube lo de cada persona al entero siguiente y lo que sobra va a la propina.",
    ],
    comoSeCalcula: [
      "Propina = cuenta × porcentaje ÷ 100.",
      "Total = cuenta + propina.",
      "Cada persona paga el total dividido por la cantidad de personas.",
    ],
    ejemplo: [
      `Una cuenta de ${m(cuenta)} con 15 % de propina suma ${m(propina)} de propina y ${m(cuenta + propina)} en total.`,
      `Entre 3 personas, cada una paga ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "¿Cuánto se deja de propina?",
        respuesta: "Depende de la costumbre de cada lugar. En muchos países se deja entre 10 % y 15 %, y a veces ya viene incluida en la cuenta como cargo por servicio.",
      },
      {
        pregunta: "¿La propina se calcula antes o después de impuestos?",
        respuesta: t(
          "Lo más común es calcularla sobre el total que figura en la cuenta. Si quieres hacerlo sobre el precio sin impuestos, escribe ese monto.",
          "Lo más común es calcularla sobre el total que figura en la cuenta. Si quiere hacerlo sobre el precio sin impuestos, escriba ese monto.",
          "Lo más común es calcularla sobre el total que figura en la cuenta. Si querés hacerlo sobre el precio sin impuestos, escribí ese monto.",
        ),
      },
      {
        pregunta: "¿Cómo se calcula rápido el 10 % de propina?",
        respuesta: `Se divide la cuenta por 10. El 10 % de 450 es 45. Para el 15 %, se le suma la mitad: 45 + ${formatearNumero(ctx, 22.5, 1)} da ${formatearNumero(ctx, 67.5, 1)}.`,
      },
    ],
    glosario: [
      { termino: "Propina", definicion: "Monto voluntario que se deja por el servicio, además del precio." },
      { termino: "Servicio incluido", definicion: "Cuando el local ya sumó un cargo por servicio a la cuenta." },
    ],
  };
};
