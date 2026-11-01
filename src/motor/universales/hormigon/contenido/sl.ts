import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        const jardi = ft3 / 27;
        return [
          `Za teraso 10 × 10 ft, debeline 4 in, potrebujete ${n(ft3)} ft³ betona. Prostornina v kubičnih jardih: ${n(jardi)}.`,
          `Pri običajni mešanici za to potrebujete približno ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb cementa.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Za betonsko ploščo 4 × 3 m, debeline 10 cm, potrebujete ${n(volumen, 1)} m³ betona.`,
          `Pri običajni mešanici za to potrebujete približno ${n(MEZCLA.cementoKg * volumen, 0)} kg cementa, ${n(MEZCLA.arenaM3 * volumen)} m³ peska in ${n(MEZCLA.piedraM3 * volumen)} m³ gramoza.`,
        ];
      })();
  return {
    h1: "Izračun betona",
    title: tituloQueEntre(`Izračun betona: koliko m³ (${ctx.nombrePais})`, "Izračun betona in cementa", "Izračun betona"),
    description: `Izračunajte, koliko betona potrebujete za ploščo v ${imperial ? "kubičnih jardih" : "kubičnih metrih"} in približno koliko cementa, peska in gramoza morate kupiti.`,
    intro: [
      "Vnesite dolžino, širino in debelino. Videli boste prostornino betona in približno količino materiala za mešanico.",
      "Količina materiala je odvisna od razmerja v mešanici. Izračun kot primer uporablja običajno mešanico 1 : 2 : 3.",
    ],
    comoSeCalcula: [
      imperial
        ? "Prostornina = dolžina × širina × debelina, z debelino v čevljih. Kubične čevlje delite s 27, da dobite kubične jarde."
        : "Prostornina = dolžina × širina × debelina, z debelino v metrih.",
      "Prostornini se doda rezerva za neravno podlago in izgubo betona.",
      `Na 1 m³ gre približno ${MEZCLA.cementoKg} kg cementa, ${n(MEZCLA.arenaM3)} m³ peska, ${n(MEZCLA.piedraM3, 1)} m³ gramoza in ${MEZCLA.aguaL} L vode.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliko cementa potrebujem za 1 m³ betona?",
        respuesta: `Za mešanico 1 : 2 : 3 približno ${MEZCLA.cementoKg} kg. Za trdnejši beton potrebujete več cementa.`,
      },
      {
        pregunta: "Koliko kubičnih čevljev ima kubični jard?",
        respuesta: "27. Kubični jard je kocka 3 ft × 3 ft × 3 ft.",
      },
      {
        pregunta: "Ali se splača naročiti gotov beton iz betonarne?",
        respuesta:
          "Pri večjem betoniranju je gotov beton iz mešalnika bolj enakomeren in delo gre hitreje, prodaja pa se po kubičnem metru. Pri manjših delih se beton običajno meša na kraju samem v teh razmerjih.",
      },
    ],
    glosario: [
      { termino: "Razmerje v mešanici", definicion: "Razmerje med cementom, peskom, gramozom in vodo v mešanici." },
      { termino: "Kubični meter (m³)", definicion: "Prostornina kocke z robom 1 meter, pogovorno kubik." },
    ],
  };
};
