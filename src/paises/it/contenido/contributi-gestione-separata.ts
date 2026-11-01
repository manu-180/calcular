import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.contributi-gestione-separata",
  h1: "Calcolo contributi Gestione separata INPS",
  title: "Contributi Gestione separata INPS {{anio}}: calcolo",
  description:
    "Calcola i contributi della Gestione separata INPS {{anio}} per professionisti, collaboratori e pensionati, con massimale di {{it.massimale-contributivo}} e mesi accreditati.",
  intro: [
    "La Gestione separata è la cassa INPS di chi lavora con partita IVA senza una cassa professionale propria e di chi ha un contratto di collaborazione.",
    "Scegli la tua posizione e inserisci il reddito: vedi quanto versi, quanto paga il committente se sei un collaboratore e quanti mesi ti vengono accreditati per la pensione.",
  ],
  comoSeCalcula: [
    "Al reddito dell'anno si applica l'aliquota della tua posizione. Per un professionista senza altra cassa è il {{it.aliquote-gestione-separata[professionista]}}, per un collaboratore con DIS-COLL il {{it.aliquote-gestione-separata[collaboratore]}}.",
    "Chi è già pensionato o versa a un'altra previdenza obbligatoria paga un'aliquota ridotta: {{it.aliquote-gestione-separata[professionista-pensionato]}}.",
    "I contributi si calcolano fino al massimale di {{it.massimale-contributivo}}: oltre quella cifra non si paga nulla.",
    "Per avere accreditato l'anno intero il reddito deve arrivare al minimale di {{it.minimale-autonomi}}. Sotto, i mesi accreditati sono in proporzione.",
  ],
  ejemplo: [
    "Un collaboratore con 30.000 euro di compensi genera 10.509 euro di contributi: 3.503 euro a suo carico e 7.006 euro a carico del committente.",
  ],
  faq: [
    {
      pregunta: "Quanto paga di contributi un professionista in Gestione separata?",
      respuesta:
        "Il {{it.aliquote-gestione-separata[professionista]}} del reddito, se non è iscritto ad altre forme di previdenza. Si versa con l'F24 alle scadenze delle imposte sui redditi, con saldo e due acconti.",
    },
    {
      pregunta: "Chi paga i contributi di un collaboratore?",
      respuesta: "Il committente versa tutto all'INPS entro il 16 del mese dopo il pagamento, ma un terzo lo trattiene dal compenso del collaboratore.",
    },
    {
      pregunta: "Cosa succede se guadagno meno del minimale?",
      respuesta: "Non devi versare la differenza: semplicemente ti vengono accreditati meno mesi. Con metà del minimale, per esempio, ti vengono riconosciuti sei mesi.",
    },
    {
      pregunta: "Posso far pagare una parte dei contributi al cliente?",
      respuesta: "Sì. I professionisti in Gestione separata possono addebitare in fattura una rivalsa del {{it.rivalsa-inps}} sul compenso, ma il contributo resta a loro carico.",
    },
  ],
  glosario: [
    { termino: "Massimale", definicion: "Il reddito oltre il quale non si pagano più contributi." },
    { termino: "Minimale", definicion: "Il reddito minimo che garantisce l'accredito di tutti i dodici mesi dell'anno." },
    { termino: "DIS-COLL", definicion: "L'indennità di disoccupazione per i collaboratori, finanziata con un'aliquota aggiuntiva." },
  ],
});
