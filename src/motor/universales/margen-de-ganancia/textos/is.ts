import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosIs: TextosUi<UiMargenDeGanancia> = {
  slug: "alagning-og-framlegd",
  ui: () => ({
    modo: "Hvað viltu reikna?",
    modoPrecio: "Framlegð út frá kostnaði og verði",
    modoMargen: "Verð fyrir tiltekna framlegð",
    modoMarkup: "Verð fyrir tiltekna álagningu",
    costo: "Kostnaður á einingu",
    costoAyuda: "Það sem kostar að kaupa inn eða framleiða eina einingu, án VSK.",
    precio: "Söluverð",
    precioAyuda: "Aðeins ef þú reiknar framlegðina. Án VSK.",
    objetivo: "Framlegð eða álagning sem þú vilt ná (%)",
    objetivoAyuda: "Aðeins ef þú reiknar verðið.",
    precioResultado: "Söluverð",
    margen: "Framlegð",
    margenAyuda: "Hagnaðurinn sem hlutfall af söluverði.",
    markup: "Álagning",
    markupAyuda: "Hagnaðurinn sem hlutfall af kostnaði.",
    ganancia: "Hagnaður á einingu",
    errorCosto: "Sláðu inn kostnað á einingu.",
    errorFaltaPrecio: "Sláðu inn söluverð til að reikna framlegðina.",
    errorFaltaObjetivo: "Sláðu inn framlegðina eða álagninguna sem þú vilt ná.",
    errorMargen100: "Framlegð verður að vera undir 100%. Annars væri allt verðið hagnaður og enginn kostnaður.",
    observacionPerdida: "Á þessu verði selur þú undir kostnaði og tapar á hverri sölu.",
  }),
};
