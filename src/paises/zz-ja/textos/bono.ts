import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-ja.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "月給（額面）" },
    meses: { etiqueta: "半期のうち働いた月数" },
    region: { etiqueta: "勤務地の地域" },
    regimen: { etiqueta: "会社の規模", opciones: { general: "中規模・大規模の会社", pequena: "小規模の会社" } },
  },
  filas: {
    base: { etiqueta: "計算に使う給与" },
    bono: { etiqueta: "賞与" },
    bonificacion: { etiqueta: "加算金" },
    total: { etiqueta: "受け取る合計" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "月数は1から6までです。",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "月給が地域の最低賃金を下回っているため、賞与は最低賃金で計算しています。",
  },
});
