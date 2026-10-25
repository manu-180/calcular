import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosAr: TextosUi<UiCostoDeUnAuto> = textosArabes({
  slug: "car-cost",
  ui: () => ({
    precio: "قيمة السيارة",
    precioAyuda: "ما دفعته فيها، أو قيمتها اليوم إذا كانت لديك منذ مدة.",
    depreciacion: "نسبة انخفاض القيمة في السنة (%)",
    depreciacionAyuda: "السيارة الجديدة تفقد من 15% إلى 25% من قيمتها في السنة الأولى، والمستعملة أقل.",
    cuota: "القسط الشهري للتمويل (اختياري)",
    cuotaAyuda: "لمعرفة ما يخرج من حسابك كل شهر فقط، ولا يُضاف إلى التكلفة الحقيقية.",
    seguro: "التأمين في الشهر",
    distanciaKm: "الكيلومترات في الشهر",
    distanciaMi: "الأميال في الشهر",
    consumoL100: "استهلاك الوقود (لتر لكل 100 كم)",
    consumoMpg: "كفاءة الوقود (ميل لكل غالون)",
    precioLitro: "سعر لتر الوقود",
    precioGalon: "سعر غالون الوقود",
    mantenimiento: "الصيانة في الشهر",
    mantenimientoAyuda: "الصيانة الدورية والإطارات والإصلاحات والغسيل، بمتوسط شهري.",
    estacionamiento: "مواقف السيارات في الشهر (اختياري)",
    otros: "الرسوم وتعرفة الطرق وتكاليف أخرى في الشهر (اختياري)",
    otrosAyuda: "تجديد الترخيص والفحص الدوري ورسوم الطرق والمخالفات، بمتوسط شهري.",
    costoMensual: "التكلفة الحقيقية في الشهر",
    costoAnual: "التكلفة الحقيقية في السنة",
    porKm: "التكلفة لكل كيلومتر",
    porMilla: "التكلفة لكل ميل",
    combustible: "الوقود في الشهر",
    depreciacionMensual: "انخفاض القيمة في الشهر",
    gastoBolsillo: "ما يخرج من حسابك كل شهر",
    errorConsumo: "أدخل استهلاك سيارتك من الوقود لحساب تكلفته.",
    observacionCuota:
      "القسط لا يدخل في التكلفة الحقيقية لأن جزءًا منه ثمن السيارة نفسها، وهو محسوب بالفعل في انخفاض القيمة. أما فوائد التمويل فهي تكلفة إضافية فوق ذلك.",
  }),
});
