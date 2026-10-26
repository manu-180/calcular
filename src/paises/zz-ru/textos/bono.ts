import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-ru.bono",
  slug: "polugodovaya-premiya",
  campos: {
    sueldo: { etiqueta: "Месячная зарплата до вычета налогов" },
    meses: { etiqueta: "Сколько месяцев полугодия вы работали" },
    region: { etiqueta: "Регион, где вы работаете" },
    regimen: { etiqueta: "Размер компании", opciones: { general: "Средняя или крупная компания", pequena: "Малая компания" } },
  },
  filas: {
    base: { etiqueta: "Зарплата для расчета" },
    bono: { etiqueta: "Премия" },
    bonificacion: { etiqueta: "Надбавка" },
    total: { etiqueta: "Итого к выплате" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Количество месяцев от 1 до 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Ваша зарплата ниже минимальной в вашем регионе, поэтому премия рассчитана от минимальной.",
  },
});
