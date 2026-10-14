import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const francia = ctx.pais === "FR";
  const seuil = francia ? 35 : 40;
  const majoration = francia ? 25 : 50;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:30", "18:00", 60) / 60;
  const extra = larga * 5 - seuil;
  return {
    h1: "Calcul des heures travaillées",
    title: tituloQueEntre(`Calcul des heures travaillées et supplémentaires (${ctx.nombrePais})`, `Calcul des heures travaillées (${ctx.nombrePais})`, "Calcul des heures travaillées"),
    description: "Additionnez vos heures de la semaine à partir des heures de début, de fin et des pauses, et calculez votre paie, heures supplémentaires comprises.",
    intro: [
      "Choisissez l’heure de début et de fin de chaque jour, votre pause non payée et votre taux horaire. Vous voyez le total d’heures, les heures supplémentaires et la paie de la semaine.",
      "Pratique pour vérifier une fiche de paie, remplir une feuille de temps ou facturer un travail à l’heure.",
    ],
    comoSeCalcula: [
      "Heures du jour = fin − début − pause. Si la fin est avant le début, la journée se termine le lendemain.",
      "Heures supplémentaires = total de la semaine − heures normales, quand le total les dépasse.",
      "Paie = heures normales × taux horaire + heures supplémentaires × taux horaire × (1 + majoration).",
    ],
    ejemplo: [
      `De ${hora("09:00")} à ${hora("17:30")} avec 30 minutes de pause, cela fait ${n(jornada)} heures par jour. Du lundi au vendredi, ${n(jornada * 5)} heures : à ${m(pago)} de l’heure, ${m(jornada * 5 * pago)}.`,
      `De ${hora("08:30")} à ${hora("18:00")} avec une heure de pause, cela fait ${n(larga * 5, 1)} heures dans la semaine, dont ${n(extra, 1)} au-delà de ${seuil} heures. Majorées de ${majoration} %, la semaine rapporte ${m(seuil * pago + extra * pago * (1 + majoration / 100))}.`,
    ],
    faq: [
      {
        pregunta: "Comment calculer ses heures travaillées ?",
        respuesta: "Retirez l’heure de début de l’heure de fin, puis la pause. Additionnez ensuite tous les jours de la semaine.",
      },
      {
        pregunta: "Comment convertir des minutes en heures décimales ?",
        respuesta: `Divisez les minutes par 60. Une demi-heure fait ${n(0.5, 1)} ; 15 minutes, ${n(0.25, 2)} ; 45 minutes, ${n(0.75, 2)}. Ainsi, 7 h 45 font ${n(7.75, 2)} heures.`,
      },
      {
        pregunta: "Comment sont payées les heures supplémentaires ?",
        respuesta: francia
          ? "En France, sauf accord d’entreprise, elles commencent au-delà de 35 heures par semaine : +25 % pour les 8 premières, puis +50 %. Ce calculateur applique une seule majoration, celle que vous saisissez."
          : "Cela dépend de la loi du pays et de votre contrat. Ce calculateur applique la majoration et les heures normales que vous saisissez, sans règle particulière.",
      },
    ],
    glosario: [
      { termino: "Heures supplémentaires", definicion: "Les heures travaillées au-delà de la durée normale, payées plus cher." },
      { termino: "Majoration", definicion: "Le pourcentage ajouté au taux horaire pour chaque heure supplémentaire." },
    ],
  };
};
