import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosCs: TextosUi<UiConversorSueldo> = {
  slug: "hodinova-mzda",
  ui: () => ({
    monto: "Odměna",
    periodo: "Odměna za",
    hora: "Hodinu",
    dia: "Den",
    semana: "Týden",
    quincena: "Půl měsíce (24krát ročně)",
    mes: "Měsíc",
    anio: "Rok",
    horasSemana: "Odpracované hodiny za týden",
    diasSemana: "Pracovní dny v týdnu",
    semanasAnio: "Placené týdny v roce",
    semanasAnioAyuda: "52, pokud máte placenou dovolenou. Pokud dostáváte zaplaceno jen za odpracované týdny, ostatní odečtěte.",
    porHora: "Za hodinu",
    porDia: "Za den",
    porSemana: "Za týden",
    porQuincena: "Za půl měsíce",
    porMes: "Za měsíc",
    porAnio: "Za rok",
    errorHoras: "Zadejte, kolik hodin týdně pracujete.",
    errorSemanas: "Placených týdnů v roce musí být víc než nula.",
    observacionBruto: "Je to stejná částka přepočtená na jiná období. Prémie se nepřičítají a daně ani pojištění se neodečítají.",
  }),
};
