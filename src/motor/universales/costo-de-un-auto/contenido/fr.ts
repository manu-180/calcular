import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mile" : "kilomètre";
  return {
    h1: "Calcul du coût réel d’une voiture",
    title: tituloQueEntre(`Calcul du coût réel d’une voiture (${ctx.nombrePais})`, "Calcul du coût réel d’une voiture", "Coût réel d’une voiture"),
    description: `Calculez ce que votre voiture vous coûte vraiment par mois, par an et au ${unidad} : carburant, assurance, entretien, stationnement et décote.`,
    intro: [
      "On sait en général ce qu’on dépense en carburant. On additionne rarement l’assurance, l’entretien, le stationnement et surtout la valeur que la voiture perd chaque année.",
      "Remplissez vos frais : vous voyez ce que votre voiture vous coûte vraiment. De quoi décider s’il faut acheter, changer ou se déplacer autrement.",
    ],
    comoSeCalcula: [
      imperial
        ? "Carburant par mois = miles par mois ÷ miles par gallon × prix du gallon."
        : "Carburant par mois = kilomètres par mois × litres aux 100 km ÷ 100 × prix du litre.",
      "Perte de valeur par mois = valeur de la voiture × perte annuelle ÷ 12.",
      "Coût réel = carburant + assurance + entretien + stationnement + autres frais + perte de valeur.",
      `Coût au ${unidad} = coût réel mensuel ÷ distance parcourue dans le mois.`,
    ],
    ejemplo: [
      `Une voiture d’une valeur de ${m(g.precio)} qui roule ${formatearNumero(ctx, g.distancia)} ${imperial ? "miles" : "km"} par mois coûte ${m(mensual)} par mois, perte de valeur comprise.`,
      `Cela fait ${m(mensual * 12)} par an et ${formatearMonto(ctx, mensual / g.distancia)} au ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Qu’est-ce que la décote d’une voiture ?",
        respuesta: "C’est la valeur qu’une voiture perd avec le temps. Vous ne la payez pas chaque mois, mais vous la sentez à la revente. C’est souvent le plus gros coût d’une voiture neuve.",
      },
      {
        pregunta: "Pourquoi la mensualité du crédit n’est-elle pas ajoutée ?",
        respuesta: "Une partie de la mensualité paie la voiture elle-même, déjà comptée dans la perte de valeur. Additionner les deux compterait la voiture deux fois. Les intérêts du crédit sont un coût en plus.",
      },
      {
        pregunta: "Comment réduire le coût de sa voiture ?",
        respuesta: "Comparez votre assurance chaque année, surveillez la pression des pneus et l’entretien, et évitez de changer souvent de voiture : c’est les premières années qu’elle perd le plus de valeur.",
      },
    ],
    glosario: [
      { termino: "Décote", definicion: "La valeur qu’une voiture perd avec le temps et l’usage." },
      { termino: `Coût au ${unidad}`, definicion: `Le coût moyen de chaque ${unidad} parcouru, tous frais compris.` },
    ],
  };
};
