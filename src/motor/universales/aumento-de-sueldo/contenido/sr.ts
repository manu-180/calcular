import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulator povišice plate",
    title: tituloQueEntre(
      `Kalkulator povišice plate ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      `Povišica plate ${GRAMATICA.sr.en(ctx.nombrePais)}`,
      "Kalkulator povišice plate",
    ),
    description: "Izračunajte novu platu posle povišice, razliku mesečno i godišnje, i proverite da li je vaša realna povišica veća od inflacije.",
    intro: [
      "Ponudili su vam povišicu ili se spremate da je tražite. Unesite platu i povišicu u procentima ili kao iznos i videćete koliko se menja svakog meseca i za celu godinu.",
      "Dodajte inflaciju za taj period i pokazaćemo vam da li vaša kupovna moć zaista raste ili plata samo stiže cene.",
    ],
    comoSeCalcula: [
      "Nova plata = sadašnja plata × (1 + povišica ÷ 100).",
      "Razlika godišnje = razlika mesečno × broj plata godišnje.",
      "Realna povišica = (1 + povišica) ÷ (1 + inflacija) − 1.",
    ],
    ejemplo: [
      `Plata od ${m(sueldo)} mesečno posle povišice od 5% postaje ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} više svakog meseca i ${m(sueldo * 0.05 * 12)} više godišnje.`,
      `Ako je inflacija za taj period bila 3%, realna povišica je ${p(aumentoReal(5, 3))}. Uz inflaciju od 6% iznosi ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Šta je realna povišica plate?",
        respuesta: "To je povišica posle uračunate inflacije. Pokazuje da li za novu platu kupujete više ili manje nego ranije.",
      },
      {
        pregunta: "Zašto nije dovoljno oduzeti inflaciju od povišice?",
        respuesta: `Zato što se procenti množe, a ne oduzimaju. Uz povišicu od 5% i inflaciju od 3% realna povišica je ${p(aumentoReal(5, 3))}, a ne 2%. Kada je inflacija visoka, razlika je mnogo veća.`,
      },
      {
        pregunta: "Koliku povišicu tražiti?",
        respuesta: "Najmanje onoliko kolika je inflacija od poslednje povišice, da ne gubite kupovnu moć. Preko toga se vodite time koliko drugi poslodavci plaćaju isto radno mesto i koliko su vam porasle odgovornosti.",
      },
    ],
    glosario: [
      { termino: "Nominalna povišica", definicion: "Povišica kako piše na platnom listiću, bez uračunate inflacije." },
      { termino: "Kupovna moć", definicion: "Ono što možete da kupite za svoju platu." },
    ],
  };
};
