import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Rembourser sa carte de crédit",
    title: tituloQueEntre(`Rembourser sa carte de crédit : durée et intérêts (${ctx.nombrePais})`, `Rembourser sa carte de crédit (${ctx.nombrePais})`, "Rembourser sa carte de crédit"),
    description: "Découvrez en combien de mois vous remboursez votre carte de crédit et combien d’intérêts vous payez, avec un montant fixe ou le minimum.",
    intro: [
      "Le solde d’une carte de crédit (ou d’un crédit renouvelable) est souvent la dette la plus chère. Ne payer que le minimum l’étire sur des années et fait grimper les intérêts.",
      "Saisissez le solde, le taux annuel et ce que vous pouvez payer chaque mois. Vous voyez quand vous aurez fini, les intérêts payés et le plan mois par mois.",
    ],
    comoSeCalcula: [
      "Chaque mois, les intérêts s’ajoutent : solde × taux annuel ÷ 12.",
      "Puis le paiement est déduit. Avec le minimum, le paiement est un pourcentage de ce que vous devez, avec un plancher.",
      "On recommence jusqu’à ce que le solde tombe à zéro. Si le paiement ne dépasse pas les intérêts, la dette ne baisse jamais.",
    ],
    ejemplo: [
      `Un solde de ${m(saldo)} à 22 % par an, remboursé ${m(fijo)} par mois, est soldé en ${conFijo.meses} mois avec ${m(conFijo.intereses)} d’intérêts.`,
      `En ne payant qu’un minimum de 3 %, il faut ${conMinimo.meses} mois et les intérêts montent à ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Que se passe-t-il si je ne paie que le minimum ?",
        respuesta: "Le minimum baisse en même temps que le solde : vous payez moins chaque mois et la dette traîne des années. Si vous le pouvez, payez un montant fixe plus élevé, même un peu.",
      },
      {
        pregunta: "Faut-il remplacer ce solde par un prêt personnel ?",
        respuesta: "Si le taux du prêt est nettement plus bas que celui de la carte, c’est en général rentable. Comparez le total des intérêts des deux options, frais compris.",
      },
      {
        pregunta: "Quelle carte rembourser en premier ?",
        respuesta: "Payez le minimum sur toutes et mettez le reste sur celle qui a le taux le plus élevé. Vous payez ainsi le moins d’intérêts possible au total.",
      },
    ],
    glosario: [
      { termino: "Paiement minimum", definicion: "Le plus petit montant à payer chaque mois pour éviter des pénalités. Il ne suffit pas à rembourser la dette." },
      { termino: "Crédit renouvelable", definicion: "Une réserve d’argent que l’on peut réutiliser à mesure qu’on la rembourse, souvent liée à une carte." },
    ],
  };
};
