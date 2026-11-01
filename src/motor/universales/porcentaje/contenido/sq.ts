import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator përqindjeje",
    title: tituloQueEntre(`Kalkulator përqindjeje: ${ctx.nombrePais}`, "Kalkulator përqindjeje online", "Kalkulator përqindjeje"),
    description: "Llogaritni përqindjen e një numri, sa përqind përbën një numër nga një tjetër dhe rezultatin e një rritjeje ose uljeje në përqindje.",
    intro: [
      "Zgjidhni çfarë dëshironi të gjeni, vendosni dy numrat dhe merrni përgjigjen menjëherë.",
      "Mbulon katër llogaritjet e përditshme me përqindje: një pjesë, një raport, një rritje dhe një ulje.",
    ],
    comoSeCalcula: [
      "X% e Y = X × Y ÷ 100.",
      "X si përqindje e Y = X ÷ Y × 100.",
      "Y plus X% = Y × (1 + X ÷ 100). Y minus X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% e 200 është 30.", "30 është 25% e 120.", `Një çmim prej ${m(precio)} që rritet me 10% arrin në ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: "Si llogaritet përqindja e një numri?",
        respuesta: "Shumëzoni numrin me përqindjen dhe pjesëtojeni me 100. 20% e 350 është 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Si gjendet sa përqind përbën një numër nga një tjetër?",
        respuesta: "Pjesëtoni pjesën me të tërën dhe shumëzoni me 100. Nëse keni 45 përgjigje të sakta nga 60, kjo është 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Si i shtohet një përqindje një çmimi?",
        respuesta: `Shumëzoni çmimin me 1 plus përqindjen të shkruar si numër dhjetor. Për të shtuar 10%, shumëzoni me ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "A ju kthen te vlera fillestare një rritje prej 10% e ndjekur nga një ulje prej 10%?",
        respuesta: "Jo. 100 plus 10% është 110, dhe 110 minus 10% është 99. Ulja zbatohet mbi një numër më të madh.",
      },
    ],
    glosario: [
      { termino: "Përqindje", definicion: "Një sasi e shprehur si pjesë nga 100." },
      { termino: "Bazë", definicion: "Numri nga i cili llogaritet përqindja (Y në këtë kalkulator)." },
    ],
  };
};
