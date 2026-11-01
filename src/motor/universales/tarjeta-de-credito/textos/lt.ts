import { pluralLt } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const menesiai = (n: string) => pluralLt(n, "mėnuo", "mėnesiai", "mėnesių");

export const textosLt: TextosUi<UiTarjetaDeCredito> = {
  slug: "kredito-korteles-grazinimas",
  ui: () => ({
    saldo: "Kortelės skola",
    tasa: "Metinė palūkanų norma (%)",
    tasaAyuda: "Pirkiniams taikoma palūkanų norma, pasibaigus laikotarpiui be palūkanų. Ją rasite išraše arba sutartyje.",
    modo: "Kaip grąžinsite?",
    modoFijo: "Kas mėnesį vienoda suma",
    modoMinimo: "Minimalia įmoka",
    pagoFijo: "Fiksuota mėnesinė įmoka",
    minimoPorcentaje: "Minimali įmoka (% skolos)",
    minimoPorcentajeAyuda: "Kiek kas mėnesį reikalauja kortelės išdavėjas. Jei abejojate, dažnai taikoma 5 %.",
    minimoPiso: "Minimali įmoka ne mažesnė kaip",
    meses: "Mėnesių skaičius iki grąžinimo",
    intereses: "Sumokėtos palūkanos",
    total: "Iš viso sumokėta",
    primerPago: "Pirmoji minimali įmoka",
    tabla: "Grąžinimo planas pagal mėnesius",
    colMes: "Mėnuo",
    colPago: "Įmoka",
    colInteres: "Palūkanos",
    colCapital: "Skolos dalis",
    colSaldo: "Likutis",
    errorSaldo: "Įveskite kortelės skolos sumą.",
    errorFaltaPago: "Įveskite, kiek mokėsite kas mėnesį.",
    errorNoCubre: (interes) => `Su tokia įmoka skola niekada nesumažės: vien pirmo mėnesio palūkanos yra ${interes}. Padidinkite įmoką.`,
    errorMuyLargo: "Su tokia įmoka grąžinimas truktų ilgiau nei 50 metų. Padidinkite įmoką.",
    observacionAnios: (anios, meses) => {
      const a = pluralLt(anios, "metai", "metai", "metų");
      return meses === "0" ? `Iš viso tai yra ${a}.` : `Iš viso tai yra ${a} ir ${menesiai(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Jei visada mokėsite ${pago}, tai yra tiek pat, kiek pirmoji minimali įmoka, grąžinimo trukmė bus ${menesiai(meses)}, o palūkanų sutaupysite ${ahorro}.`,
    observacionNoGastar: "Skaičiuojama darant prielaidą, kad grąžinimo metu kortele daugiau nieko nepirksite.",
  }),
};
