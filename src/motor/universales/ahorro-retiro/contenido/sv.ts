import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const real = formatearCifra(ctx, (1.07 / 1.03 - 1) * 100, 1);
  return {
    h1: "Pensionssparande: räkna på ditt eget sparande",
    title: tituloQueEntre(
      `Pensionssparande: räkna ut ditt kapital vid pension | ${ctx.nombrePais}`,
      `Pensionssparande | ${ctx.nombrePais}`,
      "Pensionssparande",
    ),
    description: "Se hur mycket du kan spara ihop till pensionen med ett månadssparande och hur mycket det kan ge i månaden, räknat i dagens penningvärde.",
    intro: [
      "Den allmänna pensionen räcker ofta inte för att behålla samma levnadsstandard. Ett eget sparande, även ett litet, gör stor skillnad om du börjar tidigt.",
      "Fyll i din ålder, när du vill gå i pension, vad du har sparat och hur mycket du kan spara varje månad. Du ser kapitalet vid pensionen och hur mycket du kan ta ut från det varje månad.",
    ],
    comoSeCalcula: [
      "Sparandet växer varje månad med den reala avkastningen, alltså avkastningen minus inflationen. Därför blir resultatet i dagens penningvärde.",
      "Vid pensionen betalas kapitalet ut i lika stora belopp varje månad under de år du väljer. Det som finns kvar fortsätter att växa under tiden.",
      "Allmän pension, skatt och avgifter för fonder eller förvaltning ingår inte.",
    ],
    ejemplo: [
      `Med ${m(actual)} sparat vid 30 års ålder och ${m(aporte)} i månaden med 4 % real avkastning har du ${m(capital30)} vid 65. Det räcker till ${m(rentaMensual(capital30, 4, 25))} i månaden i 25 år.`,
      `Börjar du vid 40 med samma siffror når du ${m(capital40)}. Tio år gör stor skillnad.`,
    ],
    faq: [
      {
        pregunta: "Vad är real avkastning?",
        respuesta: `Det är vad en placering ger efter inflationen. Ger en placering 7 % och inflationen är 3 % blir den reala avkastningen ungefär ${real} %.`,
      },
      {
        pregunta: "Ersätter det här min allmänna pension?",
        respuesta: "Nej. Det är ditt eget sparande utöver allmän pension och tjänstepension. Vill du veta vad du får i allmän pension, kontrollera med pensionsmyndigheten där du bor.",
      },
      {
        pregunta: "Hur mycket bör jag spara till pensionen?",
        respuesta: "Det finns ingen siffra som passar alla. En vanlig tumregel är 10 % till 15 % av inkomsten. Det viktigaste är att börja så tidigt du kan.",
      },
    ],
    glosario: [
      { termino: "Real avkastning", definicion: "Det en placering ger utöver inflationen." },
      { termino: "Dagens penningvärde", definicion: "Ett framtida belopp uttryckt i vad det skulle räcka till i dag." },
    ],
  };
};
