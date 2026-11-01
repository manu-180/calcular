import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Tootluse kalkulaator: arvuta investeeringu tootlus (ROI ja CAGR)",
    title: tituloQueEntre(
      `Tootluse kalkulaator: kogutootlus ja aastatootlus | ${ctx.nombrePais}`,
      `Tootluse kalkulaator | ${ctx.nombrePais}`,
      "Tootluse kalkulaator",
    ),
    description: "Arvuta investeeringu kogutootlus (ROI) ja aastatootlus (CAGR) investeeritud summa, praeguse väärtuse ja aastate järgi.",
    intro: [
      "Kasum 50% kõlab hästi, kuid see ei tähenda kahe aasta jooksul sama mis kümne aasta jooksul. Investeeringute võrdlemiseks on vaja tootlust aasta kohta.",
      "Sisesta, kui palju investeerisid, kui palju investeering praegu väärt on ja mitu aastat on möödunud. Näed kogutootlust ja liitintressina arvutatud aastatootlust.",
    ],
    comoSeCalcula: [
      "ROI = (lõppväärtus + saadud tulu − investeeritud summa) ÷ investeeritud summa × 100.",
      "CAGR = ((lõppväärtus + saadud tulu) ÷ investeeritud summa) astmes (1 ÷ aastad), miinus 1.",
      "CAGR on keskmine aastane kasv liitintressina ehk tempo, mis annab sama tulemuse, kui see kordub igal aastal.",
    ],
    ejemplo: [
      `Kui investeerid ${m(inicial)} ja lõppväärtus on ${m(final)}, on kasum ${m(final - inicial)}. ROI on siis ${p(roi(inicial, final))}.`,
      `Kui selleks kulus 5 aastat, on aastatootlus ${p(cagr(inicial, final, 5))}. Kui selleks kulus 2 aastat, on see ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Mis vahe on ROI-l ja CAGR-il?",
        respuesta: "ROI on kogu kasum võrreldes investeeritud summaga, sõltumata sellest, kui kaua see aega võttis. CAGR jagab selle aastatele, nii saad võrrelda eri pikkusega investeeringuid.",
      },
      {
        pregunta: "Miks aastatootlus ei ole kogutootlus jagatud aastatega?",
        respuesta: `Sest iga aasta kasum lisatakse kapitalile ja kasvab samuti. Kasum 50% viie aasta jooksul vastab liitintressina arvutatult aastatootlusele ${p(cagr(1, 1.5, 5))}, mitte ${formatearCifra(ctx, 50 / 5)}%.`,
      },
      {
        pregunta: "Kuidas arvestada saadud dividende või intresse?",
        respuesta: "Lisa need saadud tulu lahtrisse, kui võtsid raha endale. Kui investeerisid need uuesti, on need lõppväärtuses juba sees.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment ehk investeeritud kapitali tootlus: kogu kasum protsentides investeeritud summast." },
      { termino: "CAGR", definicion: "Compound annual growth rate ehk keskmine aastatootlus liitintressina arvutatult." },
    ],
  };
};
