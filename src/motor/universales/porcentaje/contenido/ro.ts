import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoRo: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Calculator procente",
    title: tituloQueEntre(`Calculator procente: ${ctx.nombrePais}`, "Calculator procente online", "Calculator procente"),
    description: "Calculați procentul dintr-un număr, ce procent reprezintă un număr din altul și rezultatul unei creșteri sau al unei reduceri procentuale.",
    intro: [
      "Alegeți ce doriți să aflați, introduceți cele două numere și primiți răspunsul imediat.",
      "Acoperă cele patru calcule cu procente de zi cu zi: o parte, o proporție, o creștere și o reducere.",
    ],
    comoSeCalcula: [
      "X% din Y = X × Y ÷ 100.",
      "X ca procent din Y = X ÷ Y × 100.",
      "Y plus X% = Y × (1 + X ÷ 100). Y minus X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% din 200 înseamnă 30.", "30 reprezintă 25% din 120.", `Un preț de ${m(precio)} care crește cu 10% ajunge la ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: "Cum se calculează procentul dintr-un număr?",
        respuesta: "Înmulțiți numărul cu procentul și împărțiți la 100. 20% din 350 înseamnă 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Cum se află ce procent reprezintă un număr din altul?",
        respuesta: "Împărțiți partea la întreg și înmulțiți cu 100. Dacă aveți 45 de răspunsuri corecte din 60, înseamnă 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Cum se adaugă un procent la un preț?",
        respuesta: `Înmulțiți prețul cu 1 plus procentul scris ca număr zecimal. Ca să adăugați 10%, înmulțiți cu ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "O creștere de 10% urmată de o scădere de 10% vă aduce înapoi la valoarea de la început?",
        respuesta: "Nu. 100 plus 10% înseamnă 110, iar 110 minus 10% înseamnă 99. Scăderea se aplică la un număr mai mare.",
      },
    ],
    glosario: [
      { termino: "Procent", definicion: "O cantitate exprimată ca părți din 100." },
      { termino: "Bază", definicion: "Numărul din care se calculează procentul (Y în acest calculator)." },
    ],
  };
};
