import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulator rritje page",
    title: tituloQueEntre(`Kalkulator rritje page: ${ctx.nombrePais}`, "Kalkulator rritje page", "Rritje page"),
    description: "Llogaritni pagën e re pas një rritjeje, diferencën në muaj dhe në vit, si dhe nëse rritja reale e kalon inflacionin.",
    intro: [
      "Keni marrë një ofertë për rritje page ose do të kërkoni një të tillë. Vendosni pagën dhe rritjen, në përqindje ose si shumë, dhe shikoni sa ndryshon në muaj dhe në vit.",
      "Shtoni inflacionin e periudhës dhe ju themi nëse fuqia blerëse rritet vërtet apo thjesht po rikuperoni atë që keni humbur.",
    ],
    comoSeCalcula: [
      "Paga e re = paga aktuale × (1 + rritja ÷ 100).",
      "Diferenca në vit = diferenca në muaj × numri i pagave në vit.",
      "Rritja reale = (1 + rritja) ÷ (1 + inflacioni) − 1.",
    ],
    ejemplo: [
      `Një pagë prej ${m(sueldo)} në muaj me një rritje prej 5% bëhet ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} më shumë në muaj dhe ${m(sueldo * 0.05 * 12)} më shumë në vit.`,
      `Nëse inflacioni i periudhës ka qenë 3%, rritja reale është ${p(aumentoReal(5, 3))}. Me një inflacion prej 6%, është ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Çfarë është rritja reale e pagës?",
        respuesta: "Është rritja pas inflacionit. Tregon nëse paga e re blen më shumë apo më pak se më parë.",
      },
      {
        pregunta: "Pse inflacioni nuk i zbritet thjesht rritjes?",
        respuesta: `Sepse të dyja përqindjet shumëzohen, nuk mblidhen. Me një rritje prej 5% dhe një inflacion prej 3%, rritja reale është ${p(aumentoReal(5, 3))}, jo 2%. Kur inflacioni është i lartë, diferenca bëhet shumë më e madhe.`,
      },
      {
        pregunta: "Çfarë rritje page të kërkoj?",
        respuesta: "Të paktën inflacionin që nga rritja e fundit, që të mos humbni fuqi blerëse. Përtej kësaj, rëndësi ka sa paguajnë punëdhënës të tjerë për një pozicion si i juaji dhe sa është rritur roli juaj.",
      },
    ],
    glosario: [
      { termino: "Rritje nominale", definicion: "Rritja siç shfaqet në listëpagesë, para inflacionit." },
      { termino: "Fuqi blerëse", definicion: "Ajo që mund të blini me pagën." },
    ],
  };
};
