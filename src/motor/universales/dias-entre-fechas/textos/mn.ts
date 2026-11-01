import { conteoMn } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

export function duracionMn(a: number, m: number, d: number): string {
  const partes: string[] = [];
  if (a) partes.push(conteoMn(a, "жил"));
  if (m) partes.push(conteoMn(m, "сар"));
  if (d || !partes.length) partes.push(conteoMn(d, "өдөр"));
  return partes.join(" ");
}

export const textosMn: TextosUi<UiDiasEntreFechas> = {
  slug: "ognoo-khoorondokh-odriin-too",
  ui: () => ({
    desde: "Эхлэх огноо",
    hasta: "Дуусах огноо",
    incluir: "Дуусах огноог оруулж тоолох",
    incluirAyuda: "Сүүлийн өдөр мөн тоологдох бол тэмдэглэнэ үү. Жишээ нь, аялал эсвэл амралтын үед.",
    dias: "Хуанлийн өдөр",
    semanas: "Долоо хоногоор",
    duracionFila: "Жил, сар, өдрөөр",
    habiles: "Ажлын өдөр",
    habilesAyuda: "Даваагаас Баасан гараг хүртэл. Албан ёсны баярын өдрийг хасаагүй.",
    duracion: duracionMn,
    semanasYDias: (semanas, _n, d) => {
      const parteSemanas = `${semanas} долоо хоног`;
      return d ? `${parteSemanas} ${conteoMn(d, "өдөр")}` : parteSemanas;
    },
    notaHabiles: "Ажлын өдрийг Даваагаас Баасан гараг хүртэл тоолсон. Албан ёсны баярын өдөр улс, бүс нутгаас хамаарч өөр байдаг тул хасаагүй.",
    notaInvertidas: "Дуусах огноо эхлэх огнооноос өмнө байсан тул хоёр огноог сольж тооцоолов.",
  }),
};
