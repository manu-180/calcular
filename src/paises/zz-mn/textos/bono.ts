import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-mn.bono",
  slug: "khagas-jiliin-uramshuulal",
  campos: {
    sueldo: { etiqueta: "Татвараас өмнөх сарын цалин" },
    meses: { etiqueta: "Хагас жилд хэдэн сар ажилласан бэ" },
    region: { etiqueta: "Таны ажилладаг бүс нутаг" },
    regimen: { etiqueta: "Байгууллагын хэмжээ", opciones: { general: "Дунд буюу том байгууллага", pequena: "Жижиг байгууллага" } },
  },
  filas: {
    base: { etiqueta: "Тооцоонд авах цалин" },
    bono: { etiqueta: "Урамшуулал" },
    bonificacion: { etiqueta: "Нэмэгдэл" },
    total: { etiqueta: "Нийт авах дүн" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Сарын тоо нэгээс зургаа хүртэл байна.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Таны цалин бүс нутгийн доод хэмжээнээс бага тул урамшууллыг доод хэмжээгээр тооцно.",
  },
});
