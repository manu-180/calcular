import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Calcolo tasso effettivo: da TAN a TAE",
    title: tituloQueEntre(`Calcolo tasso effettivo, da TAN a TAE | ${ctx.nombrePais}`, `Da TAN a TAE | ${ctx.nombrePais}`, "Calcolo tasso effettivo"),
    description: "Trasforma un tasso annuo nominale (TAN) in tasso annuo effettivo (TAE) e viceversa, con capitalizzazione mensile, trimestrale, semestrale o giornaliera.",
    intro: [
      "Due offerte con lo stesso tasso possono costare cifre diverse. La differenza sta in quanto spesso si calcolano gli interessi.",
      "Il tasso annuo effettivo mette tutto sullo stesso piano: è quello che paghi o guadagni davvero in un anno. Scegli il tasso che hai e ti mostriamo l'altro.",
    ],
    comoSeCalcula: [
      "TAE = (1 + TAN ÷ m) elevato alla m, meno 1. Qui m è il numero di capitalizzazioni in un anno: 12 se mensile, 4 se trimestrale.",
      "TAN = m × ((1 + TAE) elevato a 1 ÷ m, meno 1).",
      "Il tasso per periodo è il TAN diviso per m.",
    ],
    ejemplo: [
      `Un TAN del 12% con capitalizzazione mensile corrisponde a un TAE del ${p(aEfectiva(12, 12))}.`,
      `Un TAE del 10% corrisponde a un TAN del ${p(aNominal(10, 12))} se gli interessi si capitalizzano ogni mese.`,
    ],
    faq: [
      {
        pregunta: "Che differenza c'è tra TAN e TAE?",
        respuesta:
          "Il TAN è il tasso annuo prima della capitalizzazione. Il TAE tiene conto degli interessi che producono altri interessi. Per questo il TAE è sempre uguale o più alto del TAN.",
      },
      {
        pregunta: "E il TAEG cos'è?",
        respuesta: "È il tasso effettivo dei prestiti con dentro anche spese e commissioni obbligatorie. Per confrontare due finanziamenti è il numero più utile.",
      },
      {
        pregunta: "Quale tasso uso per confrontare le offerte?",
        respuesta: "Per un conto deposito, il tasso effettivo, perché mostra quanto guadagni davvero. Per un prestito, il TAEG.",
      },
      {
        pregunta: "Perché capitalizzare più spesso alza il tasso effettivo?",
        respuesta:
          "Gli interessi si aggiungono prima al capitale e cominciano a produrre interessi a loro volta. Con capitalizzazione annuale, TAN e TAE coincidono.",
      },
    ],
    glosario: [
      { termino: "TAN", definicion: "Il tasso annuo nominale, prima della capitalizzazione." },
      { termino: "TAE", definicion: "Il tasso annuo effettivo, con la capitalizzazione compresa." },
      { termino: "Capitalizzazione", definicion: "Il momento in cui gli interessi si aggiungono al capitale." },
    ],
  };
};
