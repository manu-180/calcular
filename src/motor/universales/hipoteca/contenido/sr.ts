import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Kalkulator stambenog kredita",
    title: tituloQueEntre(
      `Kalkulator stambenog kredita ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Kalkulator stambenog kredita: rata i kamata",
      "Kalkulator stambenog kredita",
    ),
    description: "Izračunajte mesečnu ratu stambenog kredita prema ceni stana, učešću, kamatnoj stopi i roku otplate. Videćete i kamatu i preostali dug po godinama.",
    intro: [
      "Stambeni kredit je za većinu porodica najveći dug koji će ikada uzeti. Dobro je da sve brojeve vidite pre razgovora sa bankom.",
      "Unesite cenu nekretnine, učešće, kamatnu stopu i rok otplate. Ako uz ratu plaćate osiguranje ili porez na imovinu, dodajte i to i videćete stvaran mesečni iznos.",
    ],
    comoSeCalcula: [
      "Iznos kredita = cena nekretnine − učešće.",
      "Mesečna rata je anuitetna (uvek ista), sa godišnjom stopom podeljenom sa 12 i rokom otplate u mesecima.",
      "Za svaku godinu sabiraju se plaćena kamata i otplaćena glavnica i prikazuje se preostali dug.",
    ],
    ejemplo: [
      `Za stan od ${m(precio)} sa učešćem od 20% kredit iznosi ${m(prestado)}. Uz kamatu od 7% godišnje na 30 godina, mesečna rata je ${m(cuota30)}.`,
      `Za 30 godina na kamatu odlazi ${m(interesesTotales(prestado, 7, 360))}. Na 15 godina rata raste na ${m(cuota15)}, ali kamata pada na ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Koliko učešće mi treba za stambeni kredit?",
        respuesta:
          "Zavisi od banke i pravila koja važe u zemlji, a banke obično finansiraju samo deo vrednosti nekretnine. Što je učešće veće, manje pozajmljujete, rata je niža i plaćate manje kamate. Odvojite novac i za troškove odobrenja kredita.",
      },
      {
        pregunta: "Zašto dug u prvim godinama skoro da ne opada?",
        respuesta:
          "Kamata se računa na preostali dug. Na početku je on velik, pa najveći deo rate odlazi na kamatu. Taj odnos se vremenom okreće.",
      },
      {
        pregunta: "Da li je bolji kraći rok otplate?",
        respuesta:
          "Ako možete da plaćate višu ratu, da: na kamati plaćate znatno manje. Ako ne možete, duži rok uz povremene prevremene uplate može biti dobro rešenje.",
      },
      {
        pregunta: "Može li moja rata da se promeni?",
        respuesta:
          "Sa fiksnom kamatnom stopom rata ostaje ista. Sa varijabilnom stopom rata prati promene referentne stope i može da poraste ili da padne. Ovaj kalkulator računa sa istom stopom tokom celog roka otplate.",
      },
    ],
    glosario: [
      { termino: "Učešće", definicion: "Deo cene nekretnine koji plaćate sopstvenim novcem." },
      { termino: "Glavnica", definicion: "Iznos koji ste pozajmili i koji još treba da vratite." },
      { termino: "Fiksna kamatna stopa", definicion: "Stopa koja se ne menja tokom ugovorenog perioda, pa je i rata ista." },
    ],
  };
};
