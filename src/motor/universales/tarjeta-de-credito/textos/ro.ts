import { pluralRo } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosRo: TextosUi<UiTarjetaDeCredito> = {
  slug: "calculator-card-de-credit",
  ui: () => ({
    saldo: "Datoria pe card",
    tasa: "Dobânda anuală (%)",
    tasaAyuda: "Dobânda la cumpărături după perioada de grație. O găsiți în contract sau în extrasul de card.",
    modo: "Cum veți plăti?",
    modoFijo: "O sumă fixă în fiecare lună",
    modoMinimo: "Plata minimă",
    pagoFijo: "Plata fixă lunară",
    minimoPorcentaje: "Plata minimă (% din datorie)",
    minimoPorcentajeAyuda: "Cât vă cere banca să plătiți în fiecare lună. Dacă nu sunteți sigur, 5% este o valoare frecventă.",
    minimoPiso: "Plata minimă nu scade sub",
    meses: "Luni până la achitarea datoriei",
    intereses: "Dobânda plătită",
    total: "Total plătit",
    primerPago: "Prima plată minimă",
    tabla: "Planul de rambursare lună de lună",
    colMes: "Luna",
    colPago: "Plata",
    colInteres: "Dobânda",
    colCapital: "Principal",
    colSaldo: "Sold rămas",
    errorSaldo: "Introduceți datoria pe care o aveți pe card.",
    errorFaltaPago: "Introduceți cât veți plăti în fiecare lună.",
    errorNoCubre: (interes) => `Cu această plată datoria nu scade niciodată: doar dobânda din prima lună este de ${interes}. Măriți plata.`,
    errorMuyLargo: "Cu această plată achitarea ar dura mai mult de 50 de ani. Măriți plata.",
    observacionAnios: (anios, meses) => {
      const a = pluralRo(anios, "an", "ani");
      const m = meses === "0" ? "" : ` și ${pluralRo(meses, "lună", "luni")}`;
      return `Asta înseamnă ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Dacă plătiți mereu ${pago}, cât prima plată minimă, achitați datoria în ${pluralRo(meses, "lună", "luni")} și economisiți ${ahorro} la dobândă.`,
    observacionNoGastar: "Calculul presupune că nu faceți cumpărături noi cu cardul cât timp achitați datoria.",
  }),
};
