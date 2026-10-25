import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Pretvaranje nominalne kamatne stope u efektivnu",
    title: tituloQueEntre(
      `Efektivna kamatna stopa: kalkulator ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Efektivna kamatna stopa: preračun iz nominalne",
      "Efektivna kamatna stopa",
    ),
    description: "Pretvorite nominalnu godišnju kamatnu stopu u efektivnu i obrnuto, uz mesečno, tromesečno, polugodišnje ili dnevno pripisivanje kamate.",
    intro: [
      "Dve ponude sa istom stopom mogu da koštaju različito. Razlika je u tome koliko često se kamata obračunava ili pripisuje.",
      "Efektivna godišnja stopa sve ponude stavlja na isti nivo: pokazuje koliko za godinu stvarno plaćate ili zarađujete. Izaberite stopu koju imate, a mi prikazujemo drugu.",
    ],
    comoSeCalcula: [
      "Efektivna stopa = (1 + nominalna stopa ÷ m) na stepen m, minus 1. Broj m je broj pripisivanja kamate godišnje: 12 kod mesečnog, 4 kod tromesečnog.",
      "Nominalna stopa = m × ((1 + efektivna stopa) na (1 ÷ m), minus 1).",
      "Stopa za period je nominalna stopa podeljena sa m.",
    ],
    ejemplo: [
      `Nominalna stopa od 12% godišnje sa mesečnim pripisivanjem odgovara efektivnoj stopi od ${p(aEfectiva(12, 12))}.`,
      `Efektivna stopa od 10% odgovara nominalnoj stopi od ${p(aNominal(10, 12))} kada se kamata pripisuje svakog meseca.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između nominalne i efektivne kamatne stope?",
        respuesta:
          "Nominalna stopa je godišnja stopa bez uticaja pripisivanja kamate. Efektivna uzima u obzir i to da se kamata obračunava na već pripisanu kamatu. Zato je efektivna stopa uvek jednaka nominalnoj ili viša od nje.",
      },
      {
        pregunta: "Da li je ovo isto što i EKS iz ugovora o kreditu?",
        respuesta:
          "Nije. Ovde se računa samo efekat pripisivanja kamate. EKS koju banka navodi kod kredita obuhvata i naknade, osiguranje i druge troškove, pa je obično viša. Kredite poredite po EKS, a štednju po efektivnoj stopi.",
      },
      {
        pregunta: "Zašto češće pripisivanje povećava efektivnu stopu?",
        respuesta:
          "Kamata se ranije dodaje stanju i i sama počinje da donosi kamatu. Kod godišnjeg pripisivanja nominalna i efektivna stopa su iste.",
      },
    ],
    glosario: [
      { termino: "Nominalna kamatna stopa", definicion: "Godišnja stopa bez uticaja pripisivanja kamate." },
      { termino: "Efektivna godišnja stopa", definicion: "Godišnja stopa sa uračunatim složenim obračunom kamate." },
      { termino: "Pripisivanje kamate", definicion: "Trenutak kada se kamata dodaje stanju računa ili duga." },
      { termino: "EKS", definicion: "Efektivna kamatna stopa kredita: kamata i svi troškovi kredita u jednom broju." },
    ],
  };
};
