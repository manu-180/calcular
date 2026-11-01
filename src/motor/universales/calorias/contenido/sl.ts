import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Moški, star 35 let, s telesno težo 180 lb in višino 5 ft 10 in ima bazalni metabolizem približno ${n(basal)} kcal.`,
          `Če se malo giblje, za ohranjanje telesne teže potrebuje približno ${n(basal * FACTORES.sedentaria)} kcal na dan.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Ženska, stara 30 let, s telesno težo 60 kg in višino 165 cm ima bazalni metabolizem približno ${n(basal)} kcal.`,
          `Pri zmerni dejavnosti za ohranjanje telesne teže potrebuje približno ${n(basal * FACTORES.moderada)} kcal na dan.`,
        ];
      })();
  return {
    h1: "Kalkulator kalorij: dnevni vnos",
    title: tituloQueEntre(
      `Kalkulator kalorij: dnevne potrebe (${ctx.nombrePais})`,
      "Kalkulator kalorij: dnevne potrebe",
      "Kalkulator kalorij",
    ),
    description:
      "Izračunajte, koliko kalorij porabite na dan in koliko jih potrebujete, da ohranite telesno težo, shujšate ali pridobite težo.",
    intro: [
      "Vnesite svoje podatke in raven dejavnosti. Videli boste bazalni metabolizem in koliko kalorij porabite v običajnem dnevu.",
      "To je okvirna ocena. Ne nadomesti nasveta zdravnika ali nutricionista.",
    ],
    comoSeCalcula: [
      `Bazalni metabolizem (Mifflin-St Jeor): 10 × teža v kg + ${n(6.25, 2)} × višina v cm − 5 × starost v letih; za moške se prišteje 5, za ženske se odšteje 161.`,
      `Kalorije za ohranjanje = bazalni metabolizem × faktor dejavnosti. Faktor sega od ${n(1.2, 1)} (minimalna dejavnost) do ${n(1.9, 1)} (zelo visoka).`,
      `Za hujšanje se od dnevnih potreb odšteje ${DEFICIT} kcal, za pridobivanje teže pa se prišteje ${SUPERAVIT} kcal: zmerna sprememba, ki jo je mogoče dolgo vzdrževati.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kaj je bazalni metabolizem?",
        respuesta: "To je energija, ki jo telo v popolnem mirovanju porabi za dihanje, vzdrževanje temperature in delovanje organov.",
      },
      {
        pregunta: "Koliko kalorij zaužiti za hujšanje?",
        respuesta: `Običajno izhodišče je približno ${DEFICIT} kcal na dan manj od potreb za ohranjanje teže. Najbolje je, da ga določite skupaj s strokovnjakom.`,
      },
      {
        pregunta: "Kako natančna je formula?",
        respuesta:
          "Formula Mifflin-St Jeor je med najbolj uporabljanimi, vendar daje povprečno vrednost. Genetika, mišična masa in zdravstveno stanje vplivajo na to, koliko res porabite.",
      },
    ],
    glosario: [
      { termino: "Kalorija (kcal)", definicion: "Enota energije, ki jo vsebuje hrana in ki jo telo porablja." },
      { termino: "Bazalni metabolizem", definicion: "Kalorije, ki jih telo porabi v popolnem mirovanju." },
    ],
  };
};
