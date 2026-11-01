import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `150 ruutjala katmiseks vajad ${n(piezas, 0)} plaati, kui plaadi suurus on 12 × 12 in (igaüks 1 ft²) ja materjalikadu 10%.`,
          `Kui pakis on 10 plaati, ostad ${n(Math.ceil(piezas / 10), 0)} pakki.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `20 ruutmeetri katmiseks vajad ${n(piezas, 0)} plaati, kui plaadi suurus on 60 × 60 cm (igaüks ${n(pieza)} m²) ja materjalikadu 10%.`,
          `Kui pakis on 4 plaati, ostad ${n(Math.ceil(piezas / 4), 0)} pakki.`,
        ];
      })();
  return {
    h1: "Kui palju plaate on vaja?",
    title: tituloQueEntre(
      `Plaadikalkulaator: kui palju plaate on vaja | ${ctx.nombrePais}`,
      `Plaadikalkulaator | ${ctx.nombrePais}`,
      "Plaadikalkulaator",
    ),
    description: "Arvuta, mitu põranda- või seinaplaati vajad koos materjalikaoga ja mitu pakki tasub osta.",
    intro: [
      "Sisesta pindala, plaatide suurus ja mitu plaati on pakis. Näed, mitu plaati ja pakki osta.",
      "Materjalikadu katab servade lõikamise ja juhuslikult puruneva plaadi.",
    ],
    comoSeCalcula: [
      `Ühe plaadi pindala = pikkus × laius ${imperial ? "ruutjalgades" : "ruutmeetrites"}.`,
      "Plaadid = pindala × (1 + materjalikadu ÷ 100) ÷ ühe plaadi pindala, ümardatud ülespoole.",
      "Pakid = plaadid ÷ plaate pakis, ümardatud ülespoole.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kui palju materjalikadu arvestada?",
        respuesta: "Otse paigaldamisel 10%. Diagonaalis paigaldamisel, kalasabamustri puhul või toas, kus on palju lõikeid, arvesta 15-20%.",
      },
      {
        pregunta: "Kas vuugid tuleb arvesse võtta?",
        respuesta: "Ei pea. Vuugid on vaid mõne millimeetri laiused ja see vahe sisaldub juba materjalikaos.",
      },
      {
        pregunta: "Kas tasub osta paar plaati lisaks?",
        respuesta: "Tasub, ja samast tootmispartiist. Kui plaat hiljem puruneb, võib täpselt sama tooni olla raske leida.",
      },
    ],
    glosario: [
      { termino: "Materjalikadu", definicion: "Lisaprotsent, mis ostetakse lõikamiste ja purunevate plaatide jaoks." },
      { termino: "Vuukimine", definicion: "Plaatidevaheliste vahede täitmine vuugiseguga." },
    ],
  };
};
