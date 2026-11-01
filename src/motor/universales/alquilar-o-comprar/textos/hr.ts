import { pluralHr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// „za 1 godinu”, „za 3 godine”, „za 10 godina” (akuzativ nakon „za”).
const godina = (n: string) => pluralHr(n, "godinu", "godine", "godina");

export const textosHr: TextosUi<UiAlquilarOComprar> = {
  slug: "najam-ili-kupnja-stana",
  ui: () => ({
    precio: "Cijena stana",
    entrada: "Polog (% cijene)",
    gastosCompra: "Troškovi kupnje (% cijene)",
    gastosCompraAyuda: "Procjena nekretnine, naknade za kredit, ovjera ugovora, porez na promet nekretnina ili PDV, upis u zemljišne knjige i provizija agencije.",
    tasa: "Kamatna stopa stambenog kredita (% godišnje)",
    aniosHipoteca: "Rok otplate kredita (godine)",
    alquiler: "Mjesečna najamnina za sličan stan",
    aumentoAlquiler: "Godišnje povećanje najamnine (%)",
    gastosPropietario: "Godišnji troškovi vlasnika (% cijene)",
    gastosPropietarioAyuda: "Popravci i održavanje, porez na nekretnine, osiguranje stana. Obično 1 do 2 %.",
    revalorizacion: "Godišnji rast cijene stana (%)",
    rendimiento: "Prinos alternativnog ulaganja (% godišnje)",
    rendimientoAyuda: "Koliko biste zaradili da polog uložite umjesto da kupite stan.",
    horizonte: "Nakon koliko godina usporediti",
    veredicto: "Rezultat",
    patrimonioComprar: "Vaša imovina na kraju ako kupite",
    patrimonioAlquilar: "Vaša imovina na kraju ako živite u najmu",
    diferencia: "Razlika",
    anioDesde: "Godina od koje se kupnja više isplati",
    pagadoAlquilando: "Ukupno plaćeno za najam",
    pagadoComprando: "Ukupno plaćeno za kredit i održavanje",
    tabla: "Usporedba po godinama",
    colAnio: "Godina",
    colComprar: "Kupnja",
    colAlquilar: "Najam",
    colDiferencia: "Razlika",
    errorPrecio: "Unesite cijenu stana.",
    errorAlquiler: "Unesite kolika bi bila najamnina za sličan stan.",
    convieneComprar: (anios, diferencia) => `Više se isplati kupnja: za ${godina(anios)} imat ćete ${diferencia} više.`,
    convieneAlquilar: (anios, diferencia) => `Više se isplati najam: za ${godina(anios)} imat ćete ${diferencia} više.`,
    empate: (anios) => `Za ${godina(anios)} obje opcije izlaze na isto.`,
    observacionDesde: (anio) => `Kupnja prestiže najam od ${anio}. godine i nakon toga ostaje povoljnija.`,
    observacionMetodo:
      "Uspoređuje se što imate u svakoj od opcija. Kada živite u najmu, polog i ono što svakog mjeseca uštedite ostaju uloženi. Troškovi kasnije prodaje stana se ne oduzimaju.",
  }),
};
