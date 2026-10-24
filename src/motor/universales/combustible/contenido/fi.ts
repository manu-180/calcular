import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Kun ajat 150 mailia suuntaansa ja takaisin autolla, joka kulkee 30 mailia gallonalla, polttoainetta kuluu ${formatearNumero(ctx, galones)} gallonaa.`,
          `Kun gallona maksaa ${m(precio)}, polttoaineeseen menee ${m(galones * precio)}. Kahden hengen kesken jaettuna kukin maksaa ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Kun ajat 300 kilometriä suuntaansa ja takaisin autolla, joka kuluttaa 8 litraa sadalla kilometrillä, polttoainetta kuluu ${formatearNumero(ctx, litros)} litraa.`,
          `Kun litra maksaa ${m(precio)}, polttoaineeseen menee ${m(litros * precio)}. Kahden hengen kesken jaettuna kukin maksaa ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Laske matkan polttoainekustannukset",
    title: tituloQueEntre(
      `Polttoainelaskuri: paljonko matka maksaa | ${ctx.nombrePais}`,
      `Polttoainelaskuri | ${ctx.nombrePais}`,
      "Polttoainelaskuri",
    ),
    description: "Laske, paljonko matka maksaa bensiinissä tai dieselissä matkan pituuden, auton kulutuksen ja polttoaineen hinnan perusteella, ja mitä kukin maksaa.",
    intro: [
      `Syötä matkan pituus, auton kulutus ja ${imperial ? "gallonan" : "litran"} hinta. Näet, paljonko polttoainetta kuluu ja mitä matka maksaa.`,
      imperial
        ? "Kulutus ilmoitetaan maileina gallonalla, kuten auton tarrassa."
        : "Kulutuksen voi ilmoittaa litroina sadalla kilometrillä tai kilometreinä litralla.",
    ],
    comoSeCalcula: imperial
      ? ["Gallonat = matka ÷ mailia gallonalla.", "Kustannus = gallonat × gallonan hinta. Meno ja paluu kaksinkertaistaa matkan."]
      : [
          "Litroina sadalla kilometrillä: litrat = matka × kulutus ÷ 100.",
          "Kilometreinä litralla: litrat = matka ÷ kulutus.",
          "Kustannus = litrat × litrahinta. Meno ja paluu kaksinkertaistaa matkan.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Miten muutan kilometrit litralla litroiksi sadalla kilometrillä?",
        respuesta: `Jaa 100 kilometrimäärällä. Auto, joka kulkee 16 kilometriä litralla, kuluttaa ${formatearNumero(ctx, 100 / 16, 2)} litraa sadalla kilometrillä.`,
      },
      {
        pregunta: "Sisältyvätkö tiemaksut ja pysäköinti?",
        respuesta: "Eivät. Laskelma koskee vain polttoainetta. Lisää tiemaksut, lauttamaksut ja pysäköinti erikseen.",
      },
      {
        pregunta: "Miksi auto kuluttaa kaupungissa enemmän?",
        respuesta: "Pysähtyminen ja liikkeellelähtö vievät enemmän energiaa kuin tasainen ajo maantiellä, joten kaupunkiajon kulutus on yleensä suurempi.",
      },
    ],
    glosario: [
      { termino: "Polttoaineen kulutus", definicion: "Kuinka paljon polttoainetta auto kuluttaa tietyllä matkalla." },
      { termino: "l/100 km", definicion: "Litraa sadalla kilometrillä. Mitä pienempi luku, sitä vähemmän auto kuluttaa." },
    ],
  };
};
