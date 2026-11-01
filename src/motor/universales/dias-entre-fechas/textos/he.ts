import { ANIOS_HE, DIAS_HE, MESES_HE, pluralHe, prefijoHe, SEMANAS_HE } from "../../../i18n/hebreo";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// «שנה אחת, חודשיים ו-3 ימים»: comas entre las partes y «ו» pegada a la última (con guion delante de
// una cifra, sin guion delante del dual: «ויומיים»).
function enLista(partes: readonly string[]): string {
  if (partes.length < 2) return partes[0];
  return `${partes.slice(0, -1).join(", ")} ${prefijoHe("ו", partes[partes.length - 1])}`;
}

export function duracionHe(anios: number, meses: number, dias: number): string {
  const partes: string[] = [];
  if (anios) partes.push(pluralHe(anios, ANIOS_HE));
  if (meses) partes.push(pluralHe(meses, MESES_HE));
  if (dias || !partes.length) partes.push(pluralHe(dias, DIAS_HE));
  return enLista(partes);
}

export const textosHe: TextosUi<UiDiasEntreFechas> = {
  slug: "days-between-dates",
  ui: () => ({
    desde: "תאריך התחלה",
    hasta: "תאריך סיום",
    incluir: "לכלול את תאריך הסיום",
    incluirAyuda: "סמנו אם גם היום האחרון נספר, כמו בטיול או בחופשה.",
    dias: "ימים קלנדריים",
    semanas: "בשבועות",
    duracionFila: "בשנים, חודשים וימים",
    habiles: "ימי עבודה",
    habilesAyuda: "משני עד שישי. חגים לא מנוכים.",
    duracion: duracionHe,
    semanasYDias: (semanas, n, dias) => {
      const parteSemanas = pluralHe(n, SEMANAS_HE, semanas);
      return dias ? `${parteSemanas} ${prefijoHe("ו", pluralHe(dias, DIAS_HE))}` : parteSemanas;
    },
    notaHabiles: "ימי העבודה נספרים כאן משני עד שישי, בלי לנכות חגים. בישראל שבוע העבודה הוא בדרך כלל מראשון עד חמישי, וחגים משתנים מדינה למדינה ושנה לשנה.",
    notaInvertidas: "תאריך הסיום היה לפני תאריך ההתחלה, ולכן הם הוחלפו.",
  }),
};
