import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosMk: TextosUi<UiPresupuesto> = {
  slug: "kalkulator-za-budjet",
  ui: () => ({
    ingreso: "Месечен нето приход",
    ingresoAyuda: "Износот што секој месец влегува на вашата сметка, по даноците и придонесите.",
    pctNecesidades: "Потреби (%)",
    pctNecesidadesAyuda: "Домување, храна, сметки за струја и вода, превоз, здравје и минималните рати за кредити.",
    pctGustos: "Желби (%)",
    pctGustosAyuda: "Ресторани, купувања без кои можете, претплати, патувања.",
    pctAhorro: "Заштеда (%)",
    pctAhorroAyuda: "Финансиска резерва, цели, пензија и дополнителни уплати за долгови.",
    necesidades: "За потреби",
    gustos: "За желби",
    ahorro: "За заштеда",
    ahorroAnual: "Заштеда за една година",
    errorIngreso: "Внесете го вашиот месечен приход.",
    errorSuma: (suma) => `Трите проценти вкупно изнесуваат ${suma} %. Збирот треба да биде 100 %.`,
    observacionAhorroBajo: "Ако заштедувате помалку од 10 %, останува малку простор за непредвидени трошоци. Ако можете, намалете дел од желбите.",
  }),
};
