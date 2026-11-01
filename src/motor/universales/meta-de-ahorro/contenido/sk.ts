import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulačka sporenia na cieľ",
    title: tituloQueEntre(`Sporenie na cieľ: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`, "Kalkulačka sporenia na cieľ", "Sporenie na cieľ"),
    description: "Zistite, koľko si mesačne odkladať, aby ste potrebnú sumu nasporili včas, so započítaním toho, čo už máte, aj úroku z úspor.",
    intro: [
      "Dovolenka, auto, vlastné zdroje na hypotéku alebo rezerva na nečakané výdavky. Cieľ so sumou a dátumom sa plní oveľa ľahšie.",
      "Zadajte, koľko chcete nasporiť a za koľko mesiacov. Kalkulačka vám povie, koľko si odkladať mesačne a koľko týždenne.",
    ],
    comoSeCalcula: [
      "Najprv sa vypočíta, o koľko vzrastú vaše doterajšie úspory do konca obdobia.",
      "To, čo ešte chýba, sa rozdelí na rovnaké mesačné vklady.",
      "Ak úspory nesú úrok, výnos prináša aj každý vklad, takže stačí vkladať o niečo menej.",
    ],
    ejemplo: [
      `Aby ste za 24 mesiacov bez úroku nasporili ${m(meta)}, potrebujete si odkladať ${m(meta / 24)} mesačne.`,
      `Keď už máte nasporené ${m(actual)} a úspory sa zhodnocujú o 5 % ročne, stačí ${m(aporteNecesario(meta, actual, 24, 5))} mesačne.`,
    ],
    faq: [
      {
        pregunta: "Ako cieľ dodržať?",
        respuesta: "Peniaze si odložte hneď po výplate, skôr než začnete míňať. Ak môžete, nastavte si trvalý príkaz na samostatný sporiaci účet.",
      },
      {
        pregunta: "Čo ak je mesačná suma príliš vysoká?",
        respuesta: "Dajte si viac času alebo cieľ znížte. Môžete tiež začať s tým, čo zvládnete, a vklad zvýšiť, keď vám porastú príjmy.",
      },
      {
        pregunta: "Mám počítať s infláciou?",
        respuesta: "Ak je cieľ vzdialený niekoľko rokov, pripočítajte k sume očakávanú infláciu. Čo dnes stojí 100, môže o pár rokov stáť citeľne viac.",
      },
    ],
    glosario: [
      { termino: "Vklad", definicion: "Peniaze, ktoré si na cieľ každý mesiac odkladáte." },
      { termino: "Zhodnotenie", definicion: "Koľko vaše úspory prinášajú na účte alebo v investícii." },
    ],
  };
};
