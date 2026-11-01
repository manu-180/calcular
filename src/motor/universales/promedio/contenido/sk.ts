import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Notas como en la escuela: un 1 con 20 %, un 2 con 30 %, un 3 con 50 %.
  const ponderado = (1 * 20 + 2 * 30 + 3 * 50) / (20 + 30 + 50);
  const simple = (1 + 2 + 3) / 3;
  return {
    h1: "Kalkulačka váženého priemeru",
    title: tituloQueEntre(
      `Vážený priemer známok: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      "Vážený priemer známok: výpočet online",
      "Vážený priemer",
    ),
    description: "Vypočítajte priemer známok, jednoduchý aj vážený, až z 10 hodnôt a s váhou každej z nich: v percentách, kreditoch alebo počte opakovaní.",
    intro: [
      "Zadajte každú známku a to, akú má váhu. Uvidíte vážený priemer a vedľa neho jednoduchý priemer.",
      "Hodí sa na známky na základnej, strednej aj vysokej škole a na akýkoľvek priemer, kde majú niektoré hodnoty väčšiu váhu ako iné.",
    ],
    comoSeCalcula: [
      "Jednoduchý priemer = súčet hodnôt ÷ počet hodnôt.",
      "Vážený priemer = súčet (hodnota × váha) ÷ súčet váh.",
      "Váhy nemusia dávať spolu 100: výpočet delí ich súčtom.",
    ],
    ejemplo: [
      `Jednotka s váhou 20 %, dvojka s váhou 30 % a trojka s váhou 50 % dávajú vážený priemer ${n(ponderado)}.`,
      `Jednoduchý priemer týchto troch známok je ${n(simple, 0)}: trojka má najväčšiu váhu, a preto vážený priemer zhoršuje.`,
    ],
    faq: [
      {
        pregunta: "Ako sa počíta vážený priemer?",
        respuesta: "Každú hodnotu vynásobte jej váhou, výsledky spočítajte a vydeľte súčtom váh.",
      },
      {
        pregunta: "Čo ak váhy nedávajú spolu 100 %?",
        respuesta: "To nevadí. Ak má jeden predmet 6 kreditov a druhý 4, zadajte 6 a 4. Výpočet delí celkovou váhou.",
      },
      {
        pregunta: "Aký je rozdiel medzi jednoduchým a váženým priemerom?",
        respuesta: "V jednoduchom priemere má každá hodnota rovnakú váhu. Vo váženom sa každá hodnota započítava podľa svojej váhy.",
      },
    ],
    glosario: [
      { termino: "Váha", definicion: "Aký veľký vplyv má hodnota na výsledný priemer." },
      { termino: "Vážený priemer", definicion: "Priemer, v ktorom sa každá hodnota násobí svojou váhou." },
    ],
  };
};
