import { pluralBs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const plocica = (k: number) => pluralBs(k, "pločica", "pločice", "pločica");
  const kutija = (k: number) => pluralBs(k, "kutiju", "kutije", "kutija");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Za površinu od 150 ft² s pločicama 12 × 12 in (svaka ima 1 ft²) i rezervom od 10 %, trebat će vam ${plocica(piezas)}.`,
          `Ako kutija sadrži 10 pločica, kupite ${kutija(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Za površinu od 20 m² s pločicama 60 × 60 cm (svaka ima ${n(pieza)} m²) i rezervom od 10 %, trebat će vam ${plocica(piezas)}.`,
          `Ako kutija sadrži 4 pločice, kupite ${kutija(Math.ceil(piezas / 4))}.`,
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
      "Izračunajte koliko vam pločica treba za pod ili zid, s rezervom za rezanje, i koliko kutija trebate kupiti.",
    intro: [
      "Unesite površinu, mjeru jedne pločice i broj pločica u kutiji. Vidjet ćete koliko pločica i kutija trebate kupiti.",
      "Rezerva za rezanje pokriva rezanje uz ivice i komade koji puknu tokom rada.",
    ],
    comoSeCalcula: [
      `Površina jedne pločice = dužina × širina, u ${imperial ? "kvadratnim stopama" : "kvadratnim metrima"}.`,
      "Broj pločica = površina × (1 + rezerva ÷ 100) ÷ površina jedne pločice, zaokruženo naviše.",
      "Kutije = broj pločica ÷ pločice u kutiji, zaokruženo naviše.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Koliku rezervu za rezanje računati?",
        respuesta: "Za ravno polaganje 10 %. Za dijagonalno polaganje, riblju kost ili prostorije s puno rezanja 15 do 20 %.",
      },
      {
        pregunta: "Treba li računati fuge?",
        respuesta: "Ne. Fuge imaju samo nekoliko milimetara i tu razliku pokriva rezerva za rezanje.",
      },
      {
        pregunta: "Isplati li se kupiti malo više?",
        respuesta: "Da, sačuvajte nekoliko pločica iz iste serije. Ako neka kasnije pukne, istu nijansu može biti teško pronaći.",
      },
    ],
    glosario: [
      { termino: "Rezerva za rezanje", definicion: "Procenat pločica koji se kupuje više zbog rezanja i polomljenih komada." },
      { termino: "Serija", definicion: "Pločice iz iste proizvodnje. Nijansa pločica iz različitih serija može se malo razlikovati." },
    ],
  };
};
