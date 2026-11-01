import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosPl: TextosUi<UiInteresCompuesto> = {
  slug: "kalkulator-procentu-skladanego",
  ui: () => ({
    capital: "Kwota początkowa",
    aporte: "Miesięczna wpłata (opcjonalnie)",
    aporteAyuda: "Ile dokładasz co miesiąc. Wpłata jest dodawana na koniec każdego miesiąca.",
    tasa: "Oprocentowanie roczne (%)",
    anios: "Liczba lat",
    capitalizacion: "Kapitalizacja odsetek",
    anual: "Roczna",
    semestral: "Półroczna",
    trimestral: "Kwartalna",
    mensual: "Miesięczna",
    diaria: "Dzienna",
    saldo: "Kwota końcowa",
    aportado: "Suma wpłat",
    intereses: "Zarobione odsetki",
    tabla: "Wzrost rok po roku",
    colAnio: "Rok",
    colAportado: "Wpłaty",
    colIntereses: "Odsetki",
    colSaldo: "Saldo na koniec roku",
    errorSinDinero: "Wpisz kwotę początkową albo miesięczną wpłatę.",
    observacionIntereses: (porcentaje) => `${porcentaje}% kwoty końcowej to odsetki.`,
  }),
};
