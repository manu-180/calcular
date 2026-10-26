import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Hypoteční kalkulačka",
    title: tituloQueEntre(`Hypoteční kalkulačka: ${ctx.nombrePais}`, "Hypoteční kalkulačka: splátka a úroky", "Hypoteční kalkulačka"),
    description: "Spočítejte měsíční splátku hypotéky podle ceny nemovitosti, vlastních zdrojů, úrokové sazby a doby splatnosti. Uvidíte i úroky a zůstatek úvěru po letech.",
    intro: [
      "Hypotéka je pro většinu domácností největší dluh, jaký si kdy vezmou. Vyplatí se vidět všechna čísla ještě před jednáním s bankou.",
      "Zadejte cenu nemovitosti, vlastní zdroje, sazbu a dobu splatnosti. Pokud spolu s hypotékou platíte pojištění nebo daň z nemovitých věcí, přidejte je a uvidíte skutečnou měsíční částku.",
    ],
    comoSeCalcula: [
      "Výše úvěru = cena nemovitosti − vlastní zdroje.",
      "Měsíční splátka je anuitní (stále stejná), s roční sazbou vydělenou 12 a dobou splatnosti v měsících.",
      "Za každý rok se sečtou zaplacené úroky a splacená jistina a ukáže se zůstatek úvěru.",
    ],
    ejemplo: [
      `Nemovitost za ${m(precio)} s vlastními zdroji 20 % znamená úvěr ${m(prestado)}. Při sazbě 7 % ročně na 30 let vychází měsíční splátka ${m(cuota30)}.`,
      `Za 30 let zaplatíte na úrocích ${m(interesesTotales(prestado, 7, 360))}. Na 15 let splátka vzroste na ${m(cuota15)}, ale úroky klesnou na ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Kolik vlastních zdrojů potřebuji?",
        respuesta:
          "Záleží na bance a na pravidlech, která v zemi platí; banky obvykle půjčí jen část hodnoty nemovitosti. Čím víc vlastních zdrojů máte, tím méně si půjčíte, tím nižší je splátka a tím méně zaplatíte na úrocích. Odložte si také peníze na náklady spojené se sjednáním.",
      },
      {
        pregunta: "Proč dluh v prvních letech skoro neklesá?",
        respuesta:
          "Úroky se počítají ze zůstatku úvěru. Na začátku je velký, takže většina splátky jde na úroky. Postupně se poměr obrací.",
      },
      {
        pregunta: "Je lepší kratší doba splatnosti?",
        respuesta:
          "Pokud vyšší splátku zvládnete, ano: na úrocích zaplatíte výrazně méně. Pokud ne, může se hodit delší splatnost a mimořádné splátky, když to půjde.",
      },
      {
        pregunta: "Může se moje splátka změnit?",
        respuesta:
          "Během fixace úrokové sazby zůstává splátka stejná. Po jejím skončení vám banka nabídne novou sazbu a splátka může vzrůst nebo klesnout. Tato kalkulačka počítá se stejnou sazbou po celou dobu splatnosti.",
      },
    ],
    glosario: [
      { termino: "Vlastní zdroje", definicion: "Část ceny nemovitosti, kterou zaplatíte z vlastních peněz." },
      { termino: "Jistina", definicion: "Částka, kterou jste si půjčili a ještě musíte splatit." },
      { termino: "Fixace", definicion: "Období, po které banka nemění úrokovou sazbu hypotéky." },
    ],
  };
};
