import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosEn: TextosUi<UiCostoDeUnAuto> = {
  slug: "car-cost",
  ui: () => ({
    precio: "Car value",
    precioAyuda: "What you paid, or what it is worth today if you have had it a while.",
    depreciacion: "Value lost per year (%)",
    depreciacionAyuda: "A new car loses 15% to 25% in the first year. A used one, less.",
    cuota: "Monthly loan payment (optional)",
    cuotaAyuda: "Only to show what leaves your account each month. It is not added to the real cost.",
    seguro: "Insurance per month",
    distanciaKm: "Kilometers per month",
    distanciaMi: "Miles per month",
    consumoL100: "Fuel use (liters per 100 km)",
    consumoMpg: "Fuel economy (miles per gallon)",
    precioLitro: "Fuel price per liter",
    precioGalon: "Fuel price per gallon",
    mantenimiento: "Maintenance per month",
    mantenimientoAyuda: "Servicing, tires, repairs and washing, averaged per month.",
    estacionamiento: "Parking per month (optional)",
    otros: "Taxes, tolls and other costs per month (optional)",
    otrosAyuda: "Registration, inspections, tolls and fines, averaged per month.",
    costoMensual: "Real cost per month",
    costoAnual: "Real cost per year",
    porKm: "Cost per kilometer",
    porMilla: "Cost per mile",
    combustible: "Fuel per month",
    depreciacionMensual: "Value lost per month",
    gastoBolsillo: "What leaves your account each month",
    errorConsumo: "Enter your car's fuel economy to work out the fuel cost.",
    observacionCuota:
      "The loan payment is not part of the real cost because part of it pays for the car, which is already counted as lost value. The loan interest is an extra cost on top.",
  }),
};
