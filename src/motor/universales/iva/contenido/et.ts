import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Käibemaksu kalkulaator: ${ctx.nombrePais}`,
    title: tituloQueEntre(
      `Käibemaksu kalkulaator (${tasa}): arvuta käibemaks | ${ctx.nombrePais}`,
      `Käibemaksu kalkulaator (${tasa}) | ${ctx.nombrePais}`,
      `Käibemaksu kalkulaator (${tasa})`,
    ),
    description: `Lisa käibemaks (${tasa}) mis tahes hinnale või eemalda see ühe korraga. Näed käibemaksuta hinda, maksu summat ja käibemaksuga hinda.`,
    intro: [
      `Kalkulaator kasutab käibemaksu üldist määra: ${tasa}. Riik: ${ctx.nombrePais}.`,
      "Vali, kas lisad maksu käibemaksuta hinnale või eemaldad selle hinnast, mis juba sisaldab maksu. Seejärel sisesta summa.",
    ],
    comoSeCalcula: [
      "Käibemaksu lisamine: maks = käibemaksuta hind × maksumäär ÷ 100. Käibemaksuga hind = käibemaksuta hind + maks.",
      "Käibemaksu eemaldamine: käibemaksuta hind = käibemaksuga hind ÷ (1 + maksumäär ÷ 100). Maks on nende vahe.",
      "Kui tootele kehtib vähendatud määr, sisesta see väljale „Muu maksumäär“.",
    ],
    ejemplo: [
      `Hind on ${precio} ja tahad maksu lisada: korruta summa maksumääraga (${tasa}) ja liida tulemus hinnale.`,
      `Hind on ${precio} ja sisaldab juba maksu: jaga summa arvuga 1 pluss maksumäär ja lahuta tulemus algsest hinnast. Vahe ongi käibemaks.`,
    ],
    faq: [
      {
        pregunta: "Kuidas käibemaksu hinnast eemaldada?",
        respuesta: "Jaga hind arvuga 1 pluss maksumäär kümnendarvuna. Tulemus on käibemaksuta hind ja vahe on käibemaks.",
      },
      {
        pregunta: "Miks ei saa maksumäära lihtsalt käibemaksuga hinnast lahutada?",
        respuesta: "Sest maks arvutati väiksemast, käibemaksuta hinnast. Kui lahutad protsendi käibemaksuga hinnast, lahutad liiga palju.",
      },
      {
        pregunta: `Kas määr ${tasa} kehtib kõigele?`,
        respuesta: "Mitte alati. Toidule, raamatutele, ühistranspordile ja mõnele teenusele võib kehtida vähendatud määr või need võivad olla maksuvabad. Kasuta siis välja „Muu maksumäär“.",
      },
    ],
    glosario: [
      { termino: "Käibemaks (KM)", definicion: "Maks, mis lisatakse kaupade ja teenuste hinnale." },
      { termino: "Käibemaksuta hind", definicion: "Hind enne käibemaksu lisamist." },
    ],
  };
};
