import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosBn: TextosUi<UiTarjetaDeCredito> = {
  slug: "credit-card-payoff",
  ui: () => ({
    saldo: "কার্ডের বকেয়া",
    tasa: "বার্ষিক সুদের হার (%)",
    tasaAyuda: "কেনাকাটার ওপর কার্যকর বার্ষিক হার। কার্ডের স্টেটমেন্টে লেখা থাকে।",
    modo: "কীভাবে শোধ করবেন",
    modoFijo: "প্রতি মাসে নির্দিষ্ট অঙ্ক",
    modoMinimo: "ন্যূনতম পরিশোধ",
    pagoFijo: "মাসিক পরিশোধ",
    minimoPorcentaje: "ন্যূনতম পরিশোধ (বকেয়ার %)",
    minimoPorcentajeAyuda: "কার্ড কোম্পানি প্রতি মাসে যত টাকা চায়। জানা না থাকলে সাধারণত ৫%।",
    minimoPiso: "ন্যূনতম পরিশোধের সর্বনিম্ন অঙ্ক",
    meses: "পুরো শোধ হতে কত মাস",
    intereses: "মোট সুদ",
    total: "মোট পরিশোধ",
    primerPago: "প্রথম মাসের ন্যূনতম পরিশোধ",
    tabla: "মাসভিত্তিক পরিশোধের তালিকা",
    colMes: "মাস",
    colPago: "পরিশোধ",
    colInteres: "সুদ",
    colCapital: "আসল",
    colSaldo: "বকেয়া",
    errorSaldo: "কার্ডের বকেয়া লিখুন।",
    errorFaltaPago: "প্রতি মাসে কত শোধ করবেন, তা লিখুন।",
    errorNoCubre: (interes) => `এই অঙ্কে বকেয়া কমবে না। প্রথম মাসের সুদই ${cifrasBn(interes)}। মাসিক পরিশোধ বাড়ান।`,
    errorMuyLargo: "এই অঙ্কে পুরো শোধ হতে ৫০ বছরের বেশি লাগবে। মাসিক পরিশোধ বাড়ান।",
    observacionAnios: (anios, meses) => (cifrasBn(meses) === "০" ? `মোট ${cifrasBn(anios)} বছর।` : `মোট ${cifrasBn(anios)} বছর ${cifrasBn(meses)} মাস।`),
    observacionFijo: (pago, meses, ahorro) =>
      `প্রথম মাসের ন্যূনতম পরিশোধের সমান ${cifrasBn(pago)} প্রতি মাসে দিতে থাকলে ${cifrasBn(meses)} মাসে শোধ হবে এবং সুদ বাঁচবে ${cifrasBn(ahorro)}।`,
    observacionNoGastar: "ধরে নেওয়া হয়েছে শোধ করার সময় এই কার্ডে নতুন কেনাকাটা করবেন না।",
  }),
};
