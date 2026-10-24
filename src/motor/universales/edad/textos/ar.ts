import { pluralAr } from "../../../i18n/arabe";
import { ANIOS_AR, duracionAr } from "../../dias-entre-fechas/textos/ar";
import type { TextosUi } from "../../tipos";
import type { UiEdad } from "../definicion";

// La cifra llega ya formateada; para elegir la forma del plural se lee de nuevo como número.
const cifra = (s: string) => Number(s.replace(/[^\d]/g, ""));

export const textosAr: TextosUi<UiEdad> = {
  slug: "age",
  ui: () => ({
    nacimiento: "تاريخ الميلاد",
    referencia: "العمر في تاريخ",
    referenciaAyuda: "تاريخ اليوم افتراضيًا. غيّره لتعرف العمر في تاريخ آخر.",
    edad: "العمر",
    anios: "العمر بالسنوات",
    totalMeses: "بالأشهر",
    totalSemanas: "بالأسابيع",
    totalDias: "بالأيام",
    proximo: "عيد الميلاد القادم",
    faltan: "الأيام المتبقية",
    cumplira: "العمر الذي سيبلغه",
    duracion: duracionAr,
    errorFutura: "لا يمكن أن يكون تاريخ الميلاد بعد التاريخ الذي تحسب العمر فيه.",
    cumpleHoy: (anios) => `اليوم عيد الميلاد، والعمر ${pluralAr(cifra(anios), ANIOS_AR, anios)} بالتمام.`,
    nota29: "لمن وُلد في 29 فبراير، يُحتسب عيد الميلاد في 28 فبراير في السنوات غير الكبيسة.",
  }),
};
