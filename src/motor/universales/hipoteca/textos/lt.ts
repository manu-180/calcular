import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosLt: TextosUi<UiHipoteca> = {
  slug: "busto-paskolos-skaiciuokle",
  ui: () => ({
    precio: "Būsto kaina",
    entradaPorcentaje: "Pradinis įnašas (% nuo kainos)",
    entradaMonto: "Pradinis įnašas pinigais (neprivaloma)",
    entradaMontoAyuda: "Jei įvesite sumą, ji pakeis procentinę dalį.",
    tasa: "Metinė palūkanų norma (%)",
    anios: "Paskolos terminas (metais)",
    gastos: "Mėnesio būsto išlaidos (neprivaloma)",
    gastosAyuda: "Būsto draudimas, nekilnojamojo turto mokestis ar kaupiamosios įmokos, kurias mokate kartu su paskola.",
    cuota: "Mėnesinė paskolos įmoka",
    cuotaTotal: "Mėnesinė įmoka su išlaidomis",
    entrada: "Pradinis įnašas",
    prestado: "Paskolos suma",
    intereses: "Palūkanos iš viso",
    total: "Įmokos iš viso",
    tabla: "Pagal metus",
    colAnio: "Metai",
    colIntereses: "Sumokėtos palūkanos",
    colCapital: "Grąžinta paskolos dalis",
    colSaldo: "Likutis metų pabaigoje",
    errorPrecio: "Įveskite būsto kainą.",
    errorEntrada: "Pradinis įnašas padengia visą kainą, todėl paskolos nereikia. Sumažinkite pradinį įnašą.",
    observacionPrestado: (porcentaje) => `Skolinatės ${porcentaje} % būsto kainos. Kuo didesnė ši dalis, tuo griežtesnes sąlygas paprastai taiko bankas.`,
    observacionCostos: "Sutarties sudarymo išlaidos (turto vertinimas, mokesčiai, notaras, hipotekos registravimas) neįskaičiuotos. Planuokite jas papildomai prie pradinio įnašo.",
  }),
};
