import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-ka.bono",
  slug: "nakhevartsliuri-premia",
  campos: {
    sueldo: { etiqueta: "ყოველთვიური ხელფასი დაბეგვრამდე" },
    meses: { etiqueta: "ნახევარი წლიდან რამდენი თვე იმუშავეთ" },
    region: { etiqueta: "რეგიონი, სადაც მუშაობთ" },
    regimen: { etiqueta: "კომპანიის ზომა", opciones: { general: "საშუალო ან დიდი კომპანია", pequena: "მცირე საწარმო" } },
  },
  filas: {
    base: { etiqueta: "გამოთვლის საფუძველი" },
    bono: { etiqueta: "პრემია" },
    bonificacion: { etiqueta: "დანამატი" },
    total: { etiqueta: "სულ ასანაზღაურებელი" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "თვეების რაოდენობა: მინიმუმ 1, მაქსიმუმ 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "თქვენი ხელფასი თქვენი რეგიონის მინიმუმზე დაბალია, ამიტომ პრემია მინიმალური ხელფასით ითვლება.",
  },
});
