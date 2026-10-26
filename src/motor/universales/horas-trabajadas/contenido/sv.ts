import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Räkna arbetstid och lön för veckan",
    title: tituloQueEntre(
      `Räkna arbetstid: timmar, rast och övertid | ${ctx.nombrePais}`,
      `Räkna arbetstid | ${ctx.nombrePais}`,
      "Räkna arbetstid",
    ),
    description: "Räkna ihop timmarna du har jobbat i veckan utifrån starttid, sluttid och rast, och räkna ut lönen med övertid inräknad.",
    intro: [
      "Välj start och slut för varje dag, din obetalda rast och din timlön. Du ser timmarna totalt, övertiden och lönen för veckan.",
      "Använd den för att kontrollera lönebeskedet, fylla i en tidrapport eller fakturera arbete per timme.",
    ],
    comoSeCalcula: [
      "Timmar per dag = sluttid − starttid − rast. Är sluttiden tidigare än starttiden slutar passet dagen efter.",
      "Övertid = veckans timmar − ordinarie arbetstid, när veckans timmar är fler.",
      "Lön = ordinarie timmar × timlön + övertidstimmar × timlön × (1 + övertidstillägg).",
    ],
    ejemplo: [
      `Från ${hora("09:00")} till ${hora("17:30")} med 30 minuters rast blir ${n(jornada)} timmar om dagen. Måndag till fredag blir det ${n(jornada * 5)} timmar, och med ${m(pago)} i timmen ${m(jornada * 5 * pago)}.`,
      `Från ${hora("08:00")} till ${hora("18:00")} med en timmes rast blir ${n(larga * 5)} timmar i veckan, varav ${n(extra)} är övertid. Med 50 % övertidstillägg blir lönen ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag ut arbetade timmar?",
        respuesta: "Dra starttiden från sluttiden och dra av rasten. Lägg sedan ihop alla dagar i veckan.",
      },
      {
        pregunta: "Hur gör jag om minuter till timmar med decimaler?",
        respuesta: `Dela minuterna med 60. En halvtimme är ${n(0.5, 1)}, 15 minuter är ${n(0.25, 2)} och 45 minuter är ${n(0.75, 2)}. Så 7 timmar och 45 minuter blir ${n(7.75, 2)} timmar.`,
      },
      {
        pregunta: "Hur mycket övertid får jag jobba och hur ersätts den?",
        respuesta: "Det beror på lagen där du jobbar, på kollektivavtalet och på ditt anställningsavtal. Kalkylatorn använder det tillägg och den ordinarie arbetstid som du fyller i, utan att tillämpa någon särskild regel.",
      },
    ],
    glosario: [
      { termino: "Övertid", definicion: "Timmar utöver den ordinarie arbetstiden, som ersätts med en högre lön." },
      { termino: "Rast", definicion: "Ett avbrott i arbetet där du är ledig och som oftast inte är betalt." },
    ],
  };
};
