import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoDa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Renters rente-beregner",
    title: tituloQueEntre(
      `Renters rente: beregn, hvordan din opsparing vokser | ${ctx.nombrePais}`,
      `Renters rente | ${ctx.nombrePais}`,
      "Renters rente",
    ),
    description: "Se, hvordan dine penge vokser med renters rente og månedlig opsparing. Du får slutbeløbet, hvor meget der er afkast, og en tabel år for år.",
    intro: [
      "Med renters rente lægges renten til din saldo og begynder selv at give renter. Derfor vokser opsparingen hurtigere og hurtigere, jo længere tid den får.",
      "Skriv, hvad du har i dag, hvor meget du kan spare op hver måned, renten og antal år. Du ser slutbeløbet, og hvor stor en del af det der er afkast.",
    ],
    comoSeCalcula: [
      "Slutbeløb = startbeløb × (1 + i) opløftet i n + månedlig opsparing × ((1 + i) opløftet i n − 1) ÷ i.",
      "Her er i den månedlige rente, der svarer til den rentetilskrivning, du har valgt, og n er antal måneder.",
      "Den månedlige opsparing sættes ind i slutningen af hver måned.",
    ],
    ejemplo: [
      `Starter du med ${m(capital)} og sparer ${m(aporte)} op om måneden med 7 % om året, har du ${m(a10)} efter 10 år.`,
      `Fortsætter du 10 år mere, vokser saldoen til ${m(a20)}. Det andet årti giver en del mere end det første.`,
    ],
    faq: [
      {
        pregunta: "Hvad er forskellen på simpel rente og renters rente?",
        respuesta:
          "Simpel rente regnes altid af det oprindelige beløb. Renters rente regnes af beløbet plus de renter, du allerede har fået.",
      },
      {
        pregunta: "Hvad er 72-reglen?",
        respuesta: `En hurtig måde at se, hvor lang tid det tager, før pengene er fordoblet. Del 72 med den årlige rente. Med 6 % fordobles de på omkring ${formatearCifra(ctx, 72 / 6, 0)} år.`,
      },
      {
        pregunta: "Hvilken rente skal jeg regne med?",
        respuesta:
          "En, der er rimelig for det, du har tænkt dig at gøre med pengene. Vil du se resultatet i dagens pengeværdi, så brug renten minus den inflation, du regner med.",
      },
    ],
    glosario: [
      { termino: "Rentetilskrivning", definicion: "Hvor tit renten lægges til saldoen." },
      { termino: "Renters rente", definicion: "Rente, der regnes af saldoen plus de renter, der allerede er lagt til." },
    ],
  };
};
