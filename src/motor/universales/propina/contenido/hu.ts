import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Borravaló kalkulátor",
    title: tituloQueEntre(
      `Borravaló kalkulátor: mennyi borravalót adjak? (${ctx.nombrePais})`,
      "Borravaló kalkulátor: mennyi borravalót adjak?",
      "Borravaló kalkulátor",
    ),
    description:
      "Számold ki a borravalót, a teljes számlát és azt, mennyit fizet fejenként a társaság. Mindenki részét felfelé kerekítheted kerek összegre.",
    intro: [
      "Írd be a számla összegét, a borravaló százalékát és azt, hányan fizettek. Látod a borravalót, a végösszeget és a fejenkénti részt.",
      "Ha jobban szereted a kerek számokat, a kalkulátor mindenki részét felfelé kerekíti, és a különbség a borravalóhoz kerül.",
    ],
    comoSeCalcula: [
      "Borravaló = számla × borravaló százaléka ÷ 100.",
      "Végösszeg = számla + borravaló.",
      "A fejenkénti rész a végösszeg osztva a fizetők számával.",
    ],
    ejemplo: [
      `Egy ${m(cuenta)} összegű számlához ${n(10)} százalék borravaló ennyit tesz hozzá: ${m(propina)}. A végösszeg így ${m(cuenta + propina)}.`,
      `Ha hárman fizettek, fejenként ennyi jut: ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Mennyi borravalót szokás adni?",
        respuesta: `A helyi szokástól függ. Nézd meg, mi a megszokott ${GRAMATICA.hu.en(ctx.nombrePais)}, és azt is, hogy a számla nem tartalmaz-e már szervizdíjat.`,
      },
      {
        pregunta: "A borravalót az adóval együtt vagy anélkül kell számolni?",
        respuesta: "Általában a számla végösszegéből. Ha az adó nélküli összegből szeretnéd számolni, azt írd be.",
      },
      {
        pregunta: "Hogyan számolom ki gyorsan a 10 vagy a 15 százalékos borravalót?",
        respuesta: `Oszd el a számlát tízzel, ez a 10 százalék. A 15 százalékhoz add hozzá ennek a felét is. Egy 8500 összegű számlánál a 10 százalék ${n(8500 * 0.1)}, a 15 százalék ${n(8500 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Borravaló", definicion: "Az ár fölött adott összeg a kiszolgálásért." },
      { termino: "Szervizdíj", definicion: "Az az összeg, amelyet a vendéglátóhely már hozzáadott a számlához a kiszolgálásért." },
    ],
  };
};
