import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const ejemplo = imperiale
    ? (() => {
        const prezzo = montoEjemplo(ctx, 3.5);
        const galloni = 300 / 30;
        return [
          `Un viaggio di 150 miglia andata e ritorno con un'auto che fa 30 miglia per gallone consuma ${n(galloni)} galloni.`,
          `A ${m(prezzo)} al gallone, sono ${m(galloni * prezzo)}. In 2 persone, ${m((galloni * prezzo) / 2)} a testa.`,
        ];
      })()
    : (() => {
        const prezzo = montoEjemplo(ctx, 1.8);
        const litri = (600 * 8) / 100;
        return [
          `Un viaggio di 300 km andata e ritorno con un'auto che consuma 8 litri ogni 100 km richiede ${n(litri)} litri.`,
          `A ${m(prezzo)} al litro, sono ${m(litri * prezzo)}. In 2 persone, ${m((litri * prezzo) / 2)} a testa.`,
        ];
      })();
  return {
    h1: "Calcolo costo carburante",
    title: tituloQueEntre(`Calcolo costo carburante del viaggio | ${ctx.nombrePais}`, `Calcolo costo carburante | ${ctx.nombrePais}`, "Calcolo costo carburante"),
    description: "Calcola quanto costa un viaggio in benzina o gasolio in base a distanza, consumo dell'auto e prezzo al litro, e quanto paga ciascuno.",
    intro: [
      `Inserisci la distanza, il consumo del veicolo e il prezzo al ${imperiale ? "gallone" : "litro"}. Vedi quanto carburante ti serve e quanto costa il viaggio.`,
      imperiale ? "Il consumo va in miglia per gallone." : "Il consumo puoi inserirlo in litri ogni 100 km oppure in chilometri con un litro.",
    ],
    comoSeCalcula: imperiale
      ? ["Galloni = distanza ÷ miglia per gallone.", "Costo = galloni × prezzo al gallone. Andata e ritorno raddoppia la distanza."]
      : [
          "Con i litri ogni 100 km: litri = distanza × consumo ÷ 100.",
          "Con i chilometri con un litro: litri = distanza ÷ consumo.",
          "Costo = litri × prezzo al litro. Andata e ritorno raddoppia la distanza.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Come passo dai km con un litro ai litri ogni 100 km?",
        respuesta: `Dividi 100 per i km con un litro. Un'auto che fa 16 km con un litro consuma ${n(100 / 16, 2)} litri ogni 100 km.`,
      },
      {
        pregunta: "Sono compresi i pedaggi autostradali?",
        respuesta: "No. Il calcolo riguarda solo il carburante. Pedaggi e parcheggi vanno aggiunti a parte.",
      },
      {
        pregunta: "Perché in città l'auto consuma di più?",
        respuesta: "Fermarsi e ripartire richiede più energia che viaggiare a velocità costante, quindi in città il consumo di solito è più alto.",
      },
    ],
    glosario: [
      { termino: "Consumo", definicion: "Quanto carburante usa un veicolo per percorrere una certa distanza." },
      { termino: "km/l", definicion: "I chilometri che fai con un litro. Più alto è il numero, meno consumi." },
    ],
  };
};
