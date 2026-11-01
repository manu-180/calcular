import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosSk: TextosUi<UiHipoteca> = {
  slug: "hypotekarna-kalkulacka",
  ui: () => ({
    precio: "Cena nehnuteľnosti",
    entradaPorcentaje: "Vlastné zdroje (% z ceny)",
    entradaMonto: "Vlastné zdroje v peniazoch (nepovinné)",
    entradaMontoAyuda: "Ak sumu zadáte, nahradí percento.",
    tasa: "Ročná úroková sadzba (%)",
    anios: "Doba splatnosti (roky)",
    gastos: "Mesačné náklady na bývanie (nepovinné)",
    gastosAyuda: "Poistenie nehnuteľnosti, daň z nehnuteľností alebo príspevky do fondu opráv, ktoré platíte spolu s hypotékou.",
    cuota: "Mesačná splátka hypotéky",
    cuotaTotal: "Mesačná splátka vrátane nákladov",
    entrada: "Vlastné zdroje",
    prestado: "Výška úveru",
    intereses: "Úroky spolu",
    total: "Na splátkach spolu",
    tabla: "Po rokoch",
    colAnio: "Rok",
    colIntereses: "Zaplatené úroky",
    colCapital: "Splatená istina",
    colSaldo: "Zostatok na konci roka",
    errorPrecio: "Zadajte cenu nehnuteľnosti.",
    errorEntrada: "Vlastné zdroje pokrývajú celú cenu, takže hypotéku nepotrebujete. Znížte vlastné zdroje.",
    observacionPrestado: (porcentaje) => `Požičiavate si ${porcentaje} % ceny nehnuteľnosti. Čím vyšší podiel, tým prísnejšie podmienky banka zvyčajne má.`,
    observacionCostos: "Náklady na vybavenie úveru (odhad nehnuteľnosti, poplatky, notár, vklad do katastra) nie sú započítané. Počítajte s nimi nad rámec vlastných zdrojov.",
  }),
};
