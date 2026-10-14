import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Calcul du TJM et du taux horaire freelance",
    title: tituloQueEntre(`Calcul du TJM et du taux horaire freelance (${ctx.nombrePais})`, `Calcul du TJM freelance (${ctx.nombrePais})`, "Calcul du TJM freelance"),
    description: "Calculez votre taux horaire et votre TJM d’indépendant selon ce que vous voulez gagner, vos frais, vos impôts, vos congés et vos heures facturables.",
    intro: [
      `L’erreur la plus courante en freelance : prendre le salaire qu’on aurait ${ctx.pais === "FR" ? "en CDI et le diviser par 151 heures" : "comme salarié et le diviser par les heures d’un mois"}. On oublie alors les cotisations, les frais, les congés et toutes les heures qu’on ne peut pas facturer.`,
      "Ce calculateur part de ce que vous voulez gagner net et vous dit combien facturer pour y arriver.",
    ],
    comoSeCalcula: [
      "Chiffre d’affaires nécessaire = revenu net ÷ (1 − taux d’impôts et cotisations) + frais professionnels.",
      "Jours travaillés = 52 semaines × jours par semaine − jours non travaillés.",
      "Heures facturables par an = jours travaillés × heures facturables par jour.",
      "Taux horaire = chiffre d’affaires nécessaire ÷ heures facturables par an.",
    ],
    ejemplo: [
      `Pour gagner ${m(ingreso)} net par an, avec ${m(gastos)} de frais et 25 % d’impôts et cotisations, il faut facturer ${m(r.facturado)}.`,
      `Avec 30 jours non travaillés et 25 heures facturables par semaine, cela fait ${formatearNumero(ctx, Math.round(r.horas))} heures par an : un taux de ${m(r.hora)} de l’heure, soit un TJM de ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Combien d’heures par semaine peut-on facturer ?",
        respuesta: "Moins que ce qu’on travaille. Prospection, e-mails, facturation et formation prennent du temps que personne ne paie. 20 à 30 heures facturables sur 40, c’est courant.",
      },
      {
        pregunta: "Faut-il facturer à l’heure, à la journée ou au forfait ?",
        respuesta: "Les trois fonctionnent. Même au forfait, estimez le nombre d’heures ou de jours et multipliez par ce tarif pour ne pas être perdant.",
      },
      {
        pregunta: "Quel taux d’impôts et de cotisations retenir ?",
        respuesta: ctx.pais === "FR"
          ? "Cela dépend de votre statut (micro-entreprise, EI, société) et de votre activité. Additionnez cotisations sociales et impôt sur le revenu. Dans le doute, demandez à un expert-comptable."
          : "Cela dépend de votre pays et de votre statut. Additionnez cotisations sociales et impôt sur le revenu. Dans le doute, demandez à un comptable.",
      },
    ],
    glosario: [
      { termino: "TJM", definicion: "Taux journalier moyen : ce que vous facturez pour une journée de travail." },
      { termino: "Heures facturables", definicion: "Les heures de travail que vous facturez à un client." },
    ],
  };
};
