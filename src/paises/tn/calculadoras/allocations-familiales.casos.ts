import { definirCasos } from "@/motor/calculo";
import calculadora from "./allocations-familiales";

const CNSS = "https://www.cnss.tn/web/salarie/sal_asset_services_avantages/-/asset_publisher/0xT7/content/sal-secteur_-non_agr1_prestation_familiales_allocation?secteur=1&champAppli=1&servActif=2&avantage=1" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Trois enfants : montants plafonnés affichés par la CNSS",
    origen: { tipo: "oficial", url: CNSS, detalle: "21,960 + 19,520 + 17,080 dinars par trimestre (18 %, 16 % et 14 % de 122 dinars)." },
    fecha: "2026-10-24",
    entrada: { enfants: 3, salaire: 1200 },
    esperado: { trimestre: 58.56, premier: 21.96, deuxieme: 19.52, troisieme: 17.08, retenus: 3 },
  },
  {
    nombre: "Cinq enfants : seuls les trois premiers comptent",
    origen: { tipo: "recalculado", detalle: "Même total que pour trois enfants." },
    fecha: "2026-10-24",
    entrada: { enfants: 5, salaire: 900 },
    esperado: { trimestre: 58.56, retenus: 3, annee: 234.24 },
  },
  {
    nombre: "Un enfant",
    origen: { tipo: "recalculado", detalle: "18 % de 122 = 21,960 par trimestre, 7,320 par mois." },
    fecha: "2026-10-24",
    entrada: { enfants: 1, salaire: 600 },
    esperado: { trimestre: 21.96, mois: 7.32 },
  },
]);
