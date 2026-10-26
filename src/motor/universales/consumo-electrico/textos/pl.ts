import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosPl: TextosUi<UiConsumoElectrico> = {
  slug: "kalkulator-zuzycia-pradu",
  ui: () => ({
    potencia: "Moc urządzenia (W)",
    potenciaAyuda: "Znajdziesz ją na tabliczce znamionowej albo w instrukcji, w watach (W). Jeśli jest podana w kW, pomnóż przez 1000.",
    cantidad: "Liczba takich samych urządzeń",
    horas: "Godziny pracy dziennie",
    dias: "Dni pracy w miesiącu",
    precio: "Cena za kWh",
    precioAyuda: "Znajdziesz ją na rachunku za prąd: cena energii za kWh, razem z opłatą dystrybucyjną i VAT, jeśli chcesz pełny koszt.",
    kwhDia: "Zużycie dziennie (kWh)",
    kwhMes: "Zużycie miesięcznie (kWh)",
    kwhAnio: "Zużycie rocznie (kWh)",
    costoDia: "Koszt dziennie",
    costoMes: "Koszt miesięcznie",
    costoAnio: "Koszt rocznie",
    errorHoras: "Doba ma 24 godziny: czas pracy musi wynosić od 0 do 24.",
  }),
};
