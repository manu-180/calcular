import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Muž vo veku 35 rokov s hmotnosťou 180 lb a výškou 5 ft 10 in má bazálny metabolizmus približne ${n(basal)} kcal.`,
          `Ak sa málo hýbe, na udržanie hmotnosti potrebuje okolo ${n(basal * FACTORES.sedentaria)} kcal denne.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Žena vo veku 30 rokov s hmotnosťou 60 kg a výškou 165 cm má bazálny metabolizmus približne ${n(basal)} kcal.`,
          `Pri strednej aktivite potrebuje na udržanie hmotnosti okolo ${n(basal * FACTORES.moderada)} kcal denne.`,
        ];
      })();
  return {
    h1: "Kalkulačka kalórií: denný príjem",
    title: tituloQueEntre(`Kalkulačka kalórií: denný príjem (${ctx.nombrePais})`, "Kalkulačka kalórií: denný príjem", "Kalkulačka kalórií"),
    description: "Zistite, koľko kalórií denne spálite a koľko by ste mali prijať, aby ste udržali hmotnosť, schudli alebo pribrali.",
    intro: [
      "Zadajte svoje údaje a mieru aktivity. Uvidíte bazálny metabolizmus a koľko kalórií spálite v bežnom dni.",
      "Ide o orientačný odhad. Nenahrádza konzultáciu s lekárom ani výživovým poradcom.",
    ],
    comoSeCalcula: [
      `Bazálny metabolizmus (Mifflin-St Jeor): 10 × hmotnosť v kg + ${n(6.25, 2)} × výška v cm − 5 × vek; u mužov sa pripočíta 5, u žien sa odpočíta 161.`,
      `Kalórie na udržanie hmotnosti = bazálny metabolizmus × koeficient aktivity. Koeficient je od ${n(1.2, 1)} (minimálna aktivita) po ${n(1.9, 1)} (veľmi vysoká).`,
      `Na chudnutie sa od príjmu odpočíta ${DEFICIT} kcal denne, na priberanie sa pripočíta ${SUPERAVIT} kcal: mierna zmena, ktorú sa dá dlho dodržiavať.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Čo je bazálny metabolizmus?",
        respuesta: "Je to energia, ktorú telo spotrebuje v úplnom pokoji na dýchanie, udržanie teploty a prácu orgánov.",
      },
      {
        pregunta: "Koľko kalórií jesť pri chudnutí?",
        respuesta: `Bežný východiskový bod je približne o ${DEFICIT} kcal denne menej, ako je príjem na udržanie hmotnosti. Najlepšie je stanoviť ho spolu s odborníkom.`,
      },
      {
        pregunta: "Aký presný je vzorec?",
        respuesta: "Vzorec Mifflin-St Jeor patrí k najpoužívanejším, ale dáva priemernú hodnotu. Genetika, svalová hmota a zdravotný stav menia to, koľko skutočne spálite.",
      },
    ],
    glosario: [
      { termino: "Kalória (kcal)", definicion: "Jednotka energie, ktorú obsahuje jedlo a ktorú telo spotrebúva." },
      { termino: "Bazálny metabolizmus", definicion: "Kalórie, ktoré telo spáli v úplnom pokoji." },
    ],
  };
};
