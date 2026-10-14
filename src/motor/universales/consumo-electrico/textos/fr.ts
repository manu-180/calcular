import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosFr: TextosUi<UiConsumoElectrico> = {
  slug: "calcul-consommation-electrique",
  ui: () => ({
    potencia: "Puissance de l’appareil (W)",
    potenciaAyuda: "Elle figure sur l’étiquette ou dans la notice, en watts (W). Si elle est en kW, multipliez par 1000.",
    cantidad: "Nombre d’appareils identiques",
    horas: "Heures d’utilisation par jour",
    dias: "Jours d’utilisation par mois",
    precio: "Prix du kWh",
    precioAyuda: "Il figure sur votre facture d’électricité. Prenez le prix TTC pour avoir le coût complet.",
    kwhDia: "Consommation par jour (kWh)",
    kwhMes: "Consommation par mois (kWh)",
    kwhAnio: "Consommation par an (kWh)",
    costoDia: "Coût par jour",
    costoMes: "Coût par mois",
    costoAnio: "Coût par an",
    errorHoras: "Une journée compte 24 heures : l’utilisation doit être comprise entre 0 et 24.",
  }),
};
