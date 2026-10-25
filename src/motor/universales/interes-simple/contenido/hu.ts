import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kamat kalkulátor: egyszerű kamat számítása",
    title: tituloQueEntre(`Kamat kalkulátor: ${ctx.nombrePais}`, "Kamat kalkulátor: egyszerű kamat számítása", "Kamat kalkulátor"),
    description: "Számold ki az egyszerű kamatot egy tőkeösszegre éves kamatláb mellett, napokra, hónapokra vagy évekre. Választhatsz 365 vagy 360 napos évet.",
    intro: [
      "Az egyszerű kamatot mindig az eredeti tőke után számolják: az időszak alatt a kamat nem adódik hozzá a tőkéhez.",
      "Rövid lejáratú betéteknél, ismerősök közötti kölcsönnél és sok iskolai feladatban használják.",
    ],
    comoSeCalcula: [
      "Kamat = tőke × éves kamatláb × időtartam években.",
      "Hónapokban megadott időtartamnál tizenkettővel osztunk. Napoknál az osztó 365 vagy 360, attól függően, milyen évvel számol a bank.",
      "Összesen = tőke + kamat.",
    ],
    ejemplo: [
      `Tőke: ${m(capital)}, évi 10% kamat mellett. Fél év alatt ennyi kamat jár rá: ${m(capital * 0.1 * 0.5)}.`,
      `Ugyanez a tőke 90 nap alatt 365 napos évvel számolva ennyit hoz: ${m((capital * 0.1 * 90) / 365)}. 360 napos évvel ennyit: ${m((capital * 0.1 * 90) / 360)}.`,
    ],
    faq: [
      {
        pregunta: "Mi az egyszerű kamat képlete?",
        respuesta: `K = T × i × t. T a tőke, i az éves kamatláb tizedes törtként (10% értéke: ${formatearNumero(ctx, 0.1, 2)}), t pedig az időtartam években.`,
      },
      {
        pregunta: "Mi a különbség az egyszerű és a kamatos kamat között?",
        respuesta: "Az egyszerű kamatot mindig ugyanarra a tőkére számolják. Kamatos kamatnál a kamat hozzáadódik a tőkéhez, és utána az is kamatozik.",
      },
      {
        pregunta: "Miért számolnak egyes bankok 360 napos évvel?",
        respuesta: "Ez banki szokás, amely egyszerűbbé teszi a számítást. 360 nappal a kamat valamivel magasabb lesz. Nézd meg, milyen évvel számol a bankod.",
      },
    ],
    glosario: [
      { termino: "Tőke", definicion: "A kölcsönadott vagy betett pénz, kamat nélkül." },
      { termino: "Banki év", definicion: "360 naposnak számolt év, 30 napos hónapokkal." },
    ],
  };
};
