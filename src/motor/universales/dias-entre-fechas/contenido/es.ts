import { segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Días entre dos fechas",
    title: tituloQueEntre(`Calcular días entre fechas en ${ctx.nombrePais}`, `Días entre fechas en ${ctx.nombrePais}`, "Calcular días entre fechas"),
    description: t(
      "Calcula cuántos días hay entre dos fechas: días corridos, semanas, meses y días hábiles de lunes a viernes.",
      "Calcule cuántos días hay entre dos fechas: días corridos, semanas, meses y días hábiles de lunes a viernes.",
      "Calculá cuántos días hay entre dos fechas: días corridos, semanas, meses y días hábiles de lunes a viernes.",
    ),
    intro: [
      t(
        "Elige la fecha de inicio y la final. Ves los días corridos, el mismo tiempo en semanas y en meses, y los días hábiles.",
        "Elija la fecha de inicio y la final. Verá los días corridos, el mismo tiempo en semanas y en meses, y los días hábiles.",
        "Elegí la fecha de inicio y la final. Ves los días corridos, el mismo tiempo en semanas y en meses, y los días hábiles.",
      ),
      "Sirve para plazos, vencimientos, vacaciones, embarazos o una cuenta regresiva.",
    ],
    comoSeCalcula: [
      t(
        "Los días corridos son todos los días del calendario entre las dos fechas. Cuenta el día de inicio y no el final, salvo que marques la opción.",
        "Los días corridos son todos los días del calendario entre las dos fechas. Cuenta el día de inicio y no el final, salvo que marque la opción.",
        "Los días corridos son todos los días del calendario entre las dos fechas. Cuenta el día de inicio y no el final, salvo que marques la opción.",
      ),
      "Los días hábiles son los de lunes a viernes dentro de ese mismo período. No se restan feriados.",
      "Los años bisiestos se cuentan con su 29 de febrero.",
    ],
    ejemplo: [
      `Del ${f(desde)} al ${f(hasta)} hay ${dias} días corridos.`,
      `De esos, ${habiles} son de lunes a viernes.`,
    ],
    faq: [
      {
        pregunta: "¿Se cuenta el primer día o el último?",
        respuesta: t(
          "Por defecto se cuenta el primero y no el último, como cuando restas dos fechas. Si necesitas los dos, marca «Contar también el último día».",
          "Por defecto se cuenta el primero y no el último, como cuando se restan dos fechas. Si necesita los dos, marque «Contar también el último día».",
          "Por defecto se cuenta el primero y no el último, como cuando restás dos fechas. Si necesitás los dos, marcá «Contar también el último día».",
        ),
      },
      {
        pregunta: "¿Los días hábiles descuentan feriados?",
        respuesta: "No. Cuentan de lunes a viernes. Los feriados cambian según el país, la región y el año, así que hay que restarlos aparte.",
      },
      {
        pregunta: "¿Cuántos días tiene un año?",
        respuesta: "365, o 366 en los años bisiestos. Por eso la cantidad de días entre dos fechas iguales de años distintos puede cambiar.",
      },
    ],
    glosario: [
      { termino: "Días corridos", definicion: "Todos los días del calendario, incluidos fines de semana y feriados." },
      { termino: "Días hábiles", definicion: "En esta calculadora, los días de lunes a viernes." },
    ],
  };
};
