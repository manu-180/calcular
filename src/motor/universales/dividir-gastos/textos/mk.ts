import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosMk: TextosUi<UiDividirGastos> = {
  slug: "kalkulator-za-podelba-na-smetka",
  ui: () => ({
    persona: (n) => `Лице ${n}`,
    personaAyuda: "Внесете колку платило секое лице. Ако некој не платил ништо, но учествува во трошокот, внесете 0. Другите полиња оставете ги празни.",
    total: "Вкупен трошок",
    personas: "Број на лица",
    cuota: "Дел по лице",
    transferencias: "Плаќања за порамнување",
    tabla: "Кој на кого му плаќа",
    colDe: "Плаќа",
    colPara: "Прима",
    colMonto: "Износ",
    errorPocas: "За да поделите трошок, потребни се најмалку две лица.",
    aMano: "Сметките се чисти: сите платиле исто.",
  }),
};
