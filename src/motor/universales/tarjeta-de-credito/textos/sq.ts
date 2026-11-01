import { pluralSq } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosSq: TextosUi<UiTarjetaDeCredito> = {
  slug: "kalkulator-karte-krediti",
  ui: () => ({
    saldo: "Borxhi në kartë",
    tasa: "Interesi vjetor (%)",
    tasaAyuda: "Interesi për blerjet pas periudhës pa interes. E gjeni në kontratë ose në pasqyrën e kartës.",
    modo: "Si do të paguani?",
    modoFijo: "Një shumë fikse çdo muaj",
    modoMinimo: "Pagesa minimale",
    pagoFijo: "Pagesa fikse mujore",
    minimoPorcentaje: "Pagesa minimale (% e borxhit)",
    minimoPorcentajeAyuda: "Sa ju kërkon banka të paguani çdo muaj. Nëse nuk jeni të sigurt, 5% është një vlerë e shpeshtë.",
    minimoPiso: "Pagesa minimale nuk bie nën",
    meses: "Muaj deri në shlyerjen e borxhit",
    intereses: "Interesi i paguar",
    total: "Totali i paguar",
    primerPago: "Pagesa e parë minimale",
    tabla: "Plani i shlyerjes muaj pas muaji",
    colMes: "Muaji",
    colPago: "Pagesa",
    colInteres: "Interesi",
    colCapital: "Principali",
    colSaldo: "Teprica e mbetur",
    errorSaldo: "Vendosni borxhin që keni në kartë.",
    errorFaltaPago: "Vendosni sa do të paguani çdo muaj.",
    errorNoCubre: (interes) => `Me këtë pagesë borxhi nuk ulet kurrë: vetëm interesi i muajit të parë është ${interes}. Rriteni pagesën.`,
    errorMuyLargo: "Me këtë pagesë shlyerja do të zgjaste më shumë se 50 vjet. Rriteni pagesën.",
    observacionAnios: (anios, meses) => {
      const a = pluralSq(anios, "vit", "vjet");
      const m = meses === "0" ? "" : ` dhe ${pluralSq(meses, "muaj", "muaj")}`;
      return `Kjo do të thotë ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Nëse paguani gjithmonë ${pago}, sa pagesa e parë minimale, e shlyeni borxhin për ${pluralSq(meses, "muaj", "muaj")} dhe kurseni ${ahorro} në interes.`,
    observacionNoGastar: "Llogaritja supozon që nuk bëni blerje të reja me kartë sa kohë po e shlyeni borxhin.",
  }),
};
