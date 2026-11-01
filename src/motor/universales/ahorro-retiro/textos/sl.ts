import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosSl: TextosUi<UiAhorroRetiro> = {
  slug: "varcevanje-za-pokojnino",
  ui: () => ({
    edadActual: "Koliko ste stari",
    edadRetiro: "Pri koliko letih se želite upokojiti",
    actual: "Koliko ste že prihranili",
    aporte: "Mesečno vplačilo",
    rendimiento: "Realni letni donos (%)",
    rendimientoAyuda: "Koliko naložba prinese nad inflacijo. Za dolgo obdobje je 2 do 5 % previdna predpostavka.",
    aniosRenta: "Koliko let v pokoju naj prihranki zadoščajo",
    aniosRentaAyuda: "Koliko let želite porabljati denar iz teh prihrankov.",
    capital: "Prihranki ob upokojitvi",
    renta: "Mesečni dohodek iz teh prihrankov",
    aportado: "Skupaj vplačano",
    intereses: "Skupni donos naložbe",
    tabla: "Rast prihrankov po starosti",
    colEdad: "Starost",
    colAportado: "Vplačano do takrat",
    colSaldo: "Prihranki",
    errorEdades: "Starost ob upokojitvi mora biti višja od vaše sedanje starosti.",
    errorSinAhorro: "Vnesite, koliko ste že prihranili, ali mesečno vplačilo.",
    observacionDineroDeHoy: "Zneski so izraženi v današnjih cenah, ker je donos že zmanjšan za inflacijo.",
    observacionPublica: "Upošteva se samo vaše osebno varčevanje. Državna pokojnina in drugi prejemki, do katerih ste morda upravičeni, niso vključeni.",
  }),
};
