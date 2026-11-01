import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosKa: TextosUi<UiTarjetaDeCredito> = {
  slug: "sakredito-baratis-daparva",
  ui: () => ({
    saldo: "საკრედიტო ბარათის დავალიანება",
    tasa: "წლიური საპროცენტო განაკვეთი (%)",
    tasaAyuda: "შესყიდვების განაკვეთი საშეღავათო პერიოდის შემდეგ. მას ამონაწერში ან ხელშეკრულებაში იპოვით.",
    modo: "როგორ იხდით?",
    modoFijo: "ყოველთვე ერთსა და იმავე თანხას",
    modoMinimo: "მინიმალურ თანხას",
    pagoFijo: "ფიქსირებული თვიური გადახდა",
    minimoPorcentaje: "მინიმალური გადახდა (დავალიანების პროცენტი)",
    minimoPorcentajeAyuda: "ამდენს ითხოვს ბარათის გამომშვები ყოველთვე. თუ დარწმუნებული არ ხართ, ხშირი მნიშვნელობაა 5%.",
    minimoPiso: "მინიმალური გადახდა სულ მცირე",
    meses: "თვეების რაოდენობა დაფარვამდე",
    intereses: "გადახდილი პროცენტი",
    total: "სულ გადახდილი",
    primerPago: "პირველი მინიმალური გადახდა",
    tabla: "დაფარვის გრაფიკი თვეების მიხედვით",
    colMes: "თვე",
    colPago: "გადახდა",
    colInteres: "პროცენტი",
    colCapital: "ძირი",
    colSaldo: "დავალიანება",
    errorSaldo: "მიუთითეთ, რამდენია დავალიანება ბარათზე.",
    errorFaltaPago: "მიუთითეთ, რამდენს გადაიხდით ყოველთვე.",
    errorNoCubre: (interes) => `ამ გადახდით დავალიანება არასდროს შემცირდება: პირველი თვის პროცენტიც კი ამ თანხას შეადგენს: ${interes}. გაზარდეთ გადახდა.`,
    errorMuyLargo: "ამ გადახდით დაფარვას 50 წელზე მეტი დასჭირდება. გაზარდეთ გადახდა.",
    observacionAnios: (anios, meses) => (meses === "0" ? `სულ: ${anios} წელი.` : `სულ: ${anios} წელი და ${meses} თვე.`),
    observacionFijo: (pago, meses, ahorro) =>
      `თუ ყოველთვე იმავე თანხას გადაიხდით, რაც პირველი მინიმალური გადახდაა (${pago}), დავალიანებას ამდენ თვეში დაფარავთ: ${meses}. დაზოგილი პროცენტი: ${ahorro}.`,
    observacionNoGastar: "გამოთვლა გულისხმობს, რომ დაფარვის პერიოდში ბარათით ახალ შესყიდვებს არ გააკეთებთ.",
  }),
};
