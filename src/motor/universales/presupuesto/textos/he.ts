import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosHe: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "הכנסה חודשית נטו",
    ingresoAyuda: "מה שנכנס לחשבון בכל חודש, אחרי מסים וניכויים.",
    pctNecesidades: "צרכים (%)",
    pctNecesidadesAyuda: "דיור, מצרכים, חשבונות, תחבורה, בריאות והחזרים מינימליים של חובות.",
    pctGustos: "רצונות (%)",
    pctGustosAyuda: "מסעדות, קניות שאינן הכרחיות, מנויים, טיולים.",
    pctAhorro: "חיסכון (%)",
    pctAhorroAyuda: "קרן חירום, יעדים, פרישה ותשלומים נוספים על חובות.",
    necesidades: "לצרכים",
    gustos: "לרצונות",
    ahorro: "לחיסכון",
    ahorroAnual: "חיסכון בשנה",
    errorIngreso: "הזינו את ההכנסה החודשית.",
    errorSuma: (suma) => `שלושת האחוזים מסתכמים ב-${suma}%. הם צריכים להסתכם ב-100%.`,
    observacionAhorroBajo: "חיסכון של פחות מ-10% משאיר מעט מקום להפתעות. אם אפשר, צמצמו קצת ברצונות.",
  }),
};
