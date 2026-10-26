import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Százalékos változás kalkulátor",
    title: tituloQueEntre(
      `Százalékos változás számítása (${ctx.nombrePais})`,
      "Százalékos változás számítása online",
      "Százalékos változás kalkulátor",
    ),
    description:
      "Számold ki, hány százalékkal nőtt vagy csökkent egy érték: ár, fizetés, árbevétel vagy bármilyen szám, amely idővel megváltozott.",
    intro: [
      "Írd be a régi és az új értéket. Látod a százalékos növekedést vagy csökkenést és a különbséget.",
      "Azt is megmutatja, mennyit kellene változnia, hogy visszaérjen a kiinduló értékre. Ez szinte soha nem ugyanannyi százalék.",
    ],
    comoSeCalcula: [
      "Százalékos változás = (új érték − régi érték) ÷ régi érték × 100.",
      "A pozitív eredmény növekedést, a negatív csökkenést jelent.",
      "Ha a régi érték negatív, a kalkulátor az abszolút értékével oszt, így az előjel továbbra is azt mutatja, javult-e a helyzet.",
    ],
    ejemplo: [
      `Ami eddig ${m(antes)} volt, most pedig ${m(despues)}, annak az ára ${n(25)} százalékkal nőtt.`,
      `Ahhoz, hogy visszaálljon a régi árra, ${n(20)} százalékkal kellene csökkennie, nem ${n(25)} százalékkal.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolom ki a százalékos növekedést?",
        respuesta: `Vond ki az új értékből a régit, oszd el a régi értékkel, és szorozd meg százzal. Például 80 helyett 100: 20 ÷ 80 × 100 = ${n((20 / 80) * 100)} százalék.`,
      },
      {
        pregunta: "Hogyan számolom ki a százalékos csökkenést?",
        respuesta: `Ugyanígy. Például 100 helyett 80: −20 ÷ 100 × 100 = −${n(20)} százalék, vagyis az érték ${n(20)} százalékkal csökkent.`,
      },
      {
        pregunta: "Miért nem oltja ki egymást egy 25 százalékos emelés és egy 25 százalékos csökkentés?",
        respuesta: `Mert mindkettő más alapból számol. Nyolcvan plusz 25 százalék ${n(100)}, de száz mínusz 25 százalék már csak ${n(75)}.`,
      },
      {
        pregunta: "Mi a különbség a százalék és a százalékpont között?",
        respuesta: `Ha egy kamatláb 10 százalékról 12 százalékra emelkedik, ez ${n(2)} százalékpontos emelés. Százalékos változásként viszont ${n(20)} százalék.`,
      },
    ],
    glosario: [
      { termino: "Százalékos változás", definicion: "Mennyit változott egy érték, a kiinduló érték százalékában kifejezve." },
      { termino: "Százalékpont", definicion: "Két százalékos érték egyszerű különbsége." },
    ],
  };
};
