import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-uk.bono",
  slug: "pivrichna-premiia",
  campos: {
    sueldo: { etiqueta: "Місячна зарплата брутто" },
    meses: { etiqueta: "Скільки місяців півріччя ви працювали" },
    region: { etiqueta: "Регіон, де ви працюєте" },
    regimen: { etiqueta: "Розмір компанії", opciones: { general: "Середня або велика компанія", pequena: "Мала компанія" } },
  },
  filas: {
    base: { etiqueta: "Зарплата для розрахунку" },
    bono: { etiqueta: "Премія" },
    bonificacion: { etiqueta: "Надбавка" },
    total: { etiqueta: "Усього до виплати" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Кількість місяців від 1 до 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Ваша зарплата нижча за мінімальну у вашому регіоні, тому премію розраховано від мінімальної.",
  },
});
