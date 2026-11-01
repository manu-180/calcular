import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Izračun odstotne spremembe",
    title: tituloQueEntre(
      `Odstotna sprememba: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`,
      "Za koliko odstotkov: odstotna sprememba",
      "Izračun odstotne spremembe",
    ),
    description: "Izračunajte, za koliko odstotkov se je vrednost povečala ali zmanjšala: cene, plače, prihodki ali katero koli število, ki se je s časom spremenilo.",
    intro: [
      "Vnesite začetno in novo vrednost. Dobili boste odstotno povečanje ali zmanjšanje in razliko med njima.",
      "Kalkulator pokaže tudi, za koliko bi se morala vrednost spremeniti, da bi se vrnila na začetno. To skoraj nikoli ni enak odstotek.",
    ],
    comoSeCalcula: [
      "Odstotna sprememba = (nova vrednost − začetna vrednost) ÷ začetna vrednost × 100.",
      "Pozitiven rezultat pomeni povečanje, negativen pa zmanjšanje.",
      "Če je začetna vrednost negativna, se deli z njeno absolutno vrednostjo, da predznak še vedno pokaže, ali se je stanje izboljšalo.",
    ],
    ejemplo: [
      `Kar je stalo ${m(antes)}, zdaj pa stane ${m(despues)}, se je podražilo za 25 %.`,
      "Da bi se cena vrnila na začetno, bi morala pasti za 20 %, ne za 25 %.",
    ],
    faq: [
      {
        pregunta: "Kako se izračuna odstotno povečanje?",
        respuesta: "Od nove vrednosti odštejte začetno, razliko delite z začetno vrednostjo in pomnožite s 100. Z 80 na 100: 20 ÷ 80 × 100 = 25 %.",
      },
      {
        pregunta: "Kako se izračuna odstotno zmanjšanje?",
        respuesta: "Na enak način. S 100 na 80: −20 ÷ 100 × 100 = −20 %, vrednost se je torej zmanjšala za 20 %.",
      },
      {
        pregunta: "Zakaj se povečanje za 25 % in zmanjšanje za 25 % ne izničita?",
        respuesta: "Vsak odstotek se računa od druge osnove. 80, povečano za 25 %, je 100, medtem ko je 100, zmanjšano za 25 %, enako 75.",
      },
      {
        pregunta: "Kakšna je razlika med odstotkom in odstotno točko?",
        respuesta: "Ko se obrestna mera poveča z 10 % na 12 %, se je povečala za 2 odstotni točki. V odstotkih se je povečala za 20 %.",
      },
    ],
    glosario: [
      { termino: "Odstotna sprememba", definicion: "Za koliko se je vrednost spremenila, izraženo v odstotkih začetne vrednosti." },
      { termino: "Odstotna točka", definicion: "Navadna razlika med dvema odstotkoma." },
    ],
  };
};
