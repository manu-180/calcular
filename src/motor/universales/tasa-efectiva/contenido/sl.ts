import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Preračun nominalne obrestne mere v efektivno",
    title: tituloQueEntre(
      `Efektivna obrestna mera: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Efektivna obrestna mera: preračun iz nominalne",
      "Efektivna obrestna mera",
    ),
    description: "Preračunajte nominalno letno obrestno mero v efektivno in obratno, z mesečnim, četrtletnim, polletnim ali dnevnim pripisom obresti.",
    intro: [
      "Dve ponudbi z enako obrestno mero lahko staneta različno. Razlika je v tem, kako pogosto se obresti računajo ali pripisujejo.",
      "Efektivna letna obrestna mera vse ponudbe postavi na isto raven: pokaže, koliko v enem letu dejansko plačate ali zaslužite. Izberite mero, ki jo imate, mi pa prikažemo drugo.",
    ],
    comoSeCalcula: [
      "Efektivna mera = (1 + nominalna mera ÷ m) na potenco m, minus 1. Število m je število pripisov obresti na leto: 12 pri mesečnem, 4 pri četrtletnem.",
      "Nominalna mera = m × ((1 + efektivna mera) na potenco (1 ÷ m), minus 1).",
      "Obrestna mera za obdobje je nominalna mera, deljena z m.",
    ],
    ejemplo: [
      `Nominalna mera 12 % na leto z mesečnim pripisom ustreza efektivni meri ${p(aEfectiva(12, 12))}.`,
      `Efektivna mera 10 % ustreza nominalni meri ${p(aNominal(10, 12))}, če se obresti pripisujejo vsak mesec.`,
    ],
    faq: [
      {
        pregunta: "Kakšna je razlika med nominalno in efektivno obrestno mero?",
        respuesta:
          "Nominalna mera je letna mera brez učinka pripisa obresti. Efektivna upošteva tudi, da se obresti računajo na že pripisane obresti. Zato je efektivna mera vedno enaka nominalni ali višja od nje.",
      },
      {
        pregunta: "Ali je to isto kot EOM iz kreditne pogodbe?",
        respuesta:
          "Ne. Tukaj se računa samo učinek pripisa obresti. EOM, ki jo banka navede pri kreditu, zajema tudi nadomestila, zavarovanje in druge stroške, zato je običajno višja. Kredite primerjajte po EOM iz pogodbe, varčevanje pa po efektivni letni obrestni meri.",
      },
      {
        pregunta: "Zakaj pogostejši pripis zviša efektivno mero?",
        respuesta:
          "Obresti se prej prištejejo stanju in same začnejo prinašati obresti. Pri letnem pripisu sta nominalna in efektivna mera enaki.",
      },
    ],
    glosario: [
      { termino: "Nominalna obrestna mera", definicion: "Letna mera brez učinka pripisa obresti." },
      { termino: "Efektivna letna obrestna mera", definicion: "Letna mera, ki upošteva tudi obresti na že pripisane obresti." },
      { termino: "Pripis obresti", definicion: "Trenutek, ko se obresti prištejejo stanju računa ali dolga." },
      { termino: "EOM", definicion: "Efektivna obrestna mera kredita: obresti in vsi stroški kredita v eni številki." },
    ],
  };
};
