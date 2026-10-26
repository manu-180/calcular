import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Rodinný rozpočet podle pravidla 50/30/20",
    title: tituloQueEntre(
      `Rodinný rozpočet 50/30/20 ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Rodinný rozpočet podle pravidla 50/30/20",
      "Rodinný rozpočet 50/30/20",
    ),
    description: "Rozdělte čistý měsíční příjem podle pravidla 50/30/20: kolik na nezbytné výdaje, kolik na radosti a kolik na spoření. Procenta můžete upravit.",
    intro: [
      "Pravidlo 50/30/20 je jednoduchý způsob, jak si naplánovat měsíc. Polovina jde na nezbytnosti, 30 % na věci pro radost a 20 % na spoření.",
      "Zadejte čistý příjem a uvidíte, kolik připadá na každou část. Pokud je vaše situace jiná, třeba kvůli vysokému nájmu, procenta upravte.",
    ],
    comoSeCalcula: [
      "Nezbytné výdaje = příjem × 50 %.",
      "Radosti a přání = příjem × 30 %.",
      "Spoření = příjem × 20 %. Všechna tři procenta musí dát dohromady 100 %.",
    ],
    ejemplo: [
      `Při příjmu ${m(ingreso)} měsíčně: ${m(ingreso * 0.5)} na nezbytné výdaje, ${m(ingreso * 0.3)} na radosti a přání a ${m(ingreso * 0.2)} na spoření.`,
      `Za rok těch 20 % dá dohromady ${m(ingreso * 0.2 * 12)} úspor.`,
    ],
    faq: [
      {
        pregunta: "Co patří mezi nezbytné výdaje a co mezi radosti?",
        respuesta:
          "Nezbytné jsou výdaje, které zaplatit musíte: bydlení, základní potraviny, energie, doprava, zdraví a povinné splátky. Radosti a přání jsou věci, bez kterých byste se v nouzi obešli.",
      },
      {
        pregunta: "Co když mi nezbytné výdaje zaberou víc než 50 %?",
        respuesta: "To je časté, hlavně při vysokém nájmu. Zkuste rozdělení 60/20/20 nebo 70/20/10 a spoření nesnižujte na nulu.",
      },
      {
        pregunta: "Počítají se splátky dluhů jako spoření?",
        respuesta: "Povinné splátky patří mezi nezbytné výdaje. Co splácíte navíc, abyste byli bez dluhů dřív, se počítá jako spoření, protože to zlepšuje vaši finanční situaci stejně jako úspory.",
      },
    ],
    glosario: [
      { termino: "Čistý příjem", definicion: "Kolik dostanete po odečtení daní a pojištění." },
      { termino: "Pravidlo 50/30/20", definicion: "Způsob, jak rozdělit příjem mezi nezbytné výdaje, radosti a spoření." },
    ],
  };
};
