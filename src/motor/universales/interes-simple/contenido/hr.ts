import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator jednostavne kamate",
    title: tituloQueEntre(`Jednostavna kamata: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`, "Kalkulator jednostavne kamate", "Jednostavna kamata"),
    description: "Izračunajte jednostavnu kamatu na glavnicu uz godišnju stopu za dane, mjesece ili godine. Odaberite godinu od 365 ili 360 dana i vidjet ćete ukupni iznos.",
    intro: [
      "Jednostavna kamata uvijek se računa na prvotnu glavnicu: tijekom razdoblja kamata se ne dodaje glavnici.",
      "Koristi se kod kratkoročnih depozita, pozajmica među poznanicima i u mnogim školskim zadacima.",
    ],
    comoSeCalcula: [
      "Kamata = glavnica × godišnja stopa × razdoblje u godinama.",
      "Za razdoblje u mjesecima dijeli se s 12. Za razdoblje u danima dijeli se s 365 ili 360, ovisno o tome koju godinu banka koristi.",
      "Ukupno = glavnica + kamata.",
    ],
    ejemplo: [
      `Iznos od ${m(capital)} uz stopu od 10 % godišnje za 6 mjeseci donosi kamatu od ${m(capital * 0.1 * 0.5)}.`,
      `Ista glavnica za 90 dana donosi ${m((capital * 0.1 * 90) / 365)} uz godinu od 365 dana i ${m((capital * 0.1 * 90) / 360)} uz godinu od 360 dana.`,
    ],
    faq: [
      {
        pregunta: "Koja je formula za jednostavnu kamatu?",
        respuesta: `K = G × i × t. G je glavnica, i godišnja stopa kao decimalni broj (10 % je ${formatearNumero(ctx, 0.1, 2)}), a t razdoblje u godinama.`,
      },
      {
        pregunta: "Po čemu se razlikuju jednostavna i složena kamata?",
        respuesta: "Jednostavna kamata uvijek se računa na istu glavnicu. Kod složene kamate kamata se pripisuje glavnici i sama dalje donosi kamatu.",
      },
      {
        pregunta: "Zašto neke banke računaju godinu kao 360 dana?",
        respuesta: "To je bankarski običaj koji pojednostavljuje izračun. S 360 dana kamata ispada nešto veća. Provjerite koju godinu koristi vaša banka.",
      },
    ],
    glosario: [
      { termino: "Glavnica", definicion: "Novac koji se posuđuje ili ulaže, bez kamate." },
      { termino: "Bankarska godina", definicion: "Godina od 360 dana, s mjesecima od po 30 dana." },
    ],
  };
};
