import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosPl: TextosUi<UiCeramicos> = {
  slug: "kalkulator-plytek",
  ui: () => ({
    superficie: (u) => `Powierzchnia do wyłożenia (${u})`,
    largo: (u) => `Długość płytki (${u})`,
    ancho: (u) => `Szerokość płytki (${u})`,
    desperdicio: "Zapas na docinki (%)",
    desperdicioAyuda: "Na cięcia i stłuczki. Przyjmij 10% przy układaniu prostym i 15% przy układaniu po skosie.",
    porCaja: "Liczba płytek w opakowaniu",
    porCajaAyuda: "Opcjonalnie. Wpisz, żeby zobaczyć, ile opakowań kupić.",
    piezas: "Potrzebne płytki (szt.)",
    cajas: "Opakowania do kupienia",
    conDesperdicio: (u) => `Powierzchnia z zapasem (${u})`,
    cubre: (u) => `Powierzchnia, którą pokryją opakowania (${u})`,
    errorSuperficie: "Powierzchnia musi być większa od 0.",
    errorPieza: "Wymiary płytki muszą być większe od 0.",
  }),
};
