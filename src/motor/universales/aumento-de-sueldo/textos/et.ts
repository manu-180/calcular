import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosEt: TextosUi<UiAumentoDeSueldo> = {
  slug: "palgatous",
  ui: () => ({
    sueldo: "Praegune kuupalk",
    sueldoAyuda: "Enne või pärast makse, kumb tahes. Tulemus arvutatakse samamoodi.",
    aumentoPorcentaje: "Palgatõus (%)",
    aumentoMonto: "Palgatõus summana (valikuline)",
    aumentoMontoAyuda: "Kui tõus on kindel summa, sisesta see siia. Seda kasutatakse protsendi asemel.",
    inflacion: "Inflatsioon perioodil (%, valikuline)",
    inflacionAyuda: "Inflatsioon pärast sinu eelmist palgatõusu. Nii näed, kas palk annab nüüd rohkem või vähem kui varem.",
    sueldosAnio: "Palkade arv aastas",
    sueldosAnioAyuda: "12, kui saad kuupalka. Rohkem, kui saad igal aastal ka lisapalga, näiteks 13. palga.",
    nuevo: "Uus kuupalk",
    diferenciaMensual: "Vahe kuus",
    diferenciaAnual: "Vahe aastas",
    porcentaje: "Tõus protsentides",
    real: "Reaalne palgatõus (pärast inflatsiooni)",
    realAyuda: "Kui palju rohkem saad uue palga eest võrreldes vanaga.",
    errorSueldo: "Sisesta oma praegune palk.",
    errorSinAumento: "Sisesta palgatõus protsentides või summana.",
    observacionGana: (puntos) => `Tõus on inflatsioonist suurem. Palga eest saad ${puntos}% rohkem kui varem.`,
    observacionPierde: (puntos) => `Tõus ei kata inflatsiooni. Palga eest saad ${puntos}% vähem kui varem.`,
    observacionIgual: "Tõus on sama suur kui inflatsioon. Palga eest saad sama palju kui varem.",
  }),
};
