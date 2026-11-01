import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Karl sem er 35 ára, 180 lb og 5 fet og 10 tommur á hæð er með grunnefnaskipti upp á um það bil ${n(basal)} kcal.`,
          `Með litla hreyfingu heldur hann þyngdinni á um það bil ${n(basal * FACTORES.sedentaria)} kcal á dag.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Kona sem er 30 ára, 60 kg og 165 cm á hæð er með grunnefnaskipti upp á um það bil ${n(basal)} kcal.`,
          `Með hóflega hreyfingu heldur hún þyngdinni á um það bil ${n(basal * FACTORES.moderada)} kcal á dag.`,
        ];
      })();
  return {
    h1: "Reiknaðu hitaeiningaþörfina þína",
    title: tituloQueEntre(
      `Kaloríureiknivél: hitaeiningar á dag | ${ctx.nombrePais}`,
      `Kaloríureiknivél | ${ctx.nombrePais}`,
      "Kaloríureiknivél",
    ),
    description: "Reiknaðu hversu mörgum hitaeiningum þú brennir á dag út frá aldri, þyngd, hæð og hreyfingu og hversu mikið þú ættir að borða til að ná þyngdarmarkmiðinu þínu.",
    intro: [
      "Sláðu inn upplýsingarnar þínar og hversu mikið þú hreyfir þig. Þú sérð grunnefnaskiptin og orkuþörfina á venjulegum degi.",
      "Þetta er gróf áætlun. Hún kemur ekki í stað mats næringarfræðings, læknis eða annars heilbrigðisstarfsfólks.",
    ],
    comoSeCalcula: [
      `Grunnefnaskipti (Mifflin-St Jeor): 10 × þyngd í kg + ${n(6.25, 2)} × hæð í cm − 5 × aldur, plús 5 fyrir karla eða mínus 161 fyrir konur.`,
      `Orkuþörf = grunnefnaskipti × hreyfingarstuðull, frá ${n(1.2, 1)} (lítil hreyfing) upp í ${n(1.9, 1)} (mjög mikil).`,
      `Til að léttast eru ${DEFICIT} kcal dregnar frá á dag og til að þyngjast er ${SUPERAVIT} kcal bætt við. Þetta er hófleg breyting sem hægt er að halda út.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvað eru grunnefnaskipti?",
        respuesta: "Það er orkan sem líkaminn notar í algjörri hvíld til að anda, halda á sér hita og halda líffærunum gangandi.",
      },
      {
        pregunta: "Hversu margar hitaeiningar ætti ég að borða til að léttast?",
        respuesta: `Algengur upphafspunktur er um ${DEFICIT} kcal minna á dag en orkuþörfin þín. Best er að ákveða það í samráði við heilbrigðisstarfsfólk.`,
      },
      {
        pregunta: "Hversu nákvæm er formúlan?",
        respuesta: "Mifflin-St Jeor er ein mest notaða formúlan, en hún gefur meðaltal. Erfðir, vöðvamassi og heilsa hafa áhrif á það sem þú brennir í raun.",
      },
    ],
    glosario: [
      { termino: "Hitaeining (kcal)", definicion: "Eining fyrir orkuna í mat og það sem líkaminn brennir." },
      { termino: "Grunnefnaskipti", definicion: "Hitaeiningarnar sem líkaminn brennir í algjörri hvíld." },
    ],
  };
};
