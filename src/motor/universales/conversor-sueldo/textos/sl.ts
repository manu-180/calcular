import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosSl: TextosUi<UiConversorSueldo> = {
  slug: "pretvornik-place",
  ui: () => ({
    monto: "Znesek plače",
    periodo: "Znesek velja za",
    hora: "Uro",
    dia: "Dan",
    semana: "Teden",
    quincena: "Pol meseca (24-krat na leto)",
    mes: "Mesec",
    anio: "Leto",
    horasSemana: "Delovne ure na teden",
    diasSemana: "Delovni dnevi na teden",
    semanasAnio: "Plačani tedni na leto",
    semanasAnioAyuda: "52, če imate plačan letni dopust. Če so vam plačani samo opravljeni tedni, odštejte preostale.",
    porHora: "Na uro",
    porDia: "Na dan",
    porSemana: "Na teden",
    porQuincena: "Za pol meseca",
    porMes: "Na mesec",
    porAnio: "Na leto",
    errorHoras: "Vnesite, koliko ur na teden delate.",
    errorSemanas: "Število plačanih tednov na leto mora biti večje od nič.",
    observacionBruto: "To je isti znesek, preračunan na druga obdobja. Bonusi niso prišteti, dohodnina in prispevki pa niso odšteti.",
  }),
};
