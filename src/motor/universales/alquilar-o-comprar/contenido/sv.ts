import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const vinner = (a: { comprar: number; alquilar: number }, anios: string) =>
    `${a.comprar >= a.alquilar ? "lönar det sig bäst att köpa" : "lönar det sig bäst att hyra"}, med ${m(Math.abs(a.comprar - a.alquilar))} i skillnad efter ${anios} år`;
  return {
    h1: "Hyra eller köpa bostad",
    title: tituloQueEntre(
      `Hyra eller köpa: räkna på vad som lönar sig | ${ctx.nombrePais}`,
      `Hyra eller köpa | ${ctx.nombrePais}`,
      "Hyra eller köpa",
    ),
    description: "Jämför att hyra med att köpa bostad under de år du väljer. Se vilket alternativ som ger mest i slutändan, från vilket år och med hur mycket.",
    intro: [
      "Det räcker inte att jämföra månadskostnaden för lånet med hyran. Den som köper betalar ränta, underhåll och avgifter men äger till slut bostaden. Den som hyr kan låta kontantinsatsen växa.",
      "Kalkylen räknar ihop allt detta år för år och visar vilket alternativ som lämnar dig med störst förmögenhet.",
    ],
    comoSeCalcula: [
      "Köpa: varje månad betalar du lånet och ägarkostnaderna. Din förmögenhet är bostadens värde minus det du har kvar på lånet.",
      "Hyra: kontantinsatsen och kostnaderna vid köpet investeras i stället med den andra avkastningen, och hyran höjs varje år.",
      "Varje månad investerar den som har lägst utgifter mellanskillnaden, så båda alternativen utgår från samma budget.",
      "Det bästa alternativet är det som ger störst förmögenhet vid slutet.",
    ],
    ejemplo: [
      `En bostad för ${m(precio)} med 20 % kontantinsats och ett bolån på 7 % ränta och 25 års löptid, jämfört med en hyra på ${m(alquiler)} i månaden.`,
      `På 10 år ${vinner(a10, "10")}. På 3 år ${vinner(a3, "3")}.`,
    ],
    faq: [
      {
        pregunta: "Är det att kasta pengar i sjön att hyra?",
        respuesta:
          "Inte riktigt. Den som köper har också kostnader som aldrig kommer tillbaka, som ränta, avgifter och underhåll. Det som räknas är hur mycket du äger vid slutet i varje fall.",
      },
      {
        pregunta: "Varför ändras svaret med antalet år?",
        respuesta:
          "Ett köp har stora kostnader i början (kostnader vid köpet och mycket ränta de första åren) som tar tid att tjäna in. Tänker du flytta snart lönar det sig oftast bättre att hyra.",
      },
      {
        pregunta: "Vilken uppgift påverkar mest?",
        respuesta:
          "Förhållandet mellan pris och hyra, bolåneräntan och hur snabbt bostadspriserna stiger. Prova att ändra värdeökningen och avkastningen så ser du hur mycket svaret rör sig.",
      },
    ],
    glosario: [
      { termino: "Förmögenhet", definicion: "Det du äger minus det du är skyldig." },
      { termino: "Värdeökning", definicion: "Hur mycket bostadens värde stiger varje år." },
      { termino: "Alternativkostnad", definicion: "Det kontantinsatsen hade gett om du hade investerat den i stället." },
    ],
  };
};
