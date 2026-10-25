import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Dricksräknare",
    title: tituloQueEntre(
      `Dricksräknare: räkna ut dricks och dela notan | ${ctx.nombrePais}`,
      `Dricksräknare | ${ctx.nombrePais}`,
      "Dricksräknare",
    ),
    description: "Räkna ut dricksen, totalsumman och vad var och en betalar när ni delar notan. Du kan avrunda varje andel uppåt till ett jämnt belopp.",
    intro: [
      "Fyll i notans belopp, hur många procent du vill ge i dricks och hur många som betalar. Du ser dricksen, totalen och varje andel.",
      "Vill du ha jämna belopp avrundas varje andel uppåt och det som blir över går till dricksen.",
    ],
    comoSeCalcula: [
      "Dricks = notans belopp × dricksprocent ÷ 100.",
      "Totalt = notans belopp + dricks.",
      "Varje andel är totalen delad med antalet personer.",
    ],
    ejemplo: [
      `På en nota på ${m(cuenta)} blir 10 % i dricks ${m(propina)}, och totalen blir ${m(cuenta + propina)}.`,
      `Delar ni på 3 personer betalar var och en ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Hur mycket dricks ska jag ge?",
        respuesta: `Det beror på seden på platsen. Kolla vad som är vanligt i ${ctx.nombrePais} och om serviceavgift redan ingår i notan. På många ställen räcker det att avrunda uppåt.`,
      },
      {
        pregunta: "Ska dricksen räknas på beloppet före eller efter moms?",
        respuesta: "De flesta räknar på totalen som står på notan. Vill du räkna på beloppet utan moms fyller du i det i stället.",
      },
      {
        pregunta: "Hur räknar jag snabbt ut 10 % i dricks?",
        respuesta: `Dela notans belopp med 10. På en nota på ${n(450)} blir det ${n(450 / 10)}.`,
      },
    ],
    glosario: [
      { termino: "Dricks", definicion: "Ett extra belopp du lämnar för servicen, utöver priset." },
      { termino: "Serviceavgift", definicion: "En avgift som stället redan har lagt till på notan för servicen." },
    ],
  };
};
