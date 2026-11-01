import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Človek s hmotnosťou 160 lb a výškou 5 ft 9 in má BMI ${n((160 * KG_POR_LB) / (m * m))}. To je normálna hmotnosť.`,
        `Zdravá hmotnosť pri tejto výške je od ${n((18.5 * m * m) / KG_POR_LB)} lb do ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Človek s hmotnosťou 70 kg a výškou ${n(1.75, 2)} m má BMI ${n(70 / (1.75 * 1.75))}. To je normálna hmotnosť.`,
        `Zdravá hmotnosť pri tejto výške je od ${n(18.5 * 1.75 * 1.75)} kg do ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Kalkulačka BMI",
    title: tituloQueEntre(`Kalkulačka BMI: ${ctx.nombrePais}`, "Kalkulačka BMI (index telesnej hmotnosti)", "Kalkulačka BMI"),
    description: "Vypočítajte si index telesnej hmotnosti (BMI) podľa hmotnosti a výšky. Zistite svoju kategóriu podľa WHO a rozpätie zdravej hmotnosti pre vašu výšku.",
    intro: [
      "Zadajte hmotnosť a výšku. Uvidíte svoje BMI, kategóriu podľa klasifikácie Svetovej zdravotníckej organizácie a rozpätie zdravej hmotnosti pre vašu výšku.",
      "Ide o všeobecný ukazovateľ pre dospelých. Nenahrádza konzultáciu s lekárom.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = hmotnosť v librách × 703 ÷ (výška v palcoch × výška v palcoch)." : "BMI = hmotnosť v kilogramoch ÷ (výška v metroch × výška v metroch).",
      `Pod ${n(18.5)} znamená podváhu, ${n(18.5)} až ${n(24.9)} normálnu hmotnosť, 25 až ${n(29.9)} nadváhu. Od 30 vyššie ide o obezitu.`,
      `Zdravá hmotnosť zahŕňa hodnoty, pri ktorých BMI pre vašu výšku zostáva medzi ${n(18.5)} a ${n(24.9)}.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Aké BMI je normálne?",
        respuesta: `Podľa WHO je to u dospelých ${n(18.5)} až ${n(24.9)}. Hranice sú rovnaké pre ženy aj mužov.`,
      },
      {
        pregunta: "Hodí sa BMI pre každého?",
        respuesta: "Nie. Nerozlišuje svaly a tuk, takže u ľudí s veľkým podielom svalovej hmoty môže vychádzať nadhodnotené. U tehotných žien, detí a dospievajúcich sa hodnotí inak.",
      },
      {
        pregunta: "Čo robiť, keď mám vysoké BMI?",
        respuesta: "Prediskutujte výsledok s lekárom alebo s odborníkom na výživu. Oplatí sa ho posudzovať spolu s ďalšími ukazovateľmi: obvodom pása, stravovaním a pohybovou aktivitou.",
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Index telesnej hmotnosti: pomer vašej hmotnosti k druhej mocnine výšky." },
      { termino: "WHO", definicion: "Svetová zdravotnícka organizácia. Stanovuje kategórie BMI pre dospelých." },
    ],
  };
};
