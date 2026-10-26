import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const honap = (n: number) => `${formatearNumero(ctx, n)} hónap`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Hitelkártya-törlesztés kalkulátor",
    title: tituloQueEntre(`Hitelkártya-törlesztés: ${ctx.nombrePais}`, "Hitelkártya-törlesztés: kamat kalkulátor", "Hitelkártya-törlesztés kalkulátor"),
    description: "Nézd meg, hány hónap alatt fizeted vissza a hitelkártya-tartozást, és mennyi kamatot fizetsz, fix befizetéssel vagy a minimális összeggel.",
    intro: [
      "A hitelkártya általában a legdrágább tartozás. Ha csak a minimumot fizeted, a törlesztés évekig elhúzódik, és közben gyűlik a kamat.",
      "Add meg a tartozást, az éves kamatot és azt, hogy havonta mennyit tudsz befizetni. Megmutatjuk, mikor végzel, mennyi kamatot fizetsz, és a havi bontást is.",
    ],
    comoSeCalcula: [
      "Minden hónapban hozzáadódik a kamat: tartozás × éves kamat ÷ 12.",
      "Ezután levonjuk a befizetést. Minimális befizetésnél ez a tartozás egy százaléka, de legalább egy megadott összeg.",
      "Ez addig ismétlődik, amíg a tartozás nullára nem csökken. Ha a befizetés nem nagyobb a kamatnál, a tartozás sosem csökken.",
    ],
    ejemplo: [
      `Tartozás: ${m(saldo)}, évi 22% kamat, havi befizetés: ${m(fijo)}. A visszafizetés ideje ${honap(conFijo.meses)}, a kifizetett kamat ${m(conFijo.intereses)}.`,
      `Ha csak a 3% minimális befizetést fizeted, a törlesztés ideje ${honap(conMinimo.meses)}, a kamat pedig ennyire nő: ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Mi történik, ha csak a minimumot fizetem?",
        respuesta:
          "A minimális befizetés a tartozással együtt csökken, így havonta egyre kevesebbet fizetsz, és a tartozás évekig elhúzódik. Ha teheted, fizess be nagyobb fix összeget, akár csak egy kicsivel többet.",
      },
      {
        pregunta: "Megéri a kártyatartozást személyi kölcsönnel kiváltani?",
        respuesta:
          "Ha a kölcsön kamata jóval alacsonyabb a kártyáénál, általában igen. Hasonlítsd össze a két lehetőség teljes költségét a díjakkal együtt, legjobb a THM alapján.",
      },
      {
        pregunta: "Melyik kártyát fizessem vissza először?",
        respuesta: "Mindegyiken fizesd a minimumot, a maradékot pedig arra tedd, amelyiknek a legmagasabb a kamata. Így fizeted összesen a legkevesebb kamatot.",
      },
    ],
    glosario: [
      { termino: "Minimális befizetés", definicion: "A legkisebb összeg, amelyet egy hónapban büntetés nélkül befizethetsz. Ezzel nem fizeted vissza a tartozást." },
      { termino: "Éves kamat", definicion: "Az a kamat, amelyet a kártya évente felszámol a vissza nem fizetett tartozás után." },
      { termino: "Kamatmentes időszak", definicion: "Az az idő, amíg a vásárlások után nem fizetsz kamatot, ha a teljes tartozást időben visszafizeted." },
    ],
  };
};
