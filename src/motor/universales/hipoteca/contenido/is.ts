import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Reiknivél fyrir húsnæðislán",
    title: tituloQueEntre(
      `Húsnæðislán: reiknaðu mánaðarlega greiðslu | ${ctx.nombrePais}`,
      `Húsnæðislán | ${ctx.nombrePais}`,
      "Húsnæðislán",
    ),
    description: "Reiknaðu mánaðarlega greiðslu af húsnæðisláni út frá verði, útborgun, vöxtum og lánstíma. Sjáðu vextina samtals og hvernig skuldin lækkar ár fyrir ár.",
    intro: [
      "Húsnæðislánið er stærsta skuld sem flest heimili taka. Það borgar sig að sjá allan útreikninginn áður en þú talar við bankann.",
      "Sláðu inn verð, útborgun, vexti og lánstíma. Ef þú greiðir í hússjóð eða rekstrarkostnað skaltu bæta honum við og þá sérðu raunverulegan húsnæðiskostnað á mánuði.",
    ],
    comoSeCalcula: [
      "Lánsupphæð = verð eignarinnar − útborgun.",
      "Mánaðarleg greiðsla er reiknuð sem lán með jöfnum greiðslum, þar sem ársvöxtum er deilt með 12 og lánstíminn er í mánuðum.",
      "Fyrir hvert ár eru greiddir vextir og afborganir lagðar saman og þú sérð hve mikið er eftir að greiða.",
    ],
    ejemplo: [
      `Eign á ${m(precio)} með 20% útborgun þýðir lán upp á ${m(prestado)}. Með 7% vöxtum og 30 ára lánstíma verður mánaðarleg greiðsla ${m(cuota30)}.`,
      `Á 30 árum greiðirðu ${m(interesesTotales(prestado, 7, 360))} í vexti. Með 15 ára lánstíma hækkar mánaðarleg greiðsla í ${m(cuota15)}, en vextirnir lækka í ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Hve mikla útborgun þarf ég?",
        respuesta:
          "Það fer eftir bankanum og reglunum þar sem þú kaupir. Því meiri sem útborgunin er, því minna tekurðu að láni, því lægri verður mánaðarleg greiðsla og því minna greiðirðu í vexti. Gerðu líka ráð fyrir kostnaðinum við kaupin.",
      },
      {
        pregunta: "Af hverju lækkar skuldin svona lítið fyrstu árin?",
        respuesta:
          "Vextirnir reiknast af því sem þú skuldar. Í byrjun er skuldin mikil, svo stærstur hluti hverrar greiðslu fer í vexti. Með tímanum verður afborgunin stærri hlutinn.",
      },
      {
        pregunta: "Er styttri lánstími betri?",
        respuesta:
          "Já, ef þú ræður við hærri mánaðarlega greiðslu. Þú greiðir þá mun minna í vexti. Annars gengur líka að taka lengri lánstíma og greiða aukalega inn á lánið þegar þú hefur efni á því.",
      },
      {
        pregunta: "Reiknar bankinn á sama hátt?",
        respuesta:
          "Ekki alltaf. Sumir bankar bjóða líka lán með jöfnum afborgunum, þar sem afborgunin er sú sama í hverjum mánuði og vaxtakostnaðurinn lækkar með tímanum. Hér er reiknað með jöfnum greiðslum og sömu vöxtum allan lánstímann. Með breytilegum vöxtum getur greiðslan breyst.",
      },
    ],
    glosario: [
      { termino: "Útborgun", definicion: "Sá hluti verðsins sem þú greiðir með eigin fé." },
      { termino: "Afborgun", definicion: "Sá hluti greiðslunnar sem lækkar skuldina." },
      { termino: "Jafnar greiðslur", definicion: "Lán þar sem hver mánaðarleg greiðsla er jafnhá, vextir og afborgun saman." },
    ],
  };
};
