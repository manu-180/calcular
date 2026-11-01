import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const real = formatearCifra(ctx, (1.07 / 1.03 - 1) * 100, 1);
  return {
    h1: "Eftirlaunasparnaður: reiknaðu þinn eigin sparnað",
    title: tituloQueEntre(
      `Eftirlaunasparnaður: reiknaðu sparnaðinn við starfslok | ${ctx.nombrePais}`,
      `Eftirlaunasparnaður | ${ctx.nombrePais}`,
      "Eftirlaunasparnaður",
    ),
    description: "Sjáðu hve miklu þú getur safnað til eftirlaunaáranna með mánaðarlegum sparnaði og hvað það gefur á mánuði, reiknað á verðlagi dagsins.",
    intro: [
      "Lífeyrir dugar oft ekki til að halda sömu lífskjörum eftir starfslok. Eigin sparnaður skiptir miklu, jafnvel þótt hann sé lítill, ef þú byrjar snemma.",
      "Sláðu inn aldur þinn, hvenær þú vilt hætta að vinna, hvað þú hefur sparað og hve mikið þú getur lagt fyrir á mánuði. Þá sérðu sparnaðinn við starfslok og hve mikið þú getur tekið út af honum á mánuði.",
    ],
    comoSeCalcula: [
      "Sparnaðurinn vex í hverjum mánuði með raunávöxtun, það er ávöxtun að frádreginni verðbólgu. Þess vegna er niðurstaðan á verðlagi dagsins.",
      "Við starfslok er sparnaðurinn greiddur út í jöfnum mánaðarlegum upphæðum í þau ár sem þú velur. Það sem eftir stendur heldur áfram að vaxa á meðan.",
      "Lífeyrir frá ríki eða lífeyrissjóði, skattar og gjöld vegna sjóða eða eignastýringar eru ekki með í útreikningnum.",
    ],
    ejemplo: [
      `Með ${m(actual)} í sparnað við 30 ára aldur og ${m(aporte)} á mánuði með 4% raunávöxtun áttu ${m(capital30)} við 65 ára aldur. Það dugar fyrir ${m(rentaMensual(capital30, 4, 25))} á mánuði í 25 ár.`,
      `Ef þú byrjar við 40 ára aldur með sömu tölur nærðu ${m(capital40)}. Tíu ár skipta miklu.`,
    ],
    faq: [
      {
        pregunta: "Hvað er raunávöxtun?",
        respuesta: `Það sem fjárfesting gefur eftir verðbólgu. Ef fjárfesting gefur 7% og verðbólgan er 3% er raunávöxtunin um það bil ${real}%.`,
      },
      {
        pregunta: "Kemur þetta í staðinn fyrir lífeyrinn minn?",
        respuesta: "Nei. Þetta er þinn eigin sparnaður til viðbótar við lífeyri frá ríki og lífeyrissjóði. Ef þú vilt vita hvað þú færð í lífeyri skaltu leita til lífeyrissjóðsins þíns eða opinberra aðila þar sem þú býrð.",
      },
      {
        pregunta: "Hve mikið ætti ég að spara til eftirlaunaáranna?",
        respuesta: "Engin ein tala hentar öllum. Algeng þumalputtaregla er 10% til 15% af tekjum. Mestu skiptir að byrja eins snemma og þú getur.",
      },
    ],
    glosario: [
      { termino: "Raunávöxtun", definicion: "Það sem fjárfesting gefur umfram verðbólgu." },
      { termino: "Verðlag dagsins", definicion: "Framtíðarupphæð sett fram miðað við hvað hún myndi duga fyrir í dag." },
    ],
  };
};
