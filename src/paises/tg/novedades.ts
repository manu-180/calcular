import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "tg.loi-de-finances-2026",
    fecha: "2026-10-27",
    titulo: "Loi de finances 2026 : pas de changement pour l'IRPP sur salaires, la TVA ni la TPU",
    texto:
      "L'aperçu des modifications du Code général des impôts publié par l'OTR dans son Cahier fiscal 2026 porte notamment sur le minimum forfaitaire de perception, la TVA non déductible et les droits d'enregistrement. Le barème de l'IRPP, le taux de la TVA, celui de l'impôt sur les sociétés et la TPU restent inchangés.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["tg.calcul-irpp", "tg.calcul-salaire-net", "tg.calcul-tva", "tg.impot-sur-les-societes", "tg.taxe-professionnelle-unique"],
    fuente: {
      organismo: "Office Togolais des Recettes (OTR)",
      titulo: "Cahier fiscal 2026 : aperçu des modifications du CGI et du LPF",
      url: "https://otr.tg/index.php/fr/impots/reglementations-fiscales/code-general-des-impots/628-cahier-fiscal-2026/file.html",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "tg.amu-cnss-2024",
    fecha: "2026-10-27",
    titulo: "Assurance maladie universelle : 5 % retenus sur le salaire depuis 2024",
    texto:
      "Depuis le 1er janvier 2024, la CNSS gère l'assurance maladie universelle des salariés du privé. La cotisation est de 10 % de la rémunération, partagée à parts égales entre l'employeur et le travailleur.",
    vigenteDesde: "2024-01-01",
    calculadoras: ["tg.calcul-salaire-net", "tg.cotisations-cnss", "tg.cout-employeur"],
    fuente: {
      organismo: "CNSS Togo",
      titulo: "Conditions générales de l'assurance maladie universelle obligatoire (CGAMU)",
      url: "https://cnss.tg/espace-assures/assurance-maladie-universelle/amu-conditions-generales-dacces-cgamu/",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
