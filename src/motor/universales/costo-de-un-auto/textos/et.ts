import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosEt: TextosUi<UiCostoDeUnAuto> = {
  slug: "auto-kulud",
  ui: () => ({
    precio: "Auto väärtus",
    precioAyuda: "Hind, mille maksid, või auto praegune väärtus, kui oled seda juba mõnda aega omanud.",
    depreciacion: "Väärtuse langus aastas (%)",
    depreciacionAyuda: "Uus auto kaotab esimesel aastal 15-25% oma väärtusest. Kasutatud auto kaotab vähem.",
    cuota: "Autolaenu kuumakse (valikuline)",
    cuotaAyuda: "Ainult selleks, et näidata, kui palju kontolt kuus lahkub. Tegelike kulude hulka seda ei arvata.",
    seguro: "Kindlustus kuus",
    distanciaKm: "Kilomeetreid kuus",
    distanciaMi: "Miile kuus",
    consumoL100: "Kütusekulu (liitrit / 100 km)",
    consumoMpg: "Kütusekulu (miili galloni kohta)",
    precioLitro: "Kütuse liitri hind",
    precioGalon: "Kütuse galloni hind",
    mantenimiento: "Hooldus kuus",
    mantenimientoAyuda: "Hooldused, rehvid, remont ja pesu, keskmiselt kuus.",
    estacionamiento: "Parkimine kuus (valikuline)",
    otros: "Maksud, tasud ja muud kulud kuus (valikuline)",
    otrosAyuda: "Sõidukimaks, ülevaatus, teemaksud ja trahvid, keskmiselt kuus.",
    costoMensual: "Tegelikud kulud kuus",
    costoAnual: "Tegelikud kulud aastas",
    porKm: "Kulu kilomeetri kohta",
    porMilla: "Kulu miili kohta",
    combustible: "Kütus kuus",
    depreciacionMensual: "Väärtuse langus kuus",
    gastoBolsillo: "Kontolt lahkuv summa kuus",
    errorConsumo: "Sisesta auto kütusekulu, et saaks arvutada kütusele minevat summat.",
    observacionCuota:
      "Laenu põhiosa ei arvata tegelike kulude hulka, sest sellega maksad auto enda eest ja see kajastub juba väärtuse languses. Laenu intress on sellele lisaks eraldi kulu.",
  }),
};
