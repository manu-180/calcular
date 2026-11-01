import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosBs: TextosUi<UiAhorroRetiro> = {
  slug: "stednja-za-penziju",
  ui: () => ({
    edadActual: "Koliko imate godina",
    edadRetiro: "S koliko godina želite u penziju",
    actual: "Koliko ste već uštedjeli",
    aporte: "Mjesečna uplata",
    rendimiento: "Realni godišnji prinos (%)",
    rendimientoAyuda: "Koliko ulaganje donosi iznad inflacije. Za dug period 2 do 5 % oprezna je pretpostavka.",
    aniosRenta: "Koliko godina u penziji ušteđevina treba trajati",
    aniosRentaAyuda: "Koliko godina želite trošiti novac iz ove ušteđevine.",
    capital: "Ušteđevina na dan odlaska u penziju",
    renta: "Mjesečni prihod iz ove ušteđevine",
    aportado: "Ukupno uplaćeno",
    intereses: "Ukupna dobit od ulaganja",
    tabla: "Rast ušteđevine prema dobi",
    colEdad: "Dob",
    colAportado: "Uplaćeno do tada",
    colSaldo: "Ušteđevina",
    errorEdades: "Dob za odlazak u penziju mora biti veća od vaše sadašnje dobi.",
    errorSinAhorro: "Unesite koliko ste već uštedjeli ili mjesečnu uplatu.",
    observacionDineroDeHoy: "Iznosi su u današnjim cijenama jer je prinos već umanjen za inflaciju.",
    observacionPublica: "Računa se samo vaša lična štednja. Državna penzija i druga primanja na koja možete imati pravo nisu uključeni.",
  }),
};
