import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Intressikalkulaator",
    title: tituloQueEntre(
      `Intressikalkulaator: arvuta summa intress | ${ctx.nombrePais}`,
      `Intressikalkulaator | ${ctx.nombrePais}`,
      "Intressikalkulaator",
    ),
    description: "Arvuta summa lihtintress aastaintressi järgi päevade, kuude või aastate kohta. Vali 365- või 360-päevane aasta ja vaata lõppsummat.",
    intro: [
      "Lihtintressi arvestatakse alati algsummalt. Intressi ei lisata perioodi jooksul saldole.",
      "Seda kasutatakse lühikeste hoiuste, eraisikute vaheliste laenude ja paljude koolisülesannete puhul.",
    ],
    comoSeCalcula: [
      "Intress = põhisumma × aastaintress × aeg aastates.",
      "Kuudes antud aeg jagatakse 12 kuuga. Päevades antud aeg jagatakse 365 või 360 päevaga, olenevalt sellest, millist aastat pank kasutab.",
      "Lõppsumma = põhisumma + intress.",
    ],
    ejemplo: [
      `Põhisumma ${m(capital)} aastaintressiga 10% annab 6 kuu jooksul intressi ${m(capital * 0.1 * 0.5)}.`,
      `Sama summa annab 90 päeva jooksul intressi ${m((capital * 0.1 * 90) / 365)}, kui aastas on 365 päeva, ja ${m((capital * 0.1 * 90) / 360)}, kui aastas on 360 päeva.`,
    ],
    faq: [
      {
        pregunta: "Kuidas summa intressi arvutada?",
        respuesta: `Intress = K × r × t. K on põhisumma, r on aastaintress kümnendarvuna (10% on ${formatearNumero(ctx, 0.1, 2)}) ja t on aeg aastates.`,
      },
      {
        pregunta: "Mis vahe on liitintressiga?",
        respuesta: "Lihtintressi arvestatakse alati samalt summalt. Liitintressi puhul lisatakse intress saldole ja see hakkab ise intressi kasvatama.",
      },
      {
        pregunta: "Miks mõned pangad arvestavad 360 päevaga?",
        respuesta: "See on panganduses levinud tava, mis lihtsustab arvutamist. 360-päevase aastaga on intress veidi suurem. Kontrolli, mida sinu pank kasutab.",
      },
    ],
    glosario: [
      { termino: "Põhisumma", definicion: "Raha, mis laenatakse või investeeritakse." },
      { termino: "Pangandusaasta", definicion: "Aasta, mida arvestatakse 360-päevasena ja kus igas kuus on 30 päeva." },
    ],
  };
};
