import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoIt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperiale = ctx.unidades === "imperial";
  const ejemplo = imperiale
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Un cortile di 10 × 10 ft, spesso 4 in, richiede ${n(ft3)} ft³ di calcestruzzo: ${n(ft3 / 27)} iarde cubiche.`,
          `Con l'impasto di riferimento, sono circa ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} libbre di cemento.`,
        ];
      })()
    : (() => {
        const volume = 4 * 3 * 0.1;
        return [
          `Una soletta di 4 × 3 m, spessa 10 cm, richiede ${n(volume, 1)} m³ di calcestruzzo.`,
          `Con l'impasto di riferimento, servono circa ${n(MEZCLA.cementoKg * volume, 0)} kg di cemento, ${n(MEZCLA.arenaM3 * volume)} m³ di sabbia e ${n(MEZCLA.piedraM3 * volume)} m³ di ghiaia.`,
        ];
      })();
  return {
    h1: "Calcolo calcestruzzo",
    title: tituloQueEntre(`Calcolo calcestruzzo e sacchi di cemento | ${ctx.nombrePais}`, `Calcolo calcestruzzo | ${ctx.nombrePais}`, "Calcolo calcestruzzo"),
    description: `Calcola quanto calcestruzzo serve per una soletta, in ${imperiale ? "iarde cubiche" : "metri cubi"}, e più o meno quanto cemento, sabbia e ghiaia comprare.`,
    intro: [
      "Inserisci lunghezza, larghezza e spessore. Vedi il volume di calcestruzzo e i materiali indicativi per prepararlo.",
      "I materiali dipendono dal dosaggio. Questa calcolatrice usa come riferimento un impasto generico 1:2:3.",
    ],
    comoSeCalcula: [
      imperiale
        ? "Volume = lunghezza × larghezza × spessore, con lo spessore in piedi. Dividi i piedi cubi per 27 per avere le iarde cubiche."
        : "Volume = lunghezza × larghezza × spessore, con lo spessore in metri.",
      "Si aggiunge il margine per il terreno irregolare e le perdite durante il getto.",
      `Per ogni m³: circa ${MEZCLA.cementoKg} kg di cemento, ${n(MEZCLA.arenaM3)} m³ di sabbia, ${n(MEZCLA.piedraM3, 1)} m³ di ghiaia e ${MEZCLA.aguaL} litri d'acqua.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Quanti sacchi di cemento servono per un metro cubo?",
        respuesta: `Con un impasto 1:2:3 servono circa ${MEZCLA.cementoKg} kg di cemento, cioè ${n(MEZCLA.cementoKg / 25, 0)} sacchi da 25 kg. Un calcestruzzo più resistente ne richiede di più.`,
      },
      {
        pregunta: "Come si calcolano i metri cubi di una soletta?",
        respuesta: `Moltiplica lunghezza, larghezza e spessore, tutti in metri. Una soletta di 5 × 4 m spessa 12 cm fa 5 × 4 × ${n(0.12)} = ${n(2.4, 1)} m³.`,
      },
      {
        pregunta: "Conviene il calcestruzzo preconfezionato?",
        respuesta: "Per getti grandi di solito sì: arriva con la betoniera, è più uniforme e si lavora prima. Per piccoli lavori è normale impastarlo in cantiere con queste quantità.",
      },
    ],
    glosario: [
      { termino: "Dosaggio", definicion: "Il rapporto tra cemento, sabbia, ghiaia e acqua in un impasto." },
      { termino: "Metro cubo (m³)", definicion: "Il volume di un cubo con il lato di 1 metro." },
    ],
  };
};
