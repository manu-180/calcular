import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosMk: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-za-marzha",
  ui: () => ({
    modo: "Што сакате да пресметате?",
    modoPrecio: "Маржата од трошокот и цената",
    modoMargen: "Цената за саканата маржа",
    modoMarkup: "Цената за саканата надценка",
    costo: "Трошок по парче",
    costoAyuda: "Колку чини да купите или произведете едно парче, без ДДВ што се префрла на купувачот.",
    precio: "Продажна цена",
    precioAyuda: "Само ако ја пресметувате маржата. Без ДДВ.",
    objetivo: "Сакана маржа или надценка (%)",
    objetivoAyuda: "Само ако ја пресметувате цената.",
    precioResultado: "Продажна цена",
    margen: "Маржа на добивка",
    margenAyuda: "Добивката како процент од продажната цена.",
    markup: "Надценка",
    markupAyuda: "Добивката како процент од трошокот.",
    ganancia: "Добивка по парче",
    errorCosto: "Внесете го трошокот за едно парче.",
    errorFaltaPrecio: "Внесете ја продажната цена за да ја пресметаме маржата.",
    errorFaltaObjetivo: "Внесете ја маржата или надценката што ја сакате.",
    errorMargen100: "Маржата треба да биде под 100 %: со 100 % целата цена би била добивка без никаков трошок.",
    observacionPerdida: "Со оваа цена продавате под трошокот и губите пари на секоја продажба.",
  }),
};
