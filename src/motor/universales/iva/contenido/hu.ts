import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.hu;
  return {
    h1: `ÁFA kalkulátor (${ctx.nombrePais})`,
    title: tituloQueEntre(`ÁFA kalkulátor: ${tasa} (${ctx.nombrePais})`, `ÁFA számítás (${ctx.nombrePais})`, `ÁFA kalkulátor: ${tasa}`),
    description: `Nettóból bruttó és bruttóból nettó egy lépésben, ${tasa} általános kulccsal: a nettó ár, az adó összege és a bruttó ár fillérre pontosan.`,
    intro: [
      `Az általános kulcs, amellyel a kalkulátor ${g.en(ctx.nombrePais)} számol: ${tasa}.`,
      "Válaszd ki, hogy hozzáadod az adót a nettó árhoz, vagy kivonod a bruttó árból, aztán írd be az összeget.",
    ],
    comoSeCalcula: [
      "ÁFA hozzáadása: adó = nettó ár × kulcs ÷ 100. Bruttó ár = nettó ár + adó.",
      "ÁFA kivonása: nettó ár = bruttó ár ÷ (1 + kulcs ÷ 100). Az adó a két ár különbsége.",
      "Ha a termékre kedvezményes kulcs vonatkozik, írd be a „Más ÁFA-kulcs” mezőbe.",
    ],
    ejemplo: [
      `Nettó ár: ${precio}. Szorozd meg a kulccsal (${tasa}), és az eredményt add hozzá az árhoz: így kapod a bruttó árat.`,
      `Bruttó ár: ${precio}. Oszd el egy plusz a kulccsal, és a kapott nettó árat vond ki belőle: a különbség az ÁFA összege.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolok bruttóból nettót?",
        respuesta: "Oszd el a bruttó árat egy plusz a kulcs tizedes alakjával. Az eredmény a nettó ár, a különbség pedig az ÁFA összege.",
      },
      {
        pregunta: "Miért nem elég levonni a kulcsot a bruttó árból?",
        respuesta: "Mert az adót a kisebb, nettó árból számolták. Ha a százalékot a bruttó árból vonod le, többet vonsz le, mint amennyi az adó.",
      },
      {
        pregunta: `Mindenre az általános kulcs (${tasa}) vonatkozik?`,
        respuesta: "Nem mindig. Egyes élelmiszerekre, gyógyszerekre vagy szolgáltatásokra kedvezményes kulcs vonatkozik, mások adómentesek. Ilyenkor használd a „Más ÁFA-kulcs” mezőt.",
      },
    ],
    glosario: [
      { termino: "ÁFA", definicion: "Általános forgalmi adó. A termékek és szolgáltatások árára rakódik, és a vevő fizeti meg az árban." },
      { termino: "Nettó ár", definicion: "Az ár adó nélkül, vagyis az adóalap." },
    ],
  };
};
