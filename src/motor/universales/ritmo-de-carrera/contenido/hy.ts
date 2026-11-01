import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoHy: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "մղոնի" : "կիլոմետրի";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  const g = GRAMATICA.hy;
  return {
    h1: "Վազքի տեմպի հաշվիչ",
    title: tituloQueEntre(`Վազքի տեմպի հաշվիչ ${g.para(ctx.nombrePais)}`, "Վազքի տեմպի հաշվիչ"),
    description: `Հաշվարկեք Ձեր տեմպը մեկ ${u} համար, վերջնական ժամանակը կամ հեռավորությունը՝ 5 կմ, 10 կմ, կիսամարաթոն կամ մարաթոն։`,
    intro: [
      "Երեք արժեքից երկուսով (հեռավորություն, ժամանակ և տեմպ) ստանում եք երրորդը։ Օգտագործեք այն՝ մրցավազք պլանավորելու կամ մարզումը ստուգելու համար։",
      "5 կմ, 10 կմ, կիսամարաթոնի և մարաթոնի հեռավորություններն արդեն մուտքագրված են։",
    ],
    comoSeCalcula: [
      `Տեմպ = ժամանակ ÷ հեռավորություն՝ րոպեներով և վայրկյաններով մեկ ${u} համար։`,
      "Ժամանակ = տեմպ × հեռավորություն։",
      "Հեռավորություն = ժամանակ ÷ տեմպ։ Միջին արագությունը հեռավորությունն է՝ բաժանած ժամերի վրա։",
    ],
    ejemplo: imperial
      ? [
          `3 մղոն 27 րոպեում նշանակում է 9:00 տեմպ մեկ մղոնի համար, միջին արագությունը՝ ${formatearNumero(ctx, 20 / 3, 2)} մղոն/ժ։`,
          `Կիսամարաթոնը (${formatearNumero(ctx, media, 2)} մղոն) ${ritmoTexto(ritmoMedia)} տեմպով մեկ մղոնի համար՝ վերջնական ժամանակը ${reloj(ritmoMedia * media)}։`,
        ]
      : [
          "10 կմ 50 րոպեում նշանակում է 5:00 տեմպ մեկ կիլոմետրի համար, միջին արագությունը՝ 12 կմ/ժ։",
          `Կիսամարաթոնը (${formatearNumero(ctx, media, 1)} կմ) ${ritmoTexto(ritmoMedia)} տեմպով մեկ կիլոմետրի համար՝ վերջնական ժամանակը ${reloj(ritmoMedia * media)}։`,
        ],
    faq: [
      {
        pregunta: `Ինչպե՞ս հաշվարկել իմ տեմպը մեկ ${u} համար`,
        respuesta: imperial
          ? `Ժամանակը վերածեք րոպեների և բաժանեք մղոնների վրա։ 3 մղոն 28 րոպե 30 վայրկյանում տալիս է ${formatearNumero(ctx, 9.5, 1)} րոպե մեկ մղոնի համար, այսինքն՝ 9:30։`
          : `Ժամանակը վերածեք րոպեների և բաժանեք կիլոմետրերի վրա։ 10 կմ 55 րոպեում տալիս է ${formatearNumero(ctx, 5.5, 1)} րոպե մեկ կիլոմետրի համար, այսինքն՝ 5:30։`,
      },
      {
        pregunta: "Ո՞ր տեմպն է լավ սկսնակի համար",
        respuesta: "Այն տեմպը, որի դեպքում վազելիս դեռ կարող եք խոսել։ Մարզավիճակը բարելավելուն զուգընթաց այդ տեմպն արագանում է։",
      },
      {
        pregunta: "Որքա՞ն է մարաթոնի երկարությունը",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} կմ (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} մղոն)։ Կիսամարաթոնը դրա կեսն է։`,
      },
    ],
    glosario: [
      { termino: "Տեմպ", definicion: "Որքան ժամանակ է Ձեզ պետք մեկ կիլոմետր կամ մեկ մղոն վազելու համար։" },
      { termino: "Միջին արագություն", definicion: "Մեկ ժամում անցած հեռավորությունը։" },
    ],
  };
};
