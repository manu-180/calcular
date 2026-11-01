import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Muškarac od 35 godina, tjelesne težine 180 lb i visine 5 ft 10 in ima bazalni metabolizam od oko ${n(basal)} kcal.`,
          `Ako se malo kreće, za održavanje tjelesne težine treba mu oko ${n(basal * FACTORES.sedentaria)} kcal dnevno.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Žena od 30 godina, tjelesne težine 60 kg i visine 165 cm ima bazalni metabolizam od oko ${n(basal)} kcal.`,
          `Uz umjerenu aktivnost, za održavanje tjelesne težine treba joj oko ${n(basal * FACTORES.moderada)} kcal dnevno.`,
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
      "Saznajte koliko kalorija dnevno trošite i koliko biste ih trebali unositi kako biste održali tjelesnu težinu, smršavjeli ili dobili na težini.",
    intro: [
      "Unesite svoje podatke i razinu aktivnosti. Vidjet ćete bazalni metabolizam i koliko kalorija potrošite u običnom danu.",
      "Ovo je okvirna procjena. Ne zamjenjuje savjet liječnika ni nutricionista.",
    ],
    comoSeCalcula: [
      `Bazalni metabolizam (Mifflin-St Jeor): 10 × težina u kg + ${n(6.25, 2)} × visina u cm − 5 × dob u godinama; za muškarce se dodaje 5, za žene se oduzima 161.`,
      `Kalorije za održavanje = bazalni metabolizam × faktor aktivnosti. Faktor ide od ${n(1.2, 1)} (minimalna aktivnost) do ${n(1.9, 1)} (vrlo visoka).`,
      `Za mršavljenje se od dnevnih potreba oduzima ${DEFICIT} kcal, a za dobivanje na težini dodaje se ${SUPERAVIT} kcal: umjerena promjena koja se može dugo održati.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Što je bazalni metabolizam?",
        respuesta: "To je energija koju tijelo troši u potpunom mirovanju za disanje, održavanje temperature i rad organa.",
      },
      {
        pregunta: "Koliko kalorija unositi za mršavljenje?",
        respuesta: `Uobičajena polazna točka je oko ${DEFICIT} kcal dnevno manje od potreba za održavanje. Najbolje ju je odrediti zajedno sa stručnjakom.`,
      },
      {
        pregunta: "Koliko je formula točna?",
        respuesta:
          "Formula Mifflin-St Jeor među najkorištenijima je, ali daje prosječnu vrijednost. Genetika, mišićna masa i zdravstveno stanje utječu na to koliko zaista trošite.",
      },
    ],
    glosario: [
      { termino: "Kalorija (kcal)", definicion: "Jedinica energije koju sadrži hrana i koju tijelo troši." },
      { termino: "Bazalni metabolizam", definicion: "Kalorije koje tijelo potroši u potpunom mirovanju." },
    ],
  };
};
