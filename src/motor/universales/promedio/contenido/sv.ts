import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const c = (x: number) => formatearCifra(ctx, x);
  const ponderado = (7 * 20 + 8 * 30 + 9 * 50) / (20 + 30 + 50);
  const simple = (7 + 8 + 9) / 3;
  return {
    h1: "Räkna ut viktat medelvärde",
    title: tituloQueEntre(
      `Viktat medelvärde: räkna ut medelvärde med vikter | ${ctx.nombrePais}`,
      `Viktat medelvärde | ${ctx.nombrePais}`,
      "Viktat medelvärde",
    ),
    description: "Räkna ut ett vanligt eller viktat medelvärde med upp till 10 värden och vikten för varje värde, i procent, poäng eller antal gånger.",
    intro: [
      "Fyll i varje betyg eller värde och hur mycket det väger. Du ser det viktade medelvärdet och det vanliga bredvid.",
      "Den fungerar för betyg i skolan eller på högskolan, och för alla medelvärden där vissa värden räknas mer än andra.",
    ],
    comoSeCalcula: [
      "Vanligt medelvärde = summan av värdena ÷ antalet värden.",
      "Viktat medelvärde = summan av (värde × vikt) ÷ summan av vikterna.",
      "Vikterna behöver inte bli 100 tillsammans, eftersom räkningen delar med deras summa.",
    ],
    ejemplo: [
      `Med 7 som väger 20 %, 8 som väger 30 % och 9 som väger 50 % blir det viktade medelvärdet ${n(ponderado)}.`,
      `Det vanliga medelvärdet av samma tre värden är ${n(simple)}. Nian väger mest och drar upp det viktade.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag ut ett viktat medelvärde?",
        respuesta: "Multiplicera varje värde med sin vikt, lägg ihop resultaten och dela med summan av vikterna.",
      },
      {
        pregunta: "Vad händer om vikterna inte blir 100 %?",
        respuesta: `Det gör inget. Har en kurs 6 poäng och en annan 4 använder du 6 och 4. Räkningen delar med den totala vikten, här ${c(6 + 4)}.`,
      },
      {
        pregunta: "Vad är skillnaden mellan vanligt och viktat medelvärde?",
        respuesta: "I ett vanligt medelvärde räknas alla värden lika mycket. I ett viktat medelvärde räknas varje värde efter sin vikt.",
      },
    ],
    glosario: [
      { termino: "Vikt", definicion: "Hur mycket ett värde påverkar det slutliga medelvärdet." },
      { termino: "Viktat medelvärde", definicion: "Ett medelvärde där varje värde multipliceras med sin vikt." },
    ],
  };
};
