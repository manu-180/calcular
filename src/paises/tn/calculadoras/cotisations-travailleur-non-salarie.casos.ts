import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-travailleur-non-salarie";

const CNSS = "https://www.cnss.tn/web/non-salarie/non_sal_asset_services/-/asset_publisher/w1WU/content/non_sal-secteur_-non_agr1_cotisations?convention=false&categorie=1&secteur=1&champAppli=1&servActif=2" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Classe 1 : montant du tableau de la CNSS",
    origen: { tipo: "oficial", url: CNSS, detalle: "Assiette 1 600,200 ; cotisation 235,389 dinars par trimestre." },
    fecha: "2026-10-24",
    entrada: { classe: "classe-1", accidents: 0 },
    esperado: { trimestre: 235.389, assiette: 1600.2, securite: 235.389, accidents: 0, annee: 941.556 },
  },
  {
    nombre: "Classe 6 : montant du tableau de la CNSS",
    origen: { tipo: "oficial", url: CNSS, detalle: "Assiette 9 601,200 ; cotisation 1 412,337 dinars par trimestre." },
    fecha: "2026-10-24",
    entrada: { classe: "classe-6", accidents: 0 },
    esperado: { trimestre: 1412.337 },
  },
  {
    nombre: "Classe 10 avec accidents du travail à 1 %",
    origen: { tipo: "recalculado", detalle: "4 237,010 (tableau CNSS) + 1 % de 28 803,600 = 288,036." },
    fecha: "2026-10-24",
    entrada: { classe: "classe-10", accidents: 1 },
    esperado: { securite: 4237.01, accidents: 288.036, trimestre: 4525.046 },
  },
  {
    nombre: "Taux accidents du travail hors fourchette",
    origen: { tipo: "recalculado", detalle: "0,2 % est sous le minimum de 0,4 %." },
    fecha: "2026-10-24",
    entrada: { classe: "classe-1", accidents: 0.2 },
    esperaError: true,
  },
]);
