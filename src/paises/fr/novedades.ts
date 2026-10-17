import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "fr.livret-a-aout-2026",
    fecha: "2026-10-14",
    titulo: "Le taux du livret A passe à 1,7 %",
    texto: "Depuis le 1er août 2026, le livret A rapporte 1,7 % par an, contre 1,5 % entre février et juillet. Le calcul des intérêts utilise déjà le nouveau taux.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["fr.interets-livret-a"],
    fuente: {
      organismo: "Service-Public.fr (DILA, Premier ministre)",
      titulo: "Livret A et LEP : évolution des taux au 1er août 2026",
      url: "https://www.service-public.gouv.fr/particuliers/actualites/A18000",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "fr.smic-juin-2026",
    fecha: "2026-10-14",
    titulo: "Le Smic augmente de 2,41 % au 1er juin 2026",
    texto: "Le Smic horaire brut passe à 12,31 €, soit 1 867,02 € par mois pour 35 heures. Les calculs du Smic, du salaire net et des indemnités journalières en tiennent compte.",
    vigenteDesde: "2026-06-01",
    calculadoras: ["fr.smic", "fr.salaire-brut-net", "fr.indemnites-journalieres"],
    fuente: {
      organismo: "Service-Public.fr (DILA, Premier ministre)",
      titulo: "Smic (salaire minimum interprofessionnel de croissance), fiche F2300",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "fr.taux-neutre-mai-2026",
    fecha: "2026-10-14",
    titulo: "Nouvelle grille des taux par défaut du prélèvement à la source",
    texto: "Une nouvelle grille des taux par défaut s'applique depuis le 1er mai 2026. Elle sert quand l'administration n'a pas de taux personnalisé pour vous.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["fr.prelevement-a-la-source"],
    fuente: {
      organismo: "DGFiP (BOFiP-Impôts)",
      titulo: "BOI-BAREME-000037 : grilles des taux par défaut du prélèvement à la source",
      url: "https://bofip.impots.gouv.fr/bofip/11255-PGP.html/identifiant=BOI-BAREME-000037-20260706",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
