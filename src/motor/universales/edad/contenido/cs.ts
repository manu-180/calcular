import { formaCs } from "../../../i18n/plural";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionCs } from "../../dias-entre-fechas/textos/cs";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Výpočet věku",
    title: tituloQueEntre(`Výpočet věku podle data narození (${ctx.nombrePais})`, "Výpočet věku podle data narození", "Výpočet věku"),
    description: "Spočítejte svůj přesný věk v letech, měsících a dnech, kolik dní jste už prožili a kolik zbývá do příštích narozenin.",
    intro: [
      "Zadejte datum narození a uvidíte svůj přesný věk ke dnešku, a také v měsících, týdnech a dnech.",
      "Změňte druhé datum, pokud chcete zjistit, kolik bylo někomu k určitému dni nebo kolik let oslaví.",
    ],
    comoSeCalcula: [
      "Kalkulačka počítá celé měsíce od narození do zvoleného data. Každých 12 měsíců tvoří jeden rok.",
      "Dny, které zbudou po posledním celém měsíci, jsou dny věku.",
      "Přestupné roky se počítají s 366 dny.",
    ],
    ejemplo: [
      `Člověku narozenému ${fechaLarga(ctx.locale, nac)} bylo k ${fechaLarga(ctx.locale, ref)} přesně ${duracionCs(Math.floor(meses / 12), meses % 12, dias)}.`,
      `To je ${formatearNumero(ctx, total)} ${formaCs(total, "den", "dny", "dní")}.`,
    ],
    faq: [
      {
        pregunta: "Jak se počítá přesný věk?",
        respuesta: "Nejdřív se počítají celé roky, potom celé měsíce od posledních narozenin a nakonec dny, které zbývají.",
      },
      {
        pregunta: "Jak je to s lidmi narozenými 29. února?",
        respuesta: "V nepřestupných letech tato kalkulačka bere jako den narozenin 28. února. Některé předpisy místo toho používají 1. března.",
      },
      {
        pregunta: "Kolik dní už mám za sebou?",
        respuesta: "Podívejte se na řádek „Ve dnech“. Počítá každý den od narození do zvoleného data, bez posledního dne.",
      },
    ],
    glosario: [
      { termino: "Věk", definicion: "Počet celých let od narození." },
      { termino: "Přestupný rok", definicion: "Rok s 366 dny, ve kterém je 29. února. Přichází jednou za čtyři roky, kromě některých let na přelomu století." },
    ],
  };
};
