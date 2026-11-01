import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosHy: TextosUi<UiTarjetaDeCredito> = {
  slug: "varkayin-kart",
  ui: () => ({
    saldo: "Քարտի պարտք",
    tasa: "Տարեկան տոկոսադրույք (%)",
    tasaAyuda: "Գնումների տոկոսադրույքը։ Այն կգտնեք քարտի քաղվածքում։",
    modo: "Ինչպե՞ս եք վճարելու",
    modoFijo: "Ֆիքսված գումար ամեն ամիս",
    modoMinimo: "Նվազագույն վճար",
    pagoFijo: "Ֆիքսված ամսական վճար",
    minimoPorcentaje: "Նվազագույն վճար (պարտքի %)",
    minimoPorcentajeAyuda: "Որքան է պահանջում քարտը թողարկողը ամեն ամիս։ Եթե վստահ չեք, 5% տարածված տոկոս է։",
    minimoPiso: "Նվազագույն վճարը երբեք ցածր չէ հետևյալ գումարից",
    meses: "Ամիսներ մինչև մարումը",
    intereses: "Վճարված տոկոսներ",
    total: "Ընդամենը վճարված",
    primerPago: "Առաջին նվազագույն վճար",
    tabla: "Ժամանակացույց ըստ ամիսների",
    colMes: "Ամիս",
    colPago: "Վճար",
    colInteres: "Տոկոս",
    colCapital: "Մայր գումար",
    colSaldo: "Մնացորդ",
    errorSaldo: "Մուտքագրեք, թե որքան եք պարտք քարտով։",
    errorFaltaPago: "Մուտքագրեք, թե որքան եք վճարելու ամեն ամիս։",
    errorNoCubre: (interes) => `Այս վճարով պարտքը երբեք չի նվազում։ Միայն առաջին ամսվա տոկոսը կազմում է ${interes}։ Ավելացրեք վճարը։`,
    errorMuyLargo: "Այս վճարով մարումը կտևի ավելի քան 50 տարի։ Ավելացրեք վճարը։",
    observacionAnios: (anios, meses) => {
      const a = `${anios} տարի`;
      const m = meses === "0" ? "" : ` և ${meses} ամիս`;
      return `Դա կազմում է ${a}${m}։`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Եթե միշտ վճարեք ${pago}, այսինքն՝ առաջին նվազագույն վճարի չափով, քարտը կմարեք ${meses} ամսում և տոկոսներից կխնայեք ${ahorro}։`,
    observacionNoGastar: "Հաշվարկը ենթադրում է, որ մարման ընթացքում քարտով նոր գնումներ չեք կատարում։",
  }),
};
