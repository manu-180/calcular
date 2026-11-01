import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosPl: TextosUi<UiFondoDeEmergencia> = {
  slug: "kalkulator-poduszki-finansowej",
  ui: () => ({
    gastos: "Niezbędne wydatki miesięcznie",
    gastosAyuda: "To, czego nie możesz przestać płacić: mieszkanie, jedzenie, rachunki, dojazdy, zdrowie i raty kredytów.",
    meses: "Na ile miesięcy wydatków",
    mesesAyuda: "Od 3 do 6 miesięcy przy stałym dochodzie. Więcej, jeśli dochód jest nieregularny albo w domu zarabia jedna osoba.",
    actual: "Ile już masz odłożone (opcjonalnie)",
    aporte: "Ile możesz odkładać miesięcznie (opcjonalnie)",
    meta: "Zalecana poduszka finansowa",
    falta: "Zostało do odłożenia",
    mesesParaLlegar: "Ile miesięcy, żeby ją uzbierać",
    cobertura: "Na ile miesięcy wystarczą dziś oszczędności",
    errorGastos: "Wpisz niezbędne wydatki z jednego miesiąca.",
    yaCubierto: "Poduszka finansowa jest pełna. To, co odłożysz od teraz, możesz przeznaczyć na inne cele.",
    sinAporte: "Wpisz, ile możesz odkładać co miesiąc, a powiemy ci, ile to potrwa.",
    observacionDonde: "Trzymaj ją na osobnym rachunku, z którego wypłacisz pieniądze tego samego dnia i który chroni ich wartość, na przykład na koncie oszczędnościowym.",
  }),
};
