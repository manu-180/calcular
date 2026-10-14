import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const ejemplo = imperiale
    ? (() => {
        const basale = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Un uomo di 35 anni che pesa 180 libbre ed è alto 5 piedi e 10 pollici ha un metabolismo basale di circa ${n(basale)} kcal.`,
          `Con poca attività fisica, mantiene il peso con circa ${n(basale * FACTORES.sedentaria)} kcal al giorno.`,
        ];
      })()
    : (() => {
        const basale = mifflin("mujer", 30, 60, 165);
        return [
          `Una donna di 30 anni che pesa 60 kg ed è alta 165 cm ha un metabolismo basale di circa ${n(basale)} kcal.`,
          `Con un'attività moderata, mantiene il peso con circa ${n(basale * FACTORES.moderada)} kcal al giorno.`,
        ];
      })();
  return {
    h1: "Calcolo fabbisogno calorico giornaliero",
    title: tituloQueEntre(`Calcolo fabbisogno calorico giornaliero | ${ctx.nombrePais}`, `Calcolo fabbisogno calorico | ${ctx.nombrePais}`, "Calcolo fabbisogno calorico"),
    description: "Calcola quante calorie consumi al giorno in base a età, peso, altezza e attività, e quante assumerne per mantenere, perdere o prendere peso.",
    intro: [
      "Inserisci i tuoi dati e il livello di attività fisica. Vedi il tuo metabolismo basale e le calorie che consumi in una giornata normale.",
      "È una stima indicativa e non sostituisce il parere del medico o di un nutrizionista.",
    ],
    comoSeCalcula: [
      `Metabolismo basale (Mifflin-St Jeor): 10 × peso in kg + ${n(6.25, 2)} × altezza in cm − 5 × età, più 5 per gli uomini o meno 161 per le donne.`,
      `Calorie di mantenimento = metabolismo basale × fattore di attività, da ${n(1.2, 1)} (poca attività) a ${n(1.9, 1)} (molto intensa).`,
      `Per dimagrire si tolgono ${DEFICIT} kcal al giorno, per aumentare di peso se ne aggiungono ${SUPERAVIT}: un cambiamento moderato e sostenibile.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Cos'è il metabolismo basale?",
        respuesta: "È l'energia che il corpo usa a riposo completo per respirare, mantenere la temperatura e far funzionare gli organi.",
      },
      {
        pregunta: "Quante calorie devo mangiare per dimagrire?",
        respuesta: `Un punto di partenza comune è circa ${DEFICIT} kcal al giorno in meno rispetto al mantenimento. È meglio stabilirlo con un professionista.`,
      },
      {
        pregunta: "Quanto è precisa la formula?",
        respuesta: "Quella di Mifflin-St Jeor è tra le più usate, ma dà una media. Genetica, massa muscolare e stato di salute cambiano quello che consumi davvero.",
      },
    ],
    glosario: [
      { termino: "Caloria (kcal)", definicion: "L'unità di misura dell'energia nel cibo e di quella che il corpo consuma." },
      { termino: "Metabolismo basale", definicion: "Le calorie che il corpo consuma a riposo completo." },
      { termino: "Fabbisogno calorico", definicion: "Le calorie che ti servono in un giorno per mantenere il peso." },
    ],
  };
};
