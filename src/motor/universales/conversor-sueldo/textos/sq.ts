import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosSq: TextosUi<UiConversorSueldo> = {
  slug: "paga-per-ore",
  ui: () => ({
    monto: "Paga",
    periodo: "Paga është për",
    hora: "Orë",
    dia: "Ditë",
    semana: "Javë",
    quincena: "Gjysmë muaji (24 në vit)",
    mes: "Muaj",
    anio: "Vit",
    horasSemana: "Orë pune në javë",
    diasSemana: "Ditë pune në javë",
    semanasAnio: "Javë të paguara në vit",
    semanasAnioAyuda: "52 nëse keni pushime të paguara. Nëse paguheni vetëm për javët e punuara, zbritni të tjerat.",
    porHora: "Në orë",
    porDia: "Në ditë",
    porSemana: "Në javë",
    porQuincena: "Për gjysmë muaji",
    porMes: "Në muaj",
    porAnio: "Në vit",
    errorHoras: "Vendosni sa orë punoni në javë.",
    errorSemanas: "Javët e paguara në vit duhet të jenë më shumë se zero.",
    observacionBruto: "Është e njëjta shumë e shprehur për periudha të tjera. Nuk shtohen bonuse dhe nuk zbriten tatime.",
  }),
};
