import { percento } from "../../comun/italiano";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const del = (n: number) => {
    const r = Math.round(n * 100) / 100;
    return percento(formatearNumero(ctx, r, Number.isInteger(r) ? 0 : 2), "di");
  };
  const costo = montoEjemplo(ctx, 60);
  const prezzo = montoEjemplo(ctx, 100);
  return {
    h1: "Calcolo margine e ricarico",
    title: tituloQueEntre(`Calcolo margine di guadagno e ricarico | ${ctx.nombrePais}`, `Calcolo margine e ricarico | ${ctx.nombrePais}`, "Calcolo margine e ricarico"),
    description: "Calcola margine e ricarico partendo da costo e prezzo, oppure il prezzo di vendita che ti serve per ottenere il margine che vuoi.",
    intro: [
      "Margine e ricarico si confondono di continuo, e la differenza può costarti cara. Misurano lo stesso guadagno, ma su una base diversa.",
      "Inserisci costo e prezzo e ti mostriamo tutti e due. Oppure scegli un margine e ti diciamo a quanto vendere.",
    ],
    comoSeCalcula: [
      "Guadagno = prezzo − costo.",
      "Margine = guadagno ÷ prezzo × 100.",
      "Ricarico = guadagno ÷ costo × 100.",
      "Prezzo per un certo margine = costo ÷ (1 − margine ÷ 100).",
    ],
    ejemplo: [
      `Un prodotto che costa ${m(costo)} e si vende a ${m(prezzo)} lascia ${m(prezzo - costo)} di guadagno: un margine ${del(((prezzo - costo) / prezzo) * 100)} e un ricarico ${del(((prezzo - costo) / costo) * 100)}.`,
      `Per avere un margine del 50% su quel costo, devi vendere a ${m(precioConMargen(costo, 50))}. Se aggiungi il 50% al costo, il margine è solo ${del(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Che differenza c'è tra margine e ricarico?",
        respuesta: "Il margine è il guadagno sul prezzo di vendita. Il ricarico è il guadagno sul costo. A parità di guadagno, il ricarico è sempre il numero più alto.",
      },
      {
        pregunta: "Come si calcola il prezzo di vendita partendo dal margine?",
        respuesta: `Dividi il costo per (1 − margine). Per un margine del 30%, dividi il costo per ${formatearNumero(ctx, 0.7, 2)}. Non aggiungere il 30% al costo: guadagneresti meno di quello che pensi.`,
      },
      {
        pregunta: "Nel costo va compresa l'IVA?",
        respuesta: "Usa costo e prezzo al netto dell'IVA che incassi dal cliente e versi allo Stato. Altrimenti il margine sembra più alto di quello che è.",
      },
    ],
    glosario: [
      { termino: "Margine", definicion: "Il guadagno in percentuale sul prezzo di vendita." },
      { termino: "Ricarico", definicion: "Il guadagno in percentuale sul costo." },
    ],
  };
};
