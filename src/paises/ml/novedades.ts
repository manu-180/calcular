import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ml.its-bareme-confirme-2025",
    fecha: "2026-10-27",
    titulo: "Le barème de l'ITS reste celui de l'article 10 du CGI",
    texto:
      "Une grille différente figurait par erreur dans une annexe de la loi de finances 2024. La DGI a précisé que cette annexe concerne les dépenses fiscales et que l'article 10 du Code général des impôts reste inchangé.",
    calculadoras: ["ml.calcul-its", "ml.calcul-salaire-net"],
    fuente: {
      organismo: "DGI",
      titulo: "Impôt Com n° 38 (décembre 2025), consultation fiscale sur la grille de l'ITS",
      url: "https://www.dgi.gouv.ml/wp-content/uploads/2025/12/IMPOT_COM-38.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
