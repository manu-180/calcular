import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulator kredita i mesečne rate",
    title: tituloQueEntre(`Kalkulator kredita ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Kalkulator kredita i mesečne rate", "Kalkulator kredita"),
    description: "Izračunajte mesečnu ratu kredita, ukupnu kamatu i ceo plan otplate. Videćete i koliko štedite ako kredit otplaćujete brže.",
    intro: [
      "Pre nego što potpišete ugovor o kreditu, važna su dva broja: koliko ćete plaćati svakog meseca i koliko će vas kredit koštati na kamati.",
      "Unesite iznos kredita, godišnju kamatnu stopu i rok otplate. Ako planirate da svakog meseca uplatite nešto više, dodajte i taj iznos i videćete koliko ranije završavate otplatu.",
    ],
    comoSeCalcula: [
      "Računa se sa jednakim mesečnim ratama (anuitetna otplata), kako se otplaćuju gotovinski, auto i stambeni krediti.",
      "Mesečna kamatna stopa = godišnja stopa ÷ 12.",
      "Rata = iznos kredita × mesečna stopa ÷ (1 − (1 + mesečna stopa) na minus broj rata).",
      "Kamata se svakog meseca računa na ono što još dugujete. Ostatak rate smanjuje glavnicu.",
    ],
    ejemplo: [
      `Kredit od ${m(monto)} sa kamatom od 12% godišnje na 36 meseci ima ratu od ${m(cuota36)}. Na kamatu ukupno odlazi ${m(interesesTotales(monto, 12, 36))}.`,
      `Ako rok produžite na 60 meseci, rata pada na ${m(cuota60)}, ali kamata raste na ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa rata kredita?",
        respuesta:
          "Po formuli za anuitetnu otplatu. Sve rate su iste, ali na početku najveći deo rate čini kamata, a pred kraj glavnica. Zato dug u prvim godinama sporo opada.",
      },
      {
        pregunta: "Da li se isplati prevremena otplata kredita?",
        respuesta:
          "Najčešće da, ako banka ne naplaćuje visoku naknadu za to. Dodatni novac ide pravo na glavnicu, a na taj deo se kamata više ne računa. Što ranije uplatite, to više štedite.",
      },
      {
        pregunta: "Da li je duži rok otplate povoljniji?",
        respuesta: "Rata je niža, ali na kamati ukupno plaćate mnogo više. Pre odluke uporedite oba broja.",
      },
      {
        pregunta: "Zašto banka navodi drugačiju ratu?",
        respuesta:
          "Banke često dodaju osiguranje, naknadu za obradu kredita ili računaju sa drugačijom stopom od reklamirane. Ponude poredite po EKS i ukupnom iznosu za otplatu, ne samo po kamatnoj stopi.",
      },
    ],
    glosario: [
      { termino: "Glavnica", definicion: "Deo duga koji još niste otplatili." },
      { termino: "EKS", definicion: "Efektivna kamatna stopa. Obuhvata kamatu i naknade, pa pokazuje stvarnu cenu kredita." },
      { termino: "Anuitet", definicion: "Jednaka mesečna rata koja se sastoji od kamate i dela glavnice." },
    ],
  };
};
