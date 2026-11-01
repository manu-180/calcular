import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Obrestno obrestni račun",
    title: tituloQueEntre(`Obrestno obrestni račun ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Obrestno obrestni račun: izračun", "Obrestno obrestni račun"),
    description: "Preverite, kako vaš denar raste z obrestmi na obresti in rednimi mesečnimi vložki: končni znesek, prislužene obresti in preglednica po letih.",
    intro: [
      "Pri obrestno obrestnem računu se pripisane obresti prištejejo vložku in tudi same prinašajo obresti. Zato prihranek raste vedno hitreje.",
      "Vnesite znesek, ki ga imate danes, koliko lahko dodate na mesec, obrestno mero in število let. Prikažemo končni znesek in koliko ga predstavljajo obresti.",
    ],
    comoSeCalcula: [
      "Končni znesek = vložek × (1 + r) na potenco n + mesečni vložek × ((1 + r) na potenco n − 1) ÷ r.",
      "Pri tem je r mesečna obrestna mera, ki ustreza izbranemu pripisu obresti, n pa število mesecev.",
      "Mesečni vložki se prištejejo ob koncu vsakega meseca.",
    ],
    ejemplo: [
      `Če začnete z zneskom ${m(capital)} in vsak mesec dodate ${m(aporte)} pri obrestni meri 7 % na leto, imate po 10 letih ${m(a10)}.`,
      `V naslednjih 10 letih znesek zraste na ${m(a20)}. Drugo desetletje prinese veliko več kot prvo.`,
    ],
    faq: [
      {
        pregunta: "Kakšna je razlika med navadnimi in obrestnimi obrestmi?",
        respuesta: "Navadne obresti se vedno računajo samo od prvotnega vložka. Obrestne obresti se računajo od vložka skupaj z že pripisanimi obrestmi.",
      },
      {
        pregunta: "Kaj je pravilo 72?",
        respuesta: "Hitra ocena, v koliko letih se denar podvoji: 72 delite z letno obrestno mero. Pri 6 % na leto se znesek podvoji v približno 12 letih.",
      },
      {
        pregunta: "Katero obrestno mero vnesti?",
        respuesta:
          "Tako, ki je realna za to, kar boste z denarjem počeli. Če želite videti rezultat v današnjih cenah, vnesite obrestno mero, zmanjšano za pričakovano inflacijo.",
      },
    ],
    glosario: [
      { termino: "Pripis obresti", definicion: "Prištevanje prisluženih obresti vložku, tako da tudi te prinašajo obresti." },
      { termino: "Obrestne obresti", definicion: "Izračun, pri katerem se obresti računajo od vložka skupaj z že pripisanimi obrestmi." },
    ],
  };
};
