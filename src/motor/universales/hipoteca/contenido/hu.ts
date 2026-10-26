import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Lakáshitel kalkulátor",
    title: tituloQueEntre(`Lakáshitel kalkulátor: ${ctx.nombrePais}`, "Lakáshitel kalkulátor: törlesztőrészlet és kamat", "Lakáshitel kalkulátor"),
    description: "Számold ki a lakáshitel havi törlesztőrészletét a vételár, az önerő, a kamat és a futamidő alapján. Látod a teljes kamatot és a tartozást évről évre.",
    intro: [
      "A lakáshitel a legtöbb háztartás életében a legnagyobb tartozás. Érdemes minden számot látni, mielőtt leülsz tárgyalni a bankkal.",
      "Add meg a vételárat, az önerőt, a kamatot és a futamidőt. Ha a törlesztés mellett biztosítást, építményadót vagy közös költséget is fizetsz, írd be ezeket is: így a valódi havi kiadást látod.",
    ],
    comoSeCalcula: [
      "Hitelösszeg = vételár − önerő.",
      "A havi törlesztőrészlet annuitásos (végig ugyanannyi): az éves kamat tizenketted részével és a hónapokban mért futamidővel számolunk.",
      "Minden évre összeadjuk a kifizetett kamatot és a törlesztett tőkét, és megmutatjuk a hátralévő tartozást.",
    ],
    ejemplo: [
      `Egy ingatlan ára ${m(precio)}, az önerő 20%, így a hitelösszeg ${m(prestado)}. Évi 7% kamat és 30 év futamidő mellett a havi törlesztőrészlet ${m(cuota30)}.`,
      `A 30 év alatt kifizetett kamat ${m(interesesTotales(prestado, 7, 360))}. Ha 15 év a futamidő, a részlet ${m(cuota15)} lesz, a kamat viszont csak ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Mennyi önerő kell a lakáshitelhez?",
        respuesta:
          "Ez a banktól és az adott ország szabályaitól függ: a bankok általában az ingatlan értékének csak egy részét finanszírozzák. Minél több az önerőd, annál kevesebbet veszel fel, annál kisebb a részlet és annál kevesebb a kamat. A hitelfelvétel költségeire is tegyél félre.",
      },
      {
        pregunta: "Miért alig csökken a tartozás az első években?",
        respuesta:
          "A kamatot a fennálló tartozás után számolják. Az elején ez nagy, ezért a törlesztőrészlet nagy része kamat. Az arány idővel megfordul.",
      },
      {
        pregunta: "Jobb a rövidebb futamidő?",
        respuesta:
          "Ha bírod a magasabb részletet, igen: jóval kevesebb kamatot fizetsz. Ha nem, a hosszabb futamidő és az időnkénti előtörlesztés is jó megoldás lehet.",
      },
      {
        pregunta: "Változhat a törlesztőrészletem?",
        respuesta:
          "A kamatperiódus alatt a részlet nem változik. Ha a periódus lejár, a bank új kamatot ajánl, és a részlet nőhet vagy csökkenhet. Ez a kalkulátor a teljes futamidőre ugyanazzal a kamattal számol.",
      },
    ],
    glosario: [
      { termino: "Önerő", definicion: "A vételárnak az a része, amelyet saját pénzből fizetsz ki." },
      { termino: "Tőketartozás", definicion: "A felvett összegből még vissza nem fizetett rész." },
      { termino: "Kamatperiódus", definicion: "Az az időszak, amely alatt a bank nem változtatja meg a hitel kamatát." },
      { termino: "THM", definicion: "Teljes hiteldíj mutató: a kamat mellett a díjakat is tartalmazza, így a hitel valódi éves költségét mutatja." },
    ],
  };
};
