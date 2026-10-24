import { pluralAr, type FormasAr } from "../../../i18n/arabe";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

export const ANIOS_AR: FormasAr = { uno: "سنة واحدة", dos: "سنتان", pocos: "{n} سنوات", muchos: "{n} سنة", otros: "{n} سنة" };
export const MESES_AR: FormasAr = { uno: "شهر واحد", dos: "شهران", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" };
export const SEMANAS_AR: FormasAr = { uno: "أسبوع واحد", dos: "أسبوعان", pocos: "{n} أسابيع", muchos: "{n} أسبوعًا", otros: "{n} أسبوع" };
export const DIAS_AR: FormasAr = { uno: "يوم واحد", dos: "يومان", pocos: "{n} أيام", muchos: "{n} يومًا", otros: "{n} يوم" };

// Las partes se encadenan con «و» pegada a la siguiente: «سنتان و3 أشهر و5 أيام».
export function duracionAr(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(pluralAr(anios, ANIOS_AR));
  if (meses) partes.push(pluralAr(meses, MESES_AR));
  if (dias || !partes.length) partes.push(pluralAr(dias, DIAS_AR));
  return partes.join(" و");
}

export const textosAr: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "تاريخ البداية",
    hasta: "تاريخ النهاية",
    incluir: "احتساب يوم النهاية",
    incluirAyuda: "فعّل الخيار إذا كان اليوم الأخير يُحتسب أيضًا، كما في رحلة أو إجازة.",
    dias: "عدد الأيام التقويمية",
    semanas: "بالأسابيع",
    duracionFila: "بالسنوات والأشهر والأيام",
    habiles: "أيام العمل",
    habilesAyuda: "من الاثنين إلى الجمعة، دون خصم العطلات الرسمية.",
    duracion: duracionAr,
    semanasYDias: (semanas, n, dias) => {
      const parteSemanas = pluralAr(n, SEMANAS_AR, semanas);
      return dias ? `${parteSemanas} و${pluralAr(dias, DIAS_AR)}` : parteSemanas;
    },
    notaHabiles:
      "تُحسب أيام العمل من الاثنين إلى الجمعة. في كثير من الدول العربية تكون العطلة الأسبوعية الجمعة والسبت، فقد يختلف العدد قليلًا. ولا تُخصم العطلات الرسمية لأنها تختلف من بلد إلى آخر.",
    notaInvertidas: "كان تاريخ النهاية قبل تاريخ البداية، فتم تبديلهما.",
  }),
};
