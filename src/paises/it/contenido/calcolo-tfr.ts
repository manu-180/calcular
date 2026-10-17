import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "it.tfr",
  h1: "Calcolo TFR (trattamento di fine rapporto)",
  title: "Calcolo TFR 2026: quota annua e rivalutazione ISTAT",
  description:
    "Calcola il TFR maturato: quota annua pari alla retribuzione divisa per {{it.tfr[divisore]}}, rivalutazione con l'indice ISTAT e imposta sostitutiva del {{it.tfr-imposta-rivalutazione}}.",
  intro: [
    "Il TFR è la parte di stipendio che il datore di lavoro mette da parte ogni anno e ti paga quando il rapporto finisce, per dimissioni, licenziamento o pensione.",
    "Con questo calcolo vedi quanto matura in un anno e quanto cresce il TFR che hai già accumulato grazie alla rivalutazione.",
  ],
  comoSeCalcula: [
    "La quota dell'anno è la retribuzione annua divisa per {{it.tfr[divisore]}}. Se hai lavorato solo una parte dell'anno, conta i mesi lavorati.",
    "Dalla quota il datore di lavoro trattiene un contributo pari a {{it.tfr-contributo}} della retribuzione, che va all'INPS.",
    "Il TFR già accumulato si rivaluta ogni anno con un tasso fisso ({{it.tfr[tasso-fisso]}} punti percentuali) più una quota ({{it.tfr[quota-istat]}} su 100) dell'aumento dei prezzi misurato dall'ISTAT (indice FOI) rispetto a dicembre.",
    "Sulla rivalutazione si paga un'imposta sostitutiva del {{it.tfr-imposta-rivalutazione}}, trattenuta ogni anno.",
  ],
  ejemplo: [
    "Con 30.000 euro di retribuzione annua matura una quota di 2.222,22 euro, che scende a 2.072,22 euro dopo il contributo. Un fondo di 10.000 euro, con un'inflazione dell'1,4%, si rivaluta del 2,55%: 255 euro lordi e 211,65 euro netti.",
  ],
  faq: [
    {
      pregunta: "Come si calcola il TFR?",
      respuesta: "Ogni anno si accantona la retribuzione annua divisa per {{it.tfr[divisore]}}, cioè circa una mensilità. Il totale accumulato si rivaluta ogni 31 dicembre con il tasso fisso e l'indice ISTAT.",
    },
    {
      pregunta: "Dove trovo l'aumento dell'indice ISTAT?",
      respuesta: "L'ISTAT lo pubblica ogni mese con i prezzi al consumo (indice FOI senza tabacchi). Si confronta l'indice del mese con quello di dicembre dell'anno prima.",
    },
    {
      pregunta: "Il TFR in busta paga è netto o lordo?",
      respuesta: "Il calcolo mostra il TFR lordo. Quando lo ricevi paga l'IRPEF con la tassazione separata, un'aliquota media calcolata sugli anni di lavoro.",
    },
    {
      pregunta: "E se il TFR va al fondo pensione?",
      respuesta: "Se hai scelto la previdenza complementare, le quote vanno al fondo e non restano in azienda: questo calcolo vale per la parte che resta al datore di lavoro.",
    },
  ],
  glosario: [
    { termino: "TFR", definicion: "Trattamento di fine rapporto: la somma che il datore di lavoro ti paga quando il rapporto termina." },
    { termino: "Indice FOI", definicion: "Indice ISTAT dei prezzi al consumo per le famiglie di operai e impiegati." },
    { termino: "Rivalutazione", definicion: "L'aumento annuale del TFR accumulato, per proteggerlo dall'inflazione." },
  ],
});
