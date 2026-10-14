import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;
const TASSO = 18;

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const debito = montoEjemplo(ctx, 2000);
  const fissa = montoEjemplo(ctx, 100);
  const conFissa = saldar(debito, TASSO, { modo: "fijo", fijo: fissa, porcentaje: 0, piso: 0 }, r2);
  const conMinima = saldar(debito, TASSO, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Calcolo debito carta revolving",
    title: tituloQueEntre(`Calcolo rate e interessi della carta revolving | ${ctx.nombrePais}`, `Calcolo carta revolving | ${ctx.nombrePais}`, "Calcolo carta revolving"),
    description: "Scopri in quanti mesi estingui il debito della carta di credito revolving e quanti interessi paghi, con una rata fissa o con la rata minima.",
    intro: [
      "Il debito su una carta revolving è di solito il più caro che hai. Pagare solo la rata minima lo allunga per anni e fa crescere gli interessi.",
      "Inserisci il debito, il tasso e quanto puoi pagare ogni mese. Ti mostriamo quando finisci, quanti interessi paghi e il piano mese per mese.",
    ],
    comoSeCalcula: [
      "Ogni mese si aggiungono gli interessi: debito × tasso annuo ÷ 12.",
      "Poi si toglie la rata. Con la rata minima, la rata è una percentuale del debito, con una soglia minima.",
      "Si ripete finché il debito arriva a zero. Se la rata non supera gli interessi, il debito non scende mai.",
    ],
    ejemplo: [
      `Un debito di ${m(debito)} al ${TASSO}% annuo, pagando ${m(fissa)} al mese, si estingue in ${conFissa.meses} mesi con ${m(conFissa.intereses)} di interessi.`,
      `Pagando solo una rata minima del 3% servono ${conMinima.meses} mesi e gli interessi salgono a ${m(conMinima.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Cosa succede se pago solo la rata minima?",
        respuesta:
          "La rata minima si abbassa man mano che scende il debito, quindi paghi meno ogni mese e il debito si trascina per anni. Se puoi, paga una cifra fissa più alta, anche di poco.",
      },
      {
        pregunta: "Che differenza c'è tra carta a saldo e carta revolving?",
        respuesta: "Con la carta a saldo paghi tutto il mese dopo, senza interessi. Con la revolving restituisci a rate e sul debito che resta paghi interessi.",
      },
      {
        pregunta: "Conviene spostare il debito su un prestito personale?",
        respuesta: "Se il tasso del prestito è molto più basso di quello della carta, di solito sì. Confronta gli interessi totali delle due opzioni, spese comprese.",
      },
      {
        pregunta: "Quale carta conviene ripagare per prima?",
        respuesta: "Paga la rata minima su tutte e metti il resto su quella con il tasso più alto. Così, in totale, paghi meno interessi.",
      },
    ],
    glosario: [
      { termino: "Rata minima", definicion: "Il minimo che puoi pagare in un mese senza penali. Non estingue il debito." },
      { termino: "Carta revolving", definicion: "Una carta di credito che ti fa restituire a rate, con interessi sul debito che resta." },
    ],
  };
};
