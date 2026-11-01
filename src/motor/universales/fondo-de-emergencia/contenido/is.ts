import { formaIs } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const mesesHastaMeta = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Varasjóður: hve stóran varasjóð þarftu?",
    title: tituloQueEntre(
      `Varasjóður: reiknaðu hve stóran sjóð þú þarft | ${ctx.nombrePais}`,
      `Varasjóður | ${ctx.nombrePais}`,
      "Varasjóður",
    ),
    description: "Reiknaðu hve stóran varasjóð þú þarft miðað við nauðsynleg útgjöld og hve marga mánuði það tekur að safna honum.",
    intro: [
      "Varasjóður er fé sem er lagt til hliðar fyrir það sem ekki er hægt að sjá fyrir: atvinnumissi, veikindi eða bráða viðgerð heima fyrir.",
      "Með varasjóði sleppurðu við að taka lán einmitt þegar erfiðast er. Sláðu inn nauðsynleg útgjöld þín og hve marga mánuði þú vilt geta bjargað þér.",
    ],
    comoSeCalcula: [
      "Ráðlagður varasjóður = nauðsynleg útgjöld á mánuði × fjöldi mánaða.",
      "Eftir að spara = ráðlagður varasjóður − það sem þú átt þegar.",
      "Mánuðir þar til varasjóðurinn er tilbúinn = eftir að spara ÷ það sem þú sparar á mánuði, námundað upp.",
    ],
    ejemplo: [
      `Með ${m(gastos)} í nauðsynleg útgjöld á mánuði verður varasjóður fyrir 6 mánuði ${m(gastos * 6)}.`,
      `Ef þú sparar ${m(aporte)} á mánuði er varasjóðurinn tilbúinn eftir ${mesesHastaMeta} ${formaIs(mesesHastaMeta, "mánuð", "mánuði")}.`,
    ],
    faq: [
      {
        pregunta: "Hve marga mánuði á varasjóðurinn að duga?",
        respuesta:
          "Algeng þumalputtaregla er nauðsynleg útgjöld í 3 til 6 mánuði. Ef tekjurnar sveiflast, þú ert með eigin rekstur eða aðeins ein fyrirvinna er á heimilinu er öruggara að miða við 6 til 12 mánuði.",
      },
      {
        pregunta: "Hvar á ég að geyma varasjóðinn?",
        respuesta: "Á öruggum reikningi sem þú kemst í samdægurs, aðskildum frá reikningnum sem þú notar dags daglega. Varasjóðurinn á ekki heima í hlutabréfum. Hann þarf að vera til staðar þegar þú þarft á honum að halda.",
      },
      {
        pregunta: "Á ég að safna í varasjóð eða greiða fyrst niður lán?",
        respuesta: "Algeng leið er að safna fyrst fyrir útgjöldum eins mánaðar, greiða síðan niður dýr lán eins og kreditkortaskuldir og klára svo varasjóðinn.",
      },
    ],
    glosario: [
      { termino: "Nauðsynleg útgjöld", definicion: "Reikningar sem þú verður að greiða þótt tekjurnar hverfi: húsnæði, matur, rafmagn og heilbrigðisþjónusta." },
      { termino: "Laust fé", definicion: "Hve fljótt hægt er að nota peningana án þess að þeir tapi verðgildi." },
    ],
  };
};
