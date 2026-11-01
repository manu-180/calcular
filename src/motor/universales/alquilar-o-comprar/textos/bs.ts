import { pluralBs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// „za 1 godinu”, „za 3 godine”, „za 10 godina” (akuzativ nakon „za”).
const godina = (n: string) => pluralBs(n, "godinu", "godine", "godina");

export const textosBs: TextosUi<UiAlquilarOComprar> = {
  slug: "kirija-ili-kupovina-stana",
  ui: () => ({
    precio: "Cijena stana",
    entrada: "Učešće (% cijene)",
    gastosCompra: "Troškovi kupovine (% cijene)",
    gastosCompraAyuda: "Procjena nekretnine, naknade za kredit, ovjera ugovora, porez na promet nekretnina ili PDV, upis u zemljišne knjige i provizija agencije.",
    tasa: "Kamatna stopa stambenog kredita (% godišnje)",
    aniosHipoteca: "Rok otplate kredita (godine)",
    alquiler: "Mjesečna kirija za sličan stan",
    aumentoAlquiler: "Godišnje povećanje kirije (%)",
    gastosPropietario: "Godišnji troškovi vlasnika (% cijene)",
    gastosPropietarioAyuda: "Popravci i održavanje, porez na nekretnine, osiguranje stana. Obično 1 do 2 %.",
    revalorizacion: "Godišnji rast cijene stana (%)",
    rendimiento: "Prinos alternativnog ulaganja (% godišnje)",
    rendimientoAyuda: "Koliko biste zaradili da učešće uložite umjesto da kupite stan.",
    horizonte: "Nakon koliko godina uporediti",
    veredicto: "Rezultat",
    patrimonioComprar: "Vaša imovina na kraju ako kupite",
    patrimonioAlquilar: "Vaša imovina na kraju ako živite u najmu",
    diferencia: "Razlika",
    anioDesde: "Godina od koje se kupovina više isplati",
    pagadoAlquilando: "Ukupno plaćeno za najam",
    pagadoComprando: "Ukupno plaćeno za kredit i održavanje",
    tabla: "Poređenje po godinama",
    colAnio: "Godina",
    colComprar: "Kupovina",
    colAlquilar: "Najam",
    colDiferencia: "Razlika",
    errorPrecio: "Unesite cijenu stana.",
    errorAlquiler: "Unesite kolika bi bila kirija za sličan stan.",
    convieneComprar: (anios, diferencia) => `Više se isplati kupovina: za ${godina(anios)} imat ćete ${diferencia} više.`,
    convieneAlquilar: (anios, diferencia) => `Više se isplati najam: za ${godina(anios)} imat ćete ${diferencia} više.`,
    empate: (anios) => `Za ${godina(anios)} obje opcije izlaze na isto.`,
    observacionDesde: (anio) => `Kupovina prestiže najam od ${anio}. godine i nakon toga ostaje povoljnija.`,
    observacionMetodo:
      "Upoređuje se što imate u svakoj od opcija. Kada živite u najmu, učešće i ono što svakog mjeseca uštedite ostaju uloženi. Troškovi kasnije prodaje stana se ne oduzimaju.",
  }),
};
