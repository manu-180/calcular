import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosSk: TextosUi<UiConversorSueldo> = {
  slug: "hodinova-mzda",
  ui: () => ({
    monto: "Odmena",
    periodo: "Odmena za",
    hora: "Hodinu",
    dia: "Deň",
    semana: "Týždeň",
    quincena: "Pol mesiaca (24-krát ročne)",
    mes: "Mesiac",
    anio: "Rok",
    horasSemana: "Odpracované hodiny za týždeň",
    diasSemana: "Pracovné dni v týždni",
    semanasAnio: "Platené týždne v roku",
    semanasAnioAyuda: "52, ak máte platenú dovolenku. Ak dostávate zaplatené len za odpracované týždne, ostatné odpočítajte.",
    porHora: "Za hodinu",
    porDia: "Za deň",
    porSemana: "Za týždeň",
    porQuincena: "Za pol mesiaca",
    porMes: "Za mesiac",
    porAnio: "Za rok",
    errorHoras: "Zadajte, koľko hodín týždenne pracujete.",
    errorSemanas: "Platených týždňov v roku musí byť viac ako nula.",
    observacionBruto: "Je to tá istá suma prepočítaná na iné obdobia. Prémie sa nepripočítavajú a dane ani odvody sa neodpočítavajú.",
  }),
};
