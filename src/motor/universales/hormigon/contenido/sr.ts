import { formaSr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        const jardi = ft3 / 27;
        return [
          `Za terasu 10 × 10 ft, debljine 4 in, potrebno je ${n(ft3)} ft³ betona, odnosno ${n(jardi)} ${formaSr(jardi, "kubni jard", "kubna jarda", "kubnih jardi")}.`,
          `Uz primer mešavine, za to ide oko ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementa.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Za betonsku ploču 4 × 3 m, debljine 10 cm, potrebno je ${n(volumen, 1)} m³ betona.`,
          `Uz primer mešavine, za to ide oko ${n(MEZCLA.cementoKg * volumen, 0)} kg cementa, ${n(MEZCLA.arenaM3 * volumen)} m³ peska i ${n(MEZCLA.piedraM3 * volumen)} m³ šljunka.`,
        ];
      })();
  return {
    h1: "Kalkulator betona",
    title: tituloQueEntre(`Kalkulator betona: koliko m³ (${ctx.nombrePais})`, "Kalkulator betona i cementa", "Kalkulator betona"),
    description: `Izračunajte koliko betona vam treba za ploču u ${imperial ? "kubnim jardima" : "kubnim metrima"} i približno koliko cementa, peska i šljunka da kupite.`,
    intro: [
      "Unesite dužinu, širinu i debljinu. Videćete zapreminu betona i približnu količinu materijala za mešavinu.",
      "Količina materijala zavisi od odnosa u mešavini. Kalkulator kao primer računa sa uobičajenom mešavinom 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Zapremina = dužina × širina × debljina, sa debljinom u stopama. Kubne stope se dele sa 27 da bi se dobili kubni jardi."
        : "Zapremina = dužina × širina × debljina, sa debljinom u metrima.",
      "Zapremini se dodaje rezerva za neravnu podlogu i gubitak betona.",
      `Na 1 m³ ide oko ${MEZCLA.cementoKg} kg cementa, ${n(MEZCLA.arenaM3)} m³ peska, ${n(MEZCLA.piedraM3, 1)} m³ šljunka i ${MEZCLA.aguaL} ${formaSr(MEZCLA.aguaL, "litar", "litra", "litara")} vode.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliko cementa treba za 1 m³ betona?",
        respuesta: `Za mešavinu 1 : 2 : 3 oko ${MEZCLA.cementoKg} kg. Za čvršći beton cementa treba više.`,
      },
      {
        pregunta: "Koliko kubnih stopa ima kubni jard?",
        respuesta: "27. Kubni jard je kocka 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Da li se isplati naručiti gotov beton iz betonjerke?",
        respuesta:
          "Za veće betoniranje gotov beton iz mešalice je ujednačeniji i posao ide brže, a prodaje se po kubiku. Za manje radove beton se obično meša na licu mesta u ovim odnosima.",
      },
    ],
    glosario: [
      { termino: "Odnos u mešavini", definicion: "Odnos cementa, peska, šljunka i vode u mešavini." },
      { termino: "Kubni metar (m³)", definicion: "Zapremina kocke čija je ivica 1 metar, u razgovoru kubik." },
    ],
  };
};
