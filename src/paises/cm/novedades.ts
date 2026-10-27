import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "cm.cgi-2026",
    fecha: "2026-10-26",
    titulo: "Le Code général des impôts 2026 est en ligne",
    texto:
      "La DGI publie l'édition officielle du Code général des impôts mise à jour au 1er janvier 2026. Les calculs d'IRPP, de TVA, d'impôt sur les sociétés et d'impôt général synthétique la suivent.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cm.calcul-irpp", "cm.calcul-salaire-net", "cm.calcul-tva"],
    fuente: {
      organismo: "Direction générale des impôts (DGI)",
      titulo: "Code général des impôts, édition officielle 2026",
      url: "https://www.impots.cm/sites/default/files/documents/CODE%20GENERAL%20DES%20IMPOTS%202026%20SITE%20DGI%20VERSION%20FRANCAISE.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
