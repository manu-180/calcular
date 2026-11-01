import { pluralSr } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const plocica = (k: number) => pluralSr(k, "pločica", "pločice", "pločica");
  const kutija = (k: number) => pluralSr(k, "kutiju", "kutije", "kutija");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Za površinu od 150 ft² sa pločicama 12 × 12 in (svaka ima 1 ft²) i rezervom od 10 %, trebaće vam ${plocica(piezas)}.`,
          `Ako kutija ima 10 pločica, kupite ${kutija(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Za površinu od 20 m² sa pločicama 60 × 60 cm (svaka ima ${n(pieza)} m²) i rezervom od 10 %, trebaće vam ${plocica(piezas)}.`,
          `Ako kutija ima 4 pločice, kupite ${kutija(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Kalkulator pločica",
    title: tituloQueEntre(
      `Kalkulator pločica za pod i zid (${ctx.nombrePais})`,
      "Kalkulator pločica: koliko kutija kupiti",
      "Kalkulator pločica",
    ),
    description:
      "Izračunajte koliko pločica vam treba za pod ili zid, sa rezervom za sečenje, i koliko kutija da kupite.",
    intro: [
      "Unesite površinu, meru jedne pločice i broj pločica u kutiji. Videćete koliko pločica i kutija treba kupiti.",
      "Rezerva za sečenje pokriva sečenje uz ivice i komade koji puknu tokom rada.",
    ],
    comoSeCalcula: [
      `Površina jedne pločice = dužina × širina, u ${imperial ? "kvadratnim stopama" : "kvadratnim metrima"}.`,
      "Broj pločica = površina × (1 + rezerva ÷ 100) ÷ površina jedne pločice, zaokruženo naviše.",
      "Kutije = broj pločica ÷ pločice u kutiji, zaokruženo naviše.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliku rezervu za sečenje računati?",
        respuesta: "Za pravo postavljanje 10 %. Za dijagonalno postavljanje, riblju kost ili prostorije sa mnogo sečenja 15 do 20 %.",
      },
      {
        pregunta: "Da li treba računati fuge?",
        respuesta: "Ne. Fuge imaju samo nekoliko milimetara i tu razliku pokriva rezerva za sečenje.",
      },
      {
        pregunta: "Da li se isplati kupiti malo više?",
        respuesta: "Da, sačuvajte nekoliko pločica iz iste serije. Ako neka kasnije pukne, istu nijansu može biti teško naći.",
      },
    ],
    glosario: [
      { termino: "Rezerva za sečenje", definicion: "Procenat pločica koji se kupuje više zbog sečenja i polomljenih komada." },
      { termino: "Serija", definicion: "Proizvodna partija. Nijansa pločica iz različitih serija može malo da se razlikuje." },
    ],
  };
};
