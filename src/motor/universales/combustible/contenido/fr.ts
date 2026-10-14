import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Un aller-retour de 150 miles avec une voiture qui fait 30 mpg demande ${formatearNumero(ctx, galones)} gallons.`,
          `À ${m(precio)} le gallon, cela fait ${m(galones * precio)}. Partagé entre 2 personnes, ${m((galones * precio) / 2)} chacune.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Un aller-retour de 300 km avec une voiture qui consomme 8 litres aux 100 km demande ${formatearNumero(ctx, litros)} litres.`,
          `À ${m(precio)} le litre, cela fait ${m(litros * precio)}. Partagé entre 2 personnes, ${m((litros * precio) / 2)} chacune.`,
        ];
      })();
  return {
    h1: "Calcul du coût de carburant d’un trajet",
    title: tituloQueEntre(`Calcul du coût de carburant d’un trajet (${ctx.nombrePais})`, `Coût de carburant (${ctx.nombrePais})`, "Calcul du coût de carburant"),
    description: "Calculez ce qu’un trajet coûte en carburant selon la distance, la consommation de votre véhicule et le prix à la pompe, et la part de chacun.",
    intro: [
      `Saisissez la distance, la consommation du véhicule et le prix du ${imperial ? "gallon" : "litre"}. Vous voyez la quantité de carburant nécessaire et le coût du trajet.`,
      imperial
        ? "La consommation s’indique en miles par gallon."
        : "La consommation s’indique en litres aux 100 km ou en kilomètres par litre. Pratique aussi pour partager les frais d’un covoiturage.",
    ],
    comoSeCalcula: imperial
      ? ["Gallons = distance ÷ miles par gallon.", "Coût = gallons × prix du gallon. Un aller-retour double la distance."]
      : [
          "En litres aux 100 km : litres = distance × consommation ÷ 100.",
          "En kilomètres par litre : litres = distance ÷ consommation.",
          "Coût = litres × prix du litre. Un aller-retour double la distance.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Comment calculer la consommation réelle de ma voiture ?",
        respuesta: "Faites le plein, notez le kilométrage, roulez, puis refaites le plein. Divisez les litres ajoutés par les kilomètres parcourus et multipliez par 100.",
      },
      {
        pregunta: "Les péages sont-ils compris ?",
        respuesta: "Non. Le calcul ne couvre que le carburant. Ajoutez à part les péages et le stationnement.",
      },
      {
        pregunta: "Pourquoi ma voiture consomme-t-elle plus en ville ?",
        respuesta: "Les arrêts et redémarrages demandent plus d’énergie qu’une vitesse régulière sur route. La consommation en ville est donc en général plus élevée.",
      },
      {
        pregunta: "Comment convertir des mpg en litres aux 100 km ?",
        respuesta: `Divisez ${formatearNumero(ctx, 235.215, 1)} par les mpg (gallons américains). Une voiture à 30 mpg consomme environ ${formatearNumero(ctx, 235.215 / 30, 1)} litres aux 100 km.`,
      },
    ],
    glosario: [
      { termino: "Consommation", definicion: "La quantité de carburant qu’un véhicule utilise pour une distance donnée, en général en litres aux 100 km." },
      { termino: "mpg", definicion: "Miles par gallon. Plus le chiffre est élevé, moins le véhicule consomme." },
    ],
  };
};
