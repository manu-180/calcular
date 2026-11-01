import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Terrassiplaadi jaoks suurusega 10 × 10 ft ja paksusega 4 in on vaja ${n(ft3)} ft³ betooni ehk ${n(ft3 / 27)} kuupjardi.`,
          `Viitesegu puhul on tsementi vaja umbes ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Plaadi jaoks suurusega 4 × 3 m ja paksusega 10 cm on vaja ${n(volumen, 1)} m³ betooni.`,
          `Viitesegu puhul on vaja umbes ${n(MEZCLA.cementoKg * volumen, 0)} kg tsementi, ${n(MEZCLA.arenaM3 * volumen)} m³ liiva ja ${n(MEZCLA.piedraM3 * volumen)} m³ kruusa.`,
        ];
      })();
  return {
    h1: "Betooni kalkulaator: kui palju betooni on vaja?",
    title: tituloQueEntre(
      `Betooni kalkulaator: kui palju betooni on vaja | ${ctx.nombrePais}`,
      `Betooni kalkulaator | ${ctx.nombrePais}`,
      "Betooni kalkulaator",
    ),
    description: `Arvuta, kui palju betooni valuks vajad ${imperial ? "kuupjardides" : "kuupmeetrites"} ning ligikaudu kui palju tsementi, liiva ja kruusa osta.`,
    intro: [
      "Sisesta pikkus, laius ja paksus. Näed betooni mahtu ja ligikaudu seda, kui palju materjali seguks kulub.",
      "Materjalikogused sõltuvad retseptist. Kalkulaator kasutab levinud segusuhet 1:2:3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Maht = pikkus × laius × paksus, kus paksus on jalgades. Jaga kuupjalad arvuga 27, et saada kuupjardid."
        : "Maht = pikkus × laius × paksus, kus paksus on meetrites.",
      "Seejärel lisatakse varu ebatasase aluspinna ja materjalikao jaoks.",
      `Kuupmeetri kohta: umbes ${n(MEZCLA.cementoKg, 0)} kg tsementi, ${n(MEZCLA.arenaM3)} m³ liiva, ${n(MEZCLA.piedraM3, 1)} m³ kruusa ja ${n(MEZCLA.aguaL, 0)} liitrit vett.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kuidas arvutada vajalikku betooni kogust?",
        respuesta: `Korruta pikkus, laius ja paksus meetrites omavahel. Plaat suurusega 4 × 3 m ja paksusega 10 cm vajab ${n(4 * 3 * 0.1, 1)} m³.`,
      },
      {
        pregunta: "Kui palju tsementi kulub betooni kuupmeetri kohta?",
        respuesta: `Segusuhte 1:2:3 puhul umbes ${n(MEZCLA.cementoKg, 0)} kg. Tugevam betoon vajab rohkem tsementi.`,
      },
      {
        pregunta: "Kas tasub tellida valmisbetooni?",
        respuesta: "Suurte valude puhul on valmisbetoon tavaliselt ühtlasema kvaliteediga ja kiirem. Väiksemate tööde jaoks segatakse betoon sageli ise nende koguste järgi.",
      },
    ],
    glosario: [
      { termino: "Segusuhe", definicion: "Tsemendi, liiva, kruusa ja vee omavaheline suhe segus." },
      { termino: "Valu", definicion: "Etapp, mille käigus betoon valatakse raketisse ja jäetakse kõvastuma." },
    ],
  };
};
