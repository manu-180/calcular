import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulator kredita i mjesečne rate",
    title: tituloQueEntre(`Kalkulator kredita ${GRAMATICA.hr.para(ctx.nombrePais)}`, "Kalkulator kredita i mjesečne rate", "Kalkulator kredita"),
    description: "Izračunajte mjesečnu ratu kredita, ukupnu kamatu i cijeli plan otplate. Vidjet ćete i koliko štedite ako kredit otplaćujete brže.",
    intro: [
      "Prije nego što potpišete ugovor o kreditu, važna su dva broja: koliko ćete plaćati svakog mjeseca i koliko će vas kredit koštati na kamati.",
      "Unesite iznos kredita, godišnju kamatnu stopu i rok otplate. Ako planirate svakog mjeseca uplatiti nešto više, dodajte i taj iznos i vidjet ćete koliko ranije završavate otplatu.",
    ],
    comoSeCalcula: [
      "Računa se s jednakim mjesečnim ratama (anuitetna otplata), kako se otplaćuju gotovinski, automobilski i stambeni krediti.",
      "Mjesečna kamatna stopa = godišnja stopa ÷ 12.",
      "Rata = iznos kredita × mjesečna stopa ÷ (1 − (1 + mjesečna stopa) na minus broj rata).",
      "Kamata se svakog mjeseca računa na ono što još dugujete. Ostatak rate smanjuje glavnicu.",
    ],
    ejemplo: [
      `Kredit od ${m(monto)} s kamatom od 12 % godišnje na 36 mjeseci ima ratu od ${m(cuota36)}. Na kamatu ukupno odlazi ${m(interesesTotales(monto, 12, 36))}.`,
      `Ako rok produljite na 60 mjeseci, rata pada na ${m(cuota60)}, ali kamata raste na ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa rata kredita?",
        respuesta:
          "Prema formuli za anuitetnu otplatu. Sve su rate iste, ali na početku najveći dio rate čini kamata, a pred kraj glavnica. Zato se dug u prvim godinama sporo smanjuje.",
      },
      {
        pregunta: "Isplati li se prijevremena otplata kredita?",
        respuesta:
          "Najčešće da, ako banka za to ne naplaćuje visoku naknadu. Dodatni novac ide izravno na glavnicu, a na taj se dio kamata više ne računa. Što ranije uplatite, to više štedite.",
      },
      {
        pregunta: "Je li dulji rok otplate povoljniji?",
        respuesta: "Rata je niža, ali na kamati ukupno plaćate puno više. Prije odluke usporedite oba broja.",
      },
      {
        pregunta: "Zašto banka navodi drukčiju ratu?",
        respuesta:
          "Banke često dodaju osiguranje, naknadu za obradu kredita ili računaju s drukčijom stopom od oglašene. Ponude uspoređujte prema EKS-u i ukupnom iznosu za otplatu, ne samo prema kamatnoj stopi.",
      },
    ],
    glosario: [
      { termino: "Glavnica", definicion: "Dio duga koji još niste otplatili." },
      { termino: "EKS", definicion: "Efektivna kamatna stopa. Obuhvaća kamatu i naknade, pa pokazuje stvarnu cijenu kredita." },
      { termino: "Anuitet", definicion: "Jednaka mjesečna rata koja se sastoji od kamate i dijela glavnice." },
    ],
  };
};
