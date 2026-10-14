import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const aliquota = `{{${ctx.datos.tasa}}}`;
  const prezzo = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: "Calcolo IVA e scorporo",
    title: tituloQueEntre(
      `Calcolo IVA e scorporo (${aliquota}) | ${ctx.nombrePais}`,
      `Calcolo IVA (${aliquota}) | ${ctx.nombrePais}`,
      `Calcolo IVA (${aliquota})`,
    ),
    description: `Aggiungi o scorpora l'IVA (aliquota ${aliquota}) da qualsiasi prezzo: imponibile, imposta e totale, al centesimo.`,
    intro: [
      `L'aliquota ordinaria usata qui è ${aliquota}.`,
      "Scegli se aggiungere l'IVA a un prezzo netto o scorporarla da un prezzo che la comprende già, poi inserisci l'importo.",
    ],
    comoSeCalcula: [
      "Per aggiungere l'IVA: IVA = imponibile × aliquota ÷ 100. Totale = imponibile + IVA.",
      "Per lo scorporo: imponibile = prezzo IVA inclusa ÷ (1 + aliquota ÷ 100). L'IVA è la differenza.",
      "Se un prodotto ha un'aliquota ridotta, puoi inserirla in «Altra aliquota».",
    ],
    ejemplo: [
      `Per aggiungere l'IVA a ${prezzo}, moltiplica l'importo per l'aliquota (${aliquota}) e somma il risultato al prezzo.`,
      `Per sapere quanta IVA c'è in un totale di ${prezzo}, dividilo per 1 più l'aliquota e fai la differenza.`,
    ],
    faq: [
      {
        pregunta: "Come si scorpora l'IVA da un prezzo?",
        respuesta: "Dividi il prezzo per 1 più l'aliquota in forma decimale. Quello che ottieni è l'imponibile, e la differenza è l'IVA.",
      },
      {
        pregunta: "Perché non basta togliere la percentuale dal totale?",
        respuesta: "Perché l'IVA è stata calcolata sull'imponibile, che è più piccolo del totale. Se togli la percentuale dal totale, togli troppo.",
      },
      {
        pregunta: `Tutto paga l'IVA ordinaria (${aliquota})?`,
        respuesta: "Non sempre. Alcuni alimenti, farmaci o servizi hanno un'aliquota ridotta o sono esenti. In quel caso, usa «Altra aliquota».",
      },
    ],
    glosario: [
      { termino: "IVA", definicion: "Imposta sul valore aggiunto. Si aggiunge al prezzo di beni e servizi." },
      { termino: "Imponibile", definicion: "Il prezzo prima di aggiungere l'IVA." },
      { termino: "Scorporo", definicion: "Il calcolo che separa l'IVA da un prezzo che la comprende già." },
    ],
  };
};
