import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const importo = montoEjemplo(ctx, 10000);
  const rata36 = cuotaFrancesa(importo, 12, 36);
  const rata60 = cuotaFrancesa(importo, 12, 60);
  return {
    h1: "Calcolo rata prestito",
    title: tituloQueEntre(`Calcolo rata prestito e piano di ammortamento | ${ctx.nombrePais}`, `Calcolo rata prestito | ${ctx.nombrePais}`, "Calcolo rata prestito"),
    description: "Calcola la rata mensile di un prestito, gli interessi totali e il piano di ammortamento completo. Scopri quanto risparmi pagando di più.",
    intro: [
      "Prima di firmare un prestito contano due numeri: quanto paghi ogni mese e quanto ti costa in interessi.",
      "Inserisci importo, tasso annuo e durata. Se pensi di versare qualcosa in più ogni mese, aggiungilo e vedi quanto prima finisci.",
    ],
    comoSeCalcula: [
      "Si usa la rata costante (ammortamento alla francese), il metodo più comune per prestiti personali, finanziamenti auto e mutui.",
      "Tasso mensile = tasso annuo ÷ 12.",
      "Rata = importo × tasso mensile ÷ (1 − (1 + tasso mensile) elevato a meno il numero di rate).",
      "Ogni mese gli interessi si calcolano sul debito residuo. Il resto della rata riduce il capitale.",
    ],
    ejemplo: [
      `Un prestito di ${m(importo)} al 12% annuo in 36 mesi ha una rata di ${m(rata36)}. In tutto paghi ${m(interesesTotales(importo, 12, 36))} di interessi.`,
      `Se lo allunghi a 60 mesi la rata scende a ${m(rata60)}, ma gli interessi salgono a ${m(interesesTotales(importo, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Come si calcola la rata di un prestito?",
        respuesta:
          "Con la formula dell'ammortamento alla francese. Le rate sono tutte uguali, ma le prime sono fatte soprattutto di interessi e le ultime soprattutto di capitale. Per questo all'inizio il debito scende lentamente.",
      },
      {
        pregunta: "Che differenza c'è tra TAN e TAEG?",
        respuesta: "Il TAN è il tasso puro sugli interessi. Il TAEG comprende anche spese di istruttoria, assicurazioni e commissioni. Per confrontare due offerte, guarda il TAEG.",
      },
      {
        pregunta: "Conviene l'estinzione anticipata?",
        respuesta:
          "Di solito sì, se la penale è bassa. I soldi in più vanno direttamente a ridurre il capitale, che smette di generare interessi. Prima lo fai, più risparmi.",
      },
      {
        pregunta: "Una durata più lunga conviene?",
        respuesta: "La rata è più bassa, ma in totale paghi molti più interessi. Confronta entrambi i numeri prima di decidere.",
      },
    ],
    glosario: [
      { termino: "Debito residuo", definicion: "La parte del prestito che non hai ancora restituito." },
      { termino: "TAN", definicion: "Il tasso annuo nominale: diviso per 12 dà gli interessi di ogni mese." },
      { termino: "Quota capitale", definicion: "La parte di ogni rata che riduce il debito." },
    ],
  };
};
