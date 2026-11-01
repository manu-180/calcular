import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Muškarac od 35 godina, telesne mase 180 lb i visine 5 ft 10 in ima bazalni metabolizam od oko ${n(basal)} kcal.`,
          `Ako se malo kreće, za održavanje telesne mase treba mu oko ${n(basal * FACTORES.sedentaria)} kcal dnevno.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Žena od 30 godina, telesne mase 60 kg i visine 165 cm ima bazalni metabolizam od oko ${n(basal)} kcal.`,
          `Uz umerenu aktivnost, za održavanje telesne mase treba joj oko ${n(basal * FACTORES.moderada)} kcal dnevno.`,
        ];
      })();
  return {
    h1: "Kalkulator kalorija: dnevni unos",
    title: tituloQueEntre(
      `Kalkulator kalorija: dnevne potrebe (${ctx.nombrePais})`,
      "Kalkulator kalorija: dnevne potrebe",
      "Kalkulator kalorija",
    ),
    description:
      "Saznajte koliko kalorija dnevno trošite i koliko bi trebalo da unosite da biste održali telesnu masu, smršali ili se ugojili.",
    intro: [
      "Unesite svoje podatke i nivo aktivnosti. Videćete bazalni metabolizam i koliko kalorija potrošite u običnom danu.",
      "Ovo je okvirna procena. Ne zamenjuje savet lekara ni nutricioniste.",
    ],
    comoSeCalcula: [
      `Bazalni metabolizam (Mifflin-St Jeor): 10 × masa u kg + ${n(6.25, 2)} × visina u cm − 5 × godine; za muškarce se dodaje 5, za žene se oduzima 161.`,
      `Kalorije za održavanje = bazalni metabolizam × faktor aktivnosti. Faktor ide od ${n(1.2, 1)} (minimalna aktivnost) do ${n(1.9, 1)} (veoma visoka).`,
      `Za mršavljenje se od dnevnih potreba oduzima ${DEFICIT} kcal, a za dobijanje na masi dodaje se ${SUPERAVIT} kcal: umerena promena koja može dugo da se održi.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Šta je bazalni metabolizam?",
        respuesta: "To je energija koju telo troši u potpunom mirovanju za disanje, održavanje temperature i rad organa.",
      },
      {
        pregunta: "Koliko kalorija unositi za mršavljenje?",
        respuesta: `Uobičajena polazna tačka je oko ${DEFICIT} kcal dnevno manje od potreba za održavanje. Najbolje je da je odredite zajedno sa stručnjakom.`,
      },
      {
        pregunta: "Koliko je formula tačna?",
        respuesta:
          "Formula Mifflin-St Jeor je među najkorišćenijima, ali daje prosečnu vrednost. Genetika, mišićna masa i zdravstveno stanje menjaju to koliko zaista trošite.",
      },
    ],
    glosario: [
      { termino: "Kalorija (kcal)", definicion: "Jedinica energije koju sadrži hrana i koju telo troši." },
      { termino: "Bazalni metabolizam", definicion: "Kalorije koje telo potroši u potpunom mirovanju." },
    ],
  };
};
