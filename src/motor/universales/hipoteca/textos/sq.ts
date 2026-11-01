import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosSq: TextosUi<UiHipoteca> = {
  slug: "kalkulator-kredi-per-shtepi",
  ui: () => ({
    precio: "Çmimi i shtëpisë",
    entradaPorcentaje: "Parapagimi (% e çmimit)",
    entradaMonto: "Parapagimi në para (opsional)",
    entradaMontoAyuda: "Nëse vendosni një shumë, ajo zëvendëson përqindjen.",
    tasa: "Norma vjetore e interesit (%)",
    anios: "Afati i kredisë (vite)",
    gastos: "Shpenzime mujore për shtëpinë (opsional)",
    gastosAyuda: "Sigurimi, taksa e pronës ose kosto të tjera që paguani bashkë me këstin.",
    cuota: "Kësti mujor i kredisë",
    cuotaTotal: "Kësti bashkë me shpenzimet",
    entrada: "Parapagimi",
    prestado: "Shuma e huazuar",
    intereses: "Totali i interesit",
    total: "Totali për t'u shlyer",
    tabla: "Vit pas viti",
    colAnio: "Viti",
    colIntereses: "Interesi i paguar",
    colCapital: "Principali i shlyer",
    colSaldo: "Teprica në fund të vitit",
    errorPrecio: "Vendosni çmimin e shtëpisë.",
    errorEntrada: "Parapagimi e mbulon gjithë çmimin, pra nuk ju duhet kredi. Zvogëloni parapagimin.",
    observacionPrestado: (porcentaje) => `Po huazoni ${porcentaje}% të çmimit të shtëpisë. Sa më e madhe kjo pjesë, aq më të rrepta janë zakonisht kushtet e bankës.`,
    observacionCostos: "Kostot e dhënies së kredisë (vlerësimi, sigurimi, noteri, komisionet) nuk përfshihen. Lërini mënjanë veçmas nga parapagimi.",
  }),
};
