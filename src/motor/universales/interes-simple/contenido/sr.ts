import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator proste kamate",
    title: tituloQueEntre(`Prosta kamata: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator proste kamate", "Prosta kamata"),
    description: "Izračunajte prostu kamatu na glavnicu uz godišnju stopu za dane, mesece ili godine. Izaberite godinu od 365 ili 360 dana i videćete ukupan iznos.",
    intro: [
      "Prosta kamata se uvek računa na prvobitnu glavnicu: tokom perioda kamata se ne dodaje glavnici.",
      "Koristi se kod kratkoročnih depozita, pozajmica među poznanicima i u mnogim školskim zadacima.",
    ],
    comoSeCalcula: [
      "Kamata = glavnica × godišnja stopa × period u godinama.",
      "Za period u mesecima deli se sa 12. Za period u danima deli se sa 365 ili 360, u zavisnosti od toga koju godinu banka koristi.",
      "Ukupno = glavnica + kamata.",
    ],
    ejemplo: [
      `Iznos od ${m(capital)} uz stopu od 10% godišnje za 6 meseci donosi kamatu od ${m(capital * 0.1 * 0.5)}.`,
      `Ista glavnica za 90 dana donosi ${m((capital * 0.1 * 90) / 365)} uz godinu od 365 dana i ${m((capital * 0.1 * 90) / 360)} uz godinu od 360 dana.`,
    ],
    faq: [
      {
        pregunta: "Koja je formula za prostu kamatu?",
        respuesta: `K = G × i × t. G je glavnica, i godišnja stopa kao decimalni broj (10% je ${formatearNumero(ctx, 0.1, 2)}), a t period u godinama.`,
      },
      {
        pregunta: "Po čemu se razlikuju prosta i složena kamata?",
        respuesta: "Prosta kamata se uvek računa na istu glavnicu. Kod složene kamate kamata se pripisuje glavnici i i sama dalje donosi kamatu.",
      },
      {
        pregunta: "Zašto neke banke računaju godinu kao 360 dana?",
        respuesta: "To je bankarski običaj koji pojednostavljuje obračun. Sa 360 dana kamata ispada nešto veća. Proverite koju godinu koristi vaša banka.",
      },
    ],
    glosario: [
      { termino: "Glavnica", definicion: "Novac koji se pozajmljuje ili ulaže, bez kamate." },
      { termino: "Bankarska godina", definicion: "Godina od 360 dana, sa mesecima od po 30 dana." },
    ],
  };
};
