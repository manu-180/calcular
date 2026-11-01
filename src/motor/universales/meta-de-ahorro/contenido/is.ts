import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  const hundra = montoEjemplo(ctx, 100);
  return {
    h1: "Sparnaðarmarkmið: hve mikið þarftu að spara?",
    title: tituloQueEntre(
      `Sparnaðarmarkmið: hve mikið á ég að spara á mánuði | ${ctx.nombrePais}`,
      `Sparnaðarmarkmið | ${ctx.nombrePais}`,
      "Sparnaðarmarkmið",
    ),
    description: "Reiknaðu hve mikið þú þarft að spara á mánuði til að ná sparnaðarmarkmiðinu á réttum tíma, með því sem þú átt þegar og vöxtunum sem sparnaðurinn gefur.",
    intro: [
      "Ferðalag, bíll, útborgun í íbúð eða varasjóður fyrir óvænt útgjöld. Markmið með upphæð og dagsetningu er mun auðveldara að ná.",
      "Sláðu inn hve miklu þú vilt safna og á hve mörgum mánuðum. Þú sérð hve mikið þú þarft að leggja til hliðar á mánuði og á viku.",
    ],
    comoSeCalcula: [
      "Fyrst er reiknað hve mikið það sem þú hefur þegar sparað nær að vaxa til loka tímabilsins.",
      "Því sem upp á vantar er skipt í jafnar innborganir í hverjum mánuði.",
      "Ef sparnaðurinn gefur vexti vex líka hver innborgun, svo þú þarft að leggja aðeins minna inn.",
    ],
    ejemplo: [
      `Til að safna ${m(meta)} á 24 mánuðum án vaxta þarftu að spara ${m(meta / 24)} á mánuði.`,
      `Ef þú átt þegar ${m(actual)} og færð 5% ávöxtun á ári dugar að spara ${m(aporteNecesario(meta, actual, 24, 5))} á mánuði.`,
    ],
    faq: [
      {
        pregunta: "Hvernig held ég mig við sparnaðarmarkmiðið?",
        respuesta: "Færðu peningana um leið og launin koma, áður en þú nærð að eyða þeim. Best er að setja upp sjálfvirka millifærslu á sérstakan sparireikning.",
      },
      {
        pregunta: "Hvað geri ég ef mánaðarlega upphæðin verður of há?",
        respuesta: "Gefðu þér lengri tíma eða lækkaðu markmiðið. Þú getur líka byrjað á því sem þú hefur efni á og hækkað upphæðina þegar tekjurnar aukast.",
      },
      {
        pregunta: "Á ég að reikna með verðbólgu?",
        respuesta: `Ef markmiðið er nokkur ár fram í tímann skaltu bæta við þeirri verðbólgu sem þú gerir ráð fyrir. Það sem kostar ${m(hundra)} í dag getur kostað talsvert meira þegar þar að kemur.`,
      },
    ],
    glosario: [
      { termino: "Innborgun", definicion: "Peningarnir sem þú leggur til hliðar í hverjum mánuði fyrir markmiðið." },
      { termino: "Ávöxtun", definicion: "Það sem sparnaðurinn gefur á reikningi eða í fjárfestingu." },
    ],
  };
};
