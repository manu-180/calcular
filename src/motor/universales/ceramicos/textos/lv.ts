import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosLv: TextosUi<UiCeramicos> = {
  slug: "plitu-kalkulators",
  ui: () => ({
    superficie: (u) => `Klājamā platība (${u})`,
    largo: (u) => `Plāksnes garums (${u})`,
    ancho: (u) => `Plāksnes platums (${u})`,
    desperdicio: "Rezerve griešanai (%)",
    desperdicioAyuda: "Griešanai un saplīsušām plāksnēm. Klājot taisni, rēķiniet 10%, klājot pa diagonāli, 15%.",
    porCaja: "Plākšņu skaits kastē",
    porCajaAyuda: "Nav obligāts. Aizpildiet, ja vēlaties redzēt, cik kastes pirkt.",
    piezas: "Vajadzīgais plākšņu skaits (gab.)",
    cajas: "Cik kastes pirkt",
    conDesperdicio: (u) => `Platība ar rezervi (${u})`,
    cubre: (u) => `Platība, ko nosedz kastes (${u})`,
    errorSuperficie: "Platībai jābūt lielākai par nulli.",
    errorPieza: "Plāksnes izmēriem jābūt lielākiem par nulli.",
  }),
};
