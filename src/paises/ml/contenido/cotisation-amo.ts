import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.cotisation-amo",
  h1: "Calcul de la cotisation AMO au Mali",
  title: "Cotisation AMO Mali : part salarié et part employeur",
  description: "Calculez la cotisation à l'Assurance maladie obligatoire (AMO) au Mali : {{ml.amo-taux[salarie]}} retenus sur le salaire et la part de l'employeur.",
  intro: [
    "Au Mali, l'Assurance maladie obligatoire (AMO) couvre les salariés, les fonctionnaires et leurs familles. Elle est financée par une cotisation partagée entre le salarié et l'employeur.",
    "Indiquez le salaire brut soumis à cotisation et le type d'employeur. Vous obtenez la part retenue sur le salaire et la part payée par l'employeur.",
  ],
  comoSeCalcula: [
    "Le salarié cotise {{ml.amo-taux[salarie]}} de son salaire. L'employeur privé paie {{ml.amo-taux[employeur-prive]}}, l'État ou une collectivité territoriale {{ml.amo-taux[employeur-public]}}.",
    "La cotisation porte sur le salaire de base et les primes et indemnités imposables, sans les remboursements de frais ni les prestations familiales. Le salaire retenu ne peut pas être inférieur au SMIG ({{ml.smig}}).",
  ],
  ejemplo: ["Pour un salaire de 200 000 F dans le privé, 6 120 F sont retenus sur le salaire et l'employeur paie 7 000 F, soit 13 120 F au total."],
  faq: [
    {
      pregunta: "La cotisation AMO réduit-elle l'ITS ?",
      respuesta: "Non. La DGI considère que les cotisations AMO ne sont pas déductibles de la base de l'impôt sur les traitements et salaires.",
    },
    {
      pregunta: "Pourquoi la part de l'employeur privé est-elle de {{ml.amo-taux[employeur-prive]}} ?",
      respuesta: "Le décret de 2010 précise que ce taux intègre les 2 % que les employeurs versaient déjà à l'INPS pour la branche maladie avant la création de l'AMO.",
    },
    {
      pregunta: "Combien paient les retraités ?",
      respuesta: "Les pensionnés et les veuves de pensionnés cotisent 0,75 %, et les assurés volontaires 6,56 %, selon le même décret.",
    },
  ],
  glosario: [
    { termino: "AMO", definicion: "Assurance maladie obligatoire, instituée par la loi n° 09-015 du 26 juin 2009." },
    { termino: "Assiette", definicion: "Le montant de salaire sur lequel on applique le taux de cotisation." },
  ],
});
