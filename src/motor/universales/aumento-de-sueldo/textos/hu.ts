import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosHu: TextosUi<UiAumentoDeSueldo> = {
  slug: "fizetesemeles-kalkulator",
  ui: () => ({
    sueldo: "Jelenlegi havi fizetés",
    sueldoAyuda: "Bruttó vagy nettó, ahogy szeretnéd. Az eredmény ugyanabban jön ki.",
    aumentoPorcentaje: "Fizetésemelés (%)",
    aumentoMonto: "Fizetésemelés összegben (nem kötelező)",
    aumentoMontoAyuda: "Ha fix összeggel emelik a béredet, írd be ide. Ilyenkor ezzel számolunk a százalék helyett.",
    inflacion: "Infláció az időszakban (%, nem kötelező)",
    inflacionAyuda: "Az infláció a legutóbbi emelés óta, hogy lásd, többet vagy kevesebbet ér-e a fizetésed, mint korábban.",
    sueldosAnio: "Havi bérek száma évente",
    sueldosAnioAyuda: "12, ha havi bért kapsz. 13 vagy 14, ha évente egy plusz havi bért is kapsz.",
    nuevo: "Új havi fizetés",
    diferenciaMensual: "Különbség havonta",
    diferenciaAnual: "Különbség évente",
    porcentaje: "Fizetésemelés százalékban",
    real: "Reálbér-emelés (infláció után)",
    realAyuda: "Ennyivel többet vehetsz az új fizetésedből, mint a régiből.",
    errorSueldo: "Add meg a jelenlegi fizetésedet.",
    errorSinAumento: "Add meg az emelést százalékban vagy összegben.",
    observacionGana: (puntos) => `Megverted az inflációt: a fizetésed vásárlóereje ennyivel nőtt: ${puntos}%.`,
    observacionPierde: (puntos) => `Az emelés elmarad az inflációtól: a fizetésed vásárlóereje ennyivel csökkent: ${puntos}%.`,
    observacionIgual: "Az emelés pont az inflációval egyezik: a fizetésedből ugyanannyit vehetsz, mint korábban.",
  }),
};
