import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosSr: TextosUi<UiAhorroRetiro> = {
  slug: "stednja-za-penziju",
  ui: () => ({
    edadActual: "Koliko imate godina",
    edadRetiro: "Sa koliko godina želite u penziju",
    actual: "Koliko ste već uštedeli",
    aporte: "Mesečna uplata",
    rendimiento: "Realni godišnji prinos (%)",
    rendimientoAyuda: "Koliko ulaganje donosi iznad inflacije. Za dug period 2 do 5% je oprezna pretpostavka.",
    aniosRenta: "Za koliko godina penzije ušteđevina treba da traje",
    aniosRentaAyuda: "Koliko godina želite da trošite novac iz ove ušteđevine.",
    capital: "Ušteđevina na dan odlaska u penziju",
    renta: "Mesečni prihod iz ove ušteđevine",
    aportado: "Ukupno uplaćeno",
    intereses: "Ukupna zarada od ulaganja",
    tabla: "Rast ušteđevine po godinama starosti",
    colEdad: "Godine",
    colAportado: "Uplaćeno do tada",
    colSaldo: "Ušteđevina",
    errorEdades: "Godine za odlazak u penziju moraju biti veće od vaših sadašnjih godina.",
    errorSinAhorro: "Unesite koliko ste već uštedeli ili mesečnu uplatu.",
    observacionDineroDeHoy: "Iznosi su u današnjim cenama, jer je prinos već umanjen za inflaciju.",
    observacionPublica: "Računa se samo vaša lična štednja. Državna penzija i druga primanja na koja možete imati pravo nisu uključeni.",
  }),
};
