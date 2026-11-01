import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Lánareiknivél",
    title: tituloQueEntre(
      `Lánareiknivél: reiknaðu mánaðarlega greiðslu og vexti | ${ctx.nombrePais}`,
      `Lánareiknivél | ${ctx.nombrePais}`,
      "Lánareiknivél",
    ),
    description: "Reiknaðu mánaðarlega greiðslu af láni, vextina samtals og alla greiðsluáætlunina. Sjáðu hve mikið aukagreiðslur spara þér.",
    intro: [
      "Áður en þú tekur lán skipta tvær tölur mestu máli. Hvað þú greiðir í hverjum mánuði og hvað lánið kostar þig í vexti.",
      "Sláðu inn upphæð, ársvexti og lánstíma. Ef þú ætlar að greiða aðeins aukalega í hverjum mánuði skaltu slá það líka inn og sjá hve miklu fyrr þú klárar lánið.",
    ],
    comoSeCalcula: [
      "Reiknivélin miðar við jafnar greiðslur, það er sömu greiðslu í hverjum mánuði. Það er algengt á neytendalánum, bílalánum og húsnæðislánum.",
      "Mánaðarvextir = ársvextir ÷ 12.",
      "Mánaðarleg greiðsla = upphæð × mánaðarvextir ÷ (1 − (1 + mánaðarvextir) í veldinu mínus fjöldi greiðslna).",
      "Í hverjum mánuði reiknast vextir af eftirstöðvunum. Afgangurinn af greiðslunni er afborgun og lækkar skuldina.",
    ],
    ejemplo: [
      `Lán upp á ${m(monto)} með 12% ársvöxtum til 36 mánaða kostar ${m(cuota36)} á mánuði. Samtals greiðirðu ${m(interesesTotales(monto, 12, 36))} í vexti.`,
      `Ef þú lengir lánstímann í 60 mánuði lækkar mánaðarleg greiðsla í ${m(cuota60)}, en vextirnir hækka í ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig er mánaðarleg greiðsla af láni reiknuð?",
        respuesta:
          "Með formúlu fyrir jafnar greiðslur. Allar greiðslur eru jafnháar, en í byrjun eru þær að mestu vextir og undir lokin að mestu afborgun. Þess vegna lækkar skuldin hægt í byrjun.",
      },
      {
        pregunta: "Borgar sig að greiða lánið upp fyrr?",
        respuesta:
          "Oftast já, svo framarlega sem uppgreiðslugjaldið er ekki hátt. Aukagreiðslur fara beint í skuldina og sá hluti ber ekki lengur vexti. Því fyrr sem þú greiðir, því meira sparar þú.",
      },
      {
        pregunta: "Er lengri lánstími betri?",
        respuesta: "Mánaðarleg greiðsla verður lægri, en þú greiðir mun meira í vexti samtals. Berðu báðar tölurnar saman áður en þú ákveður þig.",
      },
      {
        pregunta: "Af hverju fær bankinn aðra mánaðarlega greiðslu?",
        respuesta:
          "Lánveitendur bæta oft við gjöldum, tryggingum eða sköttum, eða nota aðra vexti en þá sem eru auglýstir. Berðu tilboð saman eftir árlegri hlutfallstölu kostnaðar (ÁHK) og heildarkostnaði, ekki bara nafnvöxtum.",
      },
    ],
    glosario: [
      { termino: "Eftirstöðvar", definicion: "Sá hluti lánsins sem þú hefur ekki enn greitt til baka." },
      { termino: "Nafnvextir", definicion: "Ársvextirnir sem deilt er með 12 til að fá vexti hvers mánaðar." },
      { termino: "Afborgun", definicion: "Sá hluti greiðslunnar sem lækkar skuldina." },
    ],
  };
};
