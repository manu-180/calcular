import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const prezzo = montoEjemplo(ctx, 0.25);
  const kwhMese = (1000 * 4 * 30) / 1000;
  return {
    h1: "Calcolo consumo elettrico",
    title: tituloQueEntre(`Calcolo consumo elettrico e costo | ${ctx.nombrePais}`, `Calcolo consumo elettrico | ${ctx.nombrePais}`, "Calcolo consumo elettrico"),
    description: "Calcola quanta corrente consuma un elettrodomestico e quanto costa al giorno, al mese e all'anno, da potenza, ore di utilizzo e prezzo al kWh.",
    intro: [
      "Inserisci la potenza dell'apparecchio, quante ore lo usi e il prezzo al kWh della tua bolletta. Vedi il consumo e quanto spendi.",
      "Ti serve per capire quale apparecchio pesa di più in bolletta: condizionatore, stufetta, frigorifero o computer.",
    ],
    comoSeCalcula: [
      "kWh al giorno = watt × ore di utilizzo ÷ 1000.",
      "kWh al mese = kWh al giorno × giorni di utilizzo. Per l'anno, il mese per 12.",
      "Costo = kWh × prezzo al kWh.",
    ],
    ejemplo: [
      `Un apparecchio da ${n(1000)} W acceso 4 ore al giorno consuma 4 kWh al giorno e ${n(kwhMese)} kWh al mese.`,
      `Con l'energia a ${m(prezzo)} al kWh, costa ${m(kwhMese * prezzo)} al mese.`,
    ],
    faq: [
      {
        pregunta: "Cos'è un kWh?",
        respuesta: "Il chilowattora è l'energia che consuma un apparecchio da 1000 W acceso per un'ora. È l'unità che trovi in bolletta.",
      },
      {
        pregunta: "Il frigorifero va sempre alla massima potenza?",
        respuesta: "No. Il compressore si accende e si spegne. Per apparecchi così, conta circa 8 o 10 ore al giorno invece di 24.",
      },
      {
        pregunta: "Perché la bolletta non torna con il calcolo?",
        respuesta: "In bolletta ci sono anche quota fissa, oneri di sistema, accise e IVA. Qui vedi solo quello che consuma l'apparecchio.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "L'unità di misura della potenza: quanta energia usa un apparecchio in ogni momento." },
      { termino: "Chilowattora (kWh)", definicion: "1000 W per un'ora. È quello che paghi in bolletta." },
    ],
  };
};
