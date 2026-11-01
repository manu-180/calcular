import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Ja telpas sienu garums ir 48 ft, augstums 8 ft, bet durvis un logi aizņem 40 ft², krāsojamais laukums ir ${n(neta, 0)} ft².`,
          `Krāsojot divās kārtās, ja patēriņš ir 350 ft² no galona, vajadzīgais daudzums: ${n(gal, 2)} gal. Ar rezervi: ${n(gal * (1 + MARGEN), 2)} gal.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Ja telpas sienu garums ir 14 m, augstums ${n(2.6)} m, bet durvis un logi aizņem 4 m², krāsojamais laukums ir ${n(neta)} m².`,
          `Krāsojot divās kārtās, ja patēriņš ir 10 m² no litra, vajadzīgais daudzums: ${n(litros, 2)} l. Ar rezervi: ${n(litros * (1 + MARGEN), 2)} l.`,
        ];
      })();
  return {
    h1: "Krāsas daudzuma kalkulators",
    title: tituloQueEntre(`Krāsas daudzuma kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Krāsas daudzuma kalkulators", "Krāsas kalkulators"),
    description: "Aprēķiniet, cik krāsas vajag sienām pēc to izmēriem, durvīm un logiem, kārtu skaita un uz iepakojuma norādītā patēriņa.",
    intro: [
      "Ievadiet sienu garumu un augstumu (vai uzreiz laukumu), cik aizņem durvis un logi un cik kārtas plānojat.",
      "Kalkulators pieskaita 10% rezervi, lai krāsas nepietrūktu darba vidū.",
    ],
    comoSeCalcula: [
      "Laukums = kopējais sienu garums × augstums, bez durvīm un logiem.",
      "Krāsa = laukums × kārtu skaits ÷ patēriņš.",
      `Visbeidzot pieskaita rezervi: ${n(MARGEN * 100, 0)}%.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Cik kvadrātmetrus nosedz litrs krāsas?",
        respuesta: "Parasta iekšdarbu krāsa vienā kārtā no litra nosedz apmēram 8 līdz 12 m². Precīzu skaitli atradīsiet uz iepakojuma.",
      },
      {
        pregunta: "Cik kārtas vajag?",
        respuesta: "Parasti divas. Jaunam apmetumam, ļoti uzsūcošām sienām vai krasi mainot krāsu var būt vajadzīga trešā kārta.",
      },
      {
        pregunta: "Vai atņemt durvis un logus?",
        respuesta: "Jā, ja tie ir lieli. Mazus logus labāk neatņemt: pārpalikums noderēs malām un stūriem.",
      },
    ],
    glosario: [
      { termino: "Patēriņš", definicion: "Kādu laukumu litrs krāsas nosedz vienā kārtā." },
      { termino: "Kārta", definicion: "Katrs uz sienas uzklātais krāsas slānis." },
    ],
  };
};
