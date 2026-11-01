import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosHu: TextosUi<UiAhorroRetiro> = {
  slug: "nyugdijcelu-megtakaritas",
  ui: () => ({
    edadActual: "Jelenlegi életkorod",
    edadRetiro: "Hány évesen mennél nyugdíjba",
    actual: "Eddigi megtakarításod",
    aporte: "Havi befizetés",
    rendimiento: "Éves reálhozam (%)",
    rendimientoAyuda: "Ennyivel hoz többet a befektetés az inflációnál. Hosszú távon a 2 és 5% közötti érték óvatos feltételezés.",
    aniosRenta: "Hány évig tartson ki a megtakarítás a nyugdíj alatt",
    aniosRentaAyuda: "Ennyi évig szeretnél pénzt felvenni ebből a megtakarításból.",
    capital: "Megtakarítás a nyugdíjba vonuláskor",
    renta: "Havi jövedelem ebből a megtakarításból",
    aportado: "Befizetések összesen",
    intereses: "Hozam összesen",
    tabla: "A megtakarítás alakulása életkor szerint",
    colEdad: "Életkor",
    colAportado: "Addig befizetve",
    colSaldo: "Megtakarítás",
    errorEdades: "A nyugdíjba vonulás életkorának nagyobbnak kell lennie a jelenlegi életkorodnál.",
    errorSinAhorro: "Add meg az eddigi megtakarításodat vagy a havi befizetést.",
    observacionDineroDeHoy: "Az összegek mai árakon szerepelnek, mert a hozamból már levontuk az inflációt.",
    observacionPublica: "Csak a saját megtakarításodat számoljuk. Az állami nyugdíj és más ellátások, amelyekre jogosult lehetsz, nincsenek benne.",
  }),
};
