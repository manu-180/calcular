import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Gewerkte uren berekenen",
    title: tituloQueEntre(`Gewerkte uren berekenen in ${ctx.nombrePais}`, "Gewerkte uren berekenen"),
    description: "Tel de uren op die je deze week gewerkt hebt, met begintijd, eindtijd en pauzes, en bereken je loon met overuren erbij.",
    intro: [
      "Kies per dag je begintijd en eindtijd, je onbetaalde pauze en je uurloon. Je ziet het totaal aantal uren, je overuren en je loon voor de week.",
      "Handig om je loonstrook te controleren, je urenbriefje in te vullen of werk per uur te factureren.",
    ],
    comoSeCalcula: [
      "Uren per dag = eindtijd − begintijd − pauze. Ligt de eindtijd voor de begintijd, dan eindigt de dienst de volgende dag.",
      "Overuren = totaal per week − normale uren, als het totaal daarboven komt.",
      "Loon = normale uren × uurloon + overuren × uurloon × (1 + toeslag).",
    ],
    ejemplo: [
      `Van ${hora("09:00")} tot ${hora("17:30")} met 30 minuten pauze is ${n(jornada)} uur per dag. Van maandag tot en met vrijdag is dat ${n(jornada * 5)} uur. Bij ${m(pago)} per uur verdien je ${m(jornada * 5 * pago)}.`,
      `Van ${hora("08:00")} tot ${hora("18:00")} met een uur pauze is ${n(larga * 5)} uur per week, waarvan ${n(extra)} overuren. Met 50% toeslag verdien je ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Hoe bereken je je gewerkte uren?",
        respuesta: "Trek de begintijd af van de eindtijd en haal je pauze eraf. Tel daarna alle dagen van de week bij elkaar op.",
      },
      {
        pregunta: "Hoe reken je minuten om naar uren met decimalen?",
        respuesta: `Deel de minuten door 60. Een half uur is ${n(0.5, 1)}, een kwartier ${n(0.25, 2)} en drie kwartier ${n(0.75, 2)}. 7 uur en 45 minuten is dus ${n(7.75, 2)} uur.`,
      },
      {
        pregunta: "Hoeveel overuren mag je maken en hoe worden ze betaald?",
        respuesta: "Dat hangt af van de wet, je cao en je contract. Deze rekenhulp gebruikt de toeslag en de normale uren die je invult, zonder een bepaalde regeling toe te passen.",
      },
    ],
    glosario: [
      { termino: "Overuren", definicion: "Uren die je boven je normale uren werkt, vaak met een toeslag betaald." },
      { termino: "Toeslag", definicion: "Het extra percentage dat je per overuur krijgt. Bij 50% toeslag betaalt een overuur 150%." },
    ],
  };
};
