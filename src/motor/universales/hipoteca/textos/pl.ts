import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosPl: TextosUi<UiHipoteca> = {
  slug: "kalkulator-kredytu-hipotecznego",
  ui: () => ({
    precio: "Cena mieszkania",
    entradaPorcentaje: "Wkład własny (% ceny)",
    entradaMonto: "Wkład własny kwotowo (opcjonalnie)",
    entradaMontoAyuda: "Jeśli go wpiszesz, zastąpi procent.",
    tasa: "Oprocentowanie roczne (%)",
    anios: "Okres kredytowania w latach",
    gastos: "Miesięczne koszty mieszkania (opcjonalnie)",
    gastosAyuda: "Ubezpieczenie, podatek od nieruchomości albo czynsz do wspólnoty, które płacisz razem z ratą.",
    cuota: "Miesięczna rata kredytu",
    cuotaTotal: "Rata razem z kosztami",
    entrada: "Wkład własny",
    prestado: "Kwota kredytu",
    intereses: "Suma odsetek",
    total: "Suma wszystkich rat",
    tabla: "Rok po roku",
    colAnio: "Rok",
    colIntereses: "Zapłacone odsetki",
    colCapital: "Spłacony kapitał",
    colSaldo: "Do spłaty na koniec roku",
    errorPrecio: "Wpisz cenę mieszkania.",
    errorEntrada: "Wkład własny pokrywa całą cenę, więc nie ma kredytu do policzenia. Zmniejsz wkład własny.",
    observacionPrestado: (porcentaje) => `Pożyczasz ${porcentaje}% wartości mieszkania (wskaźnik LTV). Im wyższy ten udział, tym więcej zwykle wymaga bank.`,
    observacionCostos: "Kalkulator nie obejmuje kosztów zakupu (taksa notarialna, podatki, prowizja, wycena). Zaplanuj je ponad wkład własny.",
  }),
};
