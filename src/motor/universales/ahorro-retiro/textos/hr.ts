import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosHr: TextosUi<UiAhorroRetiro> = {
  slug: "stednja-za-mirovinu",
  ui: () => ({
    edadActual: "Koliko imate godina",
    edadRetiro: "S koliko godina želite u mirovinu",
    actual: "Koliko ste već uštedjeli",
    aporte: "Mjesečna uplata",
    rendimiento: "Realni godišnji prinos (%)",
    rendimientoAyuda: "Koliko ulaganje donosi iznad inflacije. Za dugo razdoblje 2 do 5 % oprezna je pretpostavka.",
    aniosRenta: "Koliko godina u mirovini ušteđevina treba trajati",
    aniosRentaAyuda: "Koliko godina želite trošiti novac iz ove ušteđevine.",
    capital: "Ušteđevina na dan odlaska u mirovinu",
    renta: "Mjesečni prihod iz ove ušteđevine",
    aportado: "Ukupno uplaćeno",
    intereses: "Ukupna dobit od ulaganja",
    tabla: "Rast ušteđevine prema dobi",
    colEdad: "Dob",
    colAportado: "Uplaćeno do tada",
    colSaldo: "Ušteđevina",
    errorEdades: "Dob za odlazak u mirovinu mora biti veća od vaše sadašnje dobi.",
    errorSinAhorro: "Unesite koliko ste već uštedjeli ili mjesečnu uplatu.",
    observacionDineroDeHoy: "Iznosi su u današnjim cijenama jer je prinos već umanjen za inflaciju.",
    observacionPublica: "Računa se samo vaša osobna štednja. Državna mirovina i druga primanja na koja možete imati pravo nisu uključeni.",
  }),
};
