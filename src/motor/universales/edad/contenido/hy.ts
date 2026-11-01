import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionHy } from "../../dias-entre-fechas/textos/hy";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHy: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  const g = GRAMATICA.hy;
  return {
    h1: "Տարիքի հաշվիչ",
    title: tituloQueEntre(`Տարիքի հաշվիչ ${g.para(ctx.nombrePais)}`, "Տարիքի հաշվիչ՝ ճշգրիտ տարիք", "Տարիքի հաշվիչ"),
    description: "Հաշվարկեք Ձեր ճշգրիտ տարիքը տարիներով, ամիսներով և օրերով, քանի օր եք ապրել և որքան է մնացել մինչև հաջորդ ծննդյան օրը։",
    intro: [
      "Մուտքագրեք Ձեր ծննդյան ամսաթիվը և կտեսնեք Ձեր ճշգրիտ տարիքն այսօր, ինչպես նաև ամիսներով, շաբաթներով և օրերով։",
      "Փոխեք երկրորդ ամսաթիվը, որպեսզի իմանաք որևէ մեկի տարիքը որոշակի օրվա դրությամբ կամ քանի տարեկան կլինի նա։",
    ],
    comoSeCalcula: [
      "Հաշվվում են ծննդից մինչև ընտրված ամսաթիվը լրացած ամիսները։ Յուրաքանչյուր 12 ամիսը կազմում է մեկ տարի։",
      "Վերջին լրացած ամսից հետո մնացած օրերը տարիքի օրերն են։",
      "Նահանջ տարիները հաշվվում են իրենց 366 օրով։",
    ],
    ejemplo: [
      `Ծննդյան ամսաթիվ՝ ${fechaLarga(ctx.locale, nac)}, հաշվարկի ամսաթիվ՝ ${fechaLarga(ctx.locale, ref)}, տարիքը՝ ${duracionHy(Math.floor(meses / 12), meses % 12, dias)}։`,
      `Դա կազմում է ${formatearNumero(ctx, total)} օր։`,
    ],
    faq: [
      {
        pregunta: "Ինչպե՞ս է հաշվարկվում ճշգրիտ տարիքը",
        respuesta: "Նախ հաշվվում են լրացած տարիները, հետո՝ վերջին ծննդյան օրվանից լրացած ամիսները, և վերջում՝ մնացած օրերը։",
      },
      {
        pregunta: "Ի՞նչ է լինում փետրվարի 29 օրը ծնվածների դեպքում",
        respuesta: "Ոչ նահանջ տարիներին այս հաշվիչը որպես ծննդյան օր ընդունում է փետրվարի 28 օրը։ Որոշ օրենքներ դրա փոխարեն օգտագործում են մարտի 1 օրը։",
      },
      {
        pregunta: "Քանի՞ օրական եմ",
        respuesta: "Նայեք «Օրերով» տողը։ Այնտեղ հաշվված են ծննդից մինչև ընտրված ամսաթիվն ընկած բոլոր օրերը՝ առանց վերջին օրվա։",
      },
    ],
    glosario: [
      { termino: "Տարիք", definicion: "Ծննդից ի վեր լրացած տարիների թիվը։" },
      { termino: "Նահանջ տարի", definicion: "366 օր և փետրվարի 29 ունեցող տարի։ Լինում է չորս տարին մեկ, բացառությամբ որոշ դարամուտ տարիների։" },
    ],
  };
};
