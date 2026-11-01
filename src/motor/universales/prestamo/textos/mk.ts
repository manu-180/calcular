import { formaMk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosMk: TextosUi<UiPrestamo> = {
  slug: "kalkulator-za-kredit",
  ui: () => ({
    monto: "Износ на кредитот",
    tasa: "Годишна каматна стапка (%)",
    tasaAyuda: "Номиналната годишна каматна стапка од понудата. Провизиите не се вклучени.",
    meses: "Рок во месеци",
    extra: "Дополнителна уплата месечно (незадолжително)",
    extraAyuda: "Износот што би го додавале секој месец за да го отплатите кредитот порано. Целиот оди за главнината.",
    cuota: "Месечна рата",
    intereses: "Вкупна камата",
    total: "Вкупно платено",
    mesesReales: "Месеци до отплата со дополнителната уплата",
    ahorro: "Заштедена камата",
    tabla: "План за отплата",
    colMes: "Месец",
    colPago: "Рата",
    colInteres: "Камата",
    colCapital: "Главнина",
    colSaldo: "Остаток",
    errorMonto: "Внесете износ поголем од нула.",
    observacionCostos: "Ратата не ги вклучува осигурувањата, провизиите и даноците што кредиторот може да ги додаде. Побарајте ја вкупната цена на кредитот пред да потпишете.",
    observacionExtra: (meses, ahorro) => `Со дополнителната уплата го отплаќате кредитот за ${meses} ${formaMk(meses, "месец", "месеци")} и заштедувате ${ahorro} камата.`,
  }),
};
