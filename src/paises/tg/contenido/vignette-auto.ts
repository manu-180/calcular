import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.vignette-auto",
  h1: "Vignette auto au Togo : taxe sur les véhicules à moteur",
  title: "Vignette Togo : tarif de la taxe sur les véhicules (TVM)",
  description:
    "Trouvez le tarif de la vignette au Togo selon le véhicule et sa puissance fiscale : de {{tg.tvm-tarifs[p-moins-5]}} à {{tg.tvm-tarifs[m-plus-20]}} par an.",
  intro: [
    "La taxe sur les véhicules à moteur (TVM), appelée vignette, est due chaque année par le propriétaire ou le possesseur du véhicule.",
    "Choisissez le type de véhicule et sa puissance fiscale, inscrite sur la carte grise, pour connaître le montant à payer.",
  ],
  comoSeCalcula: [
    "Pour une voiture de transport de personnes, le tarif va de {{tg.tvm-tarifs[p-moins-5]}} sous 5 CV à {{tg.tvm-tarifs[p-plus-20]}} au-delà de 20 CV.",
    "Pour un véhicule de marchandises, il va de {{tg.tvm-tarifs[m-moins-5]}} à {{tg.tvm-tarifs[m-plus-20]}}. Les transporteurs routiers à la TPU ont une réduction de {{tg.tvm-reduction-tpu}}.",
    "Une motocyclette de plus de 125 cm3 paie {{tg.tvm-tarifs[moto-125]}} et une motocyclette à trois roues {{tg.tvm-tarifs[moto-3-roues]}}, une seule fois à l'immatriculation.",
  ],
  ejemplo: ["Une voiture de 9 CV paie 15 000 F de vignette pour l'année."],
  faq: [
    {
      pregunta: "Comment prouver que la vignette est payée ?",
      respuesta:
        "Par la quittance ou par le certificat de visite technique, qui doit mentionner le paiement et être apposé sur le véhicule.",
    },
    {
      pregunta: "J'ai acheté le véhicule en cours d'année : dois-je payer l'année entière ?",
      respuesta:
        "Non pour les véhicules autres que les motocyclettes : la taxe est calculée au prorata du temps. Si le vendeur l'a déjà payée, vous en êtes dispensé jusqu'à la prochaine échéance.",
    },
    {
      pregunta: "La vignette est-elle déductible pour une entreprise ?",
      respuesta: "Non. Elle n'est pas déductible du bénéfice imposable à l'IS ou à l'IRPP sur les revenus d'affaires.",
    },
  ],
  glosario: [
    { termino: "TVM", definicion: "Taxe sur les véhicules à moteur, ou vignette." },
    { termino: "Puissance fiscale", definicion: "La puissance administrative du véhicule, en chevaux fiscaux (CV), inscrite sur la carte grise." },
  ],
});
