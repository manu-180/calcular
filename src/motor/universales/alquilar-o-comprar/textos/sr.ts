import { pluralSr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// «za 1 godinu», «za 3 godine», «za 10 godina» (akuzativ posle «za»).
const godina = (n: string) => pluralSr(n, "godinu", "godine", "godina");

export const textosSr: TextosUi<UiAlquilarOComprar> = {
  slug: "kirija-ili-kupovina-stana",
  ui: () => ({
    precio: "Cena stana",
    entrada: "Učešće (% od cene)",
    gastosCompra: "Troškovi kupovine (% od cene)",
    gastosCompraAyuda: "Procena nekretnine, naknade za kredit, overa ugovora, porez na prenos ili PDV, upis u katastar i provizija agencije.",
    tasa: "Kamatna stopa stambenog kredita (% godišnje)",
    aniosHipoteca: "Rok otplate kredita (godine)",
    alquiler: "Mesečna kirija za sličan stan",
    aumentoAlquiler: "Godišnje povećanje kirije (%)",
    gastosPropietario: "Godišnji troškovi vlasnika (% od cene)",
    gastosPropietarioAyuda: "Popravke i održavanje, porez na imovinu, osiguranje stana. Obično 1 do 2%.",
    revalorizacion: "Godišnji rast cene stana (%)",
    rendimiento: "Prinos alternativnog ulaganja (% godišnje)",
    rendimientoAyuda: "Koliko biste zaradili da učešće uložite umesto da kupite stan.",
    horizonte: "Posle koliko godina porediti",
    veredicto: "Rezultat",
    patrimonioComprar: "Vaša imovina na kraju ako kupite",
    patrimonioAlquilar: "Vaša imovina na kraju ako živite pod kirijom",
    diferencia: "Razlika",
    anioDesde: "Godina od koje se kupovina više isplati",
    pagadoAlquilando: "Ukupno plaćeno za kiriju",
    pagadoComprando: "Ukupno plaćeno za kredit i održavanje",
    tabla: "Poređenje po godinama",
    colAnio: "Godina",
    colComprar: "Kupovina",
    colAlquilar: "Kirija",
    colDiferencia: "Razlika",
    errorPrecio: "Unesite cenu stana.",
    errorAlquiler: "Unesite koliko bi iznosila kirija za sličan stan.",
    convieneComprar: (anios, diferencia) => `Više se isplati kupovina: za ${godina(anios)} imaćete ${diferencia} više.`,
    convieneAlquilar: (anios, diferencia) => `Više se isplati kirija: za ${godina(anios)} imaćete ${diferencia} više.`,
    empate: (anios) => `Za ${godina(anios)} obe opcije izlaze isto.`,
    observacionDesde: (anio) => `Kupovina prestiže kiriju od ${anio}. godine i posle toga ostaje povoljnija.`,
    observacionMetodo:
      "Poredi se šta imate u svakoj od opcija. Kada živite pod kirijom, učešće i ono što svakog meseca uštedite ostaju uloženi. Troškovi kasnije prodaje stana se ne oduzimaju.",
  }),
};
