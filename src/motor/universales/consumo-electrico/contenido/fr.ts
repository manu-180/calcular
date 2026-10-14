import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Calcul de consommation électrique",
    title: tituloQueEntre(`Calcul de consommation électrique (${ctx.nombrePais})`, "Calcul de consommation électrique", "Consommation électrique"),
    description: "Calculez combien d’électricité consomme un appareil et son coût par jour, par mois et par an, selon sa puissance, sa durée d’utilisation et le prix du kWh.",
    intro: [
      "Saisissez la puissance de l’appareil, ses heures d’utilisation et le prix du kWh indiqué sur votre facture. Vous voyez la consommation et le coût.",
      "Pratique pour repérer l’appareil qui pèse le plus sur la facture : climatiseur, radiateur, réfrigérateur ou ordinateur.",
    ],
    comoSeCalcula: [
      "kWh par jour = watts × heures d’utilisation ÷ 1000.",
      "kWh par mois = kWh par jour × jours d’utilisation. Pour l’année, le mois multiplié par 12.",
      "Coût = kWh × prix du kWh.",
    ],
    ejemplo: [
      `Un appareil de 1000 W utilisé 4 heures par jour consomme 4 kWh par jour et ${formatearNumero(ctx, kwhMes)} kWh par mois.`,
      `À ${m(precio)} le kWh, il coûte ${m(kwhMes * precio)} par mois.`,
    ],
    faq: [
      {
        pregunta: "Qu’est-ce qu’un kWh ?",
        respuesta: "Un kilowattheure est l’énergie consommée par un appareil de 1000 W qui fonctionne pendant une heure. C’est l’unité de votre facture d’électricité.",
      },
      {
        pregunta: "Un réfrigérateur tourne-t-il à pleine puissance toute la journée ?",
        respuesta: "Non. Le compresseur se met en marche puis s’arrête. Pour ce type d’appareil, comptez environ 8 à 10 heures par jour plutôt que 24.",
      },
      {
        pregunta: "J’ai un tarif heures pleines et heures creuses, comment faire ?",
        respuesta: "Faites deux calculs : un avec les heures d’utilisation en heures pleines et leur prix, un autre avec les heures creuses. Additionnez les deux coûts.",
      },
      {
        pregunta: "Pourquoi ma facture ne correspond-elle pas exactement ?",
        respuesta: "La facture ajoute l’abonnement, les taxes et parfois des prix différents selon l’heure. Ce calcul montre seulement ce que consomme l’appareil.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "L’unité de puissance : l’énergie qu’un appareil utilise à chaque seconde." },
      { termino: "Kilowattheure (kWh)", definicion: "1000 W pendant une heure. C’est ce que vous payez sur la facture." },
      { termino: "Abonnement", definicion: "La part fixe de la facture, payée quelle que soit la consommation." },
    ],
  };
};
