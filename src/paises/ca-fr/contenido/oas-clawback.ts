import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.oas-clawback",
  h1: "Calcul de l'impôt de récupération de la Sécurité de la vieillesse",
  title: "Récupération de la pension de la SV {{anio}} : calcul",
  description: "Voyez combien de pension de la Sécurité de la vieillesse vous remboursez quand votre revenu dépasse {{ca.oas-recovery-threshold[{{anio}}]}} ({{anio}}) : {{ca.oas-recovery-rate}} de l'excédent.",
  intro: [
    "Si votre revenu net mondial dépasse le seuil de l'année, vous remboursez une partie ou la totalité de votre pension de la Sécurité de la vieillesse au moyen de l'impôt de récupération.",
    "Inscrivez l'année de revenu, votre revenu net mondial et la pension de la SV reçue pour voir l'impôt de récupération.",
  ],
  comoSeCalcula: [
    "On prend votre revenu net mondial de l'année et on soustrait le seuil de revenu minimal de récupération : {{ca.oas-recovery-threshold[2024]}} pour 2024, {{ca.oas-recovery-threshold[2025]}} pour 2025 et {{ca.oas-recovery-threshold[2026]}} pour 2026.",
    "L'impôt de récupération est de {{ca.oas-recovery-rate}} du montant qui dépasse le seuil.",
    "Il ne peut pas dépasser la pension de la SV que vous avez reçue.",
  ],
  ejemplo: [
    "Avec un revenu net mondial de 110 000 $ en 2026 et 8 800 $ de pension de la SV, vous dépassez le seuil de 14 677 $. L'impôt de récupération est de 2 201,55 $ : vous gardez donc 6 598,45 $.",
  ],
  faq: [
    {
      pregunta: "Quand la récupération est-elle faite?",
      respuesta: "Elle est calculée selon votre revenu d'une année et récupérée sur une période ultérieure de juillet à juin. Pour le revenu de 2026, la période de récupération va de juillet 2027 à juin 2028.",
    },
    {
      pregunta: "À partir de quel revenu perd-on toute la pension?",
      respuesta: "Cela dépend de votre âge et des montants de la SV de l'année. Pour la période de juillet 2026 à juin 2027, selon le revenu de 2025, toute la pension est récupérée à environ 152 062 $ de 65 à 74 ans, et à environ 157 923 $ à 75 ans et plus.",
    },
    {
      pregunta: "Quel est le taux de l'impôt de récupération?",
      respuesta: "{{ca.oas-recovery-rate}} de votre revenu net mondial au-delà du seuil.",
    },
  ],
  glosario: [
    { termino: "SV", definicion: "Sécurité de la vieillesse, une pension mensuelle pour les personnes de 65 ans et plus." },
    { termino: "Impôt de récupération", definicion: "Le nom officiel du remboursement de la pension de la SV quand le revenu est élevé." },
  ],
});
