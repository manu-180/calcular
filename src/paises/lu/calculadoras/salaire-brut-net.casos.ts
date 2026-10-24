import { definirCasos } from "@/motor/calculo";
import salaireBrutNet from "./salaire-brut-net";

const ACD = "https://impotsdirects.public.lu/dam-assets/fr/baremes/bareme-2025-format-excel.xlsx";

export default definirCasos(salaireBrutNet, [
  {
    nombre: "5000 euros, classe 1",
    origen: {
      tipo: "recalculado",
      url: ACD,
      detalle:
        "Maladie 3,05 % = 152,50 ; pension 8,5 % = 425 ; dépendance 1,4 % de (5000 - 692,83) = 60,30. R = 4362,20 arrondi à 4360. Classe 1 : 0,36 x 4360 - 918,825 = 650,775 → 650,7 ; x 1,07 = 696,2. CIS annuel 600 - 20 000 x 0,015 = 300 et CI-CO2 216 - 20 000 x 0,0054 = 108, soit 34 par mois. Net 5000 - 637,80 - 696,20 + 34 = 3700.",
    },
    fecha: "2026-10-16",
    entrada: { brut: 5000, classe: "1" },
    esperado: { maladie: 152.5, pension: 425, dependance: 60.3, cotisations: 637.8, imposable: 4360, retenue: 696.2, credits: 34, net: 3700 },
  },
  {
    nombre: "3000 euros, classe 2",
    origen: {
      tipo: "recalculado",
      url: ACD,
      detalle: "Cotisations 91,50 + 255 + 32,30 = 378,80. R = 2620. Classe 2 : 0,08 x 2620 - 183,2 = 26,4 ; x 1,07 = 28,2. CIS 50 et CI-CO2 18 par mois. Net 3000 - 378,80 - 28,20 + 68 = 2661.",
    },
    fecha: "2026-10-16",
    entrada: { brut: 3000, classe: "2" },
    esperado: { cotisations: 378.8, imposable: 2620, retenue: 28.2, credits: 68, net: 2661 },
  },
  {
    nombre: "15 000 euros au-delà du maximum cotisable",
    origen: {
      tipo: "recalculado",
      url: "https://ccss.public.lu/fr/parametres-sociaux.html",
      detalle:
        "Maladie et pension sur 13 856,63 : 422,63 et 1177,81 ; dépendance sur 14 307,17 : 200,30. R = 13 195. 0,40 x 13 195 - 1151,5 = 4126,5 ; au-delà de 12 585 : 4126,5 x 1,09 - 77,65 = 4420,2. Pas de CIS au-delà de 80 000 par an. Net 8779,06.",
    },
    fecha: "2026-10-16",
    entrada: { brut: 15000, classe: "1" },
    esperado: { maladie: 422.63, pension: 1177.81, dependance: 200.3, retenue: 4420.2, credits: 0, net: 8779.06 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Un salaire de zéro n'est pas calculable." },
    fecha: "2026-10-16",
    entrada: { brut: 0, classe: "1" },
    esperaError: true,
  },
]);
