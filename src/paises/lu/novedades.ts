import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "lu.tranche-indiciaire-juin-2026",
    fecha: "2026-10-16",
    titulo: "Tranche indiciaire au 1er juin 2026 : salaires et minima relevés de 2,5 %",
    texto:
      "Depuis le 1er juin 2026, le nombre indice applicable est de 992,24. Le salaire social minimum non qualifié passe à 2.771,33 euros par mois, le maximum cotisable à 13.856,63 euros et l'allocation familiale à 315,04 euros par enfant.",
    vigenteDesde: "2026-06-01",
    calculadoras: ["lu.salaire-brut-net", "lu.salaire-social-minimum", "lu.allocations-familiales", "lu.indexation-salaires"],
    fuente: {
      organismo: "Centre commun de la sécurité sociale",
      titulo: "Paramètres sociaux",
      url: "https://ccss.public.lu/fr/parametres-sociaux.html",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "lu.pension-17-2026",
    fecha: "2026-10-16",
    titulo: "Cotisation pension portée à 17 % en 2026",
    texto: "En 2026, le taux de cotisation à l'assurance pension passe de 16 à 17 %, partagé à parts égales entre le salarié et l'employeur.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["lu.salaire-brut-net", "lu.cotisations-sociales", "lu.cout-employeur"],
    fuente: {
      organismo: "Centre commun de la sécurité sociale",
      titulo: "Paramètres sociaux, taux de cotisation",
      url: "https://ccss.public.lu/fr/parametres-sociaux.html",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
