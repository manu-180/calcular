import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "blerja" : "qiraja");
  return {
    h1: "Kalkulator qira apo blerje shtëpie",
    title: tituloQueEntre(`Qira apo blerje shtëpie: ${ctx.nombrePais}`, "Qira apo blerje shtëpie", "Qira apo blerje"),
    description: "Krahasoni qiranë me blerjen e një shtëpie për aq vite sa të zgjidhni. Shikoni cila mundësi ju lë më shumë pasuri, nga cili vit dhe me sa.",
    intro: [
      "Nuk mjafton të krahasoni këstin e kredisë me qiranë. Kush blen paguan interes, mirëmbajtje dhe taksë prone, por në fund e ka shtëpinë. Kush qëndron me qira mund ta mbajë parapagimin të investuar.",
      "Kalkulatori i mbledh të gjitha këto vit pas viti dhe ju tregon cila mundësi ju lë me një pasuri neto më të madhe.",
    ],
    comoSeCalcula: [
      "Blerje: çdo muaj paguani këstin e kredisë për shtëpi dhe kostot e pronarit. Pasuria neto është vlera e shtëpisë minus atë që i keni ende borxh bankës.",
      "Qira: parapagimi dhe kostot e blerjes mbeten të investuara me kthimin alternativ, ndërsa qiraja rritet çdo vit.",
      "Çdo muaj, mundësia që shpenzon më pak e investon diferencën, kështu që të dyja nisen nga i njëjti buxhet.",
      "Mundësia më e mirë është ajo me pasurinë neto më të madhe në fund.",
    ],
    ejemplo: [
      `Një shtëpi prej ${m(precio)} me parapagim 20% dhe një kredi për shtëpi me interes 7% për 25 vjet, e krahasuar me një qira prej ${m(alquiler)} në muaj.`,
      `Për 10 vjet del më mirë ${quien(a10)}, me ${m(Math.abs(a10.comprar - a10.alquilar))}. Për 3 vjet del më mirë ${quien(a3)}, me ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "A janë paratë e qirasë para të humbura?",
        respuesta:
          "Jo tamam. Edhe kush blen paguan kosto që nuk i rikuperon më: interesin, taksën e pronës dhe mirëmbajtjen. Rëndësi ka sa keni në fund në secilin rast.",
      },
      {
        pregunta: "Pse ndryshon përgjigjja sipas numrit të viteve?",
        respuesta:
          "Blerja ka kosto të larta në fillim (kostot e blerjes dhe interesi i viteve të para), që rikuperohen me kohën. Nëse do të shpërnguleni së shpejti, zakonisht del më mirë qiraja.",
      },
      {
        pregunta: "Cila vlerë ka më shumë rëndësi?",
        respuesta:
          "Raporti midis çmimit dhe qirasë, interesi i kredisë dhe sa shpejt rriten çmimet e shtëpive. Ndryshoni rritjen e çmimit dhe kthimin e investimit dhe shikoni sa lëviz rezultati.",
      },
    ],
    glosario: [
      { termino: "Pasuri neto", definicion: "Ajo që keni minus atë që keni borxh." },
      { termino: "Rritja e çmimit", definicion: "Sa rritet vlera e shtëpisë çdo vit." },
      { termino: "Kosto oportuniteti", definicion: "Sa do të kishte sjellë parapagimi po ta kishit investuar." },
    ],
  };
};
