import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-he.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "שכר חודשי ברוטו" },
    meses: { etiqueta: "חודשים שעבדתם בחצי השנה" },
    region: { etiqueta: "אזור העבודה" },
    regimen: { etiqueta: "גודל החברה", opciones: { general: "חברה בינונית או גדולה", pequena: "חברה קטנה" } },
  },
  filas: {
    base: { etiqueta: "השכר שנלקח בחישוב" },
    bono: { etiqueta: "המענק" },
    bonificacion: { etiqueta: "התוספת" },
    total: { etiqueta: "סך הכול תקבלו" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "מספר החודשים הוא בין 1 ל-6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "השכר שלכם נמוך משכר המינימום באזור, ולכן המענק מחושב לפי שכר המינימום.",
  },
});
