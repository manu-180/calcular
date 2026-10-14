import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

const TASSO = 3.5;

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const prezzo = montoEjemplo(ctx, 200000);
  const affitto = montoEjemplo(ctx, 800);
  const base = { precio: prezzo, entrada: 20, gastosCompra: 4, tasa: TASSO, aniosHipoteca: 25, alquiler: affitto, aumentoAlquiler: 2, gastosPropietario: 1.5, revalorizacion: 2, rendimiento: 4 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const chi = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "conviene comprare" : "conviene l'affitto");
  return {
    h1: "Affitto o acquisto: cosa conviene?",
    title: tituloQueEntre(`Conviene comprare casa o stare in affitto? | ${ctx.nombrePais}`, `Affitto o acquisto | ${ctx.nombrePais}`, "Affitto o acquisto"),
    description: "Confronta l'affitto con l'acquisto di una casa negli anni che scegli. Scopri quale scelta ti lascia più patrimonio, da quale anno e di quanto.",
    intro: [
      "Non basta confrontare la rata del mutuo con l'affitto. Chi compra paga interessi, manutenzione e imposte, ma alla fine la casa è sua. Chi è in affitto può tenere investito l'anticipo.",
      "Questa calcolatrice somma tutto anno per anno e ti dice quale scelta ti lascia con più patrimonio.",
    ],
    comoSeCalcula: [
      "Acquisto: ogni mese paghi la rata del mutuo e le spese del proprietario. Il tuo patrimonio è il valore della casa meno il debito che resta.",
      "Affitto: l'anticipo e le spese di acquisto restano investiti al rendimento alternativo, e l'affitto aumenta ogni anno.",
      "Ogni mese, chi spende meno investe la differenza, così le due scelte partono dallo stesso budget.",
      "Conviene la scelta che alla fine lascia più patrimonio.",
    ],
    ejemplo: [
      `Una casa da ${m(prezzo)} con il 20% di anticipo e un mutuo al ${formatearNumero(ctx, TASSO, 1)}% in 25 anni, contro un affitto di ${m(affitto)} al mese.`,
      `Su 10 anni ${chi(a10)}, con ${m(Math.abs(a10.comprar - a10.alquilar))} di differenza. Su 3 anni ${chi(a3)}, con ${m(Math.abs(a3.comprar - a3.alquilar))} di differenza.`,
    ],
    faq: [
      {
        pregunta: "Pagare l'affitto è buttare via i soldi?",
        respuesta:
          "Non proprio. Anche chi compra paga costi che non recupera: interessi, imposte e manutenzione. Quello che conta è quanto possiedi alla fine in ciascun caso.",
      },
      {
        pregunta: "Perché la risposta cambia con il numero di anni?",
        respuesta:
          "Comprare ha costi alti all'inizio (spese di acquisto e primi interessi) che servono anni per essere recuperati. Se pensi di trasferirti presto, di solito conviene l'affitto.",
      },
      {
        pregunta: "Quale dato pesa di più?",
        respuesta:
          "Il rapporto tra prezzo e affitto, il tasso del mutuo e quanto si rivalutano le case. Prova a cambiare rivalutazione e rendimento per vedere quanto si sposta il risultato.",
      },
    ],
    glosario: [
      { termino: "Patrimonio", definicion: "Quello che possiedi meno quello che devi." },
      { termino: "Rivalutazione", definicion: "Quanto aumenta ogni anno il valore della casa." },
      { termino: "Costo opportunità", definicion: "Quello che avrebbe reso l'anticipo se lo avessi investito." },
    ],
  };
};
