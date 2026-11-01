import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.smig",
  h1: "SMIG au Mali",
  title: "SMIG Mali : salaire minimum mensuel et horaire",
  description: "Le SMIG au Mali est de {{ml.smig}} par mois et {{ml.smig-horaire}} de l'heure. Vérifiez si un salaire respecte le minimum légal, à temps plein ou partiel.",
  intro: [
    "Le salaire minimum interprofessionnel garanti (SMIG) est le plus petit salaire qu'un employeur peut verser au Mali, dans les secteurs agricole et non agricole.",
    "Indiquez le salaire mensuel et, pour un temps partiel, les heures du mois. Vous voyez s'il atteint le minimum légal.",
  ],
  comoSeCalcula: [
    "Depuis le {{ml.smig#desde}}, le SMIG est de {{ml.smig}} par mois et de {{ml.smig-horaire}} de l'heure.",
    "À temps plein, le salaire se compare au SMIG mensuel. À temps partiel, au SMIG horaire multiplié par les heures travaillées.",
  ],
  faq: [
    {
      pregunta: "Le SMIG est-il imposé ?",
      respuesta: "Non. Le décret qui le fixe prévoit que le SMIG n'est pas soumis à l'impôt sur les traitements et salaires.",
    },
    {
      pregunta: "Le SMIG comprend-il les primes ?",
      respuesta: "Le décret précise que ce montant intègre toutes les augmentations légales antérieures, y compris l'indemnité spéciale de solidarité.",
    },
    {
      pregunta: "Les cotisations peuvent-elles être calculées sous le SMIG ?",
      respuesta: "Non. Le salaire retenu pour les cotisations sociales ne peut jamais être inférieur au SMIG.",
    },
  ],
  glosario: [{ termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti." }],
});
