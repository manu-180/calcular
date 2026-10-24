import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosFi: TextosUi<UiMargenDeGanancia> = {
  slug: "katelaskuri",
  ui: () => ({
    modo: "Mitä haluat laskea?",
    modoPrecio: "Katteen, kun tiedät hankintahinnan ja myyntihinnan",
    modoMargen: "Myyntihinnan tietylle katteelle",
    modoMarkup: "Myyntihinnan tietylle lisäykselle",
    costo: "Hankintahinta kappaleelta",
    costoAyuda: "Mitä yhden kappaleen ostaminen tai valmistaminen maksaa, ilman arvonlisäveroa.",
    precio: "Myyntihinta",
    precioAyuda: "Vain jos lasket katteen. Ilman arvonlisäveroa.",
    objetivo: "Tavoitekate tai lisäys (%)",
    objetivoAyuda: "Vain jos lasket myyntihinnan.",
    precioResultado: "Myyntihinta",
    margen: "Kate",
    margenAyuda: "Voitto prosentteina myyntihinnasta.",
    markup: "Lisäys",
    markupAyuda: "Voitto prosentteina hankintahinnasta.",
    ganancia: "Voitto kappaleelta",
    errorCosto: "Syötä yhden kappaleen hankintahinta.",
    errorFaltaPrecio: "Syötä myyntihinta, jotta kate voidaan laskea.",
    errorFaltaObjetivo: "Syötä kate tai lisäys, johon haluat päästä.",
    errorMargen100: "Katteen pitää olla alle 100 %. Muuten koko hinta olisi voittoa ilman mitään kuluja.",
    observacionPerdida: "Tällä hinnalla myyt alle hankintahinnan ja menetät rahaa jokaisesta myynnistä.",
  }),
};
