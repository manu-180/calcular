import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulačka spoření na cíl",
    title: tituloQueEntre(`Spoření na cíl: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Kalkulačka spoření na cíl", "Spoření na cíl"),
    description: "Zjistěte, kolik měsíčně odkládat, abyste potřebnou částku naspořili včas, se započtením toho, co už máte, i úroku z úspor.",
    intro: [
      "Dovolená, auto, vlastní zdroje na hypotéku nebo rezerva na nečekané výdaje. Cíl s částkou a datem se plní mnohem snáz.",
      "Zadejte, kolik chcete naspořit a za kolik měsíců. Kalkulačka vám řekne, kolik odkládat měsíčně a kolik týdně.",
    ],
    comoSeCalcula: [
      "Nejprve se spočítá, o kolik vzrostou vaše dosavadní úspory do konce období.",
      "Co ještě chybí, se rozdělí do stejných měsíčních vkladů.",
      "Pokud úspory nesou úrok, vynáší i každý vklad, takže stačí vkládat o něco méně.",
    ],
    ejemplo: [
      `Abyste za 24 měsíců bez úroku naspořili ${m(meta)}, potřebujete odkládat ${m(meta / 24)} měsíčně.`,
      `Když už máte naspořeno ${m(actual)} a úspory se zhodnocují o 5 % ročně, stačí ${m(aporteNecesario(meta, actual, 24, 5))} měsíčně.`,
    ],
    faq: [
      {
        pregunta: "Jak cíl dodržet?",
        respuesta: "Peníze si odložte hned po výplatě, dřív než začnete utrácet. Pokud můžete, nastavte si trvalý příkaz na samostatný spořicí účet.",
      },
      {
        pregunta: "Co když je měsíční částka příliš vysoká?",
        respuesta: "Dejte si víc času nebo cíl snižte. Můžete také začít s tím, co zvládnete, a vklad zvýšit, až vám porostou příjmy.",
      },
      {
        pregunta: "Mám počítat s inflací?",
        respuesta: "Pokud je cíl několik let daleko, připočtěte k částce očekávanou inflaci. Co dnes stojí 100, může za pár let stát znatelně víc.",
      },
    ],
    glosario: [
      { termino: "Vklad", definicion: "Peníze, které na cíl každý měsíc odkládáte." },
      { termino: "Zhodnocení", definicion: "Kolik vaše úspory vynášejí na účtu nebo v investici." },
    ],
  };
};
