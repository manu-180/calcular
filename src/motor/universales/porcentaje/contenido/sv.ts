import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Procenträknare",
    title: tituloQueEntre(
      `Procenträknare: räkna ut procent enkelt | ${ctx.nombrePais}`,
      `Procenträknare | ${ctx.nombrePais}`,
      "Procenträknare",
    ),
    description: "Räkna ut hur mycket X procent av ett tal är, hur många procent ett tal är av ett annat och vad som händer när du lägger till eller drar av procent.",
    intro: [
      "Välj vad du vill veta, fyll i de två talen och få svaret direkt.",
      "Här finns de fyra vanligaste procenträkningarna i vardagen: en del, en andel, en ökning och en minskning.",
    ],
    comoSeCalcula: [
      "X % av Y = X × Y ÷ 100.",
      "Hur många procent X är av Y = X ÷ Y × 100.",
      "Y plus X % = Y × (1 + X ÷ 100). Y minus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % av 200 är ${c((15 * 200) / 100)}.`,
      `30 är ${c((30 / 120) * 100)} % av 120.`,
      `Ett pris på ${m(precio)} som höjs med 10 % blir ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag ut procent av ett tal?",
        respuesta: `Multiplicera talet med procentsatsen och dela med 100. 20 % av 350 är 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Hur räknar jag ut hur många procent ett tal är av ett annat?",
        respuesta: `Dela delen med det hela och multiplicera med 100. Har du 45 rätt av 60 är det 45 ÷ 60 × 100 = ${c((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Hur lägger jag på procent på ett pris?",
        respuesta: `Multiplicera priset med 1 plus procentsatsen i decimalform. För att lägga på 10 % multiplicerar du med ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Kommer jag tillbaka till samma tal om det först ökar 10 % och sedan minskar 10 %?",
        respuesta: `Nej. 100 plus 10 % är ${c(110)}, och ${c(110)} minus 10 % är ${c(110 * 0.9)}. Minskningen räknas på ett större tal.`,
      },
    ],
    glosario: [
      { termino: "Procent", definicion: "En andel uttryckt i hundradelar." },
      { termino: "Bas", definicion: "Talet som procenten räknas på (Y i den här räknaren)." },
    ],
  };
};
