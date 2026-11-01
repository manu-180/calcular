import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosIs: TextosUi<UiSumarDias> = {
  slug: "baeta-dogum-vid-dagsetningu",
  ui: () => ({
    fecha: "Upphafsdagur",
    operacion: "Hvað viltu gera?",
    sumar: "Bæta við dögum",
    restar: "Draga frá dögum",
    dias: "Fjöldi daga",
    tipo: "Tegund daga",
    corridos: "Almanaksdagar",
    habiles: "Virkir dagar (mánudagur til föstudagur)",
    resultado: "Dagsetning",
    diaSemana: "Vikudagur",
    diasCorridos: "Almanaksdagar alls",
    nombresDias: ["sunnudagur", "mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur"],
    errorDias: "Fjöldi daga þarf að vera heil tala og að hámarki 100 ár.",
    notaHabiles: "Virkir dagar sleppa laugardögum og sunnudögum en ekki frídögum. Ef frídagur lendir á tímabilinu skaltu bæta honum við sérstaklega.",
  }),
};
