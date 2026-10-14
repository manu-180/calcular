import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoNl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const nl = ctx.locale === "nl-NL";
  const wie = nl ? "zzp'er" : "zelfstandige";
  return {
    h1: nl ? "Uurtarief berekenen als zzp'er" : "Uurtarief berekenen als zelfstandige",
    title: tituloQueEntre(`Uurtarief berekenen als ${wie} in ${ctx.nombrePais}`, `Uurtarief ${wie} berekenen`, "Uurtarief berekenen"),
    description: `Bereken je uurtarief en dagtarief als ${wie} op basis van wat je wilt verdienen, je kosten, belastingen, vrije dagen en declarabele uren.`,
    intro: [
      "De klassieke fout: je neemt het salaris dat je in loondienst zou willen en deelt dat door 160 uur. Dan vergeet je belastingen, kosten, vakantie en alle uren die je niet kunt declareren.",
      "Deze rekenhulp begint bij wat je netto wilt overhouden en laat zien welk tarief je moet vragen om daar te komen.",
    ],
    comoSeCalcula: [
      "Benodigde omzet = netto inkomen ÷ (1 − belastingpercentage) + zakelijke kosten.",
      "Werkdagen = 52 weken × werkdagen per week − vrije dagen.",
      "Declarabele uren per jaar = werkdagen × declarabele uren per dag.",
      "Uurtarief = benodigde omzet ÷ declarabele uren per jaar.",
    ],
    ejemplo: [
      `Wil je ${m(ingreso)} per jaar overhouden, met ${m(gastos)} aan kosten en 25% belasting, dan moet je ${m(r.facturado)} omzet draaien.`,
      `Met 30 vrije dagen en 25 declarabele uren per week zijn dat ${formatearNumero(ctx, Math.round(r.horas))} uur per jaar. Je uurtarief wordt dan ${m(r.hora)} en je dagtarief ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Hoeveel uur per week kun je declareren?",
        respuesta: "Minder dan je werkt. Klanten zoeken, mailen, factureren en bijleren kosten tijd waar niemand voor betaalt. 20 tot 30 declarabele uren op 40 is normaal.",
      },
      {
        pregunta: "Reken je per uur of per project?",
        respuesta: "Allebei kan. Ook als je een vaste prijs per project vraagt, schat je de uren in en vermenigvuldig je die met dit tarief. Zo kom je niet tekort.",
      },
      {
        pregunta: "Met welk belastingpercentage moet je rekenen?",
        respuesta: nl
          ? "Dat hangt af van je situatie. Tel inkomstenbelasting en de bijdrage voor de zorgverzekering op, en houd rekening met ondernemersaftrek. Weet je het niet zeker, vraag het een boekhouder."
          : "Dat hangt af van je land en je situatie. Tel de belasting op je inkomen en je sociale bijdragen op. Weet je het niet zeker, vraag het een boekhouder.",
      },
    ],
    glosario: [
      { termino: "Declarabele uren", definicion: "Werkuren die je bij een klant in rekening brengt." },
      { termino: "Netto inkomen", definicion: "Wat je overhoudt na belastingen en zakelijke kosten." },
    ],
  };
};
