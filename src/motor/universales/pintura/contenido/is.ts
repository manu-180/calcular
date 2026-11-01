import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const margen = formatearCifra(ctx, MARGEN * 100);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Í herbergi með 48 ft af veggjum, 8 ft lofthæð og 40 ft² af hurðum og gluggum eru ${n(neta, 0)} ft² til að mála.`,
          `Með 2 umferðum og málningu sem þekur 350 ft² á gallon þarftu ${n(gal, 2)} gallon. Með viðbótinni þarftu ${n(gal * (1 + MARGEN), 2)} gallon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Í herbergi með 14 m af veggjum, ${n(2.6)} m lofthæð og 4 m² af hurðum og gluggum eru ${n(neta)} m² til að mála.`,
          `Með 2 umferðum og málningu sem þekur 10 m² á lítra þarftu ${n(litros, 2)} lítra. Með viðbótinni þarftu ${n(litros * (1 + MARGEN), 2)} lítra.`,
        ];
      })();
  return {
    h1: "Hvað þarf ég mikla málningu?",
    title: tituloQueEntre(
      `Hvað þarf ég mikla málningu? Reiknaðu magnið | ${ctx.nombrePais}`,
      `Málning: hvað þarf ég mikið? | ${ctx.nombrePais}`,
      "Hvað þarf ég mikla málningu?",
    ),
    description: "Reiknaðu hvað þú þarft mikla málningu á veggina út frá málum, hurðum og gluggum, fjölda umferða og þekjunni sem stendur á dósinni.",
    intro: [
      "Sláðu inn lengd og hæð veggjanna (eða flötinn beint), hvað hurðir og gluggar taka mikið pláss og hvað þú ætlar að fara margar umferðir.",
      `Reiknivélin bætir ${margen}% við svo málningin klárist ekki á miðri leið.`,
    ],
    comoSeCalcula: [
      "Flötur = samanlögð lengd veggja × hæð, að frádregnum hurðum og gluggum.",
      "Málning = flötur × fjöldi umferða ÷ þekja.",
      `Síðan bætast ${margen}% við.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvað dugar einn lítri af málningu langt?",
        respuesta: "Flest innimálning þekur um 8 til 12 m² á lítra í hverri umferð. Nákvæma talan stendur á dósinni.",
      },
      {
        pregunta: "Hvað þarf margar umferðir?",
        respuesta: "Tvær umferðir eru það venjulega. Nýspartlaðir eða mjög sogandi veggir, eða mikil litabreyting, geta kallað á þá þriðju.",
      },
      {
        pregunta: "Á ég að draga hurðir og glugga frá?",
        respuesta: "Já, ef þau eru stór. Lítil op er betra að láta eiga sig, því aukamálningin fer í kanta og horn.",
      },
    ],
    glosario: [
      { termino: "Þekja", definicion: "Hvað einn lítri eða gallon af málningu þekur stóran flöt í einni umferð." },
      { termino: "Umferð", definicion: "Hvert lag af málningu sem fer á vegginn." },
    ],
  };
};
