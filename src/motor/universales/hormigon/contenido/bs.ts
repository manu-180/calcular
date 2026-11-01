import { formaBs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        const jardi = ft3 / 27;
        return [
          `Za terasu 10 × 10 ft, debljine 4 in, potrebno je ${n(ft3)} ft³ betona, odnosno ${n(jardi)} ${formaBs(jardi, "kubni jard", "kubna jarda", "kubnih jardi")}.`,
          `S uobičajenom mješavinom za to treba oko ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementa.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Za betonsku ploču 4 × 3 m, debljine 10 cm, potrebno je ${n(volumen, 1)} m³ betona.`,
          `S uobičajenom mješavinom za to treba oko ${n(MEZCLA.cementoKg * volumen, 0)} kg cementa, ${n(MEZCLA.arenaM3 * volumen)} m³ pijeska i ${n(MEZCLA.piedraM3 * volumen)} m³ šljunka.`,
        ];
      })();
  return {
    h1: "Kalkulator betona",
    title: tituloQueEntre(`Kalkulator betona: koliko m³ (${ctx.nombrePais})`, "Kalkulator betona i cementa", "Kalkulator betona"),
    description: `Izračunajte koliko vam betona treba za ploču u ${imperial ? "kubnim jardima" : "kubnim metrima"} i približno koliko cementa, pijeska i šljunka trebate kupiti.`,
    intro: [
      "Unesite dužinu, širinu i debljinu. Vidjet ćete volumen betona i približnu količinu materijala za mješavinu.",
      "Količina materijala ovisi o omjeru u mješavini. Kalkulator kao primjer računa s uobičajenom mješavinom 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Volumen = dužina × širina × debljina, s debljinom u stopama. Kubne stope dijele se s 27 kako bi se dobili kubni jardi."
        : "Volumen = dužina × širina × debljina, s debljinom u metrima.",
      "Volumenu se dodaje rezerva za neravnu podlogu i gubitak betona.",
      `Na 1 m³ ide oko ${MEZCLA.cementoKg} kg cementa, ${n(MEZCLA.arenaM3)} m³ pijeska, ${n(MEZCLA.piedraM3, 1)} m³ šljunka i ${MEZCLA.aguaL} ${formaBs(MEZCLA.aguaL, "litra", "litre", "litara")} vode.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliko cementa treba za 1 m³ betona?",
        respuesta: `Za mješavinu 1 : 2 : 3 oko ${MEZCLA.cementoKg} kg. Za čvršći beton treba više cementa.`,
      },
      {
        pregunta: "Koliko kubnih stopa ima kubni jard?",
        respuesta: "27. Kubni jard je kocka 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Isplati li se naručiti gotov beton iz betonare?",
        respuesta:
          "Za veće betoniranje gotov beton iz miješalice je ujednačeniji i posao ide brže, a prodaje se po kubiku. Za manje radove beton se obično miješa na licu mjesta u ovim omjerima.",
      },
    ],
    glosario: [
      { termino: "Omjer u mješavini", definicion: "Omjer cementa, pijeska, šljunka i vode u mješavini." },
      { termino: "Kubni metar (m³)", definicion: "Volumen kocke čija je ivica 1 metar, u razgovoru kubik." },
    ],
  };
};
