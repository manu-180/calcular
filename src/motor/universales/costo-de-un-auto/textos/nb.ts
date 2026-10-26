import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosNb: TextosUi<UiCostoDeUnAuto> = {
  slug: "bilkostnader",
  ui: () => ({
    precio: "Bilens verdi",
    precioAyuda: "Det du betalte for bilen, eller hva den er verdt i dag hvis du har hatt den en stund.",
    depreciacion: "Verditap per år (%)",
    depreciacionAyuda: "En ny bil taper 15 % til 25 % av verdien det første året. En bruktbil taper mindre.",
    cuota: "Terminbeløp på billånet per måned (valgfritt)",
    cuotaAyuda: "Bare for å vise hva som går ut av kontoen hver måned. Det legges ikke til de faktiske kostnadene.",
    seguro: "Forsikring per måned",
    distanciaKm: "Kilometer per måned",
    distanciaMi: "Miles per måned",
    consumoL100: "Drivstofforbruk (liter per 100 km)",
    consumoMpg: "Drivstofforbruk (miles per gallon)",
    precioLitro: "Drivstoffpris per liter",
    precioGalon: "Drivstoffpris per gallon",
    mantenimiento: "Vedlikehold per måned",
    mantenimientoAyuda: "Service, dekk, reparasjoner og vask, i snitt per måned.",
    estacionamiento: "Parkering per måned (valgfritt)",
    otros: "Avgifter og andre kostnader per måned (valgfritt)",
    otrosAyuda: "Bompenger, EU-kontroll, ferger og bøter, i snitt per måned.",
    costoMensual: "Faktiske kostnader per måned",
    costoAnual: "Faktiske kostnader per år",
    porKm: "Kostnad per kilometer",
    porMilla: "Kostnad per mile",
    combustible: "Drivstoff per måned",
    depreciacionMensual: "Verditap per måned",
    gastoBolsillo: "Det som går ut av kontoen hver måned",
    errorConsumo: "Fyll inn drivstofforbruket til bilen, så kan drivstoffkostnaden regnes ut.",
    observacionCuota:
      "Terminbeløpet på billånet er ikke med i de faktiske kostnadene, fordi en del av det betaler selve bilen, og det er allerede med som verditap. Renten på lånet kommer i tillegg.",
  }),
};
