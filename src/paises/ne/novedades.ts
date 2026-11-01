import type { Fuente, Novedad } from "@/motor/tipos";

const LOI_FINANCES: Fuente = {
  organismo: "Ministère des Finances du Niger",
  titulo: "Ordonnance n° 2025-44 du 31 décembre 2025 portant loi de finances pour l'année budgétaire 2026",
  url: "https://finances.gouv.ne/index.php/lois-de-finances/file/1303-ordonnance-n-2025-44",
  tipo: "primaria",
  verificadoEl: "2026-10-29",
};

export const novedades: readonly Novedad[] = [
  {
    id: "ne.its-bareme-2026",
    fecha: "2026-01-10",
    titulo: "Impôt sur les salaires : un barème mensuel en neuf tranches, de 1 % à 35 %",
    texto:
      "La loi de finances 2026 réécrit l'article 150 du Code général des impôts. Le barème mensuel de l'ITS compte neuf tranches, de 1 % jusqu'à 25 000 F à 35 % au-delà de 1 000 000 F.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ne.calcul-its"],
    fuente: LOI_FINANCES,
  },
  {
    id: "ne.taxe-depots-transferts-2026",
    fecha: "2026-01-10",
    titulo: "Une taxe de 0,5 % sur les dépôts et transferts d'argent, dont le mobile money",
    texto:
      "La loi de finances 2026 crée la taxe sur les dépôts et transferts d'argent. Elle vise les agences de transfert, le mobile money et les plateformes de services financiers, au taux de 0,5 %, porté à 5 % au-dessus de 2 000 000 F.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ne.taxe-transferts-argent"],
    fuente: LOI_FINANCES,
  },
  {
    id: "ne.taxe-paiements-numeraire-2026",
    fecha: "2026-01-10",
    titulo: "Une taxe de 1 % sur les paiements en numéraire au-dessus de 100 000 F",
    texto:
      "La loi de finances 2026 crée une taxe de 1 % sur les paiements en numéraire collectée par les entreprises au régime réel. Les paiements de 100 000 F ou moins et ceux des impôts et taxes en sont exonérés.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ne.taxe-paiements-numeraire"],
    fuente: LOI_FINANCES,
  },
  {
    id: "ne.droits-fonciers-2026",
    fecha: "2026-01-10",
    titulo: "Droits de publicité foncière : l'article 1041 est réécrit",
    texto:
      "Depuis le 1er janvier 2026, la mutation totale d'un terrain coûte 1 % du prix, l'immatriculation 2 % en zone d'habitat et 3 % en zone industrielle ou commerciale, et l'hypothèque 1,5 % des sommes convenues.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ne.droits-conservation-fonciere"],
    fuente: LOI_FINANCES,
  },
];
