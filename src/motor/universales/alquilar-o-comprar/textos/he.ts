import { ANIOS_HE, pluralHeTexto } from "../../../i18n/hebreo";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

export const textosHe: TextosUi<UiAlquilarOComprar> = {
  slug: "rent-vs-buy",
  ui: () => ({
    precio: "מחיר הדירה",
    entrada: "הון עצמי (% מהמחיר)",
    gastosCompra: "עלויות רכישה (% מהמחיר)",
    gastosCompraAyuda: "שכר טרחת עורך דין, מס רכישה, תיווך ושמאות.",
    tasa: "ריבית המשכנתא (% לשנה)",
    aniosHipoteca: "תקופת המשכנתא בשנים",
    alquiler: "שכר דירה חודשי לדירה דומה",
    aumentoAlquiler: "עליית שכר הדירה בכל שנה (%)",
    gastosPropietario: "הוצאות בעלות בשנה (% מהשווי)",
    gastosPropietarioAyuda: "תחזוקה, ארנונה וביטוח מבנה. בדרך כלל בין 1% ל-2%.",
    revalorizacion: "עליית מחיר הדירה בכל שנה (%)",
    rendimiento: "תשואה על השקעה חלופית (% לשנה)",
    rendimientoAyuda: "מה הייתם מרוויחים אם הייתם משקיעים את ההון העצמי במקום לקנות.",
    horizonte: "מספר השנים להשוואה",
    veredicto: "תוצאה",
    patrimonioComprar: "ההון בסוף התקופה אם קונים",
    patrimonioAlquilar: "ההון בסוף התקופה אם שוכרים",
    diferencia: "הפרש",
    anioDesde: "השנה שבה הקנייה מתחילה להשתלם",
    pagadoAlquilando: "סך שכר הדירה ששולם",
    pagadoComprando: "סך החזרי המשכנתא והוצאות הבעלות",
    tabla: "השוואה שנה אחרי שנה",
    colAnio: "שנה",
    colComprar: "קנייה",
    colAlquilar: "שכירות",
    colDiferencia: "הפרש",
    errorPrecio: "הזינו את מחיר הדירה.",
    errorAlquiler: "הזינו כמה עולה לשכור דירה דומה.",
    convieneComprar: (anios, diferencia) => `קנייה משתלמת יותר: אחרי ${pluralHeTexto(anios, ANIOS_HE)} יהיו לכם ${diferencia} יותר.`,
    convieneAlquilar: (anios, diferencia) => `שכירות משתלמת יותר: אחרי ${pluralHeTexto(anios, ANIOS_HE)} יהיו לכם ${diferencia} יותר.`,
    empate: (anios) => `אחרי ${pluralHeTexto(anios, ANIOS_HE)} שתי האפשרויות מגיעות לאותה תוצאה.`,
    observacionDesde: (anio) => `הקנייה עוקפת את השכירות בשנה ה-${anio} ונשארת משתלמת יותר מאז.`,
    observacionMetodo:
      "ההשוואה בודקת כמה הון יהיה לכם בכל מקרה. אם שוכרים, ההון העצמי וכל מה שנחסך בכל חודש נשארים מושקעים. עלויות המכירה לא מנוכות.",
  }),
};
