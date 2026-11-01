import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulator povišice plate",
    title: tituloQueEntre(
      `Kalkulator povišice plate ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      `Povišica plate ${GRAMATICA.bs.en(ctx.nombrePais)}`,
      "Kalkulator povišice plate",
    ),
    description: "Izračunajte novu platu nakon povišice, razliku mjesečno i godišnje te provjerite da li je vaša realna povišica veća od inflacije.",
    intro: [
      "Ponudili su vam povišicu ili je namjeravate tražiti. Unesite platu i povišicu u procentima ili kao iznos i vidjet ćete koliko se mijenja svakog mjeseca i za cijelu godinu.",
      "Dodajte inflaciju za taj period i pokazat ćemo vam raste li vaša kupovna moć doista ili plata samo sustiže cijene.",
    ],
    comoSeCalcula: [
      "Nova plata = sadašnja plata × (1 + povišica ÷ 100).",
      "Razlika godišnje = razlika mjesečno × broj plata godišnje.",
      "Realna povišica = (1 + povišica) ÷ (1 + inflacija) − 1.",
    ],
    ejemplo: [
      `Plata od ${m(sueldo)} mjesečno nakon povišice od 5 % postaje ${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} više svakog mjeseca i ${m(sueldo * 0.05 * 12)} više godišnje.`,
      `Ako je inflacija za taj period bila 3 %, realna povišica iznosi ${p(aumentoReal(5, 3))}. Uz inflaciju od 6 % iznosi ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Šta je realna povišica plate?",
        respuesta: "To je povišica nakon što se uračuna inflacija. Pokazuje kupujete li za novu platu više ili manje nego prije.",
      },
      {
        pregunta: "Zašto nije dovoljno oduzeti inflaciju od povišice?",
        respuesta: `Zato što se procenti množe, a ne oduzimaju. Uz povišicu od 5 % i inflaciju od 3 % realna povišica iznosi ${p(aumentoReal(5, 3))}, a ne 2 %. Kada je inflacija visoka, razlika je mnogo veća.`,
      },
      {
        pregunta: "Koliku povišicu tražiti?",
        respuesta: "Barem onoliku kolika je inflacija od posljednje povišice, da ne gubite kupovnu moć. Iznad toga vodite se time koliko drugi poslodavci plaćaju isto radno mjesto i koliko su vam porasle odgovornosti.",
      },
    ],
    glosario: [
      { termino: "Nominalna povišica", definicion: "Povišica kako piše na obračunu plate, bez uračunate inflacije." },
      { termino: "Kupovna moć", definicion: "Ono što možete kupiti za svoju platu." },
    ],
  };
};
