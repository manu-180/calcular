import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosMn: TextosUi<UiConversorSueldo> = {
  slug: "tsagiin-tsalin-tootsooluur",
  ui: () => ({
    monto: "Цалин",
    periodo: "Цалин ямар хугацаанд олгогддог вэ",
    hora: "Цаг",
    dia: "Өдөр",
    semana: "Долоо хоног",
    quincena: "Хагас сар (жилд 24 удаа)",
    mes: "Сар",
    anio: "Жил",
    horasSemana: "Долоо хоногт ажилладаг цаг",
    diasSemana: "Долоо хоногийн ажлын өдөр",
    semanasAnio: "Жилд цалинтай долоо хоног",
    semanasAnioAyuda: "Цалинтай амралттай бол 52. Зөвхөн ажилласан долоо хоногоо цалинжуулдаг бол бусдыг нь хасна уу.",
    porHora: "Цагт",
    porDia: "Өдөрт",
    porSemana: "Долоо хоногт",
    porQuincena: "Хагас сард",
    porMes: "Сард",
    porAnio: "Жилд",
    errorHoras: "Долоо хоногт хэдэн цаг ажилладгаа оруулна уу.",
    errorSemanas: "Жилд цалинтай долоо хоног тэгээс их байх ёстой.",
    observacionBruto: "Энэ бол ижил дүнг өөр хугацаагаар илэрхийлсэн тооцоо. Урамшуулал нэмээгүй, татвар хасаагүй.",
  }),
};
