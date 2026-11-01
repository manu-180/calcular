import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosLt: TextosUi<UiMargenDeGanancia> = {
  slug: "pelno-marzos-skaiciuokle",
  ui: () => ({
    modo: "Ką norite apskaičiuoti?",
    modoPrecio: "Maržą pagal savikainą ir pardavimo kainą",
    modoMargen: "Pardavimo kainą pagal norimą maržą",
    modoMarkup: "Pardavimo kainą pagal norimą antkainį",
    costo: "Vieneto savikaina",
    costoAyuda: "Kiek kainuoja vieneto pirkimas ar gamyba, be PVM, kurį perkeliate klientui.",
    precio: "Pardavimo kaina",
    precioAyuda: "Tik jei skaičiuojate maržą. Be PVM.",
    objetivo: "Norima marža arba antkainis (%)",
    objetivoAyuda: "Tik jei skaičiuojate pardavimo kainą.",
    precioResultado: "Pardavimo kaina",
    margen: "Pelno marža",
    margenAyuda: "Pelnas procentais nuo pardavimo kainos.",
    markup: "Antkainis",
    markupAyuda: "Pelnas procentais nuo savikainos.",
    ganancia: "Pelnas vienetui",
    errorCosto: "Įveskite vieneto savikainą.",
    errorFaltaPrecio: "Maržai apskaičiuoti įveskite pardavimo kainą.",
    errorFaltaObjetivo: "Įveskite maržą arba antkainį, kurio siekiate.",
    errorMargen100: "Marža turi būti mažesnė nei 100 %: tai reikštų, kad visa kaina yra pelnas be jokių sąnaudų.",
    observacionPerdida: "Už šią kainą parduodate žemiau savikainos: kiekvienas pardavimas neša nuostolį.",
  }),
};
