import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// «po 1 roku», pero «po 2 latach», «po 10 latach»: tras «po» el plural de «rok» va siempre en
// miejscownik (latach), sin la alternancia few/many del nominativo.
const poLatach = (anios: string) => (anios === "1" ? "po roku" : `po ${anios} latach`);

export const textosPl: TextosUi<UiAlquilarOComprar> = {
  slug: "kalkulator-kupic-czy-wynajac",
  ui: () => ({
    precio: "Cena mieszkania",
    entrada: "Wkład własny (% ceny)",
    gastosCompra: "Koszty zakupu (% ceny)",
    gastosCompraAyuda: "Taksa notarialna, podatek PCC, opłaty sądowe, prowizja pośrednika i wycena.",
    tasa: "Oprocentowanie kredytu (% rocznie)",
    aniosHipoteca: "Okres kredytu w latach",
    alquiler: "Miesięczny czynsz za podobne mieszkanie",
    aumentoAlquiler: "Roczny wzrost czynszu (%)",
    gastosPropietario: "Roczne koszty właściciela (% wartości)",
    gastosPropietarioAyuda: "Remonty, podatek od nieruchomości i ubezpieczenie. Zwykle od 1% do 2%.",
    revalorizacion: "Roczny wzrost cen mieszkań (%)",
    rendimiento: "Zysk z innej inwestycji (% rocznie)",
    rendimientoAyuda: "Ile zarobiłby wkład własny zainwestowany zamiast wydany na mieszkanie.",
    horizonte: "Liczba lat do porównania",
    veredicto: "Wynik",
    patrimonioComprar: "Majątek na koniec, jeśli kupisz",
    patrimonioAlquilar: "Majątek na koniec, jeśli wynajmiesz",
    diferencia: "Różnica",
    anioDesde: "Rok, od którego zakup się opłaca",
    pagadoAlquilando: "Suma zapłaconego czynszu",
    pagadoComprando: "Suma rat kredytu i kosztów właściciela",
    tabla: "Porównanie rok po roku",
    colAnio: "Rok",
    colComprar: "Zakup",
    colAlquilar: "Najem",
    colDiferencia: "Różnica",
    errorPrecio: "Wpisz cenę mieszkania.",
    errorAlquiler: "Wpisz czynsz za podobne mieszkanie.",
    convieneComprar: (anios, diferencia) => `Bardziej opłaca się zakup: ${poLatach(anios)} będziesz mieć o ${diferencia} więcej.`,
    convieneAlquilar: (anios, diferencia) => `Bardziej opłaca się najem: ${poLatach(anios)} będziesz mieć o ${diferencia} więcej.`,
    empate: (anios) => `${poLatach(anios).replace(/^po/, "Po")} obie opcje wychodzą tak samo.`,
    observacionDesde: (anio) => `Zakup wyprzedza najem w ${anio}. roku i już go nie traci.`,
    observacionMetodo:
      "Porównujemy majątek w obu przypadkach. Jeśli wynajmujesz, wkład własny i to, co oszczędzasz co miesiąc, zostają zainwestowane. Nie odliczamy kosztów sprzedaży mieszkania.",
  }),
};
