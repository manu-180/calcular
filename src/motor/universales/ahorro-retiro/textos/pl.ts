import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosPl: TextosUi<UiAhorroRetiro> = {
  slug: "kalkulator-emerytalny",
  ui: () => ({
    edadActual: "Twój wiek",
    edadRetiro: "Wiek, w którym chcesz przejść na emeryturę",
    actual: "Oszczędności, które już masz",
    aporte: "Miesięczna wpłata",
    rendimiento: "Realna stopa zwrotu rocznie (%)",
    rendimientoAyuda: "Ile inwestycja zarabia ponad inflację. W długim okresie od 2% do 5% to ostrożne założenie.",
    aniosRenta: "Ile lat emerytury chcesz pokryć",
    aniosRentaAyuda: "Przez ile lat chcesz wypłacać pieniądze z tych oszczędności.",
    capital: "Kapitał w dniu przejścia na emeryturę",
    renta: "Miesięczna wypłata z tych oszczędności",
    aportado: "Suma wpłat",
    intereses: "Zysk z inwestycji",
    tabla: "Wzrost oszczędności rok po roku",
    colEdad: "Wiek",
    colAportado: "Dotychczasowe wpłaty",
    colSaldo: "Oszczędności",
    errorEdades: "Wiek emerytalny musi być wyższy niż twój obecny wiek.",
    errorSinAhorro: "Wpisz obecne oszczędności albo miesięczną wpłatę.",
    observacionDineroDeHoy: "Kwoty są w dzisiejszych pieniądzach, bo realna stopa zwrotu już uwzględnia inflację.",
    observacionPublica: "To tylko twoje własne oszczędności. Nie obejmują emerytury z systemu publicznego ani innych świadczeń.",
  }),
};
