import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Calcul des intérêts composés",
    title: tituloQueEntre(`Calcul des intérêts composés (${ctx.nombrePais})`, "Calcul des intérêts composés", "Intérêts composés"),
    description: "Voyez comment votre épargne grandit avec les intérêts composés et des versements mensuels : capital final, intérêts gagnés et tableau année par année.",
    intro: [
      "Avec les intérêts composés, les intérêts s’ajoutent au capital et produisent à leur tour des intérêts. C’est pour cela que l’épargne grandit de plus en plus vite.",
      "Saisissez ce que vous avez aujourd’hui, ce que vous pouvez verser chaque mois, le taux et la durée. Vous voyez le capital final et la part qui vient des intérêts.",
    ],
    comoSeCalcula: [
      "Capital final = capital × (1 + i) puissance n + versement × ((1 + i) puissance n − 1) ÷ i.",
      "Ici, i est le taux mensuel équivalent à la capitalisation choisie, et n le nombre de mois.",
      "Les versements s’ajoutent à la fin de chaque mois.",
    ],
    ejemplo: [
      `En partant de ${m(capital)} et en versant ${m(aporte)} par mois à 7 % par an, vous atteignez ${m(a10)} en 10 ans.`,
      `Au bout de 10 ans de plus, le capital atteint ${m(a20)}. La deuxième décennie rapporte bien plus que la première.`,
    ],
    faq: [
      {
        pregunta: "Quelle différence entre intérêts simples et intérêts composés ?",
        respuesta: "Les intérêts simples se calculent toujours sur le capital de départ. Les intérêts composés se calculent sur le capital plus les intérêts déjà gagnés.",
      },
      {
        pregunta: "Qu’est-ce que la règle de 72 ?",
        respuesta: "Une astuce pour savoir en combien de temps un capital double : divisez 72 par le taux annuel. À 6 %, il double en 12 ans environ.",
      },
      {
        pregunta: "Quel taux utiliser ?",
        respuesta: "Un taux réaliste pour ce que vous ferez de l’argent. Pour voir le résultat en pouvoir d’achat d’aujourd’hui, prenez le taux moins l’inflation attendue.",
      },
    ],
    glosario: [
      { termino: "Capitalisation", definicion: "Le moment où les intérêts s’ajoutent au capital." },
      { termino: "Intérêts composés", definicion: "Des intérêts calculés sur le capital plus les intérêts déjà gagnés." },
    ],
  };
};
