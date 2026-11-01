import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Šeimos biudžetas pagal 50/30/20 taisyklę",
    title: tituloQueEntre(
      `Šeimos biudžetas 50/30/20 ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Šeimos biudžetas pagal 50/30/20 taisyklę",
      "Šeimos biudžetas 50/30/20",
    ),
    description: "Paskirstykite grynąsias mėnesio pajamas pagal 50/30/20 taisyklę: kiek būtinoms išlaidoms, kiek malonumams ir kiek santaupoms. Procentus galite keisti.",
    intro: [
      "50/30/20 taisyklė yra paprastas būdas susiplanuoti mėnesį. Pusė pajamų skiriama būtiniausiems dalykams, 30 % malonumams ir 20 % santaupoms.",
      "Įveskite grynąsias pajamas ir pamatysite, kiek tenka kiekvienai daliai. Jei jūsų padėtis kitokia, pavyzdžiui, dėl didelės nuomos, procentus pakeiskite.",
    ],
    comoSeCalcula: [
      "Būtinos išlaidos = pajamos × 50 %.",
      "Malonumai ir norai = pajamos × 30 %.",
      "Santaupos = pajamos × 20 %. Visų trijų procentų suma turi būti lygi 100 %.",
    ],
    ejemplo: [
      `Kai pajamos yra ${m(ingreso)} per mėnesį: ${m(ingreso * 0.5)} būtinoms išlaidoms, ${m(ingreso * 0.3)} malonumams ir norams, ${m(ingreso * 0.2)} santaupoms.`,
      `Per metus šie 20 % sudaro ${m(ingreso * 0.2 * 12)} santaupų.`,
    ],
    faq: [
      {
        pregunta: "Kas priskiriama būtinoms išlaidoms, o kas malonumams?",
        respuesta:
          "Būtinos yra tos išlaidos, kurias sumokėti privalote: būstas, pagrindinis maistas, komunaliniai mokesčiai, transportas, sveikata ir privalomos įmokos. Malonumai ir norai yra tai, be ko prireikus galėtumėte apsieiti.",
      },
      {
        pregunta: "Ką daryti, jei būtinos išlaidos viršija 50 %?",
        respuesta: "Taip būna dažnai, ypač kai nuoma didelė. Išbandykite 60/20/20 arba 70/20/10 paskirstymą ir nemažinkite santaupų iki nulio.",
      },
      {
        pregunta: "Ar skolų įmokos laikomos santaupomis?",
        respuesta: "Privalomos įmokos priskiriamos būtinoms išlaidoms. Tai, ką mokate papildomai, kad skolų atsikratytumėte greičiau, skaičiuojama kaip santaupos, nes finansinę padėtį gerina taip pat kaip taupymas.",
      },
    ],
    glosario: [
      { termino: "Grynosios pajamos", definicion: "Kiek gaunate, atskaičius mokesčius ir įmokas." },
      { termino: "50/30/20 taisyklė", definicion: "Būdas paskirstyti pajamas tarp būtinų išlaidų, malonumų ir santaupų." },
    ],
  };
};
