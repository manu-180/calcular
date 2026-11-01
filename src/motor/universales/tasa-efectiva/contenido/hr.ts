import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Preračun nominalne kamatne stope u efektivnu",
    title: tituloQueEntre(
      `Efektivna kamatna stopa: kalkulator ${GRAMATICA.hr.para(ctx.nombrePais)}`,
      "Efektivna kamatna stopa: preračun iz nominalne",
      "Efektivna kamatna stopa",
    ),
    description: "Preračunajte nominalnu godišnju kamatnu stopu u efektivnu i obrnuto, uz mjesečni, tromjesečni, polugodišnji ili dnevni pripis kamate.",
    intro: [
      "Dvije ponude s istom stopom mogu koštati različito. Razlika je u tome koliko se često kamata računa ili pripisuje.",
      "Efektivna godišnja stopa sve ponude stavlja na istu razinu: pokazuje koliko za godinu stvarno plaćate ili zarađujete. Odaberite stopu koju imate, a mi prikazujemo drugu.",
    ],
    comoSeCalcula: [
      "Efektivna stopa = (1 + nominalna stopa ÷ m) na potenciju m, minus 1. Broj m je broj pripisa kamate godišnje: 12 kod mjesečnog, 4 kod tromjesečnog.",
      "Nominalna stopa = m × ((1 + efektivna stopa) na potenciju (1 ÷ m), minus 1).",
      "Stopa za razdoblje je nominalna stopa podijeljena s m.",
    ],
    ejemplo: [
      `Nominalna stopa od 12 % godišnje s mjesečnim pripisom odgovara efektivnoj stopi od ${p(aEfectiva(12, 12))}.`,
      `Efektivna stopa od 10 % odgovara nominalnoj stopi od ${p(aNominal(10, 12))} kada se kamata pripisuje svakog mjeseca.`,
    ],
    faq: [
      {
        pregunta: "Koja je razlika između nominalne i efektivne kamatne stope?",
        respuesta:
          "Nominalna stopa je godišnja stopa bez utjecaja pripisa kamate. Efektivna uzima u obzir i to da se kamata računa na već pripisanu kamatu. Zato je efektivna stopa uvijek jednaka nominalnoj ili viša od nje.",
      },
      {
        pregunta: "Je li ovo isto što i EKS iz ugovora o kreditu?",
        respuesta:
          "Nije. Ovdje se računa samo učinak pripisa kamate. EKS koji banka navodi kod kredita obuhvaća i naknade, osiguranje i druge troškove, pa je obično viši. Kredite uspoređujte prema EKS-u, a štednju prema efektivnoj stopi.",
      },
      {
        pregunta: "Zašto češći pripis povećava efektivnu stopu?",
        respuesta:
          "Kamata se ranije dodaje stanju i sama počinje donositi kamatu. Kod godišnjeg pripisa nominalna i efektivna stopa su iste.",
      },
    ],
    glosario: [
      { termino: "Nominalna kamatna stopa", definicion: "Godišnja stopa bez utjecaja pripisa kamate." },
      { termino: "Efektivna godišnja stopa", definicion: "Godišnja stopa s uračunatim složenim izračunom kamate." },
      { termino: "Pripis kamate", definicion: "Trenutak kada se kamata dodaje stanju računa ili duga." },
      { termino: "EKS", definicion: "Efektivna kamatna stopa kredita: kamata i svi troškovi kredita u jednom broju." },
    ],
  };
};
