import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.bareme-kilometrique",
  h1: "Barème kilométrique 2026 : calcul des frais réels",
  title: "Barème kilométrique 2026 : calcul des frais kilométriques",
  description:
    "Calculez vos frais kilométriques avec le barème fiscal applicable aux revenus 2025 : selon la puissance (CV), les kilomètres et le barème des voitures électriques.",
  intro: [
    "Si vous déclarez vos frais professionnels au réel plutôt que la déduction forfaitaire de 10 %, vous pouvez évaluer vos frais de voiture avec le barème kilométrique publié par l'administration fiscale.",
    "Le barème dépend de la puissance fiscale du véhicule (en chevaux fiscaux, CV) et des kilomètres parcourus pour le travail dans l'année.",
  ],
  comoSeCalcula: [
    "Jusqu'à 5 000 km : distance × coefficient de la puissance (par exemple {{fr.bk-jusqua-5000[cv5]}} pour 5 CV).",
    "De 5 001 à 20 000 km : distance × coefficient, plus un montant fixe (par exemple {{fr.bk-5001-20000-fixe[cv5]}} pour 5 CV).",
    "Au-delà de 20 000 km : distance × coefficient (par exemple {{fr.bk-plus-20000[cv5]}} pour 5 CV).",
    "Voiture 100 % électrique : un barème spécifique s'applique, environ 20 % plus élevé (par exemple {{fr.bk-elec-jusqua-5000[cv5]}} par kilomètre pour 5 CV jusqu'à 5 000 km).",
  ],
  ejemplo: [
    "Avec une voiture de 5 CV et 8 000 km professionnels dans l'année : 8 000 × 0,357 + 1 395 = 4 251 € de frais déductibles.",
  ],
  faq: [
    {
      pregunta: "Que couvre le barème kilométrique ?",
      respuesta:
        "La dépréciation du véhicule, l'entretien, les pneus, le carburant et l'assurance. Les frais de péage et de stationnement peuvent s'ajouter s'ils sont justifiés.",
    },
    {
      pregunta: "Quels trajets compter ?",
      respuesta:
        "Les trajets entre le domicile et le travail, en principe dans la limite de 40 km par trajet sauf circonstances particulières, et les déplacements professionnels non remboursés par l'employeur.",
    },
    {
      pregunta: "Que faire si ma voiture fait plus de 7 CV ?",
      respuesta: "Le barème s'arrête à 7 CV : un véhicule plus puissant utilise la ligne « 7 CV et plus ».",
    },
  ],
  glosario: [
    { termino: "CV", definicion: "Cheval fiscal, la puissance administrative indiquée sur la carte grise." },
    { termino: "Frais réels", definicion: "Déduction des dépenses professionnelles réelles, au lieu de la déduction forfaitaire de 10 %." },
  ],
});
