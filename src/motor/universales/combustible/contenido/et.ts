import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Kui sõidad 150 miili ühes suunas ja sama tee tagasi autoga, mis läbib galloniga 30 miili, kulub kütust ${formatearNumero(ctx, galones)} gallonit.`,
          `Kui gallon maksab ${m(precio)}, läheb kütusele ${m(galones * precio)}. Kahe inimese vahel jagades maksab kumbki ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Kui sõidad 300 kilomeetrit ühes suunas ja sama tee tagasi autoga, mille kütusekulu on 8 liitrit 100 kilomeetri kohta, kulub kütust ${formatearNumero(ctx, litros)} liitrit.`,
          `Kui liiter maksab ${m(precio)}, läheb kütusele ${m(litros * precio)}. Kahe inimese vahel jagades maksab kumbki ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Arvuta sõidu kütusekulu",
    title: tituloQueEntre(
      `Kütusekalkulaator: kui palju sõit maksab | ${ctx.nombrePais}`,
      `Kütusekalkulaator | ${ctx.nombrePais}`,
      "Kütusekalkulaator",
    ),
    description: "Arvuta, kui palju sõit bensiini või diisli peale maksab teekonna pikkuse, auto kütusekulu ja kütuse hinna järgi ning mis on igaühe osa.",
    intro: [
      `Sisesta teekonna pikkus, auto kütusekulu ja ${imperial ? "galloni" : "liitri"} hind. Näed, kui palju kütust kulub ja mis sõit maksab.`,
      imperial
        ? "Kütusekulu esitatakse miilides galloni kohta, nagu auto kleebisel."
        : "Kütusekulu saad sisestada liitrites 100 kilomeetri kohta või kilomeetrites liitri kohta.",
    ],
    comoSeCalcula: imperial
      ? ["Gallonid = teekond ÷ miili galloni kohta.", "Maksumus = gallonid × galloni hind. Edasi-tagasi sõit teeb teekonna kaks korda pikemaks."]
      : [
          "Liitrites 100 kilomeetri kohta: liitrid = teekond × kütusekulu ÷ 100.",
          "Kilomeetrites liitri kohta: liitrid = teekond ÷ kütusekulu.",
          "Maksumus = liitrid × liitri hind. Edasi-tagasi sõit teeb teekonna kaks korda pikemaks.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Kuidas teisendada kilomeetrid liitri kohta liitriteks 100 kilomeetri kohta?",
        respuesta: `Jaga 100 kilomeetrite arvuga. Auto, mis läbib liitriga 16 kilomeetrit, kulutab ${formatearNumero(ctx, 100 / 16, 2)} liitrit 100 kilomeetri kohta.`,
      },
      {
        pregunta: "Kas teemaksud ja parkimine on arvestatud?",
        respuesta: "Ei. Arvutus hõlmab ainult kütust. Lisa teemaksud, praamipiletid ja parkimine eraldi.",
      },
      {
        pregunta: "Miks kulutab auto linnas rohkem?",
        respuesta: "Peatumine ja liikumahakkamine nõuavad rohkem energiat kui ühtlane sõit maanteel, seega on linnasõidu kütusekulu tavaliselt suurem.",
      },
    ],
    glosario: [
      { termino: "Kütusekulu", definicion: "Kui palju kütust auto teatud teekonnal kulutab." },
      { termino: "l/100 km", definicion: "Liitrit 100 kilomeetri kohta. Mida väiksem on arv, seda vähem auto kulutab." },
    ],
  };
};
