import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  const real = formatearCifra(ctx, (1.07 / 1.03 - 1) * 100, 1);
  return {
    h1: "Pensionsopsparing: regn på din egen opsparing",
    title: tituloQueEntre(
      `Pensionsopsparing: beregn din formue ved pension | ${ctx.nombrePais}`,
      `Pensionsopsparing | ${ctx.nombrePais}`,
      "Pensionsopsparing",
    ),
    description: "Se, hvor meget du kan spare op til pensionen med en månedlig opsparing, og hvor meget det kan give om måneden, regnet i dagens pengeværdi.",
    intro: [
      "Folkepensionen rækker sjældent til at holde samme levestandard. En egen opsparing, også en lille, gør stor forskel, hvis du starter tidligt.",
      "Skriv din alder, hvornår du vil gå på pension, hvad du har sparet op, og hvor meget du kan spare op hver måned. Du ser beløbet ved pensionen, og hvor meget du kan hæve af det hver måned.",
    ],
    comoSeCalcula: [
      "Opsparingen vokser hver måned med det reale afkast, altså afkastet minus inflationen. Derfor er resultatet i dagens pengeværdi.",
      "Ved pensionen udbetales beløbet i lige store portioner hver måned over de år, du vælger. Det, der er tilbage, bliver ved med at vokse imens.",
      "Folkepension, skat og omkostninger til fonde eller formuepleje er ikke med.",
    ],
    ejemplo: [
      `Med ${m(actual)} sparet op som 30-årig og ${m(aporte)} om måneden med 4 % i realt afkast har du ${m(capital30)}, når du er 65. Det rækker til ${m(rentaMensual(capital30, 4, 25))} om måneden i 25 år.`,
      `Starter du som 40-årig med de samme tal, når du ${m(capital40)}. Ti år gør stor forskel.`,
    ],
    faq: [
      {
        pregunta: "Hvad er realt afkast?",
        respuesta: `Det er det, en investering giver efter inflation. Giver en investering 7 %, og inflationen er 3 %, bliver det reale afkast omkring ${real} %.`,
      },
      {
        pregunta: "Erstatter det her min folkepension?",
        respuesta: "Nej. Det er din egen opsparing ud over folkepension og arbejdsmarkedspension. Vil du vide, hvad du får i offentlig pension, så tjek det hos pensionsmyndigheden, der hvor du bor.",
      },
      {
        pregunta: "Hvor meget bør jeg spare op til pension?",
        respuesta: "Der er ikke ét tal, der passer til alle. En almindelig tommelfingerregel er 10 % til 15 % af indkomsten. Det vigtigste er at starte så tidligt, du kan.",
      },
    ],
    glosario: [
      { termino: "Realt afkast", definicion: "Det, en investering giver ud over inflationen." },
      { termino: "Dagens pengeværdi", definicion: "Et fremtidigt beløb udtrykt i det, det ville kunne købe i dag." },
    ],
  };
};
