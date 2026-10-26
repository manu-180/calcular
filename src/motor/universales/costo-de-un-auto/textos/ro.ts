import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosRo: TextosUi<UiCostoDeUnAuto> = {
  slug: "cost-intretinere-masina",
  ui: () => ({
    precio: "Valoarea mașinii",
    precioAyuda: "Cât ați plătit pe ea sau cât valorează azi, dacă o aveți de ceva timp.",
    depreciacion: "Valoare pierdută pe an (%)",
    depreciacionAyuda: "O mașină nouă pierde între 15% și 25% în primul an. Una la mâna a doua, mai puțin.",
    cuota: "Rata lunară a creditului (opțional)",
    cuotaAyuda: "Doar ca să vedeți ce iese din cont în fiecare lună. Nu se adaugă la costul real.",
    seguro: "Asigurare pe lună",
    distanciaKm: "Kilometri pe lună",
    distanciaMi: "Mile pe lună",
    consumoL100: "Consum (litri la 100 km)",
    consumoMpg: "Consum (mile pe galon)",
    precioLitro: "Prețul combustibilului pe litru",
    precioGalon: "Prețul combustibilului pe galon",
    mantenimiento: "Întreținere pe lună",
    mantenimientoAyuda: "Revizii, anvelope, reparații și spălătorie, în medie pe lună.",
    estacionamiento: "Parcare pe lună (opțional)",
    otros: "Impozite, taxe de drum și alte costuri pe lună (opțional)",
    otrosAyuda: "Impozitul auto, inspecția tehnică, vinieta și amenzile, în medie pe lună.",
    costoMensual: "Costul real pe lună",
    costoAnual: "Costul real pe an",
    porKm: "Cost pe kilometru",
    porMilla: "Cost pe milă",
    combustible: "Combustibil pe lună",
    depreciacionMensual: "Valoare pierdută pe lună",
    gastoBolsillo: "Ce iese din cont în fiecare lună",
    errorConsumo: "Introduceți consumul mașinii ca să calculăm costul combustibilului.",
    observacionCuota:
      "Rata creditului nu intră în costul real pentru că o parte din ea plătește mașina, care este deja socotită ca valoare pierdută. Dobânda creditului este un cost în plus.",
  }),
};
