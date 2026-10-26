import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Kalkulačka spoření na důchod",
    title: tituloQueEntre(`Spoření na důchod: kalkulačka (${ctx.nombrePais})`, "Kalkulačka spoření na důchod", "Spoření na důchod"),
    description: "Zjistěte, kolik můžete měsíčními vklady naspořit na důchod a jaký měsíční příjem vám to přinese, v dnešních cenách.",
    intro: [
      "Státní důchod často nestačí na to, abyste si udrželi dosavadní životní úroveň. Vlastní úspory, i malé, hodně pomohou, pokud začnete včas.",
      "Zadejte svůj věk, kdy chcete jít do důchodu, kolik už máte a kolik můžete každý měsíc přidat. Ukážeme vám částku v den odchodu do důchodu a kolik z ní můžete měsíčně čerpat.",
    ],
    comoSeCalcula: [
      "Úspory každý měsíc rostou o reálný výnos, tedy výnos minus inflace. Proto je výsledek v dnešních cenách.",
      "Po odchodu do důchodu se úspory vyplácejí ve stejných měsíčních částkách po zvolený počet let. Zůstatek mezitím dál vydělává.",
      "Státní důchod, daně ani poplatky za investice se nezapočítávají.",
    ],
    ejemplo: [
      `Pokud ve 30 letech máte ${m(actual)} a každý měsíc přidáte ${m(aporte)} s reálným výnosem 4 %, do 65 let naspoříte ${m(capital30)}. To vystačí na ${m(rentaMensual(capital30, 4, 25))} měsíčně po dobu 25 let.`,
      `Když začnete se stejnými čísly až ve 40 letech, vyjde ${m(capital40)}. Deset let navíc dělá velký rozdíl.`,
    ],
    faq: [
      {
        pregunta: "Co je reálný výnos?",
        respuesta: "To, co investice vynesou po odečtení inflace. Když investice vynáší 7 % a inflace je 3 %, reálný výnos je zhruba 4 %.",
      },
      {
        pregunta: "Nahradí to státní důchod?",
        respuesta: "Ne. Jde o vaše vlastní úspory navíc ke státnímu důchodu nebo penzijnímu spoření. Odhad státního důchodu vám poskytne příslušný úřad ve vaší zemi.",
      },
      {
        pregunta: "Kolik si odkládat na důchod?",
        respuesta: "Jediné správné číslo neexistuje. Běžné pravidlo doporučuje odkládat 10 až 15 % příjmu. Nejdůležitější je začít co nejdříve.",
      },
    ],
    glosario: [
      { termino: "Reálný výnos", definicion: "To, co investice vynášejí nad inflaci." },
      { termino: "Dnešní ceny", definicion: "Budoucí částka vyjádřená tím, co se za ni dá koupit dnes." },
    ],
  };
};
