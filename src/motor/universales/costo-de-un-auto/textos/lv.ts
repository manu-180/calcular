import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosLv: TextosUi<UiCostoDeUnAuto> = {
  slug: "auto-izmaksu-kalkulators",
  ui: () => ({
    precio: "Auto vērtība",
    precioAyuda: "Cik par to samaksājāt vai cik tas vērts šodien, ja ar to braucat jau sen.",
    depreciacion: "Vērtības samazinājums gadā (%)",
    depreciacionAyuda: "Jauns auto pirmajā gadā zaudē no 15 līdz 25% vērtības. Lietots mazāk.",
    cuota: "Ikmēneša auto kredīta maksājums (nav obligāts)",
    cuotaAyuda: "Tikai pārskatam, cik naudas katru mēnesi aiziet no konta. Reālajām izmaksām netiek pieskaitīts.",
    seguro: "Apdrošināšana mēnesī",
    distanciaKm: "Kilometri mēnesī",
    distanciaMi: "Jūdzes mēnesī",
    consumoL100: "Patēriņš (litri uz 100 km)",
    consumoMpg: "Patēriņš (jūdzes ar galonu)",
    precioLitro: "Degvielas litra cena",
    precioGalon: "Degvielas galona cena",
    mantenimiento: "Apkope mēnesī",
    mantenimientoAyuda: "Serviss, riepas, remonts un mazgāšana, vidēji mēnesī.",
    estacionamiento: "Stāvvieta mēnesī (nav obligāta)",
    otros: "Nodokļi, vinjete un citi izdevumi mēnesī (nav obligāti)",
    otrosAyuda: "Tehniskā apskate, vinjete, ceļu nodevas un sodi, vidēji mēnesī.",
    costoMensual: "Reālās izmaksas mēnesī",
    costoAnual: "Reālās izmaksas gadā",
    porKm: "Izmaksas uz vienu kilometru",
    porMilla: "Izmaksas uz vienu jūdzi",
    combustible: "Degviela mēnesī",
    depreciacionMensual: "Vērtības samazinājums mēnesī",
    gastoBolsillo: "Cik katru mēnesi aiziet no konta",
    errorConsumo: "Ievadiet auto patēriņu, lai varētu aprēķināt degvielas izmaksas.",
    observacionCuota:
      "Kredīta maksājums nav iekļauts reālajās izmaksās, jo tā daļa apmaksā pašu auto, un tas jau iekļauts kā vērtības samazinājums. Kredīta procenti ir papildu izdevumi.",
  }),
};
