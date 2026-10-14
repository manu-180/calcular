import { aDia, fechaLarga, mesesYDias } from "../../dias-entre-fechas/fechas";
import { duracionEs } from "../../dias-entre-fechas/textos/es";
import { formatearNumero, segunTrato, type ContenidoUniversal } from "../../tipos";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Calculadora de edad",
    title: `Calculadora de edad exacta en ${ctx.nombrePais}`,
    description: t(
      "Calcula tu edad exacta en años, meses y días, cuántos días viviste y cuánto falta para tu próximo cumpleaños.",
      "Calcule su edad exacta en años, meses y días, cuántos días vivió y cuánto falta para su próximo cumpleaños.",
      "Calculá tu edad exacta en años, meses y días, cuántos días viviste y cuánto falta para tu próximo cumpleaños.",
    ),
    intro: [
      t(
        "Escribe tu fecha de nacimiento y ves tu edad exacta hoy, también en meses, semanas y días.",
        "Escriba su fecha de nacimiento y verá su edad exacta hoy, también en meses, semanas y días.",
        "Escribí tu fecha de nacimiento y ves tu edad exacta hoy, también en meses, semanas y días.",
      ),
      t(
        "Si cambias la segunda fecha, sabes qué edad tenía alguien en un día puntual o cuántos años va a tener.",
        "Si cambia la segunda fecha, sabe qué edad tenía alguien en un día puntual o cuántos años va a tener.",
        "Si cambiás la segunda fecha, sabés qué edad tenía alguien en un día puntual o cuántos años va a tener.",
      ),
    ],
    comoSeCalcula: [
      "Se cuentan los meses enteros desde el nacimiento hasta la fecha elegida. Cada 12 meses es un año cumplido.",
      "Los días que sobran después del último mes entero son los días de la edad.",
      "Los años bisiestos se cuentan con sus 366 días.",
    ],
    ejemplo: [
      `Alguien que nació el ${fechaLarga(ctx.locale, nac)} tenía, el ${fechaLarga(ctx.locale, ref)}, ${duracionEs(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Son ${formatearNumero(ctx, total)} días vividos.`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se calcula la edad exacta?",
        respuesta: "Se cuentan los años cumplidos, después los meses enteros desde el último cumpleaños y por último los días que sobran.",
      },
      {
        pregunta: "¿Qué pasa con los nacidos el 29 de febrero?",
        respuesta: "En los años que no son bisiestos, esta calculadora toma el 28 de febrero como día del cumpleaños. Algunas leyes usan el 1 de marzo.",
      },
      {
        pregunta: "¿Cuántos días tengo de vida?",
        respuesta: t(
          "Lo ves en la fila «En días». Cuenta todos los días desde que naciste hasta la fecha elegida, sin contar el día de hoy.",
          "Lo ve en la fila «En días». Cuenta todos los días desde que nació hasta la fecha elegida, sin contar el día de hoy.",
          "Lo ves en la fila «En días». Cuenta todos los días desde que naciste hasta la fecha elegida, sin contar el día de hoy.",
        ),
      },
    ],
    glosario: [
      { termino: "Edad cumplida", definicion: "Los años enteros que pasaron desde el nacimiento." },
      { termino: "Año bisiesto", definicion: "Año de 366 días, con 29 de febrero. Pasa cada cuatro años, salvo algunos fines de siglo." },
    ],
  };
};
