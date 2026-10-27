import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "mg.irsa-tranche-25-2026",
    fecha: "2026-10-27",
    titulo: "IRSA : une tranche à 25 % au-delà de 4 000 000 Ar par mois",
    texto: "Depuis la loi de finances initiale 2026, la part du salaire imposable mensuel qui dépasse 4 000 000 Ar est taxée à 25 % au lieu de 20 %. Les tranches inférieures ne changent pas.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mg.calcul-irsa"],
    fuente: {
      organismo: "Direction générale des impôts (DGI)",
      titulo: "Code des impôts mis à jour suivant la loi de finances initiale 2026, article 01.03.16",
      url: "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
