import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const prezzo3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Calcolo proporzioni",
    title: tituloQueEntre(`Calcolo proporzioni dirette e inverse | ${ctx.nombrePais}`, `Calcolo proporzioni | ${ctx.nombrePais}`, "Calcolo proporzioni"),
    description: "Risolvi una proporzione diretta o inversa in un attimo: inserisci tre valori e trovi il quarto, con il calcolo spiegato.",
    intro: [
      "La proporzione serve quando due grandezze cambiano insieme e conosci tre dei quattro valori.",
      "Scegli se è diretta o inversa, inserisci A, B e C e la calcolatrice trova X.",
    ],
    comoSeCalcula: [
      "Diretta, A : B = C : X, quindi X = B × C ÷ A. Si usa quando le due grandezze crescono insieme (più chili, prezzo più alto).",
      "Inversa: X = A × B ÷ C. Si usa quando una cresce e l'altra cala (più persone, meno giorni).",
    ],
    ejemplo: [
      `Se 3 chili costano ${m(prezzo3)}, 5 chili costano ${m((prezzo3 * 5) / 3)}.`,
      "Se 4 persone imbiancano una casa in 12 giorni, 6 persone ci mettono 8 giorni.",
    ],
    faq: [
      {
        pregunta: "Come capisco se la proporzione è diretta o inversa?",
        respuesta: "Se una grandezza aumenta quando aumenta l'altra, è diretta. Se una diminuisce quando l'altra aumenta, è inversa.",
      },
      {
        pregunta: "Come si risolve una proporzione a mano?",
        respuesta: `Il prodotto dei medi è uguale al prodotto degli estremi. In 3 : 600 = 5 : X, moltiplichi 600 × 5 e dividi per 3: X = ${n(1000)}.`,
      },
      {
        pregunta: "Posso usarla per le percentuali?",
        respuesta: "Sì. Se 200 è il 100%, 50 è il 25%: è una proporzione diretta con A = 200, B = 100 e C = 50.",
      },
    ],
    glosario: [
      { termino: "Proporzione diretta", definicion: "Le due grandezze aumentano o diminuiscono insieme." },
      { termino: "Proporzione inversa", definicion: "Quando una grandezza aumenta, l'altra diminuisce." },
      { termino: "Medi ed estremi", definicion: "In A : B = C : X, B e C sono i medi, A e X gli estremi." },
    ],
  };
};
