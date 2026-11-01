import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Kedvezmény kalkulátor",
    title: tituloQueEntre(
      `Kedvezmény kalkulátor: akciós ár számítása (${ctx.nombrePais})`,
      "Kedvezmény kalkulátor: akciós ár számítása",
      "Kedvezmény kalkulátor",
    ),
    description:
      "Számold ki az akciós árat és azt, mennyit spórolsz, akkor is, ha két kedvezmény jön egymás után, például 30 százalék és még 10 százalék.",
    intro: [
      "Írd be az árat és a kedvezményt, és rögtön látod, mennyit fizetsz és mennyit spórolsz.",
      "Ha az akcióhoz még egy kedvezmény is jár, azt is add meg: két egymás utáni kedvezmény sosem egyszerűen összeadódik.",
    ],
    comoSeCalcula: [
      "Akciós ár = eredeti ár × (1 − kedvezmény ÷ 100).",
      "A további kedvezmény már az első kedvezménnyel csökkentett árból számol.",
      "A megtakarítás az eredeti ár és az akciós ár különbsége.",
    ],
    ejemplo: [
      `Egy ${m(precio)} árú termék ${n(25)} százalékos kedvezménnyel ennyibe kerül: ${m(precio * 0.75)}.`,
      `${n(30)} százalék és utána még ${n(10)} százalék kedvezménnyel az ár: ${m(precio * 0.7 * 0.9)}. A teljes kedvezmény így ${n(efectiva)} százalék, nem ${n(40)} százalék.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolom ki a kedvezményt?",
        respuesta: "Szorozd meg az árat a kedvezmény százalékával, és oszd el százzal. Ennyit spórolsz. Ezt vond le az árból, és megkapod, mennyit kell fizetned.",
      },
      {
        pregunta: "Ugyanaz a 30 plusz 10 százalék kedvezmény, mint a 40 százalék?",
        respuesta: `Nem. A második kedvezmény a már leárazott árból számol, ezért összesen ${n(efectiva)} százalék jön ki.`,
      },
      {
        pregunta: "Hogyan számolom vissza az eredeti árat az akciós árból?",
        respuesta: `Oszd el az akciós árat ezzel: (1 − kedvezmény ÷ 100). Huszonöt százalékos kedvezménynél az osztó: ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Kedvezmény", definicion: "Az a százalék, amennyivel az eredeti ár csökken." },
      { termino: "Tényleges kedvezmény", definicion: "A teljes megtakarítás százalékban, ha egynél több kedvezmény jár." },
    ],
  };
};
