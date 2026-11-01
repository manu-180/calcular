import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-mk.bono",
  slug: "polugodishen-bonus",
  campos: {
    sueldo: { etiqueta: "Месечна плата пред данок" },
    meses: { etiqueta: "Колку месеци од полугодието сте работеле" },
    region: { etiqueta: "Регионот во кој работите" },
    regimen: { etiqueta: "Големина на претпријатието", opciones: { general: "Средно или големо претпријатие", pequena: "Мало претпријатие" } },
  },
  filas: {
    base: { etiqueta: "Плата за пресметката" },
    bono: { etiqueta: "Бонус" },
    bonificacion: { etiqueta: "Додаток" },
    total: { etiqueta: "Вкупно за примање" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Месеците се од 1 до 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Вашата плата е под минималната за регионот, па бонусот се пресметува од минималната.",
  },
});
