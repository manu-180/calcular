import { definirCasos } from "@/motor/calculo";
import salaireBrutNet from "./salaire-brut-net";

const base = { periode: "mois", statut: "non-cadre", alsaceMoselle: false, tauxPas: null } as const;

export default definirCasos(salaireBrutNet, [
  {
    nombre: "Smic à temps plein, non-cadre",
    origen: {
      tipo: "oficial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
      detalle: "Service-Public : Smic mensuel 1 867,02 € brut, 1 477,93 € net. Le BOFiP (BOI-BAREME-000037) donne 1 531,12 € net imposable.",
    },
    fecha: "2026-07-01",
    entrada: { ...base, sens: "brut", montant: 1867.02 },
    esperado: { netAvantImpot: 1477.93, netImposable: 1531.12, totalCotisations: 389.09, cotisationsRetraite: 211.16, csgCrds: 177.93 },
  },
  {
    nombre: "Retour au brut depuis le net du Smic",
    origen: {
      tipo: "recalculado",
      detalle: "Avec les arrondis au centime, 1 867,01 € et 1 867,02 € brut donnent tous deux 1 477,93 € net : le calcul retient le plus petit brut.",
    },
    fecha: "2026-07-01",
    entrada: { ...base, sens: "net", montant: 1477.93 },
    esperado: { brut: 1867.01, netAvantImpot: 1477.93 },
  },
  {
    nombre: "Cadre à 5 000 € brut (au-dessus du plafond)",
    origen: {
      tipo: "recalculado",
      detalle:
        "T1 4 005, T2 995. Retraite : 276,35 + 20,00 + 126,16 + 34,44 + 85,97 + 10,75 + CET 7,00 + Apec 1,20 = 561,87. Assiette CSG 4 912,50 : 334,05 + 117,90 + 24,56 = 476,51. Net 5 000 − 1 038,38 = 3 961,62 ; imposable 3 961,62 + 117,90 + 24,56 = 4 104,08.",
    },
    fecha: "2026-10-14",
    entrada: { ...base, statut: "cadre", sens: "brut", montant: 5000 },
    esperado: { cotisationsRetraite: 561.87, csgCrds: 476.51, netAvantImpot: 3961.62, netImposable: 4104.08 },
  },
  {
    nombre: "3 000 € brut avec un taux de prélèvement de 7,5 %",
    origen: {
      tipo: "recalculado",
      detalle: "Net 2 374,79, imposable 2 460,27. Prélèvement 2 460,27 × 7,5 % = 184,52. Net après impôt 2 190,27.",
    },
    fecha: "2026-10-14",
    entrada: { ...base, sens: "brut", montant: 3000, tauxPas: 7.5 },
    esperado: { netAvantImpot: 2374.79, prelevementSource: 184.52, netApresImpot: 2190.27 },
  },
  {
    nombre: "Alsace-Moselle : 1,30 % de plus",
    origen: { tipo: "recalculado", detalle: "3 000 × 1,30 % = 39,00 ; net 2 374,79 − 39,00 = 2 335,79." },
    fecha: "2026-10-14",
    entrada: { ...base, alsaceMoselle: true, sens: "brut", montant: 3000 },
    esperado: { maladieAlsaceMoselle: 39, netAvantImpot: 2335.79 },
  },
  {
    nombre: "Salaire annuel de 36 000 €",
    origen: { tipo: "recalculado", detalle: "36 000 ÷ 12 = 3 000 par mois, net 2 374,79 × 12 = 28 497,48." },
    fecha: "2026-10-14",
    entrada: { ...base, periode: "an", sens: "brut", montant: 36000 },
    esperado: { brut: 36000, netAvantImpot: 28497.48 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Sans montant, rien à calculer." },
    fecha: "2026-10-14",
    entrada: { ...base, sens: "brut", montant: 0 },
    esperaError: true,
  },
]);
