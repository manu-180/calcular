import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const SERVICE_COMPRIS = new Set(["FR", "BE", "CH", "LU", "MC"]);

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  const quebec = ctx.locale.endsWith("-CA");
  const usage = quebec
    ? "Au Québec, on laisse en général entre 15 % et 20 %, calculés sur le montant avant taxes."
    : SERVICE_COMPRIS.has(ctx.pais)
      ? "Le service est déjà compris dans les prix affichés. Le pourboire reste un geste libre : quelques pièces, ou 5 % à 10 % quand le service vous a plu."
      : `Cela dépend des usages. Renseignez-vous sur ce qui se fait en ${ctx.nombrePais} et vérifiez si le service figure déjà sur l’addition.`;
  return {
    h1: "Calcul du pourboire",
    title: tituloQueEntre(`Calcul du pourboire et partage de l’addition (${ctx.nombrePais})`, `Calcul du pourboire (${ctx.nombrePais})`, "Calcul du pourboire"),
    description: "Calculez le pourboire, le total de l’addition et ce que chacun paie quand vous partagez. Chaque part peut être arrondie au-dessus.",
    intro: [
      "Saisissez l’addition, le pourcentage de pourboire et le nombre de personnes. Vous voyez le pourboire, le total et la part de chacun.",
      "Vous préférez des montants ronds ? Le calculateur arrondit chaque part au-dessus et la différence va au pourboire.",
    ],
    comoSeCalcula: [
      "Pourboire = addition × pourcentage ÷ 100.",
      "Total = addition + pourboire.",
      "La part de chacun est le total divisé par le nombre de personnes.",
    ],
    ejemplo: [
      `Pour une addition de ${m(cuenta)}, un pourboire de 15 % ajoute ${m(propina)}. Le total est de ${m(cuenta + propina)}.`,
      `Partagé entre 3 personnes, chacun paie ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Combien laisser de pourboire ?",
        respuesta: usage,
      },
      {
        pregunta: "Le pourboire se calcule-t-il avant ou après les taxes ?",
        respuesta: quebec
          ? "L’usage est de le calculer sur le montant avant taxes. Saisissez ce montant dans le calculateur."
          : "La plupart des gens le calculent sur le total de l’addition. Si vous préférez partir du montant hors taxes, saisissez ce montant.",
      },
      {
        pregunta: "Comment calculer vite un pourboire de 15 % ?",
        respuesta: "Divisez l’addition par 10 pour obtenir 10 %, puis ajoutez la moitié de ce montant. Sur 40, cela fait 4 plus 2, soit 6.",
      },
    ],
    glosario: [
      { termino: "Pourboire", definicion: "Une somme laissée en plus du prix pour remercier du service." },
      { termino: "Service compris", definicion: "Le service est déjà inclus dans les prix affichés. Le pourboire est alors facultatif." },
    ],
  };
};
