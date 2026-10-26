import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosHu: TextosUi<UiCostoDeUnAuto> = {
  slug: "auto-fenntartasi-koltseg",
  ui: () => ({
    precio: "Az autó értéke",
    precioAyuda: "Amennyit fizettél érte, vagy amennyit ma ér, ha már régebb óta megvan.",
    depreciacion: "Éves értékvesztés (%)",
    depreciacionAyuda: "Egy új autó az első évben 15 és 25 százalék között veszít az értékéből. Egy használt kevesebbet.",
    cuota: "Havi hiteltörlesztő (nem kötelező)",
    cuotaAyuda: "Csak azért, hogy lásd, mennyi megy le havonta a számládról. A valódi költséghez nem adjuk hozzá.",
    seguro: "Biztosítás havonta",
    distanciaKm: "Kilométer havonta",
    distanciaMi: "Mérföld havonta",
    consumoL100: "Fogyasztás (liter 100 km-en)",
    consumoMpg: "Fogyasztás (mérföld gallononként)",
    precioLitro: "Üzemanyag ára literenként",
    precioGalon: "Üzemanyag ára gallononként",
    mantenimiento: "Karbantartás havonta",
    mantenimientoAyuda: "Szerviz, gumik, javítások és mosás, havi átlagban.",
    estacionamiento: "Parkolás havonta (nem kötelező)",
    otros: "Adók, útdíjak és egyéb költségek havonta (nem kötelező)",
    otrosAyuda: "Gépjárműadó, műszaki vizsga, autópálya-matrica és bírságok, havi átlagban.",
    costoMensual: "Valódi költség havonta",
    costoAnual: "Valódi költség évente",
    porKm: "Költség kilométerenként",
    porMilla: "Költség mérföldenként",
    combustible: "Üzemanyag havonta",
    depreciacionMensual: "Értékvesztés havonta",
    gastoBolsillo: "Ennyi megy le havonta a számládról",
    errorConsumo: "Add meg az autód fogyasztását, hogy kiszámolhassuk az üzemanyagköltséget.",
    observacionCuota:
      "A hiteltörlesztő nem része a valódi költségnek, mert egy része magát az autót fizeti, amit már az értékvesztés tartalmaz. A hitel kamata viszont külön költség.",
  }),
};
