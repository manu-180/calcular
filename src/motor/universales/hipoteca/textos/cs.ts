import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosCs: TextosUi<UiHipoteca> = {
  slug: "hypotecni-kalkulacka",
  ui: () => ({
    precio: "Cena nemovitosti",
    entradaPorcentaje: "Vlastní zdroje (% z ceny)",
    entradaMonto: "Vlastní zdroje v penězích (nepovinné)",
    entradaMontoAyuda: "Pokud částku zadáte, nahradí procento.",
    tasa: "Roční úroková sazba (%)",
    anios: "Doba splatnosti (roky)",
    gastos: "Měsíční náklady na bydlení (nepovinné)",
    gastosAyuda: "Pojištění nemovitosti, daň z nemovitých věcí nebo příspěvky do fondu oprav, které platíte spolu s hypotékou.",
    cuota: "Měsíční splátka hypotéky",
    cuotaTotal: "Měsíční splátka včetně nákladů",
    entrada: "Vlastní zdroje",
    prestado: "Výše úvěru",
    intereses: "Úroky celkem",
    total: "Na splátkách celkem",
    tabla: "Po letech",
    colAnio: "Rok",
    colIntereses: "Zaplacené úroky",
    colCapital: "Splacená jistina",
    colSaldo: "Zůstatek na konci roku",
    errorPrecio: "Zadejte cenu nemovitosti.",
    errorEntrada: "Vlastní zdroje pokrývají celou cenu, takže hypotéku nepotřebujete. Snižte vlastní zdroje.",
    observacionPrestado: (porcentaje) => `Půjčujete si ${porcentaje} % ceny nemovitosti. Čím vyšší podíl, tím přísnější podmínky banka obvykle má.`,
    observacionCostos: "Náklady na sjednání (odhad nemovitosti, poplatky, notář, vklad do katastru) nejsou započítané. Počítejte s nimi nad rámec vlastních zdrojů.",
  }),
};
