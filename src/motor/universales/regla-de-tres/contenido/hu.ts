import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Arányosság kalkulátor",
    title: tituloQueEntre(
      `Egyenes és fordított arányosság kalkulátor (${ctx.nombrePais})`,
      "Egyenes és fordított arányosság kalkulátor",
      "Arányosság kalkulátor",
    ),
    description:
      "Oldd meg egy pillanat alatt az egyenes vagy fordított arányossági feladatot. Írj be három értéket, és megkapod a negyediket a levezetéssel együtt.",
    intro: [
      "Az arányosság akkor használható, ha két mennyiség együtt változik, és a négy értékből hármat ismersz.",
      "Válaszd ki, hogy egyenes vagy fordított arányosságról van szó, töltsd ki A, B és C mezőt, és a kalkulátor kiszámolja X értékét.",
    ],
    comoSeCalcula: [
      "Egyenes arányosság: X = B × C ÷ A. Akkor használd, ha a két mennyiség együtt nő (több kiló, magasabb ár).",
      "Fordított arányosság: X = A × B ÷ C. Akkor használd, ha az egyik nő, a másik csökken (több ember, kevesebb nap).",
    ],
    ejemplo: [
      `Ha ${n(3)} kiló ára ${m(precio3)}, akkor ${n(5)} kiló ára ${m((precio3 * 5) / 3)}.`,
      `Ha ${n(4)} ember ${n(12)} nap alatt fest ki egy házat, akkor ${n(6)} ember ${n((4 * 12) / 6)} nap alatt végez vele.`,
    ],
    faq: [
      {
        pregunta: "Honnan tudom, hogy egyenes vagy fordított arányosságról van szó?",
        respuesta: "Ha az egyik mennyiség a másikkal együtt nő, egyenes arányosságról van szó. Ha az egyik csökken, miközben a másik nő, akkor fordítottról.",
      },
      {
        pregunta: "Hogyan számolok egyenes arányosságot fejben vagy papíron?",
        respuesta: `Szorozd össze átlósan a két ismert értéket, és oszd el a megmaradóval. Ha 3 megfelel 600 egységnek, akkor 5 ennyinek felel meg: 600 × 5 ÷ 3 = ${n((600 * 5) / 3)}.`,
      },
      {
        pregunta: "Használható százalékszámításra is?",
        respuesta: "Igen. Ha 200 a 100 százalék, akkor 50 a 25 százalék: ez egyenes arányosság, ahol A = 200, B = 100 és C = 50.",
      },
    ],
    glosario: [
      { termino: "Egyenes arányosság", definicion: "A két mennyiség együtt nő vagy együtt csökken." },
      { termino: "Fordított arányosság", definicion: "Az egyik mennyiség nő, miközben a másik csökken." },
    ],
  };
};
