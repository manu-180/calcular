import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const netto = montoEjemplo(ctx, 30000);
  const spese = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso: netto, gastos: spese, impuestos: 30, diasLibres: 35, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Calcolo tariffa oraria freelance",
    title: tituloQueEntre(`Calcolo tariffa oraria da freelance | ${ctx.nombrePais}`, `Tariffa oraria freelance | ${ctx.nombrePais}`, "Calcolo tariffa oraria freelance"),
    description: "Calcola la tua tariffa oraria e giornaliera da freelance partendo da quanto vuoi guadagnare, spese, tasse, ferie e ore fatturabili.",
    intro: [
      "L'errore più comune di chi lavora in proprio è prendere lo stipendio che vorrebbe da dipendente e dividerlo per 160 ore. Così restano fuori tasse, spese, ferie e tutte le ore che non puoi fatturare.",
      "Questa calcolatrice parte da quanto vuoi guadagnare netto e ti dice quanto chiedere per arrivarci.",
    ],
    comoSeCalcula: [
      "Fatturato necessario = guadagno netto ÷ (1 − aliquota di tasse e contributi) + spese dell'attività.",
      "Giorni lavorativi = 52 settimane × giorni a settimana − giorni liberi.",
      "Ore fatturabili all'anno = giorni lavorativi × ore fatturabili al giorno.",
      "Tariffa oraria = fatturato necessario ÷ ore fatturabili all'anno.",
    ],
    ejemplo: [
      `Per guadagnare ${m(netto)} netti all'anno, con ${m(spese)} di spese e il 30% tra tasse e contributi, devi fatturare ${m(r.facturado)}.`,
      `Con 35 giorni liberi e 25 ore fatturabili a settimana, sono ${formatearNumero(ctx, Math.round(r.horas))} ore all'anno: una tariffa di ${m(r.hora)} all'ora o ${m(r.dia)} al giorno.`,
    ],
    faq: [
      {
        pregunta: "Quante ore a settimana posso fatturare?",
        respuesta: "Meno di quelle che lavori. Cercare clienti, rispondere alle email, fare fatture e aggiornarti richiede tempo che nessuno ti paga. Di solito da 20 a 30 ore fatturabili su 40.",
      },
      {
        pregunta: "Meglio farsi pagare a ore o a progetto?",
        respuesta: "Vanno bene tutti e due. Anche se fai un preventivo a progetto, stima le ore e moltiplicale per questa tariffa, così non vai sotto.",
      },
      {
        pregunta: "Che percentuale di tasse devo usare?",
        respuesta: "Dipende dal paese e dal regime fiscale con cui lavori a partita IVA. Somma imposte e contributi previdenziali. Se non sei sicuro, chiedi al commercialista.",
      },
    ],
    glosario: [
      { termino: "Ore fatturabili", definicion: "Le ore di lavoro che fai pagare a un cliente." },
      { termino: "Guadagno netto", definicion: "Quello che resta dopo tasse, contributi e spese dell'attività." },
    ],
  };
};
