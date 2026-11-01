import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Terasei ar izmēriem 10 × 10 ft un biezumu 4 in vajag ${n(ft3)} ft³ betona, tas ir, ${n(ft3 / 27)} yd³.`,
          `Izmantojot parauga maisījumu, tam būs vajadzīgas apmēram ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementa.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Betona plātnei ar izmēriem 4 × 3 m un biezumu 10 cm vajag ${n(volumen, 1)} m³ betona.`,
          `Izmantojot parauga maisījumu, tam būs vajadzīgi apmēram ${n(MEZCLA.cementoKg * volumen, 0)} kg cementa, ${n(MEZCLA.arenaM3 * volumen)} m³ smilšu un ${n(MEZCLA.piedraM3 * volumen)} m³ šķembu.`,
        ];
      })();
  return {
    h1: "Betona kalkulators",
    title: tituloQueEntre(`Betona kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Betona un cementa kalkulators", "Betona kalkulators"),
    description: `Aprēķiniet, cik betona vajag plātnei ${imperial ? "kubikjardos" : "kubikmetros"} un aptuveni cik cementa, smilšu un šķembu jāpērk.`,
    intro: [
      "Ievadiet garumu, platumu un biezumu. Redzēsiet betona tilpumu un aptuveno maisījumam vajadzīgo materiālu daudzumu.",
      "Materiālu daudzums atkarīgs no maisījuma proporcijām. Kalkulators kā piemēru izmanto parasto maisījumu 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Tilpums = garums × platums × biezums, biezumu izsakot pēdās. Kubikpēdas dala ar 27, lai iegūtu kubikjardus."
        : "Tilpums = garums × platums × biezums, biezumu izsakot metros.",
      "Tilpumam pieskaita rezervi nelīdzenai pamatnei un betona zudumiem.",
      `Uz 1 m³ nāk apmēram ${MEZCLA.cementoKg} kg cementa, ${n(MEZCLA.arenaM3)} m³ smilšu, ${n(MEZCLA.piedraM3, 1)} m³ šķembu un ${MEZCLA.aguaL} l ūdens.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Cik cementa vajag 1 m³ betona?",
        respuesta: `Maisījumam 1 : 2 : 3 apmēram ${MEZCLA.cementoKg} kg. Izturīgākam betonam cementa vajag vairāk.`,
      },
      {
        pregunta: "Cik kubikpēdu ir kubikjardā?",
        respuesta: "27. Kubikjards ir kubs ar izmēriem 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Vai ir vērts pasūtīt gatavu betonu?",
        respuesta: "Lielākiem darbiem no betona rūpnīcas piegādātais gatavais betons ir viendabīgāks, un darbs notiek ātrāk; to pārdod kubikmetros. Mazākiem darbiem betonu bieži jauc uz vietas pēc šīm proporcijām.",
      },
    ],
    glosario: [
      { termino: "Maisījuma proporcijas", definicion: "Cementa, smilšu, šķembu un ūdens attiecība maisījumā." },
      { termino: "Kubikmetrs (m³)", definicion: "Tāda kuba tilpums, kura šķautne ir 1 metrs." },
    ],
  };
};
