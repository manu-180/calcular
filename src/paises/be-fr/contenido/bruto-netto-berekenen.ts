import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.bruto-netto-berekenen",
  h1: "Calcul du salaire brut en net en Belgique",
  title: "Calcul salaire brut net 2026 : votre salaire net en Belgique",
  description:
    "Calculez votre salaire net à partir du brut : cotisations ONSS, bonus à l'emploi, précompte professionnel et cotisation spéciale, selon les règles officielles.",
  intro: [
    "De votre salaire brut, on retire d'abord vos cotisations personnelles ONSS. Le reste est votre salaire imposable. Votre employeur y retient le précompte professionnel, une avance sur vos impôts, et une petite cotisation spéciale de sécurité sociale.",
    "Indiquez votre salaire mensuel brut, choisissez employé ou ouvrier et votre situation familiale. Vous voyez tout de suite ce qui arrive sur votre compte et où passe la différence.",
  ],
  comoSeCalcula: [
    "ONSS : {{be.rsz-werknemer}} de votre salaire brut. Pour les ouvriers, sur 108 % du brut, parce que leur pécule de vacances passe par l'ONVA ou une caisse de vacances.",
    "Bonus à l'emploi : avec un bas salaire, vous recevez une réduction de ces cotisations ONSS. Plus le salaire est bas, plus la réduction est grande, jusqu'au montant total des cotisations.",
    "Précompte professionnel : nous appliquons la formule-clé du SPF Finances. Le salaire imposable est converti en montant annuel, on retire les frais professionnels forfaitaires, on applique l'impôt par tranche, puis on déduit la quotité exemptée d'impôt et les réductions pour enfants. Le résultat est divisé par 12.",
    "Avec un salaire plus bas, un bonus à l'emploi fiscal est aussi déduit du précompte professionnel.",
    "Cotisation spéciale de sécurité sociale : un montant trimestriel qui dépend de votre salaire et de votre situation familiale, retenu chaque mois.",
  ],
  ejemplo: [
    "Un employé isolé avec 3.500 € bruts par mois paie 457,45 € de cotisations ONSS. Son salaire imposable est de 3.042,55 €. On y retire 617,41 € de précompte professionnel et 24,74 € de cotisation spéciale. Il reste 2.400,40 € nets.",
  ],
  faq: [
    {
      pregunta: "Pourquoi ma fiche de paie est-elle différente ?",
      respuesta:
        "Votre fiche de paie contient souvent des éléments qui ne sont pas repris ici : chèques-repas, voiture de société, heures supplémentaires, assurance groupe ou prime de fin d'année. Le calcul suppose aussi un mois complet à temps plein.",
    },
    {
      pregunta: "Le précompte professionnel est-il mon impôt définitif ?",
      respuesta:
        "Non. C'est une avance. Votre impôt des personnes physiques est calculé avec votre déclaration. Vous êtes alors remboursé ou vous payez un supplément, par exemple parce que votre commune applique une autre taxe communale additionnelle.",
    },
    {
      pregunta: "Qu'est-ce que le bonus à l'emploi ?",
      respuesta:
        "Une réduction de vos cotisations personnelles ONSS quand votre salaire est bas. Il a deux volets : un pour les bas salaires et un pour les très bas salaires. S'y ajoute un bonus à l'emploi fiscal sur votre précompte professionnel.",
    },
    {
      pregunta: "Pourquoi les cotisations d'un ouvrier sont-elles plus élevées ?",
      respuesta:
        "Pour les ouvriers, les cotisations sont calculées sur 108 % du salaire brut. Les cotisations sur le simple pécule de vacances, que l'ONVA ou une caisse de vacances verse, sont ainsi retenues à l'avance.",
    },
  ],
  glosario: [
    { termino: "ONSS", definicion: "Office national de sécurité sociale. Les cotisations personnelles financent votre pension, l'assurance maladie et le chômage." },
    { termino: "Précompte professionnel", definicion: "L'avance sur votre impôt des personnes physiques que votre employeur retient chaque mois." },
    { termino: "Salaire imposable", definicion: "Votre salaire brut moins vos cotisations personnelles ONSS. Le précompte professionnel est calculé dessus." },
    { termino: "Cotisation spéciale de sécurité sociale", definicion: "Une cotisation supplémentaire qui dépend de votre salaire et de votre situation familiale, régularisée avec votre déclaration d'impôt." },
  ],
});
