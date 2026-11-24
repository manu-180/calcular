import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-vi.bono",
  slug: "thuong-nua-nam",
  campos: {
    sueldo: { etiqueta: "Lương gross hằng tháng" },
    meses: { etiqueta: "Số tháng làm việc trong nửa năm này" },
    region: { etiqueta: "Vùng bạn làm việc" },
    regimen: { etiqueta: "Quy mô công ty", opciones: { general: "Công ty vừa hoặc lớn", pequena: "Công ty nhỏ" } },
  },
  filas: {
    base: { etiqueta: "Lương dùng để tính" },
    bono: { etiqueta: "Tiền thưởng" },
    bonificacion: { etiqueta: "Phụ cấp" },
    total: { etiqueta: "Tổng bạn nhận được" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Số tháng phải từ 1 đến 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Lương của bạn thấp hơn mức tối thiểu của vùng, nên tiền thưởng được tính theo mức tối thiểu.",
  },
});
