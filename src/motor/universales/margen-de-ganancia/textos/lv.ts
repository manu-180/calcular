import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosLv: TextosUi<UiMargenDeGanancia> = {
  slug: "pelnas-marzas-kalkulators",
  ui: () => ({
    modo: "Ko vēlaties aprēķināt?",
    modoPrecio: "Maržu pēc pašizmaksas un pārdošanas cenas",
    modoMargen: "Pārdošanas cenu pēc vēlamās maržas",
    modoMarkup: "Pārdošanas cenu pēc vēlamā uzcenojuma",
    costo: "Vienības pašizmaksa",
    costoAyuda: "Cik maksā vienības iepirkšana vai ražošana, bez PVN, ko pārnesat uz klientu.",
    precio: "Pārdošanas cena",
    precioAyuda: "Tikai tad, ja rēķināt maržu. Bez PVN.",
    objetivo: "Vēlamā marža vai uzcenojums (%)",
    objetivoAyuda: "Tikai tad, ja rēķināt pārdošanas cenu.",
    precioResultado: "Pārdošanas cena",
    margen: "Peļņas marža",
    margenAyuda: "Peļņa procentos no pārdošanas cenas.",
    markup: "Uzcenojums",
    markupAyuda: "Peļņa procentos no pašizmaksas.",
    ganancia: "Peļņa no vienības",
    errorCosto: "Ievadiet vienības pašizmaksu.",
    errorFaltaPrecio: "Lai aprēķinātu maržu, ievadiet pārdošanas cenu.",
    errorFaltaObjetivo: "Ievadiet maržu vai uzcenojumu, ko vēlaties sasniegt.",
    errorMargen100: "Maržai jābūt mazākai par 100%: citādi visa cena būtu peļņa bez jebkādām izmaksām.",
    observacionPerdida: "Par šo cenu pārdodat zem pašizmaksas: katrs pārdevums nes zaudējumus.",
  }),
};
