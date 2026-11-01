import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosEt: TextosUi<UiHipoteca> = {
  slug: "kodulaenu-kalkulaator",
  ui: () => ({
    precio: "Kodu hind",
    entradaPorcentaje: "Sissemakse (% hinnast)",
    entradaMonto: "Sissemakse summana (valikuline)",
    entradaMontoAyuda: "Kui sisestad summa, kasutatakse seda protsendi asemel.",
    tasa: "Aastaintress (%)",
    anios: "Laenuperiood aastates",
    gastos: "Eluasemekulud kuus (valikuline)",
    gastosAyuda: "Haldustasu, vesi, kodukindlustus või kinnisvaramaks, mida maksad laenule lisaks.",
    cuota: "Laenu kuumakse",
    cuotaTotal: "Kuumakse ja eluasemekulud kokku",
    entrada: "Sissemakse",
    prestado: "Laenusumma",
    intereses: "Intressid kokku",
    total: "Laenumaksed kokku",
    tabla: "Aasta aastalt",
    colAnio: "Aasta",
    colIntereses: "Makstud intressid",
    colCapital: "Makstud põhiosa",
    colSaldo: "Laenujääk aasta lõpus",
    errorPrecio: "Sisesta kodu hind.",
    errorEntrada: "Sissemakse katab kogu hinna, seega pole laenu vaja. Vähenda sissemakset.",
    observacionPrestado: (porcentaje) => `Laenad ${porcentaje}% kodu väärtusest. Mida suurem on see osa, seda rangemad on panga nõuded tavaliselt.`,
    observacionCostos: "Ostukulud (riigilõiv, notari- ja pangatasud ning maakleritasu) ei ole arvestuses. Pane nende jaoks raha kõrvale lisaks sissemaksele.",
  }),
};
