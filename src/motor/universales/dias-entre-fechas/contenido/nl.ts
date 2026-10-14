import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Dagen tussen twee datums berekenen",
    title: tituloQueEntre(
      `Dagen tussen twee datums berekenen in ${ctx.nombrePais}`,
      `Dagen tussen datums in ${ctx.nombrePais}`,
      "Dagen tussen twee datums berekenen",
    ),
    description: "Tel het aantal dagen tussen twee datums: kalenderdagen, weken, maanden en werkdagen van maandag tot en met vrijdag.",
    intro: [
      "Kies een begindatum en een einddatum. Je ziet de kalenderdagen, dezelfde periode in weken en maanden, en het aantal werkdagen.",
      "Handig voor een deadline, een opzegtermijn, je vakantie, een zwangerschap of gewoon aftellen.",
    ],
    comoSeCalcula: [
      "Kalenderdagen zijn alle dagen tussen de twee datums. De begindatum telt mee en de einddatum niet, tenzij je dat aanvinkt.",
      "Werkdagen zijn de maandagen tot en met vrijdagen in diezelfde periode. Feestdagen gaan er niet af.",
      "Schrikkeljaren tellen mee met hun 29 februari.",
    ],
    ejemplo: [`Van ${f(desde)} tot ${f(hasta)} zijn het ${dias} kalenderdagen.`, `Daarvan vallen er ${habiles} op maandag tot en met vrijdag.`],
    faq: [
      {
        pregunta: "Telt de eerste of de laatste dag mee?",
        respuesta: "Standaard telt de eerste dag mee en de laatste niet, net als wanneer je twee datums van elkaar aftrekt. Wil je beide meetellen, vink dan “Einddatum meetellen” aan.",
      },
      {
        pregunta: "Gaan feestdagen af van de werkdagen?",
        respuesta: "Nee. De rekenhulp telt maandag tot en met vrijdag. Feestdagen verschillen per land, regio en jaar, dus die trek je zelf af.",
      },
      {
        pregunta: "Hoeveel dagen heeft een jaar?",
        respuesta: "365, of 366 in een schrikkeljaar. Daarom kunnen dezelfde twee datums in verschillende jaren een ander aantal dagen uit elkaar liggen.",
      },
    ],
    glosario: [
      { termino: "Kalenderdagen", definicion: "Alle dagen op de kalender, met weekends en feestdagen erbij." },
      { termino: "Werkdagen", definicion: "In deze rekenhulp: maandag tot en met vrijdag." },
    ],
  };
};
