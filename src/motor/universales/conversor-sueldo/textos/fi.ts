import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosFi: TextosUi<UiConversorSueldo> = {
  slug: "tuntipalkka-kuukausipalkaksi",
  ui: () => ({
    monto: "Palkka",
    periodo: "Palkka on ilmoitettu",
    hora: "Tunnilta",
    dia: "Päivältä",
    semana: "Viikolta",
    quincena: "Puolelta kuukaudelta (24 kertaa vuodessa)",
    mes: "Kuukaudelta",
    anio: "Vuodelta",
    horasSemana: "Työtunnit viikossa",
    diasSemana: "Työpäivät viikossa",
    semanasAnio: "Palkalliset viikot vuodessa",
    semanasAnioAyuda: "52, jos lomasi on palkallinen. Jos saat palkkaa vain työviikoilta, vähennä muut viikot.",
    porHora: "Tuntipalkka",
    porDia: "Päiväpalkka",
    porSemana: "Viikkopalkka",
    porQuincena: "Palkka puolelta kuukaudelta",
    porMes: "Kuukausipalkka",
    porAnio: "Vuosipalkka",
    errorHoras: "Syötä, montako tuntia teet töitä viikossa.",
    errorSemanas: "Palkallisia viikkoja pitää olla vuodessa enemmän kuin nolla.",
    observacionBruto: "Luvut ovat sama palkka muunnettuna muille jaksoille ennen veroja. Lisiä tai bonuksia ei lisätä eikä veroja vähennetä.",
  }),
};
