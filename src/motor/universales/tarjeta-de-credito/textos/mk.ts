import { pluralMk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosMk: TextosUi<UiTarjetaDeCredito> = {
  slug: "kalkulator-za-kreditna-kartichka",
  ui: () => ({
    saldo: "Долг на картичката",
    tasa: "Годишна каматна стапка (%)",
    tasaAyuda: "Каматата за купувања. Ќе ја најдете во изводот на картичката.",
    modo: "Како ќе плаќате?",
    modoFijo: "Фиксен износ секој месец",
    modoMinimo: "Минималната рата",
    pagoFijo: "Фиксна месечна рата",
    minimoPorcentaje: "Минимална рата (% од долгот)",
    minimoPorcentajeAyuda: "Колку бара издавачот на картичката секој месец. Ако не сте сигурни, 5 % е чест процент.",
    minimoPiso: "Минималната рата никогаш не е под",
    meses: "Месеци до отплата",
    intereses: "Платена камата",
    total: "Вкупно платено",
    primerPago: "Прва минимална рата",
    tabla: "План по месеци",
    colMes: "Месец",
    colPago: "Рата",
    colInteres: "Камата",
    colCapital: "Главнина",
    colSaldo: "Остаток",
    errorSaldo: "Внесете колку должите на картичката.",
    errorFaltaPago: "Внесете колку ќе плаќате секој месец.",
    errorNoCubre: (interes) => `Со оваа рата долгот никогаш не се намалува. Само за првиот месец каматата е ${interes} и не се покрива. Зголемете ја ратата.`,
    errorMuyLargo: "Со оваа рата отплатата ќе трае над 50 години. Зголемете ја ратата.",
    observacionAnios: (anios, meses) => {
      const a = pluralMk(anios, "година", "години");
      const m = meses === "0" ? "" : ` и ${pluralMk(meses, "месец", "месеци")}`;
      return `Тоа изнесува ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ако секогаш плаќате ${pago}, колку што е првата минимална рата, картичката ќе ја отплатите за ${pluralMk(meses, "месец", "месеци")} и ќе заштедите ${ahorro} камата.`,
    observacionNoGastar: "Пресметката претпоставува дека не правите нови купувања со картичката додека ја отплатувате.",
  }),
};
