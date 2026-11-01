import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-bg.bono",
  slug: "polugodishen-bonus",
  campos: {
    sueldo: { etiqueta: "Месечна заплата преди данъци" },
    meses: { etiqueta: "Колко месеца от полугодието сте работили" },
    region: { etiqueta: "Областта, в която работите" },
    regimen: { etiqueta: "Размер на предприятието", opciones: { general: "Средно или голямо предприятие", pequena: "Малко предприятие" } },
  },
  filas: {
    base: { etiqueta: "Заплата за изчислението" },
    bono: { etiqueta: "Бонус" },
    bonificacion: { etiqueta: "Добавка" },
    total: { etiqueta: "Общо за получаване" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Месеците са от 1 до 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Вашата заплата е под минималната за областта, затова бонусът се изчислява от минималната.",
  },
});
