import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator i rregullit të treshit",
    title: tituloQueEntre(`Rregulli i treshit: ${ctx.nombrePais}`, "Kalkulator i rregullit të treshit", "Rregulli i treshit"),
    description: "Zgjidhni një rregull të treshit, të drejtë ose të zhdrejtë, për një sekondë. Vendosni tri vlera dhe gjeni të katërtën, me llogaritjen të shfaqur.",
    intro: [
      "Rregulli i treshit përdoret kur dy madhësi ndryshojnë së bashku dhe njihni tri nga katër vlerat.",
      "Zgjidhni përpjesëtimin e drejtë ose të zhdrejtë, plotësoni A, B dhe C, dhe kalkulatori ju jep X.",
    ],
    comoSeCalcula: [
      "I drejtë: X = B × C ÷ A. Përdoret kur dy madhësitë rriten së bashku (më shumë kilogramë, çmim më i lartë).",
      "I zhdrejtë: X = A × B ÷ C. Përdoret kur njëra rritet dhe tjetra ulet (më shumë njerëz, më pak ditë).",
    ],
    ejemplo: [
      `Nëse 3 kilogramë kushtojnë ${m(precio3)}, 5 kilogramë kushtojnë ${m((precio3 * 5) / 3)}.`,
      "Nëse 4 njerëz lyejnë një shtëpi për 12 ditë, 6 njerëz e lyejnë për 8 ditë.",
    ],
    faq: [
      {
        pregunta: "Si e kuptoj nëse përpjesëtimi është i drejtë apo i zhdrejtë?",
        respuesta: "Nëse një madhësi rritet kur rritet edhe tjetra, është i drejtë. Nëse njëra ulet kur tjetra rritet, është i zhdrejtë.",
      },
      {
        pregunta: "Si bëhet me dorë rregulli i treshit i drejtë?",
        respuesta: `Shumëzoni kryq dy vlerat e njohura në diagonale dhe pjesëtoni me vlerën që mbetet. Nëse 3 i përgjigjet 600, 5 i përgjigjet 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "A mund të përdoret për përqindje?",
        respuesta: "Po. Nëse 200 është 100%, atëherë 50 është 25%: është një përpjesëtim i drejtë me A = 200, B = 100 dhe C = 50.",
      },
    ],
    glosario: [
      { termino: "Përpjesëtim i drejtë", definicion: "Dy madhësitë rriten ose ulen së bashku." },
      { termino: "Përpjesëtim i zhdrejtë", definicion: "Një madhësi rritet kur tjetra ulet." },
    ],
  };
};
