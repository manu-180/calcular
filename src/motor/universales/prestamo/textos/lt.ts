import { formaLt } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosLt: TextosUi<UiPrestamo> = {
  slug: "paskolos-skaiciuokle",
  ui: () => ({
    monto: "Paskolos suma",
    tasa: "Metinė palūkanų norma (%)",
    tasaAyuda: "Nominali metinė palūkanų norma, nurodyta pasiūlyme. Mokesčiai į ją neįskaičiuoti, juos atspindi BVKKMN.",
    meses: "Grąžinimo terminas mėnesiais",
    extra: "Papildoma įmoka kas mėnesį (neprivaloma)",
    extraAyuda: "Kiek kas mėnesį mokėtumėte papildomai, kad paskolą grąžintumėte greičiau. Visa ši suma mažina paskolos likutį.",
    cuota: "Mėnesinė įmoka",
    intereses: "Iš viso palūkanų",
    total: "Iš viso sumokėsite",
    mesesReales: "Mėnesių skaičius su papildoma įmoka",
    ahorro: "Sutaupysite palūkanų",
    tabla: "Grąžinimo grafikas",
    colMes: "Mėnuo",
    colPago: "Įmoka",
    colInteres: "Palūkanos",
    colCapital: "Paskolos dalis",
    colSaldo: "Likutis",
    errorMonto: "Įveskite didesnę nei nulis sumą.",
    observacionCostos: "Į įmoką neįskaičiuotas draudimas, mokesčiai ir kitos išlaidos, kurias gali pridėti kreditorius. Prieš pasirašant sutartį paklauskite BVKKMN ir bendros mokėtinos sumos.",
    observacionExtra: (meses, ahorro) =>
      `Su papildoma įmoka grąžinimo trukmė yra ${meses} ${formaLt(meses.replace(/\D/g, ""), "mėnuo", "mėnesiai", "mėnesių")}, o palūkanų sutaupysite ${ahorro}.`,
  }),
};
