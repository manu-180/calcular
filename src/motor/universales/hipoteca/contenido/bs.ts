import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Kalkulator stambenog kredita",
    title: tituloQueEntre(
      `Kalkulator stambenog kredita ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Kalkulator stambenog kredita: rata i kamata",
      "Kalkulator stambenog kredita",
    ),
    description: "Izračunajte mjesečnu ratu stambenog kredita prema cijeni stana, učešću, kamatnoj stopi i roku otplate. Vidjet ćete i kamatu i preostali dug po godinama.",
    intro: [
      "Stambeni kredit za većinu je porodica najveći dug koji će ikada uzeti. Dobro je vidjeti sve brojeve prije razgovora s bankom.",
      "Unesite cijenu nekretnine, učešće, kamatnu stopu i rok otplate. Ako uz ratu plaćate osiguranje ili porez na nekretnine, dodajte i to i vidjet ćete stvarni mjesečni iznos.",
    ],
    comoSeCalcula: [
      "Iznos kredita = cijena nekretnine − učešće.",
      "Mjesečna rata je anuitetna (uvijek ista), s godišnjom stopom podijeljenom s 12 i rokom otplate u mjesecima.",
      "Za svaku se godinu sabiraju plaćena kamata i otplaćena glavnica i prikazuje se preostali dug.",
    ],
    ejemplo: [
      `Za stan od ${m(precio)} s učešćem od 20 % kredit iznosi ${m(prestado)}. Uz kamatu od 7 % godišnje na 30 godina, mjesečna rata je ${m(cuota30)}.`,
      `Za 30 godina na kamatu odlazi ${m(interesesTotales(prestado, 7, 360))}. Na 15 godina rata raste na ${m(cuota15)}, ali kamata pada na ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Koliko mi učešće treba za stambeni kredit?",
        respuesta:
          "Ovisi o banci i pravilima koja vrijede u zemlji, a banke obično finansiraju samo dio vrijednosti nekretnine. Što je učešće veće, manje pozajmljujete, rata je niža i plaćate manje kamate. Odvojite novac i za troškove odobrenja kredita.",
      },
      {
        pregunta: "Zašto se dug u prvim godinama gotovo ne smanjuje?",
        respuesta:
          "Kamata se računa na preostali dug. Na početku je on velik, pa najveći dio rate odlazi na kamatu. Taj se odnos s vremenom okreće.",
      },
      {
        pregunta: "Da li je bolji kraći rok otplate?",
        respuesta:
          "Ako možete plaćati višu ratu, jest: na kamati plaćate znatno manje. Ako ne možete, duži rok uz povremene prijevremene uplate može biti dobro rješenje.",
      },
      {
        pregunta: "Može li se moja rata promijeniti?",
        respuesta:
          "S fiksnom kamatnom stopom rata ostaje ista. S promjenjivom stopom rata prati promjene referentne stope i može porasti ili pasti. Ovaj kalkulator računa s istom stopom tokom cijelog roka otplate.",
      },
    ],
    glosario: [
      { termino: "Učešće", definicion: "Dio cijene nekretnine koji plaćate vlastitim novcem." },
      { termino: "Glavnica", definicion: "Iznos koji ste pozajmili i koji još trebate vratiti." },
      { termino: "Fiksna kamatna stopa", definicion: "Stopa koja se ne mijenja tokom ugovorenog perioda, pa je i rata ista." },
    ],
  };
};
