import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.taxe-developpement-local",
  h1: "Calcul de la taxe de développement local",
  title: "Taxe de développement local (TDL) sur salaire",
  description:
    "Calculez la taxe de développement local d'un salarié : de {{cm.tdl-bareme[1].cuotaFija}} à {{cm.tdl-bareme[-1].cuotaFija}} par an selon le salaire de base, retenue par mois.",
  intro: [
    "La taxe de développement local (TDL) revient à la commune. Elle finance l'éclairage public, l'assainissement, l'eau ou l'enlèvement des ordures.",
    "Pour un salarié, c'est un montant annuel fixé selon le salaire de base mensuel. L'employeur le retient avec l'IRPP.",
  ],
  comoSeCalcula: [
    "La première tranche commence à {{cm.tdl-bareme[1].desde}} de salaire de base et coûte {{cm.tdl-bareme[1].cuotaFija}} par an.",
    "La taxe monte par tranches jusqu'à {{cm.tdl-bareme[-1].cuotaFija}} par an pour un salaire de base supérieur à {{cm.tdl-bareme[-2].hasta}}.",
    "La retenue du mois est le douzième du montant annuel.",
  ],
  ejemplo: ["Avec 150 000 F de salaire de base, la taxe est de 12 000 F par an, soit 1 000 F par mois."],
  faq: [
    {
      pregunta: "Pourquoi le salaire de base et pas le brut ?",
      respuesta: "La loi sur la fiscalité locale fixe les tranches sur le salaire de base mensuel. Les primes et indemnités ne comptent pas.",
    },
    {
      pregunta: "Les commerçants paient-ils la même taxe ?",
      respuesta: "Non. Pour les redevables de la patente, la taxe dépend du principal de la patente, avec un autre barème.",
    },
    {
      pregunta: "Un salaire très bas paie-t-il la taxe ?",
      respuesta: "Non. Le barème des salariés commence à {{cm.tdl-bareme[1].desde}} de salaire de base par mois.",
    },
  ],
  glosario: [{ termino: "Salaire de base", definicion: "Le salaire fixe prévu au contrat, sans primes, indemnités ni avantages." }],
});
