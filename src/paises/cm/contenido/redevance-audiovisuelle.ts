import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.redevance-audiovisuelle",
  h1: "Calcul de la redevance audiovisuelle (CRTV)",
  title: "Redevance audiovisuelle CRTV : montant retenu sur salaire",
  description:
    "Trouvez la redevance CRTV retenue sur votre salaire : un montant fixe par tranche, de {{cm.rav-bareme[1].cuotaFija}} à {{cm.rav-bareme[-1].cuotaFija}} par mois.",
  intro: [
    "La redevance audiovisuelle finance la CRTV. L'employeur la retient chaque mois sur le salaire et la reverse au Trésor.",
    "Son montant ne dépend pas d'un taux : c'est un forfait fixé par tranche de salaire brut.",
  ],
  comoSeCalcula: [
    "Jusqu'à {{cm.rav-bareme[0].hasta}} de brut par mois, rien n'est retenu.",
    "Ensuite le forfait monte par tranche : {{cm.rav-bareme[1].cuotaFija}} jusqu'à {{cm.rav-bareme[1].hasta}}, {{cm.rav-bareme[2].cuotaFija}} jusqu'à {{cm.rav-bareme[2].hasta}}, puis par tranches de 100 000 F.",
    "Au-dessus de {{cm.rav-bareme[-2].hasta}}, la redevance est de {{cm.rav-bareme[-1].cuotaFija}} par mois.",
  ],
  ejemplo: ["Avec 250 000 F bruts, la redevance est de 3 250 F par mois, soit 39 000 F sur l'année."],
  faq: [
    {
      pregunta: "Qui ne paie pas la redevance audiovisuelle ?",
      respuesta: "Les pensions et rentes viagères, les salaires du personnel domestique et ceux des ouvriers des exploitations agricoles ou pastorales en sont exonérés.",
    },
    {
      pregunta: "Sur quel salaire se calcule-t-elle ?",
      respuesta: "Sur le montant brut des salaires perçus dans le mois, primes comprises.",
    },
    {
      pregunta: "Les commerçants la paient-ils aussi ?",
      respuesta: "Oui, mais autrement. Pour les redevables de la patente, la redevance annuelle est égale au principal de la patente.",
    },
  ],
  glosario: [{ termino: "CRTV", definicion: "Office de radiodiffusion télévision camerounaise, bénéficiaire de la redevance." }],
});
