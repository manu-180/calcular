import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

const base: TextosUi<UiCostoDeUnAuto> = {
  slug: "cout-reel-voiture",
  ui: () => ({
    precio: "Valeur de la voiture",
    precioAyuda: "Ce que vous l’avez payée, ou ce qu’elle vaut aujourd’hui si vous l’avez depuis un moment.",
    depreciacion: "Perte de valeur par an (%)",
    depreciacionAyuda: "Une voiture neuve perd 15 % à 25 % la première année. Une occasion, moins.",
    cuota: "Mensualité du crédit auto (facultatif)",
    cuotaAyuda: "Seulement pour montrer ce qui sort de votre compte chaque mois. Elle ne s’ajoute pas au coût réel.",
    seguro: "Assurance par mois",
    distanciaKm: "Kilomètres par mois",
    distanciaMi: "Miles par mois",
    consumoL100: "Consommation (litres aux 100 km)",
    consumoMpg: "Consommation (miles par gallon)",
    precioLitro: "Prix du carburant au litre",
    precioGalon: "Prix du carburant au gallon",
    mantenimiento: "Entretien par mois",
    mantenimientoAyuda: "Révisions, pneus, réparations et lavage, ramenés au mois.",
    estacionamiento: "Stationnement par mois (facultatif)",
    otros: "Taxes, péages et autres frais par mois (facultatif)",
    otrosAyuda: "Carte grise, contrôle technique, péages et amendes, ramenés au mois.",
    costoMensual: "Coût réel par mois",
    costoAnual: "Coût réel par an",
    porKm: "Coût au kilomètre",
    porMilla: "Coût au mile",
    combustible: "Carburant par mois",
    depreciacionMensual: "Perte de valeur par mois",
    gastoBolsillo: "Ce qui sort de votre compte chaque mois",
    errorConsumo: "Saisissez la consommation de votre voiture pour calculer le coût du carburant.",
    observacionCuota:
      "La mensualité du crédit n’entre pas dans le coût réel, car une partie paie la voiture, déjà comptée dans la perte de valeur. Les intérêts du crédit sont un coût en plus.",
  }),
};

const canada = (): Partial<UiCostoDeUnAuto> => ({
  otrosAyuda: "Immatriculation, permis de conduire, péages et contraventions, ramenés au mois.",
});

export const textosFr = conVariantes(base, { "fr-CA": canada });
