import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Räkna ut löneökning",
    title: tituloQueEntre(
      `Löneökning: räkna ut ny lön och reallön | ${ctx.nombrePais}`,
      `Löneökning | ${ctx.nombrePais}`,
      "Löneökning",
    ),
    description: "Räkna ut din nya lön efter en löneökning, skillnaden per månad och per år, och om du slår inflationen med din reallöneökning.",
    intro: [
      "Du har fått ett lönebud eller ska snart till lönesamtal. Fyll i lönen och löneökningen, i procent eller som belopp, och se hur mycket som ändras per månad och per år.",
      "Lägg till inflationen för perioden så ser du om du verkligen får mer köpkraft eller bara hinner ikapp.",
    ],
    comoSeCalcula: [
      "Ny lön = nuvarande lön × (1 + löneökning ÷ 100).",
      "Skillnad per år = skillnad per månad × antal löner per år.",
      "Reallöneökning = (1 + löneökning) ÷ (1 + inflation) − 1.",
    ],
    ejemplo: [
      `En månadslön på ${m(sueldo)} med 5 % löneökning blir ${m(sueldo * 1.05)}. Det är ${m(sueldo * 0.05)} mer i månaden och ${m(sueldo * 0.05 * 12)} mer om året.`,
      `Var inflationen 3 % under perioden blir reallöneökningen ${p(aumentoReal(5, 3))}. Med 6 % inflation blir den ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Vad är en reallöneökning?",
        respuesta: "Det är löneökningen efter inflation. Den visar om din nya lön räcker till mer eller mindre än förut.",
      },
      {
        pregunta: "Varför kan jag inte bara dra av inflationen från löneökningen?",
        respuesta: `Därför att procentsatserna multipliceras, de läggs inte ihop. Med 5 % löneökning och 3 % inflation blir reallöneökningen ${p(aumentoReal(5, 3))}, inte ${formatearCifra(ctx, 5 - 3)} %. När inflationen är hög blir skillnaden mycket större.`,
      },
      {
        pregunta: "Hur stor löneökning ska jag be om?",
        respuesta: "Minst inflationen sedan din förra löneökning, så att du inte halkar efter. Utöver det kan du utgå från vad andra arbetsgivare betalar för liknande jobb och hur din roll har vuxit.",
      },
    ],
    glosario: [
      { termino: "Nominell löneökning", definicion: "Löneökningen som den står på lönebeskedet, före inflation." },
      { termino: "Köpkraft", definicion: "Vad din lön räcker till." },
    ],
  };
};
